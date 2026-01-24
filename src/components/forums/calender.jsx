import React, { useState, useEffect } from 'react';
import './calender.css';
import { useNavigate } from 'react-router-dom';

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

    /* ================= FETCH USER BOOKINGS (FINAL FIX) ================= */
    const fetchBookings = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user?.id) return [];

        try {
            const res = await fetch(`${API_BASE}/api/calendar/user/${user.id}`);
            if (!res.ok) throw new Error('Fetch failed');

            const data = await res.json();

            const formatted = data.map(item => {
                // 🔥 NORMALIZE STATUS
                let status = 'pending';

                if (
                    item.status === 'approved' ||
                    item.status === 'APPROVED' ||
                    item.status === 1
                ) {
                    status = 'approved';
                }

                if (
                    item.status === 'rejected' ||
                    item.status === 'REJECTED' ||
                    item.status === 0
                ) {
                    status = 'rejected';
                }

                return {
                    date: item.booking_date,
                    title:
                        item.booking_type === 'consultation'
                            ? '1:1 Expert Consultation'
                            : item.booking_type === 'regulatory'
                            ? 'Regulatory Advisory'
                            : 'Technical Review',
                    status
                };
            });

            setEvents(formatted);
            return formatted;
        } catch (err) {
            console.error('Fetch booking error:', err);
            return [];
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    /* ================= DATE CLICK ================= */
    const handleDayClick = async (day) => {
        const clickedDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
        );

        const dateStr = clickedDate.toISOString().split('T')[0];
        const latestEvents = await fetchBookings();
        const updatedEvent = latestEvents.find(e => e.date === dateStr) || null;

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
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error();

            alert('Booking request sent');
            setShowModal(false);
            setNotes('');
            fetchBookings();
        } catch {
            alert('Failed to submit booking request');
        }
    };

    /* ================= CALENDAR GRID ================= */
    const renderCalendarGrid = () => {
        const daysInMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
        ).getDate();

        const firstDay = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
        ).getDay();

        const days = [];

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty" />);
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
                                {ev.status === 'approved' && '✔ '}
                                {ev.status === 'rejected' && '✖ '}
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
            <h1>Pharma Expert Calendar</h1>

            <div className="calendar-grid">
                {renderCalendarGrid()}
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2>Schedule Expert Session</h2>
                        <p>{selectedDate?.toDateString()}</p>

                        {selectedEvent && (
                            <p>
                                Status: <b>{selectedEvent.status.toUpperCase()}</b>
                            </p>
                        )}

                        {!selectedEvent && (
                            <form onSubmit={handleScheduleSubmit}>
                                <select
                                    value={bookingType}
                                    onChange={e => setBookingType(e.target.value)}
                                >
                                    <option value="consultation">Consultation</option>
                                    <option value="regulatory">Regulatory</option>
                                    <option value="technical">Technical</option>
                                </select>

                                <textarea
                                    value={notes}
                                    onChange={e => setNotes(e.target.value)}
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
