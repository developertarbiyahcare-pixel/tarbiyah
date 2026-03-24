
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import Card from '../ui/Card';
import { haditsArbainData } from '../../data/haditsArbain';
import type { Hadith } from '../../data/haditsArbain';
import { perawiData } from '../../data/perawiData';
import { useLanguage } from '../../contexts/LanguageContext';
import type { SrsHadithItem, SrsReviewHistoryItem } from '../../types';
import { getAIAsbabulWurud } from '../../services/geminiService';

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

const REVIEW_INTERVALS = [1, 3, 7, 14, 30];

const HaditsArbain: React.FC = () => {
    const { hadithId } = useParams<{ hadithId: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useLanguage();
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [srsData, setSrsData] = useState<SrsHadithItem[]>([]);
    const [srsHistory, setSrsHistory] = useState<Record<number, SrsReviewHistoryItem[]>>({});
    const [reviewQueue, setReviewQueue] = useState<Hadith[]>([]);
    const [notification, setNotification] = useState<string | null>(null);
    const [now, setNow] = useState(new Date());
    const [expandedReviewId, setExpandedReviewId] = useState<number | null>(null);

    const [asbabulWurudContent, setAsbabulWurudContent] = useState<string | null>(null);
    const [loadingAsbabulWurud, setLoadingAsbabulWurud] = useState(false);
    const [activeAsbabulWurudId, setActiveAsbabulWurudId] = useState<number | null>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const userId = getUserId();
        if (!userId) return;
        const savedData = localStorage.getItem(`srsHaditsData_${userId}`);
        if (savedData) {
            setSrsData(JSON.parse(savedData));
        }
        const savedHistory = localStorage.getItem(`srsHaditsHistory_${userId}`);
        if (savedHistory) {
            setSrsHistory(JSON.parse(savedHistory));
        }
    }, []);

    const { memorizedCount, masteredCount, dueForReviewCount } = useMemo(() => {
        const memorizedCount = srsData.length;
        const masteredCount = srsData.filter(item => item.consecutiveCorrect >= REVIEW_INTERVALS.length).length;
        const today = new Date();
        today.setHours(23, 59, 59, 999); // Consider entire day
        const dueForReviewCount = srsData.filter(item => new Date(item.nextReviewDate) <= today).length;
        return { memorizedCount, masteredCount, dueForReviewCount };
    }, [srsData, now]);

    useEffect(() => {
        const today = new Date();
        today.setHours(23, 59, 59, 999); // Consider entire day

        const dueItems = srsData.filter(item => {
            const reviewDate = new Date(item.nextReviewDate);
            return reviewDate <= today;
        });

        const dueHadiths = haditsArbainData.filter(hadith =>
            dueItems.some(item => item.hadithId === hadith.id)
        );
        setReviewQueue(dueHadiths);
    }, [srsData]);

    useEffect(() => {
        if (hadithId) {
            const idNum = parseInt(hadithId, 10);
            setExpandedId(idNum);
            const el = document.getElementById(`hadith-${idNum}`);
            if (el) {
                setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
            }
        }
    }, [hadithId]);

    const showTempNotification = (message: string) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
    };

    const handleToggle = (id: number) => {
        // Remove hadithId from URL when collapsing
        if (expandedId === id) {
            setExpandedId(null);
            navigate('/hadits-arbain');
        } else {
            setExpandedId(id);
            navigate(`/hadits-arbain/${id}`);
        }
    };
    
    const addHadithToSrs = (hadithId: number) => {
        const userId = getUserId();
        if (!userId) return;

        const reviewTime = new Date();
        reviewTime.setHours(reviewTime.getHours() + 2); // Set review for exactly 2 hours from now
        const nextReviewDate = reviewTime.toISOString();

        const newItem: SrsHadithItem = {
            hadithId,
            nextReviewDate,
            intervalDays: 0.08, // Represents 2 hours
            consecutiveCorrect: 0
        };

        const updatedSrsData = [...srsData, newItem];
        setSrsData(updatedSrsData);
        localStorage.setItem(`srsHaditsData_${userId}`, JSON.stringify(updatedSrsData));
        showTempNotification(t('hadits_ditambahkan_review' as any));
    };
    
    const performSrsUpdate = (hadithId: number, performance: 'correct' | 'incorrect') => {
        const userId = getUserId();
        if (!userId) return;

        const itemIndex = srsData.findIndex(item => item.hadithId === hadithId);
        if (itemIndex === -1) return;

        const currentItem = srsData[itemIndex];
        let newItem: SrsHadithItem;

        if (performance === 'correct') {
            const nextConsecutiveCorrect = currentItem.consecutiveCorrect + 1;
            const intervalIndex = Math.min(nextConsecutiveCorrect, REVIEW_INTERVALS.length) - 1;
            const newInterval = intervalIndex >= 0 ? REVIEW_INTERVALS[intervalIndex] : REVIEW_INTERVALS[REVIEW_INTERVALS.length-1];

            const nextReview = new Date();
            nextReview.setDate(nextReview.getDate() + newInterval);
            nextReview.setHours(0, 0, 0, 0); // Set to midnight for day-based intervals
            
            newItem = {
                ...currentItem,
                consecutiveCorrect: nextConsecutiveCorrect,
                intervalDays: newInterval,
                nextReviewDate: nextReview.toISOString()
            };
            
            showTempNotification(`${t('review_berhasil_lanjut' as any)} ${newInterval} ${t('hari_lagi' as any)}.`);

        } else { // incorrect
            const nextReview = new Date();
            nextReview.setDate(nextReview.getDate() + 1);
            nextReview.setHours(0, 0, 0, 0); // Review tomorrow at midnight
            
            newItem = {
                ...currentItem,
                consecutiveCorrect: 0,
                intervalDays: 1,
                nextReviewDate: nextReview.toISOString()
            };
            showTempNotification(t('review_berhasil_reset' as any));
        }

        const updatedSrsData = [...srsData];
        updatedSrsData[itemIndex] = newItem;
        setSrsData(updatedSrsData);
        localStorage.setItem(`srsHaditsData_${userId}`, JSON.stringify(updatedSrsData));

        // Save review history
        const newHistoryEntry: SrsReviewHistoryItem = {
            date: new Date().toISOString(),
            status: performance === 'correct' ? 'Lancar' : 'Kurang Lancar',
            reviewInterval: newItem.intervalDays
        };
        const existingHistory = srsHistory[hadithId] || [];
        const updatedHadithHistory = [newHistoryEntry, ...existingHistory].slice(0, 10); // keep last 10 reviews
        const newOverallHistory = { ...srsHistory, [hadithId]: updatedHadithHistory };
        setSrsHistory(newOverallHistory);
        localStorage.setItem(`srsHaditsHistory_${userId}`, JSON.stringify(newOverallHistory));
    };

    const handleFetchAsbabulWurud = async (hadith: Hadith) => {
        if (activeAsbabulWurudId === hadith.id) {
            setActiveAsbabulWurudId(null);
            return;
        }
    
        setLoadingAsbabulWurud(true);
        setAsbabulWurudContent(null);
        setActiveAsbabulWurudId(hadith.id);
        
        try {
            const response = await getAIAsbabulWurud(hadith.title, hadith.translation);
            setAsbabulWurudContent(response);
        } catch (err) {
            setAsbabulWurudContent("Gagal memuat Asbabul Wurud. Pastikan koneksi internet Anda stabil dan coba lagi.");
        } finally {
            setLoadingAsbabulWurud(false);
        }
    };

    const filteredHadits = useMemo(() => {
        if (!searchTerm) {
            return haditsArbainData;
        }
        return haditsArbainData.filter(hadith =>
            hadith.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hadith.translation.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const handleReviewClick = (id: number) => {
        setExpandedId(id);
        const el = document.getElementById(`hadith-${id}`);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const renderSrsStatus = (hadithId: number) => {
        const srsItem = srsData.find(item => item.hadithId === hadithId);
        if (!srsItem) {
            return (
                <button onClick={(e) => { e.stopPropagation(); addHadithToSrs(hadithId); }} className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-1 px-3 rounded-md text-xs">
                    <i className="fas fa-plus-circle mr-1"></i> {t('mulai_hafalkan' as any)}
                </button>
            );
        }

        if (srsItem.consecutiveCorrect >= REVIEW_INTERVALS.length) {
            return <span className="text-xs font-bold text-green-400"><i className="fas fa-check-circle mr-1"></i> {t('telah_dikuasai' as any)}</span>;
        }

        const reviewDate = new Date(srsItem.nextReviewDate);
        const diffTime = reviewDate.getTime() - now.getTime();

        if (diffTime <= 0) {
            return (
                <span className="px-2 py-1 text-xs font-bold text-yellow-800 bg-yellow-400 rounded-full animate-pulse flex items-center w-fit">
                    <i className="fas fa-bell mr-2"></i> Review Hari Ini
                </span>
            );
        }

        const diffHours = diffTime / (1000 * 60 * 60);

        if (diffHours <= 24) {
            const hours = Math.floor(diffHours);
            const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);
            const countdownString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            
            return (
                <span className="text-xs text-gray-400 tabular-nums">
                    <i className="far fa-clock mr-1"></i> {t('akan_direview_dalam' as any)} {countdownString}
                </span>
            );
        } else {
            const diffDays = Math.ceil(diffHours / 24);
            return <span className="text-xs text-gray-400"><i className="far fa-clock mr-1"></i> {t('akan_direview_dalam' as any)} {diffDays} {t('hari_lagi' as any)}</span>;
        }
    };
    
    const renderHistory = (hadithId: number) => {
        const hadithHistory = srsHistory[hadithId] || [];
        return (
            <div className="mt-6 border-t border-slate-700 pt-4">
                <h4 className="font-bold text-gray-300 mb-3"><i className="fas fa-history mr-2"></i>{t('riwayat_hafalan' as any)}</h4>
                {hadithHistory.length > 0 ? (
                    <ul className="space-y-2">
                        {hadithHistory.map((item, index) => (
                            <li key={index} className="flex justify-between items-center text-sm p-2 bg-slate-800 rounded-md">
                                <span className="text-gray-400">{new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                {item.status === 'Lancar' ? (
                                    <span className="font-semibold text-green-400"><i className="fas fa-check-circle mr-2"></i>{t('status_lancar' as any)}</span>
                                ) : (
                                    <span className="font-semibold text-red-400"><i className="fas fa-times-circle mr-2"></i>{t('status_kurang_lancar' as any)}</span>
                                )}
                                <span className="text-xs text-gray-500">{t('interval_berikutnya' as any)} {item.reviewInterval} {t('hari' as any)}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-gray-500 text-center">{t('belum_ada_riwayat_review' as any)}</p>
                )}
            </div>
        );
    };

    return (
        <section id="hadits-arbain" className="animate-fade-in">
            {notification && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
                    {notification}
                </div>
            )}
            
            <h2 className="text-3xl font-bold mb-6 text-white">Hadits Arba'in & Progres Hafalan</h2>

            {srsData.length === 0 ? (
                <Card className="text-center p-10 mb-8 border-2 border-dashed border-slate-600">
                    <i className="fas fa-brain text-5xl text-gray-500 mb-4"></i>
                    <h3 className="text-xl font-bold text-white mb-2">Mulai Perjalanan Hafalan Anda</h3>
                    <p className="text-gray-400 mb-6">Pilih hadits di bawah ini dan klik 'Mulai Hafalkan' untuk menambahkannya ke jadwal review Anda dengan metode Spaced Repetition System (SRS).</p>
                    <Link to="/cara-kerja-hafalan" className="text-sm font-semibold text-sky-400 hover:underline">
                        <i className="fas fa-info-circle mr-2"></i>Bagaimana Cara Kerjanya?
                    </Link>
                </Card>
            ) : (
                 <Card className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-xl text-primary">Ringkasan Progres Hafalan</h3>
                         <Link to="/cara-kerja-hafalan" className="text-sm font-semibold text-sky-400 hover:underline">
                            <i className="fas fa-info-circle mr-2"></i>{t('cara_kerja')}
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                        <div className="p-4 bg-slate-700 rounded-lg">
                            <p className="text-3xl font-bold text-white">{memorizedCount}</p>
                            <p className="text-sm text-gray-400">Total Hadits Dihafal</p>
                        </div>
                        <div className="p-4 bg-slate-700 rounded-lg">
                            <p className="text-3xl font-bold text-green-400">{masteredCount}</p>
                            <p className="text-sm text-gray-400">Hadits Dikuasai</p>
                        </div>
                        <div className="p-4 bg-slate-700 rounded-lg">
                            <p className="text-3xl font-bold text-yellow-400">{dueForReviewCount}</p>
                            <p className="text-sm text-gray-400">Perlu Di-review</p>
                        </div>
                    </div>
                </Card>
            )}

            {reviewQueue.length > 0 && (
                <Card className="mb-8 border-2 border-primary">
                    <h3 className="text-xl font-bold mb-4 text-primary"><i className="fas fa-tasks mr-2"></i>{t('hadits_review_hari_ini' as any)}</h3>
                    <div className="space-y-3">
                        {reviewQueue.map(hadith => (
                            <div key={hadith.id} className="bg-slate-700 rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setExpandedReviewId(prev => prev === hadith.id ? null : hadith.id)}
                                    className="w-full text-left p-3 flex justify-between items-center hover:bg-slate-600"
                                    aria-expanded={expandedReviewId === hadith.id}
                                >
                                    <span className="font-semibold text-white">Hadits #{hadith.id}: {hadith.title}</span>
                                    <i className={`fas fa-chevron-down transition-transform ${expandedReviewId === hadith.id ? 'rotate-180' : ''}`}></i>
                                </button>
                                {expandedReviewId === hadith.id && (
                                    <div className="p-4 border-t border-slate-600 space-y-4 bg-slate-800/50 animate-fade-in">
                                        <p className="font-semibold text-gray-300">Ucapkan hadits berikut dari ingatan, lalu nilai diri Anda:</p>
                                        <div className="p-3 bg-slate-900 rounded-md">
                                            <p className="font-uthmanic text-xl text-right">{hadith.arabic}</p>
                                            <p className="text-sm italic text-gray-400 mt-2">"{hadith.translation}"</p>
                                        </div>
                                        <div className="flex justify-center gap-4 pt-4 border-t border-slate-600">
                                            <button onClick={() => { performSrsUpdate(hadith.id, 'correct'); setExpandedReviewId(null); }} className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg flex items-center gap-2"><i className="fas fa-check-circle"></i> {t('ingat' as any)}</button>
                                            <button onClick={() => { performSrsUpdate(hadith.id, 'incorrect'); setExpandedReviewId(null); }} className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg flex items-center gap-2"><i className="fas fa-times-circle"></i> {t('lupa' as any)}</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            <Card className="mb-6">
                <input
                    type="text"
                    placeholder="Cari berdasarkan judul atau isi hadits..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 border border-gray-500 rounded-lg bg-gray-700 text-white focus:ring-primary focus:border-primary"
                />
            </Card>

            <div className="space-y-4">
                {filteredHadits.length > 0 ? filteredHadits.map((hadith) => {
                    const compilersText = `HR. ${hadith.compilers.map(c => perawiData[c]?.name.replace('Imam ', '') || c.charAt(0).toUpperCase() + c.slice(1)).join(' & ')}`;
                    
                    return (
                    <Card key={hadith.id} id={`hadith-${hadith.id}`} className="!p-0 overflow-hidden">
                        <div
                            onClick={() => handleToggle(hadith.id)}
                            className="w-full flex justify-between items-center text-left p-4 bg-gray-700 dark:bg-gray-900 hover:bg-gray-500 dark:hover:bg-gray-700 cursor-pointer"
                            aria-expanded={expandedId === hadith.id}
                        >
                             <div className="flex-grow">
                                <h3 className="text-lg font-semibold text-primary">
                                    Hadits ke-{hadith.id}: {hadith.title}
                                </h3>
                                <div className="mt-2">{renderSrsStatus(hadith.id)}</div>
                            </div>
                            <i className={`fas fa-chevron-down transition-transform duration-300 ${expandedId === hadith.id ? 'rotate-180' : ''}`}></i>
                        </div>
                        {expandedId === hadith.id && (
                            <div className="p-4 animate-fade-in">
                                <div className="space-y-4">
                                    <div>
                                        <p className="font-uthmanic text-2xl text-right mb-2 leading-relaxed">{hadith.arabic}</p>
                                    </div>
                                    <div>
                                        <p className="italic text-gray-400 mb-1 text-sm">{hadith.latin}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-200">
                                            <strong>{t('artinya')}:</strong> "{hadith.translation}"
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right text-xs text-gray-500 mt-4 pt-2 border-t border-gray-700 flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => handleFetchAsbabulWurud(hadith)} className="flex items-center px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs font-semibold text-gray-200 transition-colors" title="Lihat Asbabul Wurud">
                                            <i className="fas fa-info-circle mr-2"></i>
                                            <span>Asbabul Wurud</span>
                                        </button>
                                    </div>
                                    <p>{compilersText}</p>
                                </div>

                                {activeAsbabulWurudId === hadith.id && (
                                    <div className="mt-4 p-4 bg-slate-800 rounded-lg border-l-4 border-primary animate-fade-in">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="font-bold text-primary">Asbabul Wurud</h4>
                                            <button onClick={() => setActiveAsbabulWurudId(null)} className="text-gray-400 hover:text-white text-lg">&times;</button>
                                        </div>
                                        {loadingAsbabulWurud ? (
                                            <div className="text-center p-4">
                                                <i className="fas fa-spinner fa-spin text-2xl text-primary"></i>
                                            </div>
                                        ) : (
                                            <p className="text-sm text-gray-300 whitespace-pre-wrap">{asbabulWurudContent}</p>
                                        )}
                                    </div>
                                )}
                                
                                <div className="mt-6 border-t border-slate-700 pt-4">
                                    <h4 className="font-bold text-gray-300 mb-3"><i className="fas fa-users mr-2"></i>Informasi Perawi</h4>
                                    <div className="space-y-4">
                                        {perawiData[hadith.primaryNarrator] && (
                                        <div>
                                            <h5 className="font-semibold text-gray-400 text-sm mb-2">Diriwayatkan dari Sahabat:</h5>
                                            <div className="p-3 bg-slate-800 rounded-lg">
                                                <p className="font-bold text-primary">{perawiData[hadith.primaryNarrator].name}</p>
                                                <p className="text-xs text-gray-400">{perawiData[hadith.primaryNarrator].life}</p>
                                                <p className="text-sm text-gray-300 mt-1">{perawiData[hadith.primaryNarrator].bio}</p>
                                            </div>
                                        </div>
                                        )}
                                        
                                        <div>
                                        <h5 className="font-semibold text-gray-400 text-sm mb-2">Dicatat oleh Imam:</h5>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {hadith.compilers.map(compilerId => {
                                                const compiler = perawiData[compilerId];
                                                if (!compiler) return (
                                                    <div key={compilerId} className="p-3 bg-slate-800 rounded-lg">
                                                    <p className="font-bold text-primary capitalize">{compilerId.replace('_', ' ')}</p>
                                                    </div>
                                                );
                                                return (
                                                    <div key={compilerId} className="p-3 bg-slate-800 rounded-lg">
                                                    <p className="font-bold text-primary">{compiler.name}</p>
                                                    <p className="text-xs text-gray-400">{compiler.life}</p>
                                                    <p className="text-sm text-gray-300 mt-1">{compiler.bio}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        </div>
                                    </div>
                                </div>

                                {reviewQueue.some(h => h.id === hadith.id) && (
                                    <div className="mt-6 p-4 bg-yellow-900/50 border-t-2 border-yellow-500 rounded-lg text-center">
                                        <h4 className="font-bold text-yellow-300 mb-3">{t('bagaimana_hafalan' as any)}</h4>
                                        <div className="flex justify-center gap-4">
                                            <button onClick={() => { performSrsUpdate(hadith.id, 'correct'); handleToggle(hadith.id); }} className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg flex items-center gap-2"><i className="fas fa-check-circle"></i> {t('ingat' as any)}</button>
                                            <button onClick={() => { performSrsUpdate(hadith.id, 'incorrect'); handleToggle(hadith.id); }} className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg flex items-center gap-2"><i className="fas fa-times-circle"></i> {t('lupa' as any)}</button>
                                        </div>
                                    </div>
                                )}

                                {renderHistory(hadith.id)}
                            </div>
                        )}
                    </Card>
                )}) : (
                     <Card className="text-center">
                        <p className="text-gray-400">Tidak ada hadits yang cocok dengan pencarian Anda.</p>
                    </Card>
                )}
            </div>
        </section>
    );
};

export default HaditsArbain;
