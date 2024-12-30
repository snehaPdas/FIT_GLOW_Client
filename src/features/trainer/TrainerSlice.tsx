import {createSlice,PayloadAction} from "@reduxjs/toolkit"
import{
    registerTrainer,
    loginTrainer,
    verifyForgotOtp
} from "../../actions/TrainerAction"

interface TrainerState{
    trainerInfo:null|any,
    loading:null|any
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
    error:null
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
          })
          .addCase(registerTrainer.fulfilled, (state, action: PayloadAction<any>) => {
            
            state.trainerInfo = action.payload;
            
        
          })
          .addCase(registerTrainer.rejected, (state, action: PayloadAction<any>) => {
        
        
            console.log('acion',action.payload);
          })  
          .addCase(loginTrainer.pending, (state) => {
            
            
          })
          .addCase(loginTrainer.fulfilled, (state, action: PayloadAction<any>) => {
            
            state.trainerInfo = action.payload.trainer
            console.log("_______trainerinfo", state.trainerInfo)
           // state.trainerToken = action.payload.token;
            localStorage.setItem("trainer", JSON.stringify(action.payload.trainer));
            localStorage.setItem("trainer_access_token", action.payload.token);
          })
          .addCase(loginTrainer.rejected, (state, action: PayloadAction<any>) => {
           
            
          })

    }
})
export const { clearTrainer,  } = trainerSlice.actions;
export default trainerSlice.reducer;
