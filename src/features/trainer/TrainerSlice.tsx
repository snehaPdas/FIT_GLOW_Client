import {createSlice,PayloadAction} from "@reduxjs/toolkit"
import{
    registerTrainer,
    loginTrainer,
    verifyForgotOtp,
    submitKyc,
    getKycStatus
} from "../../actions/TrainerAction"


interface TrainerState{
    trainerInfo:null|any,
    loading:null|any
    kycStatus: string;


    // trainerToken:null |any,
   // specializations:null|any
    error:null|any
}

const trainer = localStorage.getItem("trainer");
console.log("--->>------->>>",trainer)
//const parsedTrainer = trainer ? JSON.parse(trainer) : null;
const parsedTrainer = trainer && trainer !== "undefined" ? JSON.parse(trainer) : null;


const initialState:TrainerState={
    trainerInfo:parsedTrainer,
    loading:false,
    error:null,
    kycStatus: "pending",

    // trainerToken:localStorage.getItem("trainer_access_token") || null,
    // specializations: [],

}
const trainerSlice=createSlice({
    name: "trainer",
    initialState,
    reducers:{
        clearTrainer(state) {
            state.trainerInfo = null;
            //state.trainerToken = null;
            //state.specializations = [];
            
          },
          
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerTrainer.pending, (state) => {
          state.loading=true

          })
          .addCase(registerTrainer.fulfilled, (state, action: PayloadAction<any>) => {
            
            state.loading=false
            state.trainerInfo = action.payload;
            
        
          })
          .addCase(registerTrainer.rejected, (state, action: PayloadAction<any>) => {
        
            state.loading=false

            console.log('acion',action.payload);
          })  
          .addCase(loginTrainer.pending, (state) => {
            state.loading=true

            
          })
          .addCase(loginTrainer.fulfilled, (state, action: PayloadAction<any>) => {
            
            state.loading=false

            state.trainerInfo = action.payload.trainer
            console.log("_______trainerinfo", state.trainerInfo)
           // state.trainerToken = action.payload.token;
            localStorage.setItem("trainer", JSON.stringify(action.payload.trainer));
            localStorage.setItem("trainer_access_token", action.payload.token);
          })
          .addCase(loginTrainer.rejected, (state, action: PayloadAction<any>) => {
            state.loading=false

            
          })
          .addCase(submitKyc.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          //////////////////////////
          .addCase(submitKyc.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
          
            console.log('submitt kyc',action.payload);
            
            state.error = null;
          })
          .addCase(submitKyc.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
        
          })
          .addCase(getKycStatus.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getKycStatus.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.kycStatus = action.payload.kycStatus;
            console.log('get kyc',action.payload.kycStatus);
            
            state.error = null;
          })
          .addCase(getKycStatus.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload?.message || "OTP verification failed";
          })

    }
})
export const { clearTrainer,  } = trainerSlice.actions;
export default trainerSlice.reducer;
