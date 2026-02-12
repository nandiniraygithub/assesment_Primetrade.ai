import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { Trash2, LogOut, Loader2, User as UserIcon } from 'lucide-react';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAllNotes();
    }, []);

    const fetchAllNotes = async () => {
        try {
            const { data } = await api.get('/notes/admin/all');
            setNotes(data.notes);
        } catch (error) {
            console.error('Error fetching admin notes:', error);
            alert('Failed to fetch notes');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteNote = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user\'s note?')) return;
        try {
            await api.delete(`/notes/${id}`);
            setNotes(notes.filter(n => n._id !== id));
        } catch (error) {
            alert('Failed to delete note');
        }
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div style={{ textAlign: 'left' }}>
                    <h1>Admin Dashboard</h1>
                    <p style={{ color: '#94a3b8' }}>Welcome, {user?.name}. You are viewing ALL user notes.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#38bdf8' }}>
                        Back to My Dashboard
                    </Link>
                    <button onClick={logout} style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#ef4444', color: 'white' }}>
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </header>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
                    <Loader2 className="animate-spin" />
                </div>
            ) : notes.length === 0 ? (
                <p>No notes found in the system.</p>
            ) : (
                <div className="grid">
                    {notes.map(note => (
                        <div key={note._id} className="note-card" style={{ position: 'relative', borderTop: '4px solid #3b82f6' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <h4 style={{ margin: 0, color: '#38bdf8' }}>{note.title}</h4>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.5rem' }}>
                                        <UserIcon size={14} />
                                        <span>{note.user?.name || 'Unknown User'}</span>
                                        <span>•</span>
                                        <span>{note.user?.email}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDeleteNote(note._id)}
                                    style={{ width: 'auto', padding: '0.5rem', background: 'transparent', color: '#ef4444', cursor: 'pointer' }}
                                    title="Delete this note"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '1rem', whiteSpace: 'pre-wrap' }}>
                                {note.content}
                            </p>
                            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                                {new Date(note.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
