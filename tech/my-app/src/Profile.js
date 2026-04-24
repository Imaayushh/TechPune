import React, { useState } from 'react';
import './Profile.css';

const Profile = ({ onBack, userEmail }) => {
    const [profileImage, setProfileImage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [is2FAEnabled, setIs2FAEnabled] = useState(true);
    
    const [personalInfo, setPersonalInfo] = useState({
        fullName: "Admin User",
        email: userEmail || "admin@techpune.com",
        mobile: "+91 9876543210",
        address: "123 Tech Park, Pune, Maharashtra",
        dob: "15 August 1995"
    });

    const handleChangePicture = () => {
        alert("Change Picture feature coming soon!");
    };

    const toggleEdit = () => {
        if (isEditing) {
            alert("Profile updated successfully!");
        }
        setIsEditing(!isEditing);
    };

    const renderInfoItem = (label, value, key, icon, isLast = false) => (
        <div key={key} className={`info-item-row ${isLast ? 'no-divider' : ''}`}>
            <div className="label-group">
                <span className="black-theme-icon">{icon}</span>
                <label>{label}</label>
            </div>
            {isEditing ? (
                <input 
                    type="text" 
                    value={value}
                    onChange={(e) => setPersonalInfo({...personalInfo, [key]: e.target.value})}
                />
            ) : (
                <p>{value}</p>
            )}
        </div>
    );

    return (
        <div className="profile-container">
            <header className="profile-header">
                <button className="back-btn" onClick={onBack}>← Back to Dashboard</button>
                <h1>Profile</h1>
            </header>
            
            <div className="profile-layout">
                <div className="profile-left-col">
                    <div className="profile-card-mini">
                        <div className="avatar-circle-large">
                            {profileImage ? (
                                <img src={profileImage} alt="Profile" />
                            ) : (
                                <span className="avatar-icon">👤</span>
                            )}
                            <button className="edit-avatar-btn" onClick={handleChangePicture}>✎</button>
                        </div>
                        <div className="mini-meta">
                            <h2>{personalInfo.fullName}</h2>
                            <p>{personalInfo.email}</p>
                        </div>
                    </div>

                    <div className="quick-actions-card">
                        <div className="action-row" onClick={() => alert("Redirecting to Password Settings...")}>
                            <span className="black-theme-icon">🔒</span>
                            <span className="action-label">Change Password</span>
                            <span className="action-arrow">→</span>
                        </div>
                        
                        <div className="action-row no-hover">
                            <span className="black-theme-icon">🛡</span>
                            <span className="action-label">Two-Factor Auth</span>
                            <label className="toggle-switch">
                                <input 
                                    type="checkbox" 
                                    checked={is2FAEnabled} 
                                    onChange={() => setIs2FAEnabled(!is2FAEnabled)} 
                                />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="action-row" onClick={() => alert("Redirecting to Support...")}>
                            <span className="black-theme-icon">?</span>
                            <span className="action-label">Help & Support</span>
                            <span className="action-arrow">→</span>
                        </div>
                    </div>
                </div>

                <div className="profile-right-col">
                    <div className="personal-info-card">
                        <div className="card-header-flex">
                            <h3>Personal Information</h3>
                            <button className="edit-profile-btn-main" onClick={toggleEdit}>
                                {isEditing ? "Save Changes" : "Edit Details"}
                            </button>
                        </div>

                        <div className="info-list-container">
                            {renderInfoItem("Full Name", personalInfo.fullName, "fullName", "●")}
                            {renderInfoItem("Email Address", personalInfo.email, "email", "✉")}
                            {renderInfoItem("Mobile Number", personalInfo.mobile, "mobile", "☎")}
                            {renderInfoItem("Address", personalInfo.address, "address", "⌂")}
                            {renderInfoItem("Date of Birth", personalInfo.dob, "dob", "◈", true)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
