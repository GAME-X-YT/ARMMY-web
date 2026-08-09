// import React, { useState, useEffect } from 'react';

// export default function SoldierEditModule() {
//     const [soldiers, setSoldiers] = useState<any[]>([]);
//     const [selectedId, setSelectedId] = useState('');
//     const [formData, setFormData] = useState<any>({});
//     const [statusMessage, setStatusMessage] = useState('');
    
//     // States for adding custom dynamic fields
//     const [newFieldKey, setNewFieldKey] = useState('');
//     const [newFieldValue, setNewFieldValue] = useState('');

//     // Fetch all soldiers to populate the "Army ID Switcher" dropdown
//     useEffect(() => {
//         fetch('http://localhost:5000/api/soldiers')
//             .then(res => res.json())
//             .then(data => {
//                 if (data.success) {
//                     setSoldiers(data.data);
//                     if (data.data.length > 0) {
//                         setSelectedId(data.data[0].soldierId);
//                         setFormData(data.data[0]);
//                     }
//                 }
//             })
//             .catch(err => console.error('Error fetching soldiers:', err));
//     }, []);

//     // Handle switching between soldiers using the Army ID
//     const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         const id = e.target.value;
//         setSelectedId(id);
//         const found = soldiers.find(s => s.soldierId === id);
//         if (found) setFormData(found);
//     };

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     // Handle image file upload so admin can change the profile picture
//     const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (!file) return;

//         const uploadData = new FormData();
//         uploadData.append('soldierImage', file);

//         try {
//             const res = await fetch('http://localhost:5000/api/soldiers/upload', {
//                 method: 'POST',
//                 body: uploadData
//             });
//             const data = await res.json();
//             if (data.success) {
//                 setFormData({ ...formData, image: data.imageUrl });
//                 setStatusMessage('Image uploaded and linked successfully.');
//             } else {
//                 setStatusMessage('Image upload failed.');
//             }
//         } catch (err) {
//             setStatusMessage('Error uploading image file.');
//         }
//     };

//     // Function to add a brand new custom detail field
//     const handleAddCustomField = () => {
//         if (!newFieldKey.trim()) return;
//         setFormData({
//             ...formData,
//             [newFieldKey.trim()]: newFieldValue
//         });
//         setNewFieldKey('');
//         setNewFieldValue('');
//         setStatusMessage('Custom detail added. Click Save Changes to commit.');
//     };

//     // Save all changes to the backend database
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             const res = await fetch(`http://localhost:5000/api/soldiers/${selectedId}`, {
//                 method: 'PUT',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(formData)
//             });
//             const data = await res.json();
//             if (data.success) {
//                 setStatusMessage('All personnel profile details updated successfully!');
//             } else {
//                 setStatusMessage('Failed to update record.');
//             }
//         } catch (err) {
//             setStatusMessage('Server error during update.');
//         }
//     };

//     return (
//         <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg text-white max-h-[85vh] overflow-y-auto">
//             <h2 className="text-xl font-bold text-amber-500 mb-4 uppercase tracking-wider">1. Complete Personnel Record Editor</h2>
            
//             {/* Army ID Switcher Dropdown */}
//             <div className="mb-6">
//                 <label className="block text-sm text-neutral-400 mb-2">Select Soldier by Army ID (Switch Target):</label>
//                 <select 
//                     value={selectedId} 
//                     onChange={handleSelectChange}
//                     className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded font-mono text-amber-400"
//                 >
//                     {soldiers.map(s => (
//                         <option key={s.soldierId} value={s.soldierId}>
//                             {s.soldierId} — {s.name} ({s.rank})
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             {/* Editable Form for ALL Details */}
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                         <label className="block text-xs text-neutral-400">Full Name</label>
//                         <input type="text" name="name" value={formData.name || ''} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-sm text-white" />
//                     </div>
//                     <div>
//                         <label className="block text-xs text-neutral-400">Rank</label>
//                         <input type="text" name="rank" value={formData.rank || ''} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-sm text-white" />
//                     </div>
//                     <div>
//                         <label className="block text-xs text-neutral-400">Unit</label>
//                         <input type="text" name="unit" value={formData.unit || ''} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-sm text-white" />
//                     </div>
//                     <div>
//                         <label className="block text-xs text-neutral-400">Status</label>
//                         <input type="text" name="status" value={formData.status || ''} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-sm text-white" />
//                     </div>
//                     <div>
//                         <label className="block text-xs text-neutral-400">Location</label>
//                         <input type="text" name="location" value={formData.location || ''} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-sm text-white" />
//                     </div>
//                     <div>
//                         <label className="block text-xs text-neutral-400">Clearance Level</label>
//                         <input type="text" name="clearanceLevel" value={formData.clearanceLevel || ''} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-sm text-white" />
//                     </div>
//                     <div>
//                         <label className="block text-xs text-neutral-400">Enlistment Date</label>
//                         <input type="text" name="enlistmentDate" value={formData.enlistmentDate || ''} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-sm text-white" />
//                     </div>
//                     <div>
//                         <label className="block text-xs text-neutral-400">Age</label>
//                         <input type="text" name="age" value={formData.age || ''} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-sm text-white" />
//                     </div>
//                     <div>
//                         <label className="block text-xs text-neutral-400">Blood Type</label>
//                         <input type="text" name="bloodType" value={formData.bloodType || ''} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-sm text-white" />
//                     </div>
//                     <div>
//                         <label className="block text-xs text-neutral-400">Marital Status</label>
//                         <input type="text" name="maritalStatus" value={formData.maritalStatus || ''} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-sm text-white" />
//                     </div>
//                     <div>
//                         <label className="block text-xs text-neutral-400">Annual Income Bracket</label>
//                         <input type="text" name="annualIncome" value={formData.annualIncome || ''} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-sm text-white" />
//                     </div>
//                     <div>
//                         <label className="block text-xs text-neutral-400">Total Benefits</label>
//                         <input type="text" name="totalBenefits" value={formData.totalBenefits || ''} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-sm text-white" />
//                     </div>
//                 </div>

//                 {/* Profile Image Change Section */}
//                 <div className="border-t border-neutral-800 pt-4">
//                     <label className="block text-xs text-neutral-400 mb-1">Update Soldier Profile Image</label>
//                     <input type="file" onChange={handleImageUpload} className="w-full text-xs text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-neutral-800 file:text-amber-400 hover:file:bg-neutral-700" />
//                     {formData.image && <p className="text-xs text-neutral-500 mt-1 truncate">Current Image Path: {formData.image}</p>}
//                 </div>

//                 {/* Dynamic Custom Fields Section (Add More Details) */}
//                 <div className="border-t border-neutral-800 pt-4">
//                     <label className="block text-sm text-amber-400 mb-2 font-semibold">Add Custom Details / Fields</label>
//                     <div className="flex gap-2 mb-2">
//                         <input 
//                             type="text" 
//                             placeholder="Field Name (e.g. DeploymentCount)" 
//                             value={newFieldKey} 
//                             onChange={(e) => setNewFieldKey(e.target.value)}
//                             className="flex-1 bg-neutral-800 border border-neutral-700 p-2 text-xs rounded text-white"
//                         />
//                         <input 
//                             type="text" 
//                             placeholder="Field Value (e.g. 3 Tours)" 
//                             value={newFieldValue} 
//                             onChange={(e) => setNewFieldValue(e.target.value)}
//                             className="flex-1 bg-neutral-800 border border-neutral-700 p-2 text-xs rounded text-white"
//                         />
//                         <button type="button" onClick={handleAddCustomField} className="bg-neutral-700 hover:bg-neutral-600 px-3 py-2 text-xs rounded font-bold">
//                             Add Field
//                         </button>
//                     </div>
//                 </div>

//                 <button type="submit" className="w-full bg-amber-600 hover:bg-amber-500 text-black font-bold py-2.5 rounded transition-colors uppercase tracking-wider text-sm mt-4">
//                     Save All Profile Changes
//                 </button>
//                 {statusMessage && <p className="text-xs mt-2 text-green-400 text-center">{statusMessage}</p>}
//             </form>
//         </div>
//     );
// }


import React, { useState, useEffect } from 'react';
import { Award } from 'lucide-react';

interface SoldierEditModuleProps {
    onEditCertificate?: (soldier: any) => void;
}

export default function SoldierEditModule({ onEditCertificate }: SoldierEditModuleProps) {
    const [soldiers, setSoldiers] = useState<any[]>([]);
    const [selectedId, setSelectedId] = useState('');
    const [formData, setFormData] = useState<any>({});
    const [statusMessage, setStatusMessage] = useState('');
    const API_URL = import.meta.env.PROD 
  ? 'https://arrmy-backend.onrender.com' 
  : 'http://localhost:5000';
    
    // States for adding custom dynamic fields
    const [newFieldKey, setNewFieldKey] = useState('');
    const [newFieldValue, setNewFieldValue] = useState('');

    // Fetch all soldiers to populate the "Army ID Switcher" dropdown
    useEffect(() => {
        fetch(`${API_URL}/api/soldiers`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setSoldiers(data.data);
                    if (data.data.length > 0) {
                        setSelectedId(data.data[0].soldierId);
                        setFormData(data.data[0]);
                    }
                }
            })
            .catch(err => console.error('Error fetching soldiers:', err));
    }, []);

    // Handle switching between soldiers using the Army ID
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value;
        setSelectedId(id);
        const found = soldiers.find(s => s.soldierId === id);
        if (found) setFormData(found);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle image file upload so admin can change the profile picture
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const uploadData = new FormData();
        uploadData.append('soldierImage', file);

        try {
            const res = await fetch(`${API_URL}/api/soldiers/upload`, {
                method: 'POST',
                body: uploadData
            });
            const data = await res.json();
            if (data.success) {
                setFormData({ ...formData, image: data.imageUrl });
                setStatusMessage('Image uploaded and linked successfully.');
            } else {
                setStatusMessage('Image upload failed.');
            }
        } catch (err) {
            setStatusMessage('Error uploading image file.');
        }
    };

    // Function to add a brand new custom detail field
    const handleAddCustomField = () => {
        if (!newFieldKey.trim()) return;
        setFormData({
            ...formData,
            [newFieldKey.trim()]: newFieldValue
        });
        setNewFieldKey('');
        setNewFieldValue('');
        setStatusMessage('Custom detail added. Click Save Changes to commit.');
    };

    // Save all changes to the backend database
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/api/soldiers/${selectedId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success) {
                setStatusMessage('All personnel profile details updated successfully!');
            } else {
                setStatusMessage('Failed to update record.');
            }
        } catch (err) {
            setStatusMessage('Server error during update.');
        }
    };

    return (
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg text-white max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-amber-500 uppercase tracking-wider">1. Complete Personnel Record Editor</h2>
                
                {/* Trigger Certificate Edit Modal for currently selected soldier */}
                {onEditCertificate && formData && (
                    <button
                        type="button"
                        onClick={() => onEditCertificate(formData)}
                        className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-600/40 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
                    >
                        <Award size={14} /> Edit Certificate
                    </button>
                )}
            </div>
            
            {/* Army ID Switcher Dropdown */}
            <div className="mb-6">
                <label className="block text-sm text-neutral-400 mb-2">Select Soldier by Army ID (Switch Target):</label>
                <select 
                    value={selectedId} 
                    onChange={handleSelectChange}
                    className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded font-mono text-amber-400"
                >
                    {soldiers.map(s => (
                        <option key={s.soldierId} value={s.soldierId}>
                            {s.soldierId} — {s.name} ({s.rank})
                        </option>
                    ))}
                </select>
            </div>

            {/* Editable Form for ALL Details */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs text-neutral-400">Full Name</label>
                        <input type="text" name="name" value={formData.name || ''} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-sm text-white" />
                    </div>
                    <div>
                        <label className="block text-xs text-neutral-400">Rank</label>
                        <input type="text" name="rank" value={formData.rank || ''} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-sm text-white" />
                    </div>
                    <div>
                        <label className="block text-xs text-neutral-400">Unit</label>
                        <input type="text" name="unit" value={formData.unit || ''} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-sm text-white" />
                    </div>
                    <div>
                        <label className="block text-xs text-neutral-400">Status</label>
                        <input type="text" name="status" value={formData.status || ''} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-sm text-white" />
                    </div>
                    <div>
                        <label className="block text-xs text-neutral-400">Location</label>
                        <input type="text" name="location" value={formData.location || ''} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-sm text-white" />
                    </div>
                    <div>
                        <label className="block text-xs text-neutral-400">Clearance Level</label>
                        <input type="text" name="clearanceLevel" value={formData.clearanceLevel || ''} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-sm text-white" />
                    </div>
                    <div>
                        <label className="block text-xs text-neutral-400">MOS</label>
                        <input type="text" name="mos" value={formData.mos || ''} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-sm text-white" />
                    </div>
                    <div>
                        <label className="block text-xs text-neutral-400">Career Field</label>
                        <input type="text" name="careerField" value={formData.careerField || ''} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-sm text-white" />
                    </div>
                    <div>
                        <label className="block text-xs text-neutral-400">Enlistment Date</label>
                        <input type="text" name="enlistmentDate" value={formData.enlistmentDate || ''} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-sm text-white" />
                    </div>
                    <div>
                        <label className="block text-xs text-neutral-400">Age</label>
                        <input type="text" name="age" value={formData.age || ''} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-sm text-white" />
                    </div>
                    <div>
                        <label className="block text-xs text-neutral-400">Blood Type</label>
                        <input type="text" name="bloodType" value={formData.bloodType || ''} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-sm text-white" />
                    </div>
                    <div>
                        <label className="block text-xs text-neutral-400">Marital Status</label>
                        <input type="text" name="maritalStatus" value={formData.maritalStatus || ''} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-sm text-white" />
                    </div>
                    <div>
                        <label className="block text-xs text-neutral-400">Annual Income Bracket</label>
                        <input type="text" name="annualIncome" value={formData.annualIncome || ''} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-sm text-white" />
                    </div>
                    <div>
                        <label className="block text-xs text-neutral-400">Total Benefits</label>
                        <input type="text" name="totalBenefits" value={formData.totalBenefits || ''} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-sm text-white" />
                    </div>
                </div>


                {/* Profile Image Change Section */}
                <div className="border-t border-neutral-800 pt-4">
                    <label className="block text-xs text-neutral-400 mb-1">Update Soldier Profile Image</label>
                    <input type="file" onChange={handleImageUpload} className="w-full text-xs text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-neutral-800 file:text-amber-400 hover:file:bg-neutral-700" />
                    {formData.image && <p className="text-xs text-neutral-500 mt-1 truncate">Current Image Path: {formData.image}</p>}
                </div>

                {/* Dynamic Custom Fields Section (Add More Details) */}
                <div className="border-t border-neutral-800 pt-4">
                    <label className="block text-sm text-amber-400 mb-2 font-semibold">Add Custom Details / Fields</label>
                    <div className="flex gap-2 mb-2">
                        <input 
                            type="text" 
                            placeholder="Field Name (e.g. DeploymentCount)" 
                            value={newFieldKey} 
                            onChange={(e) => setNewFieldKey(e.target.value)}
                            className="flex-1 bg-neutral-800 border border-neutral-700 p-2 text-xs rounded text-white"
                        />
                        <input 
                            type="text" 
                            placeholder="Field Value (e.g. 3 Tours)" 
                            value={newFieldValue} 
                            onChange={(e) => setNewFieldValue(e.target.value)}
                            className="flex-1 bg-neutral-800 border border-neutral-700 p-2 text-xs rounded text-white"
                        />
                        <button type="button" onClick={handleAddCustomField} className="bg-neutral-700 hover:bg-neutral-600 px-3 py-2 text-xs rounded font-bold">
                            Add Field
                        </button>
                    </div>
                </div>

                <button type="submit" className="w-full bg-amber-600 hover:bg-amber-500 text-black font-bold py-2.5 rounded transition-colors uppercase tracking-wider text-sm mt-4">
                    Save All Profile Changes
                </button>
                {statusMessage && <p className="text-xs mt-2 text-green-400 text-center">{statusMessage}</p>}
            </form>
        </div>
    );
}