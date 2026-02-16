import React, { useEffect, useState } from 'react';
import { Send, CheckCircle, Clock } from 'lucide-react';
import { communityAPI } from '../../services/api';
import './ChatManagement.css';

const ChatManagement = () => {

    const [enquiries, setEnquiries] = useState([]);
    const [answeringId, setAnsweringId] = useState(null);
    const [replyText, setReplyText] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadEnquiries = async () => {
            try {
                const res = await communityAPI.getAllAdmin();

                const formatted = res.data.map(q => ({
                    id: q.id,
                    user: q.user_name || "Anonymous",
                    question: q.question,
                    date: q.created_at?.split("T")[0],
                    status: "Pending",
                    answer: ""
                }));

                setEnquiries(formatted);
            } catch (err) {
                console.error(err);
                setError("Unable to fetch enquiries");
            } finally {
                setLoading(false);
            }
        };

        loadEnquiries();
    }, []);

    const handleReplyClick = (id) => {
        setAnsweringId(id);
        setReplyText("");
    };

    const handleSubmitReply = async (id) => {
        if (!replyText.trim()) return;

        try {
            await communityAPI.answerQuestion(id, { answer: replyText });

            setEnquiries(prev =>
                prev.map(enq =>
                    enq.id === id
                        ? { ...enq, status: "Answered", answer: replyText }
                        : enq
                )
            );

            setAnsweringId(null);
            setReplyText("");
        } catch (err) {
            console.error(err);
            alert("Answer submission failed");
        }
    };

    if (loading) return <div className="admin-chat-container">Loading enquiries...</div>;
    if (error) return <div className="admin-chat-container">❌ {error}</div>;

    return (
        <div className="admin-chat-container">
            <h2>Public Chat Enquiries</h2>

            <div className="chat-card">
                <table className="chat-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User</th>
                            <th>Question</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {enquiries.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="no-enquiries">
                                    <CheckCircle size={40} />
                                    <div>No pending enquiries</div>
                                </td>
                            </tr>
                        ) : enquiries.map(enq => (
                            <tr key={enq.id}>
                                <td>#{enq.id}</td>
                                <td>
                                    <strong>{enq.user}</strong><br />
                                    <small>{enq.date}</small>
                                </td>
                                <td>{enq.question}</td>
                                <td>
                                    <span className={`status-badge ${
                                        enq.status === "Answered"
                                            ? "status-answered"
                                            : "status-pending"
                                    }`}>
                                        {enq.status === "Answered"
                                            ? <CheckCircle size={12} />
                                            : <Clock size={12} />}
                                        {enq.status}
                                    </span>
                                </td>
                                <td>
                                    {answeringId === enq.id ? (
                                        <>
                                            <textarea
                                                rows="3"
                                                className="reply-textarea"
                                                value={replyText}
                                                onChange={e => setReplyText(e.target.value)}
                                            />
                                            <button
                                                className="send-btn"
                                                onClick={() => handleSubmitReply(enq.id)}
                                            >
                                                <Send size={14} /> Send
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            className="reply-btn"
                                            onClick={() => handleReplyClick(enq.id)}
                                        >
                                            <Send size={14} /> Reply
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ChatManagement;
