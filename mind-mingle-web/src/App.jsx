import './App.css'
import LogoPage from './components/RegisterPage';
import RegisterPage from './components/RegisterPage';
import VoicePage from './components/VoicePage';
import MainPage from './components/MainPage';
import ChatPage from './components/ChatPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Step1Page from './components/survey/Step1Page';
import Step2Page from './components/survey/Step2Page';
import Step3Page from './components/survey/Step3Page';
import Step4Page from './components/survey/Step4Page';
import Step5Page from './components/survey/Step5Page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogoPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/voice" element={<VoicePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/survey/step1" element={<Step1Page />} />
        <Route path="/survey/step2" element={<Step2Page />} />
        <Route path="/survey/step3" element={<Step3Page />} />
        <Route path="/survey/step4" element={<Step4Page />} />
        <Route path="/survey/step5" element={<Step5Page />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
