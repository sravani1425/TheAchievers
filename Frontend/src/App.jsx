import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MentorDashboard from './pages/MentorDashboard';
import MentorAllocation from './pages/MentorAllocation';
import AcademicDashboard from './pages/AcademicDashboard';
import AttendanceDashboard from './pages/AttendanceDashboard';
import MarkAttendance from './pages/MarkAttendance';
import ParentInteractionLog from './pages/ParentInteractionLog';
import InternshipTracker from './pages/InternshipTracker';
import FeedbackForm from './pages/FeedbackForm';
import FeedbackAnalytics from './pages/FeedbackAnalytics';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './pages/Register';
import PrivateRoute from './components/routing/PrivateRoute';
import PrivateLayout from './components/layout/PrivateLayout';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route element={<PrivateRoute><PrivateLayout /></PrivateRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/mentor-dashboard" element={<MentorDashboard />} />
            <Route path="/mentor-allocation" element={<MentorAllocation />} />
            <Route path="/academics" element={<AcademicDashboard />} />
            <Route path="/attendance" element={<AttendanceDashboard />} />
            <Route path="/mark-attendance" element={<MarkAttendance />} />
            <Route path="/parent-interactions" element={<ParentInteractionLog />} />
            <Route path="/internships" element={<InternshipTracker />} />
            <Route path="/feedback" element={<FeedbackForm />} />
            <Route path="/feedback-analytics" element={<FeedbackAnalytics />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
