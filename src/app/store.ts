import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice"
import trainerReducer from "../features/trainer/TrainerSlice"

const store=configureStore({
    reducer:{
        user:userReducer,
        trainer:trainerReducer
    }
})

export default store

export type RootState=ReturnType<typeof store.getState>
export type AppDispatch =typeof store.dispatch