import { toast } from "react-toastify";
import { create } from "zustand";
import axios from "axios";

const BASE_URL = "http://localhost:9090/api/auth";
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  error: null,
  isLoading: false,
  isAuthenticated: false,
  user: null,
  isCheckingAuth: true,

  signup: async (data) => {
    try {
      set({ isLoading: true, error: null });

      const res = await axios.post(`${BASE_URL}/signup`, data);
      set({ user: res.data.userData, isAuthenticated: true, isLoading: false });
      toast.success("Account Created Successfully");
    } catch (error) {
      set({
        error: error.response.data.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },
  login: async (data) => {
    try {
      set({ isLoading: true, error: null });
      const res = await axios.post(`${BASE_URL}/login`, data);
      set({ user: res.data.userData, isAuthenticated: true, isLoading: false });
      toast.success("Login Successful");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid Crediantials");
    } finally {
      set({ isLoading: false });
    }
  },
  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true, error: null });
      const res = await axios.get(`${BASE_URL}/check-auth`);

      set({ user: res.data.user, isAuthenticated: true });
    } catch (error) {
      set({ isCheckingAuth: false });
      console.log(error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  logout: async () => {
    try {
      set({ isLoading: true });
      await axios.post(`${BASE_URL}/logout`);
      set({ user: null, isAuthenticated: false, isLoading: false });
      toast.success("Logout Successful");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  },
  forgotPassword: async (email) => {
    try {
      set({ isLoading: true });
      await axios.post(`${BASE_URL}/forgot-password`, { email });
      set({ isLoading: false });
      toast.success("Reset Link is sent to your email");
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
  resetPassword: async (token, password) => {
    try {
      set({ isLoading: true });
      const res = await axios.post(`${BASE_URL}/reset-password/${token}`, {
        password,
      });
      set({ user: res.data.userData, isAuthenticated: true });
      toast.success("Password Reset Successfully, Redirecting to HomePage...");
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
  verifyEmail: async (code) => {
    try {
      set({ isLoading: true, error: null });
      const res = await axios.post(`${BASE_URL}/verify-email`, { code });
      set({
        user: res.data.userData,
        isAuthenticated: true,
        isLoading: false,
      });

      return true;
      
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
