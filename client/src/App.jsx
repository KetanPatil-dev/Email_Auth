import { Navigate, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import FloatingShapes from "./components/FloatingShapes";
import HomePage from "./pages/HomePage";
import { ToastContainer } from "react-toastify";
import { useAuthStore } from "./store/useAuthStore";

import { Loader } from "lucide-react";
import VerifyEmail from "./pages/VerifyEmail";
import { useEffect } from "react";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const { checkAuth,user } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-600 via-orange-500 to-red-800 flex-items-center justify-center overflow-hidden">
      <ToastContainer position="top-center" />
      <FloatingShapes
        color="bg-red-800"
        size="w-64 h-64"
        top="-6%"
        left="10%"
        delay={0}
      />
      <FloatingShapes
        color="bg-orange-800"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={0}
      />
      <FloatingShapes
        color="bg-line-500"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={0}
      />
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/login" replace />}/>
    
        <Route
          path="/signup"
          element={!user ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route path="/verify-email" element={(user && !user?.isVerified)?<VerifyEmail />:<Navigate to="/" replace/>} />
        <Route path="/forgot-password" element={!user?<ForgotPassword/>:<Navigate to="/" replace/>}/>
        <Route path="/reset-password/:token" element={!user?<ResetPassword/>:<Navigate to="/" replace/>}/>
        <Route path="*" element={user?<HomePage/>:<Navigate to="/login"/>} />
      </Routes>
    </div>
  );
}

export default App;
