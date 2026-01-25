import React, { useEffect, useState, useRef } from 'react';
import './calender.css';

const API_BASE = (
  process.env.REACT_APP_API_URL || 'http://localhost:5000'
).replace(/\/$/, '');

const Calendar = () => {
  const [bookingDate, setBookingDate] = useState('');
  const [bookingType, setBookingType] = useState('consultation');
  const [notes, setNotes] = useState('');
  const [statusData, setStatusData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');  // For error display

  const intervalRef = useRef(null);  // For polling cleanup

  /* ================= GET AUTH TOKEN ================= */
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  /* ================= FETCH USER REQUEST STATUS ================= */
  const fetchStatus = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user?.id) {
      setError('User not logged in');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE}/api/calendar/user/${user.id}`, {
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()  // 🔥 FIX: Add Bearer token to avoid CORS
        }
      });

      if (!res.ok) {
        if (res.status === 401) throw new Error('Unauthorized. Please login again.');
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        setStatusData(data[data.length - 1]); // latest request
      } else {
        setStatusData(null);
      }
    } catch (err) {
      console.error('Status fetch error', err);
      setError(err.message || 'Failed to load status');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    
    // 🔥 FIX: Auto-refresh every 30 seconds to check for admin updates (meeting_link will appear)
    intervalRef.current = setInterval(fetchStatus, 30000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);  // Cleanup
      }
    };
  }, []);

  /* ================= SUBMIT REQUEST ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user?.id) {
      alert('Please login first');
      return;
    }

    const payload = {
      user_id: user.id,
      booking_date: bookingDate,
      booking_type: bookingType,
      notes
    };

    try {
      const res = await fetch(`${API_BASE}/api/calendar/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()  // 🔥 FIX: Add Bearer token
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error();

      alert('Request submitted successfully');
      setBookingDate('');
      setNotes('');
      fetchStatus();  // Refresh immediately
    } catch (err) {
      console.error('Submit error', err);
      alert('Failed to submit request');
    }
  };

  /* ================= UI ================= */
  return (
    <div className="calendar-container">
      <div className="calendar-header-section">
        <h1>Expert Session Request</h1>
        <p className="calendar-subtitle">
          Submit your request. We will notify you once approved.
        </p>
      </div>

      {error && <p className="error-text">{error}</p>}

      {!loading && statusData && (
        <div className="status-card">
          <h3>Status: {statusData.status.toUpperCase()}</h3>

          {statusData.status === 'pending' && (
            <p>⏳ Your request is under review. We’ll update you soon.</p>
          )}

          {statusData.status === 'approved' && (
            <div>
              <p>✅ Your session is approved</p>
              <p><b>Date:</b> {statusData.booking_date}</p>

              {statusData.session_time && (
                <p><b>Time:</b> {statusData.session_time}</p>
              )}

              {statusData.meeting_link && (  // 🔥 This will now show the link from DB
                <p>
                  <b>Join Link:</b>{' '}
                  <a
                    href={statusData.meeting_link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Join Session
                  </a>
                </p>
              )}
            </div>
          )}

          {statusData.status === 'rejected' && (
            <p>❌ Unfortunately your request was rejected.</p>
          )}
        </div>
      )}

      {!statusData || statusData.status === 'rejected' ? (
        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Select Date</label>
            <input
              type="date"
              required
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Session Type</label>
            <select
              value={bookingType}
              onChange={(e) => setBookingType(e.target.value)}
            >
              <option value="consultation">1:1 Expert Consultation</option>
              <option value="regulatory">Regulatory Advisory</option>
              <option value="technical">Technical Review</option>
            </select>
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <button className="btn-confirm" type="submit">
            Submit Request
          </button>
        </form>
      ) : null}
    </div>
  );
};

export default Calendar;
