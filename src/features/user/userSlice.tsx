import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registerUser, verifyOtp, GoogleLogins,loginUser} from "../../actions/userActio"; // Fixed typo in import statement
import { User } from "../../features/user/userTypes";

interface UserState {
  userInfo: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userInfo: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    
    setUser: (state, action: PayloadAction<User | null>) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register User Actions
      .addCase(registerUser.fulfilled, (state, action) => {
        
        state.userInfo = action.payload; 
        state.loading = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true; 
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string; 
      })
       .addCase(loginUser.fulfilled,(state,action)=>{
        state.userInfo=action.payload.data.user
        console.log("vanno??",state.userInfo)
        state.loading = false;
       })
       .addCase(loginUser.pending,(state)=>{
        state.loading = true; 

       })
       .addCase(loginUser.rejected,(state,action)=>{
        state.loading = false
        state.error = action.payload as string;
       })
      
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.userInfo = action.payload; 
        state.loading = false;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true; 
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false; 
        state.error = action.payload as string; 
      })
      .addCase(GoogleLogins.pending, (state) => {
        state.loading = true;
      })
      .addCase(GoogleLogins.fulfilled, (state, action:PayloadAction<User |null>) => {
        state.userInfo = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(GoogleLogins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
  
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
