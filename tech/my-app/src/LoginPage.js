import React, { useState } from 'react';
import './LoginPage.css';
import userIcon from './email_icon.png';
import lockIcon from './lock_icon.png';
import eyeOpenIcon from './eye_icon.png';
import eyeClosedIcon from './eye_icon_closed.png';
import googleLogo from './google_logo.png';
import githubLogo from './github_logo.png';

const LoginPage = ({ onSignIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const validatePassword = (value) => {
        const hasAlpha = /[a-zA-Z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasSpecial = /[@$!%*?&#]/.test(value);
        
        if (value && (!hasAlpha || !hasNumber || !hasSpecial)) {
            setError('Password must contain letters, numbers, and special characters (e.g. @).');
        } else {
            setError('');
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        validatePassword(value);
    };


    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">TechPune</h1>
                <form className="login-form" onSubmit={(e) => { e.preventDefault(); onSignIn(email); }}>
                    <div className="form-group">
                        <div className="input-with-icon">
                            <img src={userIcon} alt="user" className="input-icon" />
                            <input 
                                type="email" 
                                id="email" 
                                placeholder="Email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-with-icon">
                            <img src={lockIcon} alt="lock" className="input-icon" />
                            <div className="password-input-wrapper">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    id="password" 
                                    placeholder="Enter your password" 
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required 
                                />
                                <button 
                                    type="button" 
                                    className="view-password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <img 
                                        src={showPassword ? eyeOpenIcon : eyeClosedIcon} 
                                        alt="toggle visibility" 
                                        className="eye-icon"
                                    />
                                </button>
                            </div>
                        </div>
                        {error && <span className="error-message">{error}</span>}
                    </div>
                    <button 
                        type="button" 
                        className="signin-button" 
                        onClick={() => {
                            if (!email) {
                                alert("Please enter your email");
                                return;
                            }
                            if (!password) {
                                alert("Please enter your password");
                                return;
                            }
                            onSignIn(email);
                        }}
                    >
                        Sign In
                    </button>
                    
                    <button 
                        type="button" 
                        className="signup-button" 
                        onClick={() => {
                            if (!email) {
                                alert("Please enter your email");
                                return;
                            }
                            onSignIn(email);
                        }}
                    >
                        Sign Up
                    </button>
                    
                    <div className="or-separator">
                        <div className="separator-line"></div>
                        <span>or</span>
                        <div className="separator-line"></div>
                    </div>

                    <div className="social-logins">
                        <button type="button" className="social-button google">
                            <img src={googleLogo} alt="Google" className="social-logo" />
                            Continue with Google
                        </button>
                        <button type="button" className="social-button github">
                            <img src={githubLogo} alt="Github" className="social-logo" />
                            Continue with Github
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
