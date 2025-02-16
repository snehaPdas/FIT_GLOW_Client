import React, { ChangeEvent, useState } from 'react';
import { BsImage, BsSend } from "react-icons/bs";
import useSendMessage from '../../hooks/useSendMessage';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import { useSocketContext } from '../../context/socket';

interface MessageInputBarProps {
  userId?: string;
  onNewMessage: (message: any) => void;
}

function MessageInputBar({ userId, onNewMessage }: MessageInputBarProps) {
  const [message, setMessage] = useState('');
  const { sendMessage } = useSendMessage();
  const trainerToken = localStorage.getItem("trainer_access_token");
  const { socket } = useSocketContext();  // Get socket from context
  const { trainerInfo } = useSelector((state: RootState) => state.trainer);
  const [image, setImage] = useState<File | null>(null); // Image state
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Image preview state


  const validToken = trainerToken ?? ""; 

  const handleSendMessage = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    if (!message) return;

    const receiverId = userId ?? "defaultUserId";

    try {
      let imageUrl = null;

      // Upload image if selected
      if (image) {
        console.log("Uploading image:", image);
        imageUrl = await sendMessage({ message, receiverId, token: validToken, imageFile: image });
        if (!imageUrl) {
          console.error("Image upload failed");
        }
      } else {
        console.log("No image selected");
      }

      const newMessage = {
        message,
        receiverId,
        senderModel: "Trainer",
        createdAt: new Date().toISOString(),
        userId: trainerInfo.id,
        imageUrl, 
      };
   
      if (socket) {
        socket.emit("sendMessage", newMessage);  
      } else {
        console.error("Socket is not initialized");
      }

      onNewMessage(newMessage); 
      setMessage(""); 
      setImage(null); 
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setImage(selectedFile);
      const previewUrl = URL.createObjectURL(selectedFile); // Create preview URL
      setImagePreview(previewUrl);

      console.log("Selected file:", selectedFile);
    }
  };

  return (
    <form onSubmit={handleSendMessage} className="relative w-full flex gap-2 items-center">
  {/* Image Upload Button */}
  <label className="cursor-pointer flex items-center text-white">
    <BsImage className="text-xl" />
    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      className="hidden"
    />
  </label>

  <input
    onChange={(e) => setMessage(e.target.value)}
    value={message}
    type="text"
    className="border text-sm rounded-lg block w-full p-2.5 pr-10 bg-gray-700 border-gray-600 text-white"
    placeholder="Send a message"
  />
  
  {/* Image Preview */}
  {imagePreview && (
    <div className="mt-2">
      <img
        src={imagePreview}
        alt="Preview"
        className="w-24 h-24 object-cover rounded-md"
      />
    </div>
  )}

  {/* Send Button */}
  <button
    type="submit"
    className="ml-auto flex items-center text-white"
  >
    <BsSend />
  </button>
</form>

  );
}

export default MessageInputBar;
