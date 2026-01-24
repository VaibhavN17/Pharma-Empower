import React, { useState, useEffect } from 'react';
import './calender.css';
import { useNavigate } from 'react-router-dom';

/* ✅ API BASE (DEPLOY SAFE) */
const API_BASE = (
    process.env.REACT_APP_API_URL ||
    'https://pharma-empowerr.onrender.com'
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

    /* ================= FETCH BOOKINGS ================= */
    const fetchBookings = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user?.id) return;

        try {
            const res = await fetch(
                `${API_BASE}/api/calendar/user/${user.id}`,
                { credentials: 'include' }
            );

            const data = await res.json();

            const formatted = data.map(item => ({
                date: item.booking_date,
                title:
                    item.booking_type === 'consultation'
                        ? '1:1 Expert Consultation'
                        : item.booking_type === 'regulatory'
                        ? 'Regulatory Advisory'
                        : 'Technical Review',
                status: item.status
            }));

            setEvents(formatted);
        } catch (err) {
            console.error('❌ Fetch booking error:', err);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    /* ================= CALENDAR HELPERS ================= */
    const getDaysInMonth = (date) =>
        new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    const getFirstDayOfMonth = (date) =>
        new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const handlePrevMonth = () =>
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

    const handleNextMonth = () =>
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

    /* ================= DATE CLICK ================= */
    const handleDayClick = async (day) => {
        const clickedDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
        );

        const dateStr = clickedDate.toISOString().split('T')[0];

        await fetchBookings(); // sync latest data

        const updatedEvent = events.find(e => e.date === dateStr) || null;

        setSelectedDate(clickedDate);
        setSelectedEvent(updatedEvent);
        setShowModal(true);
    };

    /* ================= SUBMIT BOOKING ================= */
    const handleScheduleSubmit = async (e) => {
        e.preventDefault();

        if (selectedEvent) return;

        const user = JSON.parse(localStorage.getItem('user'));
        if (!user?.id) {
            alert('Please login first');
            navigate('/login');
            return;
        }

        const payload = {
            user_id: user.id,
            booking_date: selectedDate.toISOString().split('T')[0],
            booking_type: bookingType,
            notes
        };

        try {
            const res = await fetch(`${API_BASE}/api/calendar/requests`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            alert('✅ Booking request sent');

            setShowModal(false);
            setNotes('');

            setEvents(prev => [
                ...prev,
                {
                    date: payload.booking_date,
                    title:
                        bookingType === 'consultation'
                            ? '1:1 Expert Consultation'
                            : bookingType === 'regulatory'
                            ? 'Regulatory Advisory'
                            : 'Technical Review',
                    status: 'pending'
                }
            ]);
        } catch (err) {
            console.error(err);
            alert('❌ Failed to submit booking request');
        }
    };

    /* ================= RENDER CALENDAR ================= */
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

            const dayEvents = events.filter(e => e.date === dateStr);
            const isToday =
                today.toDateString() ===
                new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

            days.push(
                <div
                    key={day}
                    className={`calendar-day ${isToday ? 'is-today' : ''}`}
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

    const monthNames = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ];

    return (
        <div className="calendar-container">
            <div className="calendar-header-section">
                <h1>Pharma Expert Calendar</h1>
                <p className="calendar-subtitle">
                    Visualize milestones & schedule expert consultations
                </p>
            </div>

            <div className="calendar-controls">
                <button className="control-btn" onClick={handlePrevMonth}>&lt; Prev</button>
                <div className="current-month">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </div>
                <button className="control-btn" onClick={handleNextMonth}>Next &gt;</button>
            </div>

            <div className="calendar-grid">
                {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
                    <div key={d} className="calendar-day-header">{d}</div>
                ))}
                {renderCalendarGrid()}
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2>Schedule Expert Session</h2>
                        <p>{selectedDate?.toDateString()}</p>

                        {selectedEvent ? (
                            <p><b>Status:</b> {selectedEvent.status.toUpperCase()}</p>
                        ) : (
                            <form onSubmit={handleScheduleSubmit}>
                                <select
                                    value={bookingType}
                                    onChange={(e) => setBookingType(e.target.value)}
                                >
                                    <option value="consultation">1:1 Expert Consultation</option>
                                    <option value="regulatory">Regulatory Advisory</option>
                                    <option value="technical">Technical Review</option>
                                </select>

                                <textarea
                                    rows="3"
                                    placeholder="Topic / Notes"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />

                                <button type="submit">Request Booking</button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;
