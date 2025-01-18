
import axios from "axios";
import API_URL from "../../axios/API_URL";
import { Trainer } from "../features/trainer/TrainerType";
import trainerAxiosInstance from "../../axios/trainerAxiosInstance";



export interface ITrainer {
    trainerId?: string;
    name: string;
    phone: string;
    email: string;
    password: string;
    isBlocked?: boolean;
  }


  const registerTrainer = async (trainerData: ITrainer) => {
    try {
        const response=await axios.post(`${API_URL}/api/trainer/signup`,trainerData)

    } catch (error) {
        
    }
  }

  const verifyOtp=async({trainerData,otp}:{trainerData:Trainer,otp:string})=>{
    console.log("yesss",trainerData,otp)
    try {
      const response=await axios.post(`${API_URL}/api/trainer/otp`,{trainerData,otp})
      console.log("the response is**********",response.data)
      return response.data
      
    } catch (error:any) {
      console.error("Verify OTP Error:", error.response?.data || error.message);
      throw error

    }

  }
  const loginTrainer=async({email,password}:{email:string,password:string})=>{     
         
    try {
      console.log("trainer service..",email,password)
        const response=await trainerAxiosInstance.post(`${API_URL}/api/trainer/logintrainer`,{email,password})

        const accessToken  = response.data.token
        console.log("accessss token is",accessToken)

        localStorage.setItem("accesstoken", response.data.token);
        return response.data
        
    } catch (error:any) {
        const errormessage=error.response?.data?.message|| "login failed.."
        console.log(error)
        throw new Error(errormessage);
    }


}

const forgotPassword=async(emailData:string)=>{
  try {
    console.log("email is",emailData)
     const response=await trainerAxiosInstance.post(`${API_URL}/api/trainer/forgotpassword`,{emailData})
     console.log("the response from forgotpswd",response)
     return response.data
} catch (error) {
    console.log("Forgot Password Error",error)
}
}
const resetPassword=async(  userData:string,payload:string )=>{
  try {
   console.log("email is",payload)
   const response=await trainerAxiosInstance.post(`${API_URL}/api/trainer/resetpassword`,{payload,userData})
   console.log("frotend response got??",response)
   return response.data
  } catch (error) {
    console.log("error in ResetPassword",error)
  }
}

const verifyForgotOtp=async({ userData, otp,}:{userData:ITrainer;otp:string})=>{

  try{

   const response=await axios.post(`${API_URL}/api/trainer/forgototp`,{userData,otp})
   
   console.log("the frontend response otp",response)
   if(response.data){
       localStorage.setItem("user",JSON.stringify(response.data))
   }
   return response.data
  }catch(error:any){
      const errormessage=error.response?.data?.message
      console.log(error)
      throw new Error(errormessage);

  }

}
const kycStatus = async (trainer_id: string) => {
  console.log("request gone from servicefront")
  try {
    const response = await trainerAxiosInstance.get(`/api/trainer/kycStatus/${trainer_id}`);
    console.log("******service submickyc*******",response.data)
    return response.data;
  } catch (error: any) {
    console.error(
      "Error during KYC status fetching:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
const kycSubmission = async (formData: FormData) => {
  try {
    const response = await trainerAxiosInstance.post(`/api/trainer/trainers/kyc`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("yes............response data is",response.data)
    return response.data;
  } catch (error: any) {
    console.error(
      "Error kyc submission trainer:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};



  const TrainerService = {
    registerTrainer,
    verifyOtp,
    loginTrainer,
    forgotPassword,
    resetPassword,
    verifyForgotOtp,
    kycStatus,
    kycSubmission
  }

  export default TrainerService;

  