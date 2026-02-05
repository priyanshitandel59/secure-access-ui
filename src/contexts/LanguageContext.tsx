 import React, { createContext, useContext, useState, ReactNode } from 'react';
 
 type Language = 'en' | 'es' | 'fr';
 
 interface Translations {
   [key: string]: {
     en: string;
     es: string;
     fr: string;
   };
 }
 
 const translations: Translations = {
   // Login
   login: { en: 'Login', es: 'Iniciar Sesión', fr: 'Connexion' },
   email: { en: 'Email', es: 'Correo Electrónico', fr: 'Email' },
   password: { en: 'Password', es: 'Contraseña', fr: 'Mot de passe' },
   loginButton: { en: 'Sign In', es: 'Entrar', fr: 'Se Connecter' },
   loginError: { en: 'Invalid email or password', es: 'Correo o contraseña inválidos', fr: 'Email ou mot de passe invalide' },
   welcomeBack: { en: 'Welcome Back', es: 'Bienvenido de Nuevo', fr: 'Bon Retour' },
   
   // Dashboard
   dashboard: { en: 'Dashboard', es: 'Panel', fr: 'Tableau de Bord' },
   welcomeUser: { en: 'Welcome back,', es: 'Bienvenido,', fr: 'Bienvenue,' },
   profile: { en: 'Profile', es: 'Perfil', fr: 'Profil' },
   profileDesc: { en: 'Manage your personal information', es: 'Gestiona tu información personal', fr: 'Gérer vos informations personnelles' },
   settingsShortcut: { en: 'Settings', es: 'Configuración', fr: 'Paramètres' },
   settingsDesc: { en: 'Customize your preferences', es: 'Personaliza tus preferencias', fr: 'Personnalisez vos préférences' },
   logout: { en: 'Logout', es: 'Cerrar Sesión', fr: 'Déconnexion' },
   viewProfile: { en: 'View Profile', es: 'Ver Perfil', fr: 'Voir le Profil' },
   goToSettings: { en: 'Go to Settings', es: 'Ir a Configuración', fr: 'Aller aux Paramètres' },
   
   // Settings
   settings: { en: 'Settings', es: 'Configuración', fr: 'Paramètres' },
   themeSection: { en: 'Theme', es: 'Tema', fr: 'Thème' },
   lightMode: { en: 'Light', es: 'Claro', fr: 'Clair' },
   darkMode: { en: 'Dark', es: 'Oscuro', fr: 'Sombre' },
   languageSection: { en: 'Language', es: 'Idioma', fr: 'Langue' },
   english: { en: 'English', es: 'Inglés', fr: 'Anglais' },
   spanish: { en: 'Spanish', es: 'Español', fr: 'Espagnol' },
   french: { en: 'French', es: 'Francés', fr: 'Français' },
   backToDashboard: { en: 'Back to Dashboard', es: 'Volver al Panel', fr: 'Retour au Tableau de Bord' },
 };
 
 interface LanguageContextType {
   language: Language;
   setLanguage: (lang: Language) => void;
   t: (key: string) => string;
 }
 
 const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
 
 export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [language, setLanguageState] = useState<Language>(() => {
     const saved = localStorage.getItem('language');
     return (saved as Language) || 'en';
   });
 
   const setLanguage = (lang: Language) => {
     setLanguageState(lang);
     localStorage.setItem('language', lang);
   };
 
   const t = (key: string): string => {
     return translations[key]?.[language] || key;
   };
 
   return (
     <LanguageContext.Provider value={{ language, setLanguage, t }}>
       {children}
     </LanguageContext.Provider>
   );
 };
 
 export const useLanguage = (): LanguageContextType => {
   const context = useContext(LanguageContext);
   if (!context) {
     throw new Error('useLanguage must be used within a LanguageProvider');
   }
   return context;
 };