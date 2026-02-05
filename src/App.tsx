 import { BrowserRouter, Routes, Route } from "react-router-dom";
 import Index from "./pages/Index";
 import Dashboard from "./components/dashboard/Dashboard";
 import Settings from "./components/settings/Settings";
 import './styles/base.scss';
 
 const App = () => (
   <BrowserRouter>
     <Routes>
       <Route path="/" element={<Index />} />
       <Route path="/dashboard" element={<Dashboard />} />
       <Route path="/settings" element={<Settings />} />
     </Routes>
   </BrowserRouter>
 );

export default App;
