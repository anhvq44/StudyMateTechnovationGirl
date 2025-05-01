import { useState } from 'react'
import './index.css'
import Login from './pages/Login.jsx'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { SignUp } from './pages/Signup.jsx'
import ExtraInfo from './pages/SignupContinue.jsx'
import Dashboard from './pages/Home.jsx'
import LandingPage from './pages/LandingPage.jsx'
import ToDoPage from './pages/Todo.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { DailyCheckin } from './pages/DailyCheckin.jsx'
import ChatBotPage from './pages/ChatBotPage.jsx'
import MupoPage from './pages/MupoPage.jsx'
import ProtectedRoute from './routes/ProtectedRoutes.jsx'

function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/welcome-to-studymate" replace />} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/complete-profile" element={<ExtraInfo />} />
          <Route path="/user-dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}></Route>
          <Route path="/welcome-to-studymate" element={<LandingPage />}></Route>
          <Route path="/todo-goals" element={<ProtectedRoute><ToDoPage /></ProtectedRoute>}></Route>
          <Route path="/daily-checkin" element={<ProtectedRoute><DailyCheckin /></ProtectedRoute>}></Route>
          <Route path="/chatbot" element={<ProtectedRoute><ChatBotPage /></ProtectedRoute>}></Route>
          <Route path="/visit-mupo" element={<ProtectedRoute><MupoPage /></ProtectedRoute>}></Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
