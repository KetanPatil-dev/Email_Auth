import { Navigate, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerification from "./pages/EmailVerification"
import { useAuthStore } from "./store/auth.store";
import { checkAuth } from "../../backend/controllers/auth.controller";
import { useEffect } from "react";
import DashBoardPage from "./pages/DashBoardPage";
const RedirectAuthenticatedUser=({children})=>{
  const {isAuthenticated,user}=useAuthStore()
  if(isAuthenticated && user.isVerified)
    return <Navigate to="/" replace/>
    return children;
}
const ProtectedRoute=({children})=>{
  const {isAuthenticated,user}=useAuthStore()
  if(!isAuthenticated)
  return <Navigate to="/login" replace/>
  if(!user.isVerified)
    return <Navigate to="/verify-email" replace/>
    return children;

}

function App() {
  const {isCheckingAuth,checkAuth,isAuthenticated,user}=useAuthStore();

   useEffect(()=>{
    checkAuth()
   },[checkAuth])
  return (
    <div
      className="min-h-screen bg-gradient-to-br 
    from-gray-900 
    via-red-900 to-pink-900 
    flex items-center justify-center 
    relative overflow-hidden"
    >
      
      <Routes>
        <Route path="/"element={<ProtectedRoute>
          <DashBoardPage/>
        </ProtectedRoute>}/>
        <Route path="/signup" element={<RedirectAuthenticatedUser>
          <SignUpPage/>
        </RedirectAuthenticatedUser>}/>
        <Route path="/login" element={<RedirectAuthenticatedUser>
          <LoginPage/>
        </RedirectAuthenticatedUser>}/>
        <Route path="/verify-email" element={<EmailVerification/>}/>
      </Routes>
    </div>
  );
}

export default App;
