import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { useNavigate } from "react-router-dom";
import login_img from "../../assets/login_back.jpg"
import { loginUser, GoogleLogins } from "../../actions/userActio";
import { Toaster, toast } from "react-hot-toast";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const loginData = { email, password };
      console.log("Login data:", loginData);
      const action = await dispatch(loginUser(loginData));
      if (loginUser.rejected.match(action)) {
        let  errorMessage = action.payload as string;
        console.log("error messagee",errorMessage) ;
        toast.error(errorMessage);
        return;
      }
      
    
      // if(loginUser.message==="user is blocked"){

      // }

      navigate("/");
    } catch (error: any) {
      console.log("wwwwwww???",error)
      if (error.response) {
        console.error("Error in login user data", error);
        toast.error("Something went wrong, try again later");
      }
    }
  };

  const handleGoogleResponse = async (response: CredentialResponse) => {
    const token = response.credential;
    if (token) {
      dispatch(GoogleLogins(token)).then((response: any) => {
        if (response.meta.requestStatus !== "rejected") {
          navigate("/");
        }
      });
    }
  };

  const handleGoogleError = () => {
    console.error("Google login failed");
  };

  return (
    <div
    className="flex justify-center items-center h-screen p-10 bg-cover bg-center"
    style={{
      backgroundImage: `url(${login_img})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
    >
      {/* <div className="grid md:grid-cols-2 grid-cols-1 border rounded-3xl shadow-lg w-[90%] max-w-[800px] overflow-hidden"> */}
        
      <div className="bg-white bg-opacity-60 p-10 rounded-3xl shadow-lg w-[90%] max-w-[400px]">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
            <h1 className="text-center text-[#572c5f] font-bold text-4xl mb-6">
              User Login
            </h1>
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white border outline-none rounded-md py-3 w-full px-4 mb-3 focus:ring-2 focus:ring-[#572c5f] transition-all duration-300 shadow-sm hover:shadow-lg"
            />
            <input
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white border outline-none rounded-md py-3 w-full px-4 mb-3 focus:ring-2 focus:ring-[#572c5f] transition-all duration-300 shadow-sm hover:shadow-lg"
            />
            <button
              type="submit"
              className="bg-[#572c5f] hover:bg-[#6b3b70] text-white font-semibold py-3 rounded-md w-full transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              Login
            </button>
            <p className="text-center mt-4 text-sm">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="hover:underline text-[#572c5f] font-medium"
              >
                Sign Up
              </a>
            </p>
            <p className="text-center mt-4"><a href="/forgot-password"  className="text-[#572c5f] hover:underline">Forgot Password?</a></p>

            <div className="mt-6 flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleResponse}
                onError={handleGoogleError}
                //className="w-full hover:shadow-md transform hover:scale-105 transition-all duration-300"
              />
            </div>
          </form>
        </div>

        {/* RightSide - Image */}
        <div className="bg-white flex justify-center items-center">
          {/* <img
            src={login_img}
            alt="Login"
            className="rounded-3xl w-full h-full object-cover"
          /> */}
        </div>
      </div>
    // </div>
  );
};

export default Login;
