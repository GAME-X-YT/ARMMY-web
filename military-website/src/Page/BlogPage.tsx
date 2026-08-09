import { useState, useEffect } from 'react';
import { Radio, Calendar, FileText, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Post {
    _id: string;
    title: string;
    category: string;
    content: string;
    author: string;
    date: string;
    clearanceLevel: string;
}

export default function BlogPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const API_URL = import.meta.env.PROD 
  ? 'https://arrmy-backend.onrender.com' 
  : 'http://localhost:5000';

    // Fetch posts on load
    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch(`${API_URL}/api/blog/posts`);
            const data = await res.json();
            if (data.success) {
                setPosts(data.posts);
            } else {
                throw new Error(data.error || 'Failed to fetch dispatches.');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 font-mono p-4 md:p-8 pt-24">
            <div className="max-w-4xl mx-auto">
                
                {/* Back to Home Button */}
                <button 
                    onClick={() => navigate('/')}
                    className="mb-6 text-xs text-neutral-400 hover:text-amber-400 flex items-center gap-2 transition group bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-xl w-fit"
                >
                    <ArrowLeft size={14} className="transition group-hover:-translate-x-1" /> Return to Home Command
                </button>

                {/* Header */}
                <div className="border-b border-amber-500/30 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/20 inline-block mb-2">
                            Secure Network Broadcast
                        </span>
                        <h1 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-white flex items-center gap-2">
                            <Radio className="text-amber-500 animate-pulse" size={28} /> Command Dispatches & Intel
                        </h1>
                    </div>
                    <div className="text-xs text-neutral-400 bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-xl">
                        STATUS: <span className="text-emerald-400 font-bold">READ-ONLY FEED</span>
                    </div>
                </div>

                {/* ERROR STATE */}
                {error && (
                    <div className="mb-6 p-4 bg-red-950/40 border border-red-800/60 rounded-xl text-red-400 text-xs text-center">
                        {error}
                    </div>
                )}

                {/* FEED OF POSTS */}
                <div className="space-y-6">
                    {loading ? (
                        <div className="text-center py-12 text-neutral-500 text-xs">Decrypting secure feeds...</div>
                    ) : posts.length === 0 ? (
                        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-12 text-center text-neutral-400 text-xs">
                            <FileText size={36} className="mx-auto mb-3 opacity-40 text-amber-500" />
                            No dispatches recorded on the network yet.
                        </div>
                    ) : (
                        posts.map((post) => (
                            <div key={post._id} className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 shadow-lg transition hover:border-amber-500/40">
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                                    <span className="text-[10px] uppercase tracking-wider bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full border border-amber-500/20 font-bold">
                                        {post.category}
                                    </span>
                                    <div className="flex items-center gap-3 text-[10px] text-neutral-400">
                                        <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(post.date).toLocaleDateString()}</span>
                                        <span>•</span>
                                        <span>AUTH: <strong className="text-neutral-300">{post.author}</strong></span>
                                    </div>
                                </div>

                                <h2 className="text-lg font-bold text-white mb-2 tracking-wide">{post.title}</h2>
                                <p className="text-xs text-neutral-300 leading-relaxed whitespace-pre-wrap">{post.content}</p>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
}