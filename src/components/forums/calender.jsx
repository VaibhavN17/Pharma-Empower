import React, { useState, useEffect } from 'react';
import './calender.css';
import { useNavigate } from 'react-router-dom';

/* ✅ SAFE BASE URL (NO DOUBLE SLASH) */
const API_BASE = (
  process.env.REACT_APP_API_URL || 'http://localhost:5000'
).replace(/\/$/, '');

const Calendar = () => {
  const navigate = useNavigate();
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingType, setBookingType] = useState('consultation');
  const [notes, setNotes] = useState('');
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  /* ================= FETCH USER BOOKINGS ================= */
  const fetchBookings = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch(
        `${API_BASE}/api/calendar/requests/my`, // ✅ FIXED ROUTE
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error('Failed to fetch');

      const data = await res.json();

      const formatted = data.map((item) => ({
        date: item.booking_date,
        title:
          item.booking_type === 'consultation'
            ? '1:1 Expert Consultation'
            : item.booking_type === 'regulatory'
            ? 'Regulatory Advisory'
            : 'Technical Review',
        status: item.status,
      }));

      setEvents(formatted);
    } catch (err) {
      console.error('Booking fetch error:', err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDayClick = async (day) => {
    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );

    const dateStr = clickedDate.toISOString().split('T')[0];

    await fetchBookings(); // 🔥 sync status

    const updatedEvent = events.find((e) => e.date === dateStr) || null;

    setSelectedDate(clickedDate);
    setSelectedEvent(updatedEvent);
    setShowModal(true);
  };

  const handleScheduleSubmit = async (e) => {
    e.preventDefault();
    if (selectedEvent) return;

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first');
      return;
    }

    const payload = {
      booking_date: selectedDate.toISOString().split('T')[0],
      booking_type: bookingType,
      notes,
    };

    try {
      const res = await fetch(`${API_BASE}/api/calendar/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert('Booking request sent');
      setShowModal(false);
      setNotes('');

      setEvents((prev) => [
        ...prev,
        {
          date: payload.booking_date,
          title:
            bookingType === 'consultation'
              ? '1:1 Expert Consultation'
              : bookingType === 'regulatory'
              ? 'Regulatory Advisory'
              : 'Technical Review',
          status: 'pending',
        },
      ]);
    } catch (err) {
      alert('Failed to submit booking request');
    }
  };

  /* ================= UI (UNCHANGED) ================= */
  const getDaysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const getFirstDayOfMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

      const dayEvents = events.filter((e) => e.date === dateStr);

      days.push(
        <div
          key={day}
          className="calendar-day"
          onClick={() => handleDayClick(day)}
        >
          <span className="day-number">{day}</span>
          <div className="day-events">
            {dayEvents.map((ev, idx) => (
              <div key={idx} className={`event-indicator ${ev.status}`}>
                {ev.title}
              </div>
            ))}
          </div>
          <button className="schedule-trigger">+</button>
        </div>
      );
    }
    return days;
  };

  return (
    <div className="calendar-container">
      {/* UI untouched */}
      <div className="calendar-grid">{renderCalendarGrid()}</div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {!selectedEvent && (
              <form onSubmit={handleScheduleSubmit}>
                <button type="submit" className="btn-confirm">
                  Request Booking
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
