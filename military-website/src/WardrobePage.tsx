import { useState } from 'react';
import { Shield, ArrowLeft, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GearItem {
    id: string;
    name: string;
    category: string;
    clearance: string;
    status: 'IN STOCK' | 'RESTRICTED' | 'DEPLOYED';
    description: string;
    imagePlaceholder: string;
}

const mockGearList: GearItem[] = [
    {
        id: 'GEAR-01',
        name: 'Standard Issue Combat BDU (Multicam)',
        category: 'Uniforms',
        clearance: 'Public / Personnel',
        status: 'IN STOCK',
        description: 'Reinforced rip-stop fabric designed for extreme field environments. Integrated infrared-management threading.',
        imagePlaceholder: '🪖'
    },
    {
        id: 'GEAR-02',
        name: 'Level IV Ballistic Plate Carrier',
        category: 'Protection',
        clearance: 'Authorized Personnel',
        status: 'IN STOCK',
        description: 'Modular tactical vest with ceramic composite plates capable of stopping high-velocity rounds.',
        imagePlaceholder: '🛡️'
    },
    {
        id: 'GEAR-03',
        name: 'Tactical Assault Helmet (Ops-Core Style)',
        category: 'Protection',
        clearance: 'Authorized Personnel',
        status: 'IN STOCK',
        description: 'High-cut ballistic helmet featuring night-vision shroud and side rail accessory attachments.',
        imagePlaceholder: '🪖'
    },
    {
        id: 'GEAR-04',
        name: 'Endurance Operator Cargo Boots',
        category: 'Footwear',
        clearance: 'Public / Personnel',
        status: 'IN STOCK',
        description: 'Waterproof, puncture-resistant duty boots engineered for long-range tactical marches.',
        imagePlaceholder: '🥾'
    },
    {
        id: 'GEAR-05',
        name: 'Command-Issue Chronograph Watch',
        category: 'Accessories',
        clearance: 'Command Only',
        status: 'RESTRICTED',
        description: 'Encrypted tactical timepiece with GPS positioning, altimeter, and rugged titanium casing.',
        imagePlaceholder: '⌚'
    },
    {
        id: 'GEAR-06',
        name: 'Multi-Day Recon Backpack (72L)',
        category: 'Storage',
        clearance: 'Public / Personnel',
        status: 'DEPLOYED',
        description: 'Heavy-duty modular backpack with hydration bladder compatibility and ergonomic load support.',
        imagePlaceholder: '🎒'
    }
];

export default function WardrobePage() {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('ALL');

    const categories = ['ALL', 'Uniforms', 'Protection', 'Footwear', 'Accessories', 'Storage'];

    const filteredGear = selectedCategory === 'ALL' 
        ? mockGearList 
        : mockGearList.filter(item => item.category === selectedCategory);

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 font-mono p-4 md:p-8 pt-24">
            <div className="max-w-6xl mx-auto">
                
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
                            Quartermaster Inventory
                        </span>
                        <h1 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-white flex items-center gap-2">
                            <Shield className="text-amber-500" size={28} /> Authorized Wardrobe & Tactical Gear
                        </h1>
                    </div>
                    <div className="text-xs text-neutral-400 bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-xl flex items-center gap-2">
                        <Layers size={14} className="text-amber-500" /> TOTAL ASSETS: <span className="text-white font-bold">{mockGearList.length}</span>
                    </div>
                </div>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`text-xs uppercase px-4 py-2 rounded-xl border transition ${
                                selectedCategory === category 
                                    ? 'bg-amber-500 text-black border-amber-500 font-bold shadow-lg shadow-amber-500/20' 
                                    : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Gear Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGear.map((item) => (
                        <div key={item.id} className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between transition hover:border-amber-500/40">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-3xl p-3 bg-neutral-950 border border-neutral-800 rounded-xl">
                                        {item.imagePlaceholder}
                                    </span>
                                    <span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-full border ${
                                        item.status === 'IN STOCK' 
                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                                            : item.status === 'RESTRICTED'
                                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                            : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                    }`}>
                                        {item.status}
                                    </span>
                                </div>

                                <div className="text-[10px] uppercase tracking-wider text-amber-500 font-semibold mb-1">
                                    {item.category} • <span className="text-neutral-400">{item.clearance}</span>
                                </div>
                                <h3 className="text-base font-bold text-white mb-2">{item.name}</h3>
                                <p className="text-xs text-neutral-400 leading-relaxed mb-6">{item.description}</p>
                            </div>

                            <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                                <span className="text-neutral-500 font-mono">ID: {item.id}</span>
                                <button 
                                    onClick={() => alert(`Requisition request logged for ${item.name}. Command will review clearance.`)}
                                    className="bg-neutral-950 hover:bg-amber-500 hover:text-black text-amber-400 border border-amber-500/30 px-3 py-1.5 rounded-lg transition font-bold"
                                >
                                    Requisition
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}