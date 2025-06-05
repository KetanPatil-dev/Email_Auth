import { Route, Routes } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import FloatingShapes from './components/FloatingShapes'

function App() {
  

  return (
    
    <div className='min-h-screen bg-gradient-to-br from-pink-600 via-orange-500 to-red-800 flex-items-center justify-center overflow-hidden'>
      <FloatingShapes color="bg-red-800" size="w-64 h-64" top="-6%" left="10%" delay={0}/>
      <FloatingShapes color="bg-orange-800" size="w-48 h-48" top="70%" left="80%" delay={0}/>
      <FloatingShapes color="bg-line-500" size="w-32 h-32" top="40%" left="-10%" delay={0}/>
      <Routes>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
    </div>
      
    
  )
}

export default App
