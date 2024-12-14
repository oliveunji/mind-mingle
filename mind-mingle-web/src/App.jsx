import './App.css'
import LogoPage from './components/RegisterPage';
import RegisterPage from './components/RegisterPage';
import VoicePage from './components/VoicePage';
import MainPage from './components/MainPage';
import ChatPage from './components/ChatPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogoPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/voice" element={<VoicePage />} />
        <Route path="/chat" element={<ChatPage />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
