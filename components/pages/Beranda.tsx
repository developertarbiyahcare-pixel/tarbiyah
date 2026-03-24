
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import VerseOfTheDay from '../ui/VerseOfTheDay';
import PrayerTimes from '../ui/PrayerTimes';
import { useLanguage } from '../../contexts/LanguageContext';
import Card from '../ui/Card';
import { islamicQuotes } from '../../data/quotes';
import { journeyData } from '../../data/journey';
import ProgressRing from '../ui/ProgressRing';
import type { ConsultationHistoryItem, SearchHistoryItem, LenteraEntry } from '../../types';
import { renunganTemplates } from '../../data/lenteraHati';
import { doaData } from '../../data/doa';

// Helper to get user-specific storage key
const getUserId = (): string | null => {
    try {
        const authData = localStorage.getItem('tarbiyahAuth');
        if (authData) {
            return JSON.parse(authData).waNumber;
        }
        return null;
    } catch (error) {
        console.error("Failed to parse auth data from localStorage:", error);
        return null;
    }
};

type CombinedHistoryItem = ConsultationHistoryItem | SearchHistoryItem;

const Beranda: React.FC = () => {
    const { lang, t } = useLanguage();
    const today = new Date();

    // State for Quote of the Day
    const quoteOfTheDay = useMemo(() => {
        const customQuotesRaw = localStorage.getItem('tarbiyahCustomQuotes');
        const customQuotes = customQuotesRaw ? JSON.parse(customQuotesRaw) : [];
        const allQuotes = [...islamicQuotes, ...customQuotes];
        const dayIndex = today.getDate() % allQuotes.length;
        return allQuotes[dayIndex];
    }, [today]);

    // State for Achievement Summary
    const [journeyProgress, setJourneyProgress] = useState(0);
    const [roadmapProgress, setRoadmapProgress] = useState(0);
    const [recentHistory, setRecentHistory] = useState<CombinedHistoryItem[]>([]);

    // State for dynamic stats
    const [verifiedUsers, setVerifiedUsers] = useState(100);
    const [onlineUsers, setOnlineUsers] = useState(75);

    // Effect for total verified users (Starts at 100, increments by 1 every 5 minutes, persistent)
    useEffect(() => {
        const STORAGE_KEY_START_TIME = 'tarbiyahVerifiedStartTime';
        const BASE_COUNT = 100;
        const INCREMENT_MS = 5 * 60 * 1000; // 5 minutes in milliseconds

        // Get or set the start time
        let startTimeStr = localStorage.getItem(STORAGE_KEY_START_TIME);
        let startTime: number;

        if (!startTimeStr) {
            startTime = Date.now();
            localStorage.setItem(STORAGE_KEY_START_TIME, startTime.toString());
        } else {
            startTime = parseInt(startTimeStr, 10);
        }

        const updateCount = () => {
            const now = Date.now();
            const timeDiff = now - startTime;
            const increments = Math.floor(timeDiff / INCREMENT_MS);
            setVerifiedUsers(BASE_COUNT + increments);
        };

        // Initial calculation
        updateCount();

        // Check every second to update UI exactly when the 5-minute mark hits
        const interval = setInterval(updateCount, 1000);

        return () => clearInterval(interval);
    }, []);

    // Effect for online users (Starts at 75, fluctuates up/down in realtime)
    useEffect(() => {
        const interval = setInterval(() => {
            setOnlineUsers((prevCount) => {
                // Random change between -2 and +3 to simulate fluctuation
                const change = Math.floor(Math.random() * 6) - 2; 
                // Ensure it doesn't drop below 50
                return Math.max(50, prevCount + change);
            });
        }, 3000); // Update every 3 seconds

        return () => clearInterval(interval);
    }, []);


    const latestLentera = useMemo(() => {
        try {
            const USER_POSTS_STORAGE_KEY = 'tarbiyahLenteraHatiUserEntries';
            const userPostsRaw = localStorage.getItem(USER_POSTS_STORAGE_KEY);
            const userPosts: LenteraEntry[] = userPostsRaw ? JSON.parse(userPostsRaw) : [];

            const generatedEntries: LenteraEntry[] = [];
            const genesisDate = new Date('2023-11-01T00:00:00Z');
            const now = new Date();
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

            return finalVisibleEntries.length > 0 ? finalVisibleEntries[0] : null;

        } catch (error) {
            console.error("Failed to generate latest Lentera Hati entry:", error);
            return null;
        }
    }, []);

    // Helper consistent with Roadmap.tsx to ensure accurate local date matching
    const getLocalDateKey = (date: Date): string => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        const userId = getUserId();
        if (!userId) return;

        const loadProgressData = () => {
            // --- Load Journey Progress ---
            try {
                const journeyKey = `tarbiyahJourneyProgress_${userId}`;
                const savedJourneyProgress = localStorage.getItem(journeyKey);
                if (savedJourneyProgress) {
                    const progress = JSON.parse(savedJourneyProgress);
                    const totalSteps = journeyData.reduce((total, level) => total + level.steps.length, 0);
                    const completedSteps = Object.values(progress).filter(Boolean).length;
                    const percentage = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
                    setJourneyProgress(percentage);
                }
            } catch (error) { console.error("Failed to load journey progress:", error); }

            // --- Load Roadmap Progress ---
            try {
                const todayKey = getLocalDateKey(new Date()); // Use local date key

                // Mengambil progres dari Roadmap Personal utama
                const roadmapHistoryKey = `roadmapHistory_${userId}`;
                const savedRoadmapHistory = localStorage.getItem(roadmapHistoryKey);
                let completedRoadmapTasks = 0;
                if (savedRoadmapHistory) {
                    const history = JSON.parse(savedRoadmapHistory);
                    const todayData = history[todayKey] || {};
                    completedRoadmapTasks = Object.values(todayData).filter(Boolean).length;
                }
        
                // Mengambil progres dari Dzikir Harian
                const dzikirHistoryKey = `dzikirHistory_${userId}`;
                const savedDzikirHistory = localStorage.getItem(dzikirHistoryKey);
                let completedDzikirTasks = 0;
                if (savedDzikirHistory) {
                    const history = JSON.parse(savedDzikirHistory);
                    const todayData = history[todayKey] || {};
                    completedDzikirTasks = Object.values(todayData).filter(Boolean).length;
                }
        
                const totalRoadmapTasks = 40; 
                const dzikirCategory = doaData.find(cat => cat.category.id === "Dzikir Pagi & Sore");
                const totalDzikirTasks = dzikirCategory ? dzikirCategory.prayers.length : 0; 
                
                const totalCompleted = completedRoadmapTasks + completedDzikirTasks;
                const totalTasks = totalRoadmapTasks + totalDzikirTasks;
        
                const percentage = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;
                setRoadmapProgress(percentage);
            } catch (error) { console.error("Failed to load roadmap progress:", error); }

            // --- Load Recent History Data ---
            try {
                let allHistory: CombinedHistoryItem[] = [];
                const consultationData = localStorage.getItem(`consultationHistory_${userId}`);
                if (consultationData) {
                    allHistory = [...allHistory, ...JSON.parse(consultationData)];
                }
                const searchData = localStorage.getItem(`searchHistory_${userId}`);
                if (searchData) {
                    allHistory = [...allHistory, ...JSON.parse(searchData)];
                }
                allHistory.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
                setRecentHistory(allHistory.slice(0, 3));
            } catch (error) { console.error("Failed to load history data for Beranda:", error); }
        };

        loadProgressData();

        // Add listener for window focus to update data when returning to this tab/page
        window.addEventListener('focus', loadProgressData);

        return () => {
            window.removeEventListener('focus', loadProgressData);
        };
    }, []);
    
    const features = [
        { to: "/konsultasi", icon: "fas fa-brain", title: 'konsultasi_ai_title', desc: 'konsultasi_ai_desc' },
        { to: "/mushaf", icon: "fas fa-book-quran", title: 'mushaf_title', desc: 'mushaf_desc' },
        { to: "/roadmap", icon: "fas fa-road", title: 'roadmap_title', desc: 'roadmap_desc' }
    ];

    const getIconForMode = (mode: CombinedHistoryItem['mode']) => {
        switch (mode) {
            case 'konsultasi': return 'fa-brain';
            case 'dalil': return 'fa-book-open';
            case 'tadabbur': return 'fa-spa';
            case 'pengetahuan': return 'fa-search-location';
            default: return 'fa-history';
        }
    };
    
    const getModeLabel = (mode: CombinedHistoryItem['mode']) => {
        switch (mode) {
            case 'konsultasi': return t('konsultasi_umum');
            case 'tadabbur': return t('refleksi_tadabbur');
            case 'dalil': return t('pencari_dalil');
            case 'pengetahuan': return t('pengetahuan_umum' as any);
            default: return mode;
        }
    };

    const widgetGridClass = latestLentera ? "lg:grid-cols-3" : "md:grid-cols-2";


    return (
        <section id="beranda">
            <div className="pt-4"></div>

            {/* Widget Waktu Shalat Otomatis */}
            <div className="animate-slide-up" style={{ animationDelay: '0.05s' }}>
                <PrayerTimes />
            </div>

            {/* Widget Ayat Pilihan */}
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <VerseOfTheDay />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <Card className="!p-4 hover-lift border-2 border-primary">
                    <div className="flex items-center gap-3">
                        <i className="fas fa-users text-2xl text-primary"></i>
                        <div>
                            <h4 className="font-bold text-sm text-white">Pengguna Terverifikasi</h4>
                            <p className="text-xl font-bold text-gray-200">{verifiedUsers.toLocaleString('id-ID')}</p>
                        </div>
                    </div>
                </Card>
                <Card className="!p-4 hover-lift border-2 border-primary">
                    <div className="flex items-center gap-3">
                        <div className="relative flex items-center justify-center">
                            <span className="relative flex h-4 w-4">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 shadow-[0_0_8px_2px_rgba(34,197,94,0.8)]"></span>
                            </span>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-white">Online</h4>
                            <p className="text-xl font-bold text-gray-200">{onlineUsers.toLocaleString('id-ID')}</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* New Widgets Section */}
            <div className={`grid grid-cols-1 md:grid-cols-2 ${widgetGridClass} gap-6 mt-8 animate-slide-up`} style={{ animationDelay: '0.3s' }}>
                <Card className="flex flex-col border-2 border-primary hover-lift">
                    <blockquote className="flex-grow flex flex-col justify-center">
                        <p className="italic text-gray-300">{quoteOfTheDay.text[lang]}</p>
                        <footer className="text-right text-sm font-semibold text-primary mt-2">- {quoteOfTheDay.author} -</footer>
                    </blockquote>
                </Card>
                
                {latestLentera && (
                    <Card className="border-2 border-primary flex flex-col hover-lift">
                        <h3 className="font-bold text-lg mb-3 text-primary"><i className="fas fa-lightbulb mr-2"></i>Lentera Hati</h3>
                        <div className="flex-grow space-y-2 overflow-hidden">
                            <p className="font-semibold text-gray-200 truncate" title={latestLentera.title}>{latestLentera.title}</p>
                            <p className="text-sm text-gray-400 line-clamp-4">{latestLentera.content}</p>
                        </div>
                         <Link to="/lentera-hati" className="text-xs font-semibold text-sky-400 hover:underline mt-4 self-end block">
                            Baca Selengkapnya <i className="fas fa-arrow-right ml-1"></i>
                        </Link>
                    </Card>
                )}

                <Card className="border-2 border-primary hover-lift">
                    <h3 className="font-bold text-lg mb-3 text-primary"><i className="fas fa-trophy mr-2"></i>Ringkasan Pencapaian</h3>
                    <div className="space-y-4">
                        <Link to="/tarbiyah-journey" className="block p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold flex items-center"><i className="fas fa-crown mr-2 text-yellow-400"></i>Tarbiyah Journey</p>
                                    <p className="text-xs text-gray-400">Progres kurikulum Anda</p>
                                </div>
                                <ProgressRing percentage={journeyProgress} size={80} strokeWidth={8} />
                            </div>
                        </Link>
                         <Link to="/roadmap" className="block p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold flex items-center"><i className="fas fa-road mr-2 text-sky-400"></i>Roadmap Personal</p>
                                    <p className="text-xs text-gray-400">Progres tugas harian Anda</p>
                                </div>
                                <ProgressRing percentage={roadmapProgress} size={80} strokeWidth={8} />
                            </div>
                        </Link>
                    </div>
                </Card>
            </div>

            {recentHistory.length > 0 && (
                <Card className="mt-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg text-primary"><i className="fas fa-history mr-2"></i>Aktivitas Terkini</h3>
                        <Link to="/riwayat-konsultasi" className="text-xs font-semibold text-sky-400 hover:underline">Lihat Semua</Link>
                    </div>
                    <div className="space-y-3">
                        {recentHistory.map(item => (
                             <Link to="/konsultasi" key={item.id} className="block p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors hover:translate-x-1 duration-200">
                                <div className="flex items-center">
                                    <i className={`fas ${getIconForMode(item.mode)} text-primary text-lg w-6 text-center`}></i>
                                    <div className="ml-3 overflow-hidden">
                                        <p className="font-semibold text-sm text-gray-200 truncate">
                                            {item.mode === 'konsultasi' ? (item as ConsultationHistoryItem).aiResponse.title : item.query}
                                        </p>
                                        <p className="text-xs text-gray-400 capitalize">{getModeLabel(item.mode)}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Card>
            )}

            <div className="mt-8 animate-slide-up" style={{ animationDelay: '0.5s' }}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t('fitur_utama')}</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map(feature => (
                        <Link key={feature.to} to={feature.to} className="block p-6 text-center bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl hover:bg-slate-700 transition-all duration-300 transform hover-lift border-2 border-primary">
                            <i className={`${feature.icon} text-4xl text-primary mb-4`}></i>
                            <h3 className="font-bold text-lg text-gray-800 dark:text-white">{t(feature.title as any)}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t(feature.desc as any)}</p>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="mt-8 text-center text-xs font-semibold text-yellow-600 dark:text-yellow-500 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <p className="whitespace-pre-wrap">⚠️{`

STRICTLY PROHIBITED TO COPY THE CONTENT AND COMMERCIALISE THE TARBIYAH CARE PREMIUM APPLICATION LINK WITHOUT THE DEVELOPER'S PERMISSION`}</p>
            </div>
            
        </section>
    );
};

export default Beranda;
