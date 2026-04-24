import React, { useState } from 'react';
import './App.css';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import OtpPage from './OtpPage';
import Profile from './Profile';

function App() {
  const [view, setView] = useState('login'); // 'login', 'otp', 'dashboard', 'profile'
  const [email, setEmail] = useState('');

  const handleSignIn = (userEmail) => {
    setEmail(userEmail);
    setView('otp');
  };

  const handleOtpVerified = () => {
    setView('dashboard');
  };

  return (
    <div className="App">
      {view === 'dashboard' ? (
        <Dashboard 
          onLogout={() => setView('login')} 
          onProfileClick={() => setView('profile')}
        />
      ) : view === 'profile' ? (
        <Profile onBack={() => setView('dashboard')} userEmail={email} />
      ) : view === 'otp' ? (
        <OtpPage 
          email={email} 
          onVerify={handleOtpVerified} 
          onBack={() => setView('login')} 
        />
      ) : (
        <LoginPage onSignIn={handleSignIn} />
      )}
    </div>
  );
}

export default App;
