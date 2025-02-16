import { useState } from "react";
import axios from "axios";
import API_URL from "../../axios/API_URL";

interface SendMessageParams {
  message: string;
  receiverId: string;
  token: string;
  imageFile?: File
}


const useSendMessage = () => {
  
const CLOUDINARY_UPLOAD_URL=import.meta.env.VITE_CLOUDINARY_UPLOAD_URL
const CLOUDINARY_UPLOAD_PRESET=import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET



   const [loading, setLoading] = useState(false);
   

  const uploadImage = async (file: File) => {
    console.log("Uploading Image Function Called"); // Check if this runs

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    console.log("Uploading Image...");
  console.log("Cloudinary URL:", CLOUDINARY_UPLOAD_URL);
  console.log("Upload Preset:", CLOUDINARY_UPLOAD_PRESET);
  console.log("FormData Entries:", [...formData]); // Logs key-value pairs


    try {
      const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData);
      const imageUrl = response.data.secure_url;
      console.log("Image uploaded successfully, URL: ", imageUrl); // Check if this URL is valid

      return imageUrl
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      return null;
    }
  };

  const sendMessage = async ({ message, receiverId, token,imageFile }: SendMessageParams) => {
    setLoading(true);

  console.log("sendMessage function called");
  console.log("imageFile:", imageFile);
    try {
      let imageUrl: string | null = null; 
      if (imageFile) {
        // Assuming uploadImage is a function that uploads the image and returns a URL
        const imageUrl = await uploadImage(imageFile);
        return imageUrl;
      }

      const response = await axios.post(`${API_URL}/api/messages/send`, {
        message, 
        receiverId,
       token,
       imageUrl,

      });

      // Handle response here if needed
      return response.data; // Return response to handle in the component

    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setLoading(false);
    }
  };
   
  return { sendMessage, loading };
};


export default useSendMessage;


