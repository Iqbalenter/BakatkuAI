import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Home from './pages/Home'
import Login from './pages/Login';
import Register from './pages/Register';
import VerificationEmail from './pages/Verification';
import FillIdentity from './pages/FillIdentity';
import UploadCv from './pages/UploadCv';
import ResultAnalysis from './pages/ResultAnalysis';
import ResultAnalysis2 from './pages/ResultAnalysis2';
import Dashboard from './pages/Dashboard';
import DashboardProgress from './pages/Dashboard-progress';
import HistorySkill from './pages/HistorySkill';
import HistorySkillDetail from './pages/HistorySkillDetail';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import Article from './pages/Article';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  },
  {
    path: '/verification',
    element: <VerificationEmail/>
  },
  {
    path: '/fill-identity',
    element: <FillIdentity/>
  },
  {
    path: '/send-cv',
    element: <UploadCv/>
  },
  {
    path: '/result-analysis',
    element: <ResultAnalysis/>
  },
  {
    path: '/result-analysis2',
    element: <ResultAnalysis2/>
  },
  {
    path: '/dashboard',
    element: <Dashboard/>
  },
  {
    path: '/dashboard-progress',
    element: <DashboardProgress/>
  },
  {
    path: '/history-skill',
    element: <HistorySkill/>
  },
  {
    path: '/history-skill-detail',
    element: <HistorySkillDetail/>
  },
  {
    path: '/profile',
    element: <Profile/>
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword/>
  },
  {
    path: '/article',
    element: <Article/>
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
