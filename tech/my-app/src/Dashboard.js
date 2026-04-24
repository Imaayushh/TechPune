import React from 'react';
import './Dashboard.css';
import user_icon from './user_icon.png';

const Dashboard = ({ onLogout, onProfileClick }) => {
    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <div className="sidebar-logo">TechPune</div>
                <nav className="sidebar-nav">
                    <ul>
                        <li className="active">🏠 Overview</li>
                        <li onClick={onProfileClick} className="sidebar-link">
                            <span>👤 Profile</span>
                        </li>
                        <li>📊 Analytics</li>
                        <li>👥 Users</li>
                        <li>⚙️ Settings</li>
                    </ul>
                </nav>
                <button className="logout-btn" onClick={onLogout}>🚪 Logout</button>
            </aside>
            <main className="main-content">
                <header className="dashboard-header">
                    <h2>Dashboard Overview</h2>
                    <div className="user-profile" onClick={onProfileClick}>
                        <span>Welcome, Admin</span>
                        <div className="avatar">
                            <img src={user_icon} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                        </div>
                    </div>
                </header>
                <div className="dashboard-grid">
                    <div className="card">
                        <h3>Total Users</h3>
                        <p className="card-value">1,234</p>
                        <span className="card-trend positive">↑ 12% this month</span>
                    </div>
                    <div className="card">
                        <h3>Revenue</h3>
                        <p className="card-value">$45,678</p>
                        <span className="card-trend positive">↑ 8% this month</span>
                    </div>
                    <div className="card">
                        <h3>Active Sessions</h3>
                        <p className="card-value">89</p>
                        <span className="card-trend negative">↓ 5% today</span>
                    </div>
                    <div className="card">
                        <h3>Support Tickets</h3>
                        <p className="card-value">12</p>
                        <span className="card-trend">Stable</span>
                    </div>
                </div>
                <section className="recent-activity">
                    <h3>Recent Activity</h3>
                    <div className="activity-list">
                        <div className="activity-item">
                            <span className="time">2 mins ago</span>
                            <p>User <span className="highlight">John Doe</span> signed up.</p>
                        </div>
                        <div className="activity-item">
                            <span className="time">1 hour ago</span>
                            <p>New subscription created for <span className="highlight">Acme Corp</span>.</p>
                        </div>
                        <div className="activity-item">
                            <span className="time">3 hours ago</span>
                            <p>System update completed successfully.</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
