import React, { useState, useRef } from 'react';
import './OtpPage.css';

const OtpPage = ({ email, onVerify, onBack }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [sendStatus, setSendStatus] = useState('');
    const inputRefs = useRef([]);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus next input
        if (element.value !== '' && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const otpValue = otp.join('');
        
        // Simulating OTP verification (e.g., 123456 is correct)
        if (otpValue === '123456') {
            onVerify();
        } else {
            setError('Invalid OTP. Please try again.');
        }
    };

    const handleSendOtp = () => {
        setSendStatus(`OTP sent successfully to ${email}`);
        setTimeout(() => setSendStatus(''), 3000);
        console.log(`Sending OTP to ${email}`);
    };

    const handleTryAgain = () => {
        setOtp(['', '', '', '', '', '']);
        setError('');
        handleSendOtp();
        inputRefs.current[0].focus();
    };

    return (
        <div className="otp-container">
            <div className="otp-card">
                <h1 className="otp-title">Enter Your OTP</h1>
                <p className="otp-subtitle">OTP was sent to Gmail: <span className="email-highlight">{email}</span></p>
                
                {sendStatus && <div className="send-status">{sendStatus}</div>}
                
                <button type="button" className="send-otp-button" onClick={handleSendOtp}>
                    Send OTP
                </button>
                
                <form className="otp-form" onSubmit={handleSubmit}>
                    <div className="otp-inputs">
                        {otp.map((data, index) => {
                            return (
                                <input
                                    className="otp-box"
                                    type="text"
                                    name="otp"
                                    maxLength="1"
                                    key={index}
                                    value={data}
                                    onChange={e => handleChange(e.target, index)}
                                    onKeyDown={e => handleKeyDown(e, index)}
                                    ref={el => inputRefs.current[index] = el}
                                />
                            );
                        })}
                    </div>

                    {error && (
                        <div className="error-container">
                            <span className="error-message">{error}</span>
                            <button type="button" className="try-again-button" onClick={handleTryAgain}>
                                Try Again
                            </button>
                        </div>
                    )}

                    <button type="submit" className="enter-button">Enter</button>
                    
                    <button type="button" className="back-link" onClick={onBack}>
                        Back to Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OtpPage;
