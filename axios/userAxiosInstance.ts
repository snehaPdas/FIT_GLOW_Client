import axios,{AxiosResponse,AxiosError,InternalAxiosRequestConfig} from "axios"

import API_URL from "./API_URL"

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig{
    _retry?:boolean
}

const userAxiosInstance=axios.create({
    baseURL:API_URL,
    withCredentials:true
})

//request user interceptors 

userAxiosInstance.interceptors.request.use((config:CustomAxiosRequestConfig)=>{
    const token=localStorage.getItem("accesstoken")
    if(token){
        config.headers["Authorization"]=`Bearer ${token}`
    }
    return config
},
(error)=>{
    console.log("error in protected route",error)
    return Promise.reject(error)
}
)

//response

userAxiosInstance.interceptors.response.use((Response:AxiosResponse)=>{
    return Response
},
async (error:AxiosError)=>{
    console.log("error in protected route",error)
    const originalRequest = error.config as CustomAxiosRequestConfig;
    if (originalRequest && error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
            console.log("sample check for refreshtoken")
            const response= await userAxiosInstance.post<{accessToken:string}>("/api/user/refresh-token",{},{withCredentials:true})
            const {accessToken}=response.data
            localStorage.setItem("accesstoken",accessToken)
            console.log("Access token stored:", localStorage.getItem("accesstoken"));

            return userAxiosInstance(originalRequest)
        } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            return Promise.reject(refreshError);



        }
    }
    return Promise.reject(error);

}


)

export default userAxiosInstance
