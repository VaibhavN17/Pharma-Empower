import React, { useEffect, useState } from 'react';
import { dashboardAPI } from '../../services/api';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalEnquiries: 0,
        todayEnquiries: 0,
        activeStudents: 0,
        forumDiscussions: 0
    });

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const res = await dashboardAPI.getStats();
            setStats(res.data);
        } catch (err) {
            console.error('Dashboard load failed', err);
        }
    };

    return (
        <div className="admin-dashboard">
            <header className="admin-page-header">
                <h1>Dashboard</h1>
                <p>Welcome back, Admin.</p>
            </header>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '20px'
                }}
            >
                {/* TOTAL ENQUIRIES */}
                <div className="admin-card">
                    <h3>Total Enquiries</h3>
                    <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1a237e' }}>
                        {stats.totalEnquiries}
                    </p>
                    <p style={{ color: '#666' }}>
                        +{stats.todayEnquiries} today
                    </p>
                </div>

                {/* ACTIVE STUDENTS */}
                <div className="admin-card">
                    <h3>Active Students</h3>
                    <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1a237e' }}>
                        {stats.activeStudents}
                    </p>
                    <p style={{ color: '#666' }}>
                        Registered users
                    </p>
                </div>

                {/* FORUM DISCUSSIONS */}
                <div className="admin-card">
                    <h3>Forum Discussions</h3>
                    <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1a237e' }}>
                        {stats.forumDiscussions}
                    </p>
                    <p style={{ color: '#666' }}>
                        Total posts
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;