import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {showErrorAlert, showSuccessAlert} from "../Components/alert&loader/alerts";

const tokenFromLocalStorage=localStorage.getItem('token');
const initialState={
    token: tokenFromLocalStorage || null,
    loading: false,
    success:false,
    error: null,
    data:[]
}
export const signupUser=createAsyncThunk("user/signupUser",async ({username,email,password,passwordConfirm},{rejectWithValue})=>{
    // https://lostcal.onrender.com/api/user/signup/signup
    return await axios.post("https://lostcal.onrender.com/api/user/signup",{
        username,
        email,
        password,
        passwordConfirm
    },{
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        }
    }).then((res)=>{
        return res.data
    })
    .catch((error)=>{
        return rejectWithValue(error.response.data.message);
    });
});
export const loginUser=createAsyncThunk("user/loginUser",async ({email,password},{rejectWithValue})=>{
    // https://lostcal.onrender.com/api/user/login
    return await axios.post("https://lostcal.onrender.com/api/user/login",{
        email,
        password
    },{
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
    }).then((res)=>{
        return res.data
    }).catch((error)=>{
        return rejectWithValue(error.response.data.message);
    });
} );


export const getUserInfo=createAsyncThunk("user/getUserInfo",async (token,{rejectWithValue})=>{
    // https://lostcal.onrender.com/api/user/profile
    return await axios.get("https://lostcal.onrender.com/api/user/profile",{
        headers:{
            Authorization:`Bearer ${token}`,
        },
    }).then((res)=>{
        return res.data;
    }).catch((error)=>{
        return rejectWithValue(error.response.data.message);
    })
})

export const logoutUser=createAsyncThunk("user/logoutUser",async (token,{rejectWithValue})=>{
    //https://lostcal.onrender.com/api/user/logout
    return await axios.get("https://lostcal.onrender.com/api/user/logout",{
        headers:{
            Authorization:`Bearer ${token}`,
        },
    }).then((res)=>{
        return res.data;
    }).catch((error)=>{
        return rejectWithValue(error.response.data.message);
    })
})

export const updatePassword=createAsyncThunk("user/updatePassword",async({passwordCurrent,password,passwordConfirm,token},{rejectWithValue})=>{
    try{
        // https://lostcal.onrender.com/api/user/updateMyPassword
        const response = await axios.patch("https://lostcal.onrender.com/api/user/updateMyPassword",{
            passwordCurrent,
            password,
            passwordConfirm
        },{
            headers:{
                Authorization : `Bearer ${token}`
            }
        });
        return response.data;
    }catch(error){
        const errorMessages = error.response.data.message;
        return rejectWithValue(errorMessages);
    }
})

export const resetPassword=createAsyncThunk("user/resetPassword",async({email,newPassword,passwordConfirm},{rejectWithValue})=>{
    try{
        // https://lostcal.onrender.com/api/user/resetPassword
        const response = await axios.put("https://lostcal.onrender.com/api/user/resetPassword",{
            email,
            newPassword,
            passwordConfirm
        });
        return response.data;
    }catch(error){
        const errorMessages = error.response.data.message;
        return rejectWithValue(errorMessages);
    }
})
const setLoading = (loading) => ({ type: 'user/setLoading', payload: loading });

const authSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setLoading:(state,action)=>{
            state.loading=action.payload;
        },
        resetSuccess:(state)=>{
            state.success=false;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(signupUser.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(signupUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.token=action.payload.token;
            state.data=action.payload.data
            localStorage.setItem('token',action.payload.token)
            // showSuccessAlert('Signup successful!');
        });
        builder.addCase(signupUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
            showErrorAlert(state.error);
        });

        //////////////////////////login////////////////////////////
        builder.addCase(loginUser.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.token=action.payload.token;
            state.data=action.payload.data?.user;
            localStorage.setItem('token',action.payload.token)
            // showSuccessAlert('Login successful!');
        });
        builder.addCase(loginUser.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.payload;
            showErrorAlert(state.error);
        })
        /////////////////////////////getUserInfo///////////////////////////////
        builder.addCase(getUserInfo.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(getUserInfo.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
            state.data=action.payload;
        });
        builder.addCase(getUserInfo.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
            state.data=[];
        })
        //////////////////////////////UpdatePassword///////////////////////////////////////////
        builder.addCase(updatePassword.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(updatePassword.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=true;
            state.token=action.payload.token;
            state.data=action.payload.data;
            state.error=null;
            showSuccessAlert("Your Lost Person's data Updated Successfully ");
            localStorage.setItem('token',action.payload.token)
        });
        builder.addCase(updatePassword.rejected,(state,action)=>{
            state.loading=false;
            state.success=false;
            state.error=action.payload;
            showErrorAlert(state.error);
        });
        ////////////////////////////resetPassword/////////////////////////////////////////////////
        builder.addCase(resetPassword.pending,(state)=>{
            state.loading = true;
        });
        builder.addCase(resetPassword.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=true;
            state.token=action.payload.token;
            state.data=action.payload.data;
            state.error=null;
            localStorage.setItem('token',action.payload.token)
        });
        builder.addCase(resetPassword.rejected,(state,action)=>{
            state.loading = false;
            state.success = false;
            state.error=action.payload;
        });
        ////////////////////////////logout///////////////////////////////////
        builder.addCase(logoutUser.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(logoutUser.fulfilled,(state)=>{
            state.loading=false;
            state.success=true;
            state.data=[];
            state.token=null;
            state.error=null;
            showSuccessAlert("logged out successfully");
            localStorage.removeItem('token');
        });
        builder.addCase(logoutUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
})


export const {resetSuccess} = authSlice.actions
export default authSlice.reducer