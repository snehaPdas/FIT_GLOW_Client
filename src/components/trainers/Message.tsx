import React from 'react';
import { formatTime } from '../../util/timeAndPriceUtils';
import userimg from "../../assets/profieicon.png"

interface MessageProps {
    message: string;
    sender: 'User' | 'Trainer';
    time: string;
    userImage: string | undefined;
    trainerImage: string | undefined;
  }
function Message({ sender, message, time, userImage, trainerImage }: MessageProps) {
    console.log("/////////////////////>>>>>>>>>>>>.message",message)
  return (
    <div className={`chat ${sender === 'Trainer' ? 'chat-end' : 'chat-start'}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt={userimg} src={sender === 'User' ? userImage : trainerImage} />
        </div>
      </div>

      <div className={`chat-bubble text-white ${sender === 'Trainer' ? 'bg-[#925f8c]' : 'bg-gray-500'}`}>
        {message}
      </div>

      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formatTime(time)}
      </div>
    </div>
  );
}

export default Message;
