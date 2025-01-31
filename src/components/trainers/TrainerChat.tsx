import React from 'react'
import trainerAxiosInstance from '../../../axios/trainerAxiosInstance';
import {User} from "../../types/user"
import { FaVideo, FaHistory } from "react-icons/fa";
import MessageInputBar from './MessageInputBar';
import userimg from "../../assets/profieicon.png"
import useGetMessage from '../../hooks/useGetMessage';
import MessageSkeleton from "../../skelton/MessageSkelton";
import { Trainer } from '../../types/trainer';
import { AppDispatch, RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import Message from "./Message";
import { useEffect, useRef, useState } from 'react';


interface TrainerChatProps {
    userId: string;
    bookingId: string | null; 
  }

function TrainerChat({ userId, bookingId }:TrainerChatProps) {
    console.log("useid issssssssss",userId)
    console.log("bookingId issssssssss",bookingId)
      const trainerToken=localStorage.getItem("trainer_access_token")
      const {  trainerInfo } = useSelector((state: RootState) => state.trainer);

    const [userData, setUserData] = useState<User | null>(null);
    const { messages, loading } = useGetMessage(trainerToken!, userId!);
    const [trainerData, setTrainerData] = useState<Trainer | null>(null);
    const [booking_id, setBooking_id] = useState<string | null>(null);


    const [localMessages, setLocalMessages] = useState(messages);


    const messagesEndRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      setBooking_id(bookingId)
    },[userId])
  
  
    useEffect(() => {
        console.log("********")
        const fetchUserDetails = async () => {
          const response = await trainerAxiosInstance.get(`/api/trainer/users/${userId}`);
          setUserData(response.data);
        };
        fetchUserDetails();
      }, [userId]);
      useEffect(() => {
        console.log("?????????????")
        const fetchTrainer = async () => {
          const response = await trainerAxiosInstance.get(`/api/trainer/${trainerInfo.id}`);
          setTrainerData(response.data.trainerData[0]);
        };
        fetchTrainer();
      }, [trainerInfo.id, userId]);

      const handleNewMessage = (newMessage: any) => {
        console.log(">>>>>>>>>>>>>",newMessage)
        setLocalMessages((prevMessages) => [...prevMessages, newMessage]); // Instant UI update
      };


      useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [localMessages]);
      useEffect(() => {
        setLocalMessages(messages);
      }, [messages]);
      console.log("local trainerData trainer issssssssss",trainerData)
      console.log("local messageeeeeeee",localMessages)
    
  return (
     <div className="w-full lg:max-w-full md:max-w-[450px] flex flex-col h-[82vh] ">
      <div className=" bg-gray-500 px-4 py-2 mb-2 h-14 flex justify-between sticky top-0 z-10">
        <div className="flex items-start gap-5">
          <img className="h-10 w-10 rounded-full" src={userimg} alt={userimg} />
          <h1 className="text-lg text-white font-medium">{userData?.name}</h1>
        </div>
     </div>
     

     <div className="px-4 flex-1 overflow-y-auto mt-2 overflow-x-hidden ">
        {
        // loading ? (
        //     <div><MessageSkeleton /></div>
        // ) : (
          localMessages.map((msg, index) => (
            <Message
              key={index}
              sender={msg?.senderModel ? (msg.senderModel.charAt(0).toUpperCase() + msg.senderModel.slice(1)) as 'User' | 'Trainer' : 'User'}
              message={msg.message}
              time={new Date(msg.createdAt).toLocaleTimeString()}
              userImage={userData?.image}
              trainerImage={trainerData?.profileImage}
            />
          ))
        // )
        }
        <div ref={messagesEndRef} />
      </div>

      <div className="px-4 py-2 border-t border-gray-700 bg-gray-800 ">
        <MessageInputBar userId={userId} onNewMessage={handleNewMessage} />
      </div>

 
    </div>
  )
}

export default TrainerChat
