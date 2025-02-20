import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

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
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
