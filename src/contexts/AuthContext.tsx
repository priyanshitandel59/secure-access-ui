 import React, { createContext, useContext, useState, ReactNode } from 'react';
 
 interface User {
   id: string;
   email: string;
   name: string;
 }
 
 interface AuthContextType {
   user: User | null;
   isAuthenticated: boolean;
   login: (email: string, password: string) => Promise<boolean>;
   logout: () => void;
 }
 
 const AuthContext = createContext<AuthContextType | undefined>(undefined);
 
 export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [user, setUser] = useState<User | null>(() => {
     const saved = localStorage.getItem('user');
     return saved ? JSON.parse(saved) : null;
   });
 
   const login = async (email: string, password: string): Promise<boolean> => {
     // Simulated login - in real app, this would call an API
     if (email && password.length >= 4) {
       const newUser: User = {
         id: '1',
         email,
         name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
       };
       setUser(newUser);
       localStorage.setItem('user', JSON.stringify(newUser));
       return true;
     }
     return false;
   };
 
   const logout = () => {
     setUser(null);
     localStorage.removeItem('user');
   };
 
   return (
     <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
       {children}
     </AuthContext.Provider>
   );
 };
 
 export const useAuth = (): AuthContextType => {
   const context = useContext(AuthContext);
   if (!context) {
     throw new Error('useAuth must be used within an AuthProvider');
   }
   return context;
 };