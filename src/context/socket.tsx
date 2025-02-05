import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import  io  from "socket.io-client";
import { AppDispatch, RootState } from "../app/store";
import { endCallTrainer,setVideoCall, setShowVideoCall, setRoomId ,} from "../features/trainer/TrainerSlice";
import { setShowIncomingVideoCall } from "../features/user/userSlice";
import { useDispatch } from "react-redux";


type SocketType = ReturnType<typeof io>; 

interface SocketContextType {
  socket: SocketType | null;
}

const SocketContext = createContext<SocketContextType>({ socket: null });

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [socket, setSocket] = useState<SocketType | null>(null);
  const { userInfo } = useSelector((state: RootState) => state.user);
  const { trainerInfo } = useSelector((state: RootState) => state.trainer);
  const dispatch = useDispatch<AppDispatch>();
  const loggedUser = userInfo?.id || trainerInfo?.id || null;


  let newSocket: SocketType = io("http://localhost:3000", {
    query: { userId: loggedUser },
    transports: ["websocket"],
    reconnectionAttempts: 5
  });
  useEffect(() => {
        console.log("#####################here in socket......")
    console.log("userInfo:", userInfo);
    console.log("trainerInfo:", trainerInfo);
    
    
    const loggedUser = userInfo?.id || trainerInfo?.id;
console.log('loggedUser',loggedUser);

    if (!loggedUser) {
      console.warn("No loggedUser; skipping socket initialization.");
      setSocket(null); 
      return;
    }

    console.log("Initializing socket for loggedUser:", loggedUser);

    

    console.log("🔄 Attempting socket connection...");


    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
      setSocket(newSocket);
      
    });

    // Cleanup function
    return () => {
      console.log("Cleaning up socket...");
      newSocket.disconnect();
      setSocket(null);
    };
  }, [userInfo, trainerInfo]);

  useEffect(()=>{
    if (!socket) {
      console.warn("Socket instance is null; skipping event listener setup.");
      return;
    }

    newSocket.on("incoming-video-call", (data: any) => {
      console.log("Incoming video call:", data);
      dispatch(
        setShowIncomingVideoCall({
          _id: data._id,
          trainerId: data.from,
          callType: data.callType,
          trainerName: data.trainerName,
          trainerImage: data.trainerImage,
          roomId: data.roomId,
        })
      );
    });
  })
  
  
  
  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};
