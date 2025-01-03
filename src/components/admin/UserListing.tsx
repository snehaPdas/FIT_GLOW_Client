import React from 'react'
import adminAxiosInstance from '../../../axios/adminAxiosInstance'
import { useEffect,useState } from 'react'
import {User} from "../../types/user"


function UserListing() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(()=>{
        const fetchData=async()=>{
        try {
         const response=await adminAxiosInstance.get(`/api/admin/users`)
        setUsers(response.data.users)
            
        } catch (error) {
            console.log("Error in fextch datas",error)
        }
    }
        fetchData() 
    },[])

    const handleBlockUnblock=async(userId:string,currentStatus:boolean)=>{
         try {
            const response=await adminAxiosInstance.patch(`/api/admin/${userId}/block-unblock`,{status:!currentStatus})
            if(response.status===200 && response.data){
                const updatedUserStatus = response.data.data
                console.log("updated state is..........",updatedUserStatus)
                setUsers((prevUsers)=>
                    prevUsers.map((user)=>
                        user._id===userId?{...user,isBlocked:updatedUserStatus}:user
                    )
                )

            }else{
                console.error("fialed to update state")
            }
         } catch (error) {
            console.log("Error in block-unblock of user",error)
         }
    }

  return (
    

    <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
    <table className="w-full table-fixed">
        <thead>
            <tr className="bg-gray-100">
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Name</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Email</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Phone</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Status</th>
            </tr>
        </thead>
        <tbody className="bg-white">
            {
            users.length>0?(
                users.map((user)=>(
            <tr key={user.id}>
                <td className="py-4 px-6 border-b border-gray-200">{user.name}</td>
                <td className="py-4 px-6 border-b border-gray-200 truncate">{user.email}</td>
                <td className="py-4 px-6 border-b border-gray-200">{user.phone}</td>
                <td className="py-4 px-6 border-b border-gray-200">
                <div className={`${user.isBlocked ? 'font-medium text-red-500 pr-2' : 'font-medium text-[#86b979]'}`}>
                {user.isBlocked ? "[Blocked]" : "[Active]"}
                     </div>
                   < button
                     onClick={()=>handleBlockUnblock(user._id,user.isBlocked)}
                        className={`text-white py-1 px-2 rounded-lg text-sm   ${user.isBlocked?"bg-[#82d895]":"bg-[#451940]"}`}>
                             {user.isBlocked ? "Unblock" : "Block"}
                      
                     </button>
                
            
                </td>
                
            </tr>
            ))
        ):(
            <tr>
      <td colSpan={4}>No users found.</td>
    </tr>
            )}
  
        </tbody>
    </table>
</div>
  )
}

export default UserListing
