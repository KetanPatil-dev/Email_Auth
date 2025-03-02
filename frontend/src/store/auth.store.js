import {create } from "zustand";
import axios from "axios"

const API="http://localhost:5757/api/auth"
axios.defaults.withCredentials=true;
export const useAuthStore=create((set)=>({
    user:null,
    isAuthenticated:false,
    error:null,
    isLoading:false,
    isChekingAuth:true,
    signup: async (email, password, name) => {
        set({ isLoading: true, error: null }); // Reset error state before request
        try {
            const response = await axios.post(`${API}/signup`, { email, password, name });
    
            set({
                user: response.data.user,
                isAuthenticated: true,
                isLoading: false,
            });
        } catch (error) {
            console.error("Signup error:", error.response?.data || error.message);
            set({ error: error.response?.data?.message || "Signup failed", isLoading: false });
        }
    },
    verifyEmail:async (code)=>{
        set({isLoading:true,error:false})
        try {
            const response=await axios.post(`${API}/verify-email`,{code})
            set({user:response.data.user,isAuthenticated:true,isLoading:false})
            
        } catch (error) {
            console.error("Invalid code", error.message.response.data)
            set({error:error.response.data.message,isLoading:false})
        }

    },
    checkAuth:async ()=>{
        set({isChekingAuth:true,error:null});
        try {
            const response= await axios.get(`${API}/check-auth`)
            set({user:response.data.user,isAuthenticated:true,isChekingAuth:false})
            
        } catch (error) {
            console.error("Authentication Error", error.message.data)
        }

    }
}))