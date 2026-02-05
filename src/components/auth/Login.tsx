 import React, { useState } from 'react';
 import { useNavigate } from 'react-router-dom';
 import { useAuth } from '../../contexts/AuthContext';
 import { useTheme } from '../../contexts/ThemeContext';
 import { useLanguage } from '../../contexts/LanguageContext';
 import './Login.scss';
 
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
 
 const Login: React.FC = () => {
   const navigate = useNavigate();
   const { login } = useAuth();
   const { theme, toggleTheme } = useTheme();
   const { language, setLanguage, t } = useLanguage();
   
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const [showLangDropdown, setShowLangDropdown] = useState(false);
 
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setError('');
     setIsLoading(true);
     
     const success = await login(email, password);
     
     if (success) {
       navigate('/dashboard');
     } else {
       setError(t('loginError'));
     }
     
     setIsLoading(false);
   };
 
   const languageLabels = {
     en: 'EN',
     es: 'ES',
     fr: 'FR',
   };
 
   return (
     <div className="login-page">
       <header className="login-header">
         <div />
         <div className="login-header__actions">
           <div className="language-selector">
             <button 
               className="language-selector__button"
               onClick={() => setShowLangDropdown(!showLangDropdown)}
               aria-label="Select language"
             >
               {languageLabels[language]} ▼
             </button>
             {showLangDropdown && (
               <div className="language-selector__dropdown">
                 {(['en', 'es', 'fr'] as const).map(lang => (
                   <button
                     key={lang}
                     className={`language-selector__option ${language === lang ? 'language-selector__option--active' : ''}`}
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
           <button 
             className="theme-toggle"
             onClick={toggleTheme}
             aria-label="Toggle theme"
           >
             {theme === 'light' ? <MoonIcon /> : <SunIcon />}
           </button>
         </div>
       </header>
       
       <main className="login-content">
         <div className="login-card">
           <div className="login-card__header">
             <div className="login-card__logo">
               <ShieldIcon />
             </div>
             <h1 className="login-card__title">{t('welcomeBack')}</h1>
             <p className="login-card__subtitle">{t('login')}</p>
           </div>
           
           <form className="login-form" onSubmit={handleSubmit}>
             <div className="login-form__group">
               <label className="login-form__label" htmlFor="email">{t('email')}</label>
               <input
                 id="email"
                 type="email"
                 className="login-form__input"
                 placeholder="you@example.com"
                 value={email}
                 onChange={e => setEmail(e.target.value)}
                 required
               />
             </div>
             
             <div className="login-form__group">
               <label className="login-form__label" htmlFor="password">{t('password')}</label>
               <input
                 id="password"
                 type="password"
                 className="login-form__input"
                 placeholder="••••••••"
                 value={password}
                 onChange={e => setPassword(e.target.value)}
                 required
               />
             </div>
             
             {error && <div className="login-form__error">{error}</div>}
             
             <button 
               type="submit" 
               className="login-form__submit"
               disabled={isLoading}
             >
               {isLoading ? '...' : t('loginButton')}
             </button>
           </form>
         </div>
       </main>
     </div>
   );
 };
 
 export default Login;