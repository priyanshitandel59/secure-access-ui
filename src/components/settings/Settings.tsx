 import React, { useState, useEffect } from 'react';
 import { useNavigate } from 'react-router-dom';
 import './Settings.scss';
 
 type Language = 'en' | 'es' | 'fr';
 type Theme = 'light' | 'dark';
 
 const translations = {
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
 
 const ArrowLeftIcon = () => (
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
     <path d="M19 12H5M12 19l-7-7 7-7"/>
   </svg>
 );
 
 const SunIcon = () => (
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
     <circle cx="12" cy="12" r="5"/>
     <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
   </svg>
 );
 
 const MoonIcon = () => (
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
     <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
   </svg>
 );
 
 const GlobeIcon = () => (
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
     <circle cx="12" cy="12" r="10"/>
     <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
   </svg>
 );
 
 const Settings: React.FC = () => {
   const navigate = useNavigate();
   const [theme, setTheme] = useState<Theme>('light');
   const [language, setLanguage] = useState<Language>('en');
 
   const t = (key: string): string => {
     return translations[key as keyof typeof translations]?.[language] || key;
   };
 
   const handleSetTheme = (newTheme: Theme) => {
     setTheme(newTheme);
     document.documentElement.setAttribute('data-theme', newTheme);
   };
 
   useEffect(() => {
     document.documentElement.setAttribute('data-theme', theme);
   }, []);
 
   return (
     <div className="settings-layout">
       <header className="settings-header">
         <h1 className="settings-header__title">{t('settings')}</h1>
         <button className="settings-header__back" onClick={() => navigate('/dashboard')}>
           <ArrowLeftIcon />
           {t('backToDashboard')}
         </button>
       </header>
       
       <main className="settings-main">
         <div className="settings-cards">
           <div className="settings-card">
             <h2 className="settings-card__title">{t('themeSection')}</h2>
             <div className="settings-card__options">
               <label className={`radio-option ${theme === 'light' ? 'radio-option--selected' : ''}`}>
                 <input
                   type="radio"
                   name="theme"
                   className="radio-option__input"
                   checked={theme === 'light'}
                   onChange={() => handleSetTheme('light')}
                 />
                 <div className="radio-option__icon">
                   <SunIcon />
                 </div>
                 <div className="radio-option__content">
                   <span className="radio-option__label">{t('lightMode')}</span>
                   <span className="radio-option__description">Clean and bright interface</span>
                 </div>
               </label>
               
               <label className={`radio-option ${theme === 'dark' ? 'radio-option--selected' : ''}`}>
                 <input
                   type="radio"
                   name="theme"
                   className="radio-option__input"
                   checked={theme === 'dark'}
                   onChange={() => handleSetTheme('dark')}
                 />
                 <div className="radio-option__icon">
                   <MoonIcon />
                 </div>
                 <div className="radio-option__content">
                   <span className="radio-option__label">{t('darkMode')}</span>
                   <span className="radio-option__description">Easy on the eyes</span>
                 </div>
               </label>
             </div>
           </div>
           
           <div className="settings-card">
             <h2 className="settings-card__title">{t('languageSection')}</h2>
             <div className="settings-card__options">
               <label className={`radio-option ${language === 'en' ? 'radio-option--selected' : ''}`}>
                 <input
                   type="radio"
                   name="language"
                   className="radio-option__input"
                   checked={language === 'en'}
                   onChange={() => setLanguage('en')}
                 />
                 <div className="radio-option__icon">
                   <GlobeIcon />
                 </div>
                 <div className="radio-option__content">
                   <span className="radio-option__label">{t('english')}</span>
                   <span className="radio-option__description">English (US)</span>
                 </div>
               </label>
               
               <label className={`radio-option ${language === 'es' ? 'radio-option--selected' : ''}`}>
                 <input
                   type="radio"
                   name="language"
                   className="radio-option__input"
                   checked={language === 'es'}
                   onChange={() => setLanguage('es')}
                 />
                 <div className="radio-option__icon">
                   <GlobeIcon />
                 </div>
                 <div className="radio-option__content">
                   <span className="radio-option__label">{t('spanish')}</span>
                   <span className="radio-option__description">Español</span>
                 </div>
               </label>
               
               <label className={`radio-option ${language === 'fr' ? 'radio-option--selected' : ''}`}>
                 <input
                   type="radio"
                   name="language"
                   className="radio-option__input"
                   checked={language === 'fr'}
                   onChange={() => setLanguage('fr')}
                 />
                 <div className="radio-option__icon">
                   <GlobeIcon />
                 </div>
                 <div className="radio-option__content">
                   <span className="radio-option__label">{t('french')}</span>
                   <span className="radio-option__description">Français</span>
                 </div>
               </label>
             </div>
           </div>
         </div>
       </main>
     </div>
   );
 };
 
 export default Settings;