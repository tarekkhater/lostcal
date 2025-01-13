import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState={
    loading:false,
    data:[],
    error:null
}

export const allMatches=createAsyncThunk("matches/allMatches",async(token)=>{
    try{
        //https://lostcal.onrender.com/api/mylost/allMatches
        const response = await axios.get("https://lostcal.onrender.com/api/mylost/allMatches",{  
        headers:{
            Authorization:`Bearer ${token}`
        }
        })
        return response.data.allMatches;
    }catch(error){
        const errorMessages = error.response.data.message;
        return rejectWithValue(errorMessages);
    }
})
const matchesSlice=createSlice({
    name:"matches",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(allMatches.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(allMatches.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload;
        });
        builder.addCase(allMatches.rejected,(state,action)=>{
            state.loading=false;
            state.data=[];
            state.error=action.payload;
        })
    }
})

export default matchesSlice.reducer;