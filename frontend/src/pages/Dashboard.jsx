import React, { useState, useEffect } from 'react'; // Ensure React and hooks are imported
import { useNavigate } from 'react-router-dom'; // Add useNavigate import
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Plus, Trash2, LogOut, Loader2 } from 'lucide-react';

const Dashboard = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { user, logout } = useAuth();
    const navigate = useNavigate(); // Add this import

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const { data } = await api.get('/notes');
            setNotes(data.notes);
        } catch (error) {
            console.error('Error fetching notes');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateNote = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/notes', { title, content });
            setNotes([data.note, ...notes]);
            setTitle('');
            setContent('');
        } catch (error) {
            alert('Failed to create note');
        }
    };

    const handleDeleteNote = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await api.delete(`/notes/${id}`);
            setNotes(notes.filter(n => n._id !== id));
        } catch (error) {
            alert('Failed to delete note');
        }
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div style={{ textAlign: 'left' }}>
                    <h1>Welcome, {user?.name} <span style={{ fontSize: '0.8rem', background: '#334155', padding: '0.2rem 0.6rem', borderRadius: '12px', verticalAlign: 'middle' }}>{user?.role}</span></h1>
                    <p style={{ color: '#94a3b8' }}>Manage your personal notes</p>
                    {user?.role === 'admin' && (
                        <button
                            onClick={() => navigate('/admin')}
                            style={{
                                marginTop: '0.5rem',
                                padding: '0.5rem 1rem',
                                background: '#3b82f6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            Go to Admin Dashboard
                        </button>
                    )}
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <button onClick={() => navigate('/profile')} style={{ width: 'auto', background: '#334155', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
                        Profile
                    </button>
                    <button onClick={logout} style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#ef4444', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </header>

            <div className="auth-card" style={{ maxWidth: 'none', marginBottom: '3rem' }}>
                <h3 style={{ marginTop: 0 }}>Create New Note</h3>
                <form onSubmit={handleCreateNote} style={{ textAlign: 'left' }}>
                    <div className="input-group">
                        <label>Title</label>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Note title..." />
                    </div>
                    <div className="input-group">
                        <label>Content</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            placeholder="Write your content here..."
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem',
                                background: '#1e293b',
                                border: '1px solid #334155',
                                borderRadius: '0.5rem',
                                color: 'white',
                                minHeight: '100px',
                                fontFamily: 'inherit'
                            }}
                        />
                    </div>
                    <button type="submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <Plus size={18} /> Add Note
                    </button>
                </form>
            </div>

            <div className="grid">
                {loading ? (
                    <div style={{ gridColumn: '1/-1', padding: '3rem' }}>
                        <Loader2 className="animate-spin" style={{ margin: '0 auto' }} />
                    </div>
                ) : notes.length === 0 ? (
                    <p style={{ gridColumn: '1/-1', color: '#94a3b8' }}>No notes found. Start by creating one!</p>
                ) : (
                    notes.map(note => (
                        <div key={note._id} className="note-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <h4 style={{ margin: 0, color: '#38bdf8' }}>{note.title}</h4>
                                <button
                                    onClick={() => handleDeleteNote(note._id)}
                                    style={{ width: 'auto', padding: '0.5rem', background: 'transparent', color: '#ef4444' }}
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
                    ))
                )}
            </div>
        </div>
    );
};

export default Dashboard;
