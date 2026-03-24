
import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import { renunganTemplates } from '../../data/lenteraHati';
import type { LenteraEntry } from '../../types';

type Reaction = 'like' | 'dislike';

const getUserId = (): string | null => {
    try {
        const authData = localStorage.getItem('tarbiyahAuth');
        return authData ? JSON.parse(authData).waNumber : null;
    } catch { return null; }
};

const USER_POSTS_STORAGE_KEY = 'tarbiyahLenteraHatiUserEntries';

// No props needed anymore
const LenteraHati: React.FC = () => {
    const [entries, setEntries] = useState<LenteraEntry[]>([]);
    const [userReactions, setUserReactions] = useState<Record<number, Reaction>>({});
    const [now, setNow] = useState(new Date());

    const userId = getUserId();
    const userReactionsKey = `lenteraHatiReactions_${userId || 'guest'}`;

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 60 * 1000); 
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        try {
            // 1. Load user-published posts (Dynamic Content - Created via Admin)
            const userPostsRaw = localStorage.getItem(USER_POSTS_STORAGE_KEY);
            const userPosts: LenteraEntry[] = userPostsRaw ? JSON.parse(userPostsRaw) : [];

            // 2. Generate scheduled posts (Static Content)
            const generatedEntries: LenteraEntry[] = [];
            const genesisDate = new Date('2023-11-01T00:00:00Z');
            const todayDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

            let currentDate = new Date(genesisDate);
            while (currentDate <= todayDateOnly) {
                const diffTime = Math.abs(currentDate.getTime() - genesisDate.getTime());
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                
                const template = renunganTemplates[diffDays % renunganTemplates.length];
                const dateStringForHash = currentDate.toISOString().split('T')[0];
                let hash = 0;
                for (let i = 0; i < dateStringForHash.length; i++) {
                    hash = ((hash << 5) - hash) + dateStringForHash.charCodeAt(i);
                    hash |= 0; 
                }
                const hour = 5 + (Math.abs(hash) % 18); 
                const minute = Math.abs(hash) % 60;
                const entryDate = new Date(currentDate);
                entryDate.setHours(hour, minute, 0, 0);

                generatedEntries.push({
                    id: genesisDate.getTime() + diffDays,
                    date: entryDate.toISOString(),
                    title: template.title,
                    content: template.content,
                    likes: 0,
                    dislikes: 0,
                    location: 'Cibinong',
                });
                currentDate.setDate(currentDate.getDate() + 1);
            }

            const userReactionsRaw = localStorage.getItem(userReactionsKey);
            if (userReactionsRaw) {
                setUserReactions(JSON.parse(userReactionsRaw));
            }

            // Combine and sort
            const allPossibleEntries = [...userPosts, ...generatedEntries];
            const finalVisibleEntries = allPossibleEntries
                .filter(entry => new Date(entry.date) <= now)
                .map(entry => {
                    const reactionDataRaw = localStorage.getItem(`lentera_reaction_counts_${entry.id}`);
                    if (reactionDataRaw) {
                        const { likes, dislikes } = JSON.parse(reactionDataRaw);
                        return { ...entry, likes: likes || 0, dislikes: dislikes || 0 };
                    }
                    return entry;
                })
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

            setEntries(finalVisibleEntries);

        } catch (error) {
            console.error("Failed to load Lentera Hati data:", error);
            setEntries([]);
        }
    }, [now.getDate(), userReactionsKey]);

    const handleReaction = (entryId: number, reaction: Reaction) => {
        const currentReaction = userReactions[entryId];
        const entry = entries.find(e => e.id === entryId);
        if (!entry) return;

        let newLikes = entry.likes;
        let newDislikes = entry.dislikes;
        
        if (currentReaction === 'like') newLikes = Math.max(0, newLikes - 1);
        if (currentReaction === 'dislike') newDislikes = Math.max(0, newDislikes - 1);
        
        const updatedUserReactions = { ...userReactions };
        
        if (currentReaction === reaction) {
            delete updatedUserReactions[entryId];
        } else {
            updatedUserReactions[entryId] = reaction;
            if (reaction === 'like') newLikes++;
            if (reaction === 'dislike') newDislikes++;
        }
        
        setEntries(entries.map(e => e.id === entryId ? { ...e, likes: newLikes, dislikes: newDislikes } : e));
        setUserReactions(updatedUserReactions);
        
        if (userId) localStorage.setItem(userReactionsKey, JSON.stringify(updatedUserReactions));
        localStorage.setItem(`lentera_reaction_counts_${entryId}`, JSON.stringify({ likes: newLikes, dislikes: newDislikes }));
        
        const userPostsRaw = localStorage.getItem(USER_POSTS_STORAGE_KEY);
        if (userPostsRaw) {
            let userPosts: LenteraEntry[] = JSON.parse(userPostsRaw);
            const postIndex = userPosts.findIndex(p => p.id === entryId);
            if (postIndex > -1) {
                userPosts[postIndex].likes = newLikes;
                userPosts[postIndex].dislikes = newDislikes;
                localStorage.setItem(USER_POSTS_STORAGE_KEY, JSON.stringify(userPosts));
            }
        }
    };
    
    return (
        <section id="lentera-hati" className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-2 text-white">Lentera Hati</h2>
            <p className="text-gray-400 mb-6">Renungan harian untuk menyejukkan jiwa.</p>
            
            <div className="space-y-6">
                {entries.length > 0 ? entries.map(entry => (
                    <Card key={entry.id}>
                        <h3 className="text-2xl font-bold text-white mb-1 flex items-center flex-wrap">
                            <span>{entry.title}</span>
                             {entry.isGiveaway && (
                                <span className="ml-3 px-2 py-1 text-xs font-bold bg-yellow-500 text-yellow-900 rounded-full flex items-center"><i className="fas fa-gift mr-1"></i> GIVEAWAY</span>
                            )}
                        </h3>
                        <div className="text-xs text-gray-400 mb-4 flex flex-wrap items-center gap-x-4 gap-y-1">
                            <span><i className="fas fa-calendar-alt mr-2"></i>{new Date(entry.date).toLocaleString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            <span><i className="fas fa-clock mr-2"></i>{new Date(entry.date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</span>
                             <span><i className="fas fa-map-marker-alt mr-2"></i>{entry.location || 'Cibinong'}</span>
                        </div>
                        <p className="text-gray-300 whitespace-pre-line leading-relaxed">{entry.content}</p>
                        <div className="text-right mt-4"><p className="font-semibold italic text-primary">- Rojudin -</p></div>
                        <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-700">
                            <div className="flex gap-4">
                                <button onClick={() => handleReaction(entry.id, 'like')} className={`flex items-center gap-2 text-sm ${userReactions[entry.id] === 'like' ? 'text-primary font-bold' : 'text-gray-400 hover:text-white'}`}><i className="fas fa-thumbs-up"></i> {entry.likes}</button>
                                <button onClick={() => handleReaction(entry.id, 'dislike')} className={`flex items-center gap-2 text-sm ${userReactions[entry.id] === 'dislike' ? 'text-red-500 font-bold' : 'text-gray-400 hover:text-white'}`}><i className="fas fa-thumbs-down"></i> {entry.dislikes}</button>
                            </div>
                        </div>
                    </Card>
                )) : (
                    <Card className="text-center py-10"><p className="text-gray-400">Belum ada catatan yang diterbitkan.</p></Card>
                )}
            </div>
        </section>
    );
};

export default LenteraHati;
