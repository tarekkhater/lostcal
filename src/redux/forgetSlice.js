import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showErrorAlert } from "../Components/alert&loader/alerts";


const initialState={
    loading:false,
    forgetPasswordSuccess:false,
    secretCodeSuccess:false,
    error:null
}

export const forgetPassword=createAsyncThunk("user/forgetPassword",async({email},{rejectWithValue})=>{
    try{
        // https://lostcal.onrender.com/api/user/forgetPassword
        const response = await axios.post("https://lostcal.onrender.com/api/user/forgetPassword",{email});
        return response.data;
    }catch(error){
        const errorMessages = error.response.data.message;
        return rejectWithValue(errorMessages);
    }
})

export const resetSecretCode=createAsyncThunk("user/resetSecretCode",async({resetCode},{rejectWithValue})=>{
    try{
        // https://lostcal.onrender.com/api/user/verifyResetCode
        const response =await axios.post("https://lostcal.onrender.com/api/user/verifyResetCode",{resetCode});
        return response.data;
    }catch(error){
        const errorMessages = error.response.data.message;
        return rejectWithValue(errorMessages);
    }
})

const forgetSlice=createSlice({
    name:"forget",
    initialState,
    reducers:{
        resetForgetSuccess:(state)=>{
            state.forgetPasswordSuccess=false;
        },
        restSecretCodeSuccess:(state)=>{
            state.secretCodeSuccess=false;
        }
    },
    extraReducers:(builder)=>{
        ////////////////////////////forgetPassword///////////////////////////////////////
        builder.addCase(forgetPassword.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(forgetPassword.fulfilled,(state)=>{
            state.loading=false;
            state.forgetPasswordSuccess=true;
            state.error=null;
        });
        builder.addCase(forgetPassword.rejected,(state,action)=>{
            state.loading=false;
            state.forgetPasswordSuccess=false;
            state.error=action.payload;
            showErrorAlert(state.error);
        })
        //////////////////////////////resetSecretCode//////////////////////////////////////////
        builder.addCase(resetSecretCode.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(resetSecretCode.fulfilled,(state)=>{
            state.loading=false;
            state.secretCodeSuccess=true;
            state.error=null;
        });
        builder.addCase(resetSecretCode.rejected,(state,action)=>{
            state.loading=false;
            state.secretCodeSuccess=false;
            state.error=action.payload;
            showErrorAlert(state.error)
        });
    }
});
export const {resetForgetSuccess,restSecretCodeSuccess}= forgetSlice.actions
export default forgetSlice.reducer