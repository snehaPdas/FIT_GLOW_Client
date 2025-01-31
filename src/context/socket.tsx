import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";  
import { RootState } from "../app/store";

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
  const loggedUser = userInfo?.id || trainerInfo?.id || null;

  useEffect(() => {
        console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq")
    console.log("userInfo:", userInfo);
    console.log("trainerInfo:", trainerInfo);
    
    
    const loggedUser = userInfo?.id || trainerInfo?.id;

    if (!loggedUser) {
      console.warn("No loggedUser; skipping socket initialization.");
      setSocket(null); 
      return;
    }

    console.log("Initializing socket for loggedUser:", loggedUser);

    const newSocket: SocketType = io("http://localhost:3000", {
      query: { userId: loggedUser },
      transports: ["websocket"],
      reconnectionAttempts: 5
    });

    console.log("🔄 Attempting socket connection...");


    newSocket.on("connect", () => {
      console.log("???????????????????????????")
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

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};
