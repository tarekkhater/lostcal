import { configureStore  } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import lostSlice from "./lostSlice";
import addSlice from "./addSlice";
import patchSlice from "./patchSlice";
import forgetSlice from "./forgetSlice";
import matchesSlice from "./matchesSlice";
const store=configureStore({
    reducer:{
        user:authSlice,
        lost:lostSlice,
        add:addSlice,
        patch:patchSlice,
        forget:forgetSlice,
        matches:matchesSlice,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
        // Specify additional middleware options here
        serializableCheck: false, // Disable serializable check if needed
        immutableCheck: false, // Disable immutable state invariant check if needed
        });
    },
})
export default store