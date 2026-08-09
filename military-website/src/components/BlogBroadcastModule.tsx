import React, { useState } from 'react';

export default function BlogBroadcastModule() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('OPERATIONS');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const API_URL = import.meta.env.PROD 
  ? 'https://arrmy-backend.onrender.com' 
  : 'http://localhost:5000';

    // Handle image file upload to server
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const uploadData = new FormData();
        uploadData.append('soldierImage', file); // Matches your multer configuration in server.ts

        try {
            const res = await fetch(`${API_URL}/api/soldiers/upload`, {
                method: 'POST',
                body: uploadData
            });
            const data = await res.json();
            if (data.success) {
                setImageUrl(data.imageUrl);
                setStatusMessage('Image uploaded successfully.');
            } else {
                setStatusMessage('Image upload failed.');
            }
        } catch (err) {
            setStatusMessage('Error uploading image file.');
        }
    };

    // Submit blog post
    const handleSubmitPost = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/api/blog/posts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    category,
                    content,
                    imageUrl,
                    soldierId: 'USA-9942-SV' // Admin session validation ID
                })
            });
            const data = await res.json();
            if (data.success) {
                setStatusMessage('Dispatch broadcasted to blog successfully!');
                setTitle('');
                setContent('');
                setImageUrl('');
            } else {
                setStatusMessage(data.message || 'Failed to broadcast dispatch.');
            }
        } catch (err) {
            setStatusMessage('Server connection error.');
        }
    };

    return (
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg text-white">
            <h2 className="text-xl font-bold text-amber-500 mb-4 uppercase tracking-wider">3. Broadcast News & Blog Update</h2>
            <form onSubmit={handleSubmitPost} className="space-y-4">
                <div>
                    <label className="block text-sm text-neutral-400">Dispatch Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-white" required />
                </div>
                <div>
                    <label className="block text-sm text-neutral-400">Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-white">
                        <option value="OPERATIONS">OPERATIONS</option>
                        <option value="INTEL">INTEL</option>
                        <option value="ANNOUNCEMENT">ANNOUNCEMENT</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm text-neutral-400">Upload Image / Media</label>
                    <input type="file" onChange={handleImageUpload} className="w-full text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-neutral-800 file:text-amber-400 hover:file:bg-neutral-700" />
                    {imageUrl && <p className="text-xs text-green-400 mt-1">Image Attached: {imageUrl}</p>}
                </div>
                <div>
                    <label className="block text-sm text-neutral-400">Caption / Content Information</label>
                    <textarea rows={4} value={content} onChange={(e) => setContent(e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-white" required />
                </div>
                <button type="submit" className="bg-amber-600 hover:bg-amber-500 text-black font-bold px-4 py-2 rounded transition-colors">
                    Publish to User Blog Page
                </button>
                {statusMessage && <p className="text-sm mt-2 text-green-400">{statusMessage}</p>}
            </form>
        </div>
    );
}