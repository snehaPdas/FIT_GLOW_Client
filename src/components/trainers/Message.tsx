import React from 'react';
import { formatTime } from '../../util/timeAndPriceUtils';
import userimg from "../../assets/profieicon.png";

interface MessageProps {
  message: string;
  sender: 'User' | 'Trainer';
  time: string;
  userImage: string | undefined;
  trainerImage: string | undefined;
  imageUrl?: string;  // Optional prop for image URL
}

function Message({ sender, message, time, userImage, trainerImage, imageUrl }: MessageProps) {
  console.log("image url issssssssss",imageUrl)
  // Check if the message contains an image URL, use imageUrl prop for this
  const isImageMessage = imageUrl && (imageUrl.endsWith('.jpg') || imageUrl.endsWith('.png') || imageUrl.endsWith('.jpeg'));
  console.log("Image URL??????????????/:", imageUrl);  // Debug the image URL being passed

  return (
    <div className={`chat ${sender === 'Trainer' ? 'chat-end' : 'chat-start'}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="profile" src={sender === 'User' ? userImage || userimg : trainerImage} />
        </div>
      </div>

      <div className={`chat-bubble text-white ${sender === 'Trainer' ? 'bg-[#925f8c]' : 'bg-gray-500'}`}>
        {isImageMessage ? (
          // If it's an image, display the image
          <img src={imageUrl} alt="Uploaded" className="max-w-full h-auto rounded" />
        ) : (
          // If it's a text message, display the text
          message
        )}
      </div>

      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formatTime(time)}
      </div>
    </div>
  );
}

export default Message;
