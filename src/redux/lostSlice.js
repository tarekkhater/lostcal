import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showErrorAlert, showSuccessAlert } from "../Components/alert&loader/alerts";

const initialState={
    loading:false,
    success:false,
    error:null,
    data:[],
};
export const findTheLost = createAsyncThunk("lost/findTheLost",async ({ formData, token }, { rejectWithValue }) => {
        try {
            // https://lostcal.onrender.com/api/mylost
            const response = await axios.post("https://lostcal.onrender.com/api/mylost",formData,
                {
                    headers: {
                        Authorization:`Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
        );
        return response.data;
        } catch (error) {
            const errorMessages = error.response.data.message;
            return rejectWithValue(errorMessages);
        }
    }
);


export const searchForLost=createAsyncThunk("lost/searchForLost",async({nameToSearch,token},{rejectWithValue})=>{
    try{
        // https://lostcal.onrender.com/api/mylost/search?name=${nameToSearch}
        const response=await axios.get(`https://lostcal.onrender.com/api/mylost/search?name=${nameToSearch}`,{
            headers:{
                Authorization:`Bearer ${token}`,
            }
        });
        return response.data.result;
    }catch(error){
        const errorMessages = error.response.data.message;
        return rejectWithValue(errorMessages);
    }
})

export const getLost=createAsyncThunk("lost/getLost",async(token,{rejectWithValue})=>{
    try{
        // https://lostcal.onrender.com/api/mylost
        const response=await axios.get("https://lostcal.onrender.com/api/mylost",{
            headers:{
                Authorization:`Bearer ${token}`,
            }
        });
        return response.data.result;
    }catch(error){
        const errorMessages = error.response.data.message;
        return rejectWithValue(errorMessages);
    }
})

export const deleteLost=createAsyncThunk("lost/deleteLost",async({id,token},{rejectWithValue})=>{
    try{
        // https://lostcal.onrender.com/api/mylost/${id}
        const response=await axios.delete(`https://lostcal.onrender.com/api/mylost/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`,
            }
        });
        return response.data;
    }catch(error){
        const errorMessages = error.response.data.message;
        return rejectWithValue(errorMessages);
    }
})

const lostSlice=createSlice({
    name:"lost",
    initialState,
    reducers:{
        resetLostSuccess:(state)=>{
            state.success=false;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(findTheLost.pending,(state)=>{
            state.loading=true;
            state.error = null;
            state.success = false;
        });
        builder.addCase(findTheLost.fulfilled,(state)=>{
            state.loading=false;
            state.success=true;
            state.error=null;
            showSuccessAlert("Add Your Lost's Person Data Successfully ");
        });
        builder.addCase(findTheLost.rejected,(state,action)=>{
            state.loading=false;
            state.success=false
            state.error=action.payload;
            showErrorAlert(state.error);
        });
        ///////////////////////////////Search////////////////////////////////////
        builder.addCase(searchForLost.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(searchForLost.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=true
            state.error=null;
            state.data=action.payload;
        });
        builder.addCase(searchForLost.rejected,(state,action)=>{
            state.loading=false;
            state.success=false;
            state.error=action.payload;
            state.data=[];
        });
        ///////////////////////////////getLost///////////////////////////////////
        builder.addCase(getLost.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(getLost.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=true;
            state.error=null;
            state.data=action.payload;
            //  state.data = Array.isArray(action.payload) ? action.payload : []; 
        });
        builder.addCase(getLost.rejected,(state,action)=>{
            state.loading=false;
            state.success=false;
            state.error=action.payload;
            state.data=[];
        });
        ///////////////////////////////deleteLost////////////////////////////////////////
        builder.addCase(deleteLost.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(deleteLost.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=true;
            state.error=null;
            state.data=state.data.filter(card=> card.id !== action.payload);
        });
        builder.addCase(deleteLost.rejected,(state,action)=>{
            state.loading=false;
            state.success=false;
            state.error=action.payload;
        })
        
    }
});
export const {resetLostSuccess} =lostSlice.actions;
export default lostSlice.reducer;