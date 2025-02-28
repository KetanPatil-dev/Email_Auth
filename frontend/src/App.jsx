import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerification from "./pages/EmailVerification"

function App() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br 
    from-gray-900 
    via-red-900 to-pink-900 
    flex items-center justify-center 
    relative overflow-hidden"
    >
      
      <Routes>
        <Route path="/"element={"Home"}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/verify-email" element={<EmailVerification/>}/>
      </Routes>
    </div>
  );
}

export default App;
