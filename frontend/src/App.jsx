import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Profile from "./pages/Profile";
import SymptomChecker from "./pages/SymptomChecker";
import NavBar from "./components/common/NavBar";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import SymptomsAnalyse from "./pages/SymptomsAnalyse";
import HowitWorks from "./pages/HowitWorks";
import Signup from "./pages/Signup";
import { useLocation } from "react-router-dom";

function Layout(){
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/signup", "/dashboard", "/dashboard/history", "/dashboard/tracker", "/dashboard/profile", "/dashboard/symptom-checker"];
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);
  
  return (
    <>
      {!hideNavbar && <NavBar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/how-it-works" element={<HowitWorks />} />
        <Route path="/symptomsanalyse" element={<SymptomsAnalyse />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/history" element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/symptom-checker" element={
          <ProtectedRoute>
            <SymptomChecker />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout/>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
