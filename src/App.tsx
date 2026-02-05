import { BrowserRouter, Routes, Route } from "react-router-dom";
 import { ThemeProvider } from "./contexts/ThemeContext";
 import { LanguageProvider } from "./contexts/LanguageContext";
 import { AuthProvider } from "./contexts/AuthContext";
 import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
 import Dashboard from "./components/dashboard/Dashboard";
 import Settings from "./components/settings/Settings";
 import './styles/base.scss';

const App = () => (
   <ThemeProvider>
     <LanguageProvider>
       <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
             <Route path="/dashboard" element={
               <ProtectedRoute>
                 <Dashboard />
               </ProtectedRoute>
             } />
             <Route path="/settings" element={
               <ProtectedRoute>
                 <Settings />
               </ProtectedRoute>
             } />
        </Routes>
      </BrowserRouter>
       </AuthProvider>
     </LanguageProvider>
   </ThemeProvider>
);

export default App;
