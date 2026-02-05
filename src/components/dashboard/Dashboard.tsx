 import React, { useState } from 'react';
 import { useNavigate } from 'react-router-dom';
 import { useAuth } from '../../contexts/AuthContext';
 import { useTheme } from '../../contexts/ThemeContext';
 import { useLanguage } from '../../contexts/LanguageContext';
 import './Dashboard.scss';
 
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
 
 const ShieldIcon = () => (
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
     <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
   </svg>
 );
 
 const UserIcon = () => (
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
     <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
     <circle cx="12" cy="7" r="4"/>
   </svg>
 );
 
 const SettingsIcon = () => (
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
     <circle cx="12" cy="12" r="3"/>
     <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
   </svg>
 );
 
 const ArrowRightIcon = () => (
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
     <path d="M5 12h14M12 5l7 7-7 7"/>
   </svg>
 );
 
 const Dashboard: React.FC = () => {
   const navigate = useNavigate();
   const { user, logout } = useAuth();
   const { theme, toggleTheme } = useTheme();
   const { language, setLanguage, t } = useLanguage();
   const [showLangDropdown, setShowLangDropdown] = useState(false);
 
   const handleLogout = () => {
     logout();
     navigate('/');
   };
 
   const languageLabels = {
     en: 'EN',
     es: 'ES',
     fr: 'FR',
   };
 
   return (
     <div className="dashboard-layout">
       <header className="dashboard-header">
         <div className="header-logo">
           <div className="header-logo__icon">
             <ShieldIcon />
           </div>
           <span className="header-logo__text">SecureApp</span>
         </div>
         
         <div className="header-actions">
           <div className="header-dropdown">
             <button 
               className="header-dropdown__trigger"
               onClick={() => setShowLangDropdown(!showLangDropdown)}
             >
               {languageLabels[language]} ▼
             </button>
             {showLangDropdown && (
               <div className="header-dropdown__menu">
                 {(['en', 'es', 'fr'] as const).map(lang => (
                   <button
                     key={lang}
                     className={`header-dropdown__item ${language === lang ? 'header-dropdown__item--active' : ''}`}
                     onClick={() => {
                       setLanguage(lang);
                       setShowLangDropdown(false);
                     }}
                   >
                     {lang === 'en' ? 'English' : lang === 'es' ? 'Español' : 'Français'}
                   </button>
                 ))}
               </div>
             )}
           </div>
           
           <button className="header-theme-btn" onClick={toggleTheme}>
             {theme === 'light' ? <MoonIcon /> : <SunIcon />}
           </button>
           
           <button className="header-logout-btn" onClick={handleLogout}>
             {t('logout')}
           </button>
         </div>
       </header>
       
       <main className="dashboard-main">
         <section className="welcome-section">
           <p className="welcome-section__greeting">{t('welcomeUser')}</p>
           <h1 className="welcome-section__name">{user?.name || 'User'}</h1>
         </section>
         
         <div className="dashboard-cards">
           <div className="dashboard-card">
             <div className="dashboard-card__icon dashboard-card__icon--profile">
               <UserIcon />
             </div>
             <h2 className="dashboard-card__title">{t('profile')}</h2>
             <p className="dashboard-card__description">{t('profileDesc')}</p>
             <span className="dashboard-card__link">
               {t('viewProfile')} <ArrowRightIcon />
             </span>
           </div>
           
           <div className="dashboard-card" onClick={() => navigate('/settings')}>
             <div className="dashboard-card__icon dashboard-card__icon--settings">
               <SettingsIcon />
             </div>
             <h2 className="dashboard-card__title">{t('settingsShortcut')}</h2>
             <p className="dashboard-card__description">{t('settingsDesc')}</p>
             <span className="dashboard-card__link">
               {t('goToSettings')} <ArrowRightIcon />
             </span>
           </div>
         </div>
       </main>
     </div>
   );
 };
 
 export default Dashboard;