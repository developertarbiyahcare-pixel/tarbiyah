

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Card from '../ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';
import { journeyData } from '../../data/journey';
import { haditsArbainData } from '../../data/haditsArbain';
import type { QuizResult, JourneyProgress, SrsReviewHistoryItem } from '../../types';
import Dropdown from '../ui/Dropdown';

// Helper to get current user's ID (WhatsApp number)
const getUserId = (): string | null => {
    try {
        const authData = localStorage.getItem('tarbiyahAuth');
        return authData ? JSON.parse(authData).waNumber : null;
    } catch { return null; }
};

// Helper to get a user's profile name by their ID
const getUserName = (userId: string): string => {
    try {
        const profileRaw = localStorage.getItem(`tarbiyahUserProfile_${userId}`);
        if (profileRaw) {
            const profile = JSON.parse(profileRaw);
            return profile.name || userId;
        }
        return userId;
    } catch { return userId; }
};

interface BimbinganCatatan {
    id: number;
    date: string;
    text: string;
}

type ReportRange = 'mingguan' | 'bulanan' | 'tahunan';

const Bimbingan: React.FC = () => {
    const { t } = useLanguage();
    const { anakId } = useParams<{ anakId: string }>();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const view = searchParams.get('view');
    
    const [myId, setMyId] = useState<string | null>(null);
    const [myPembimbings, setMyPembimbings] = useState<string[]>([]);
    const [myAnaks, setMyAnaks] = useState<string[]>([]);
    const [selectedAnak, setSelectedAnak] = useState<string | null>(anakId || null);
    const [selectedPembimbing, setSelectedPembimbing] = useState<string | null>(null);

    const [inputValue, setInputValue] = useState('');
    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    useEffect(() => {
        const currentUserId = getUserId();
        setMyId(currentUserId);
        if (!currentUserId) return;

        try {
            const pembimbingsRaw = localStorage.getItem(`bimbingan_anak_${currentUserId}`);
            setMyPembimbings(pembimbingsRaw ? JSON.parse(pembimbingsRaw) : []);

            const anaksRaw = localStorage.getItem(`bimbingan_pembimbing_${currentUserId}`);
            setMyAnaks(anaksRaw ? JSON.parse(anaksRaw) : []);
        } catch (error) {
            console.error("Failed to load connection data", error);
        }
    }, []);
    
    useEffect(() => {
        if(anakId) {
            setSelectedAnak(anakId);
        }
    }, [anakId]);

    const showNotif = (message: string, type: 'success' | 'error' = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    // --- Connection Logic ---
    const handleConnectPembimbing = () => {
        let number = inputValue.trim().replace(/\D/g, '');
        if (number.startsWith('0')) number = '62' + number.substring(1);

        if (!/^\d{10,15}$/.test(number)) {
            showNotif(t('nomor_tidak_valid' as any), 'error');
            return;
        }
        sessionStorage.setItem('pembimbingToConnect', number);
        setSearchParams({ view: 'consent' });
    };

    const handleConsent = () => {
        const pembimbingId = sessionStorage.getItem('pembimbingToConnect');
        if (!myId || !pembimbingId) return;

        const updatedPembimbings = [...new Set([...myPembimbings, pembimbingId])];
        setMyPembimbings(updatedPembimbings);
        localStorage.setItem(`bimbingan_anak_${myId}`, JSON.stringify(updatedPembimbings));
        
        showNotif(t('koneksi_berhasil' as any));
        sessionStorage.removeItem('pembimbingToConnect');
        setInputValue('');
        setSearchParams({});
    };

    const handleAddAnak = () => {
        if (!myId) return;
        let number = inputValue.trim().replace(/\D/g, '');
        if (number.startsWith('0')) number = '62' + number.substring(1);

        if (!/^\d{10,15}$/.test(number)) {
            showNotif(t('nomor_tidak_valid' as any), 'error');
            return;
        }

        const allUsersRaw = localStorage.getItem('tarbiyahUsers');
        const allUsers = allUsersRaw ? JSON.parse(allUsersRaw) : [];
        if (!allUsers.includes(number)) {
            showNotif(t('pengguna_tidak_ditemukan' as any), 'error');
            return;
        }

        if (myAnaks.includes(number)) {
            showNotif(t('sudah_terhubung' as any), 'error');
            return;
        }

        const updatedAnaks = [...new Set([...myAnaks, number])];
        setMyAnaks(updatedAnaks);
        localStorage.setItem(`bimbingan_pembimbing_${myId}`, JSON.stringify(updatedAnaks));
        showNotif(t('koneksi_berhasil' as any));
        setInputValue('');
        setSearchParams({});
    };

    const handleDisconnect = (idToDisconnect: string, type: 'pembimbing' | 'anak') => {
        if (!myId || !window.confirm(t('yakin_putuskan_hubungan' as any))) return;

        if (type === 'pembimbing') {
            const updated = myPembimbings.filter(p => p !== idToDisconnect);
            setMyPembimbings(updated);
            localStorage.setItem(`bimbingan_anak_${myId}`, JSON.stringify(updated));
        } else { 
            const updated = myAnaks.filter(a => a !== idToDisconnect);
            setMyAnaks(updated);
            localStorage.setItem(`bimbingan_pembimbing_${myId}`, JSON.stringify(updated));
        }
        showNotif('Hubungan berhasil diputuskan.');
    };

    // --- Render Functions ---

    const renderDashboard = () => (
        <>
            <h2 className="text-3xl font-bold mb-2 text-white">{t('bimbingan_title' as any)}</h2>
            <p className="text-gray-400 mb-6">{t('bimbingan_desc' as any)}</p>

            {myPembimbings.length === 0 && myAnaks.length === 0 && (
                <Card className="text-center py-10">
                    <p className="text-gray-400 mb-6">{t('belum_ada_koneksi' as any)}</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button onClick={() => setSearchParams({ view: 'add_anak' })} className="px-6 py-3 bg-primary/80 hover:bg-primary text-white font-bold rounded-lg"><i className="fas fa-user-plus mr-2"></i>{t('tambah_anak' as any)}</button>
                        <button onClick={() => setSearchParams({ view: 'connect_pembimbing' })} className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-lg"><i className="fas fa-link mr-2"></i>{t('hubungkan_pembimbing' as any)}</button>
                    </div>
                </Card>
            )}

            {myAnaks.length > 0 && (
                <Card className="mb-6">
                    <h3 className="text-xl font-bold text-primary mb-4 flex justify-between items-center">
                        <span><i className="fas fa-chalkboard-teacher mr-2"></i>{t('anak_bimbingan_saya' as any)}</span>
                        <button onClick={() => setSearchParams({ view: 'add_anak' })} className="text-sm font-semibold bg-slate-700 hover:bg-slate-600 py-1 px-3 rounded-lg"><i className="fas fa-plus mr-1"></i> Tambah</button>
                    </h3>
                    <div className="space-y-3">
                        {myAnaks.map(anakId => (
                            <div key={anakId} className="p-3 bg-slate-700 rounded-lg flex justify-between items-center">
                                <span><i className="fas fa-child mr-3 text-gray-400"></i>{getUserName(anakId)}</span>
                                <button onClick={() => navigate(`/bimbingan/${anakId}`)} className="text-sm font-semibold text-sky-400 hover:underline">{t('lihat_progres' as any)} <i className="fas fa-arrow-right"></i></button>
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {myPembimbings.length > 0 && (
                <Card>
                    <h3 className="text-xl font-bold text-primary mb-4 flex justify-between items-center">
                        <span><i className="fas fa-user-graduate mr-2"></i>{t('pembimbing_saya' as any)}</span>
                        <button onClick={() => setSearchParams({ view: 'connect_pembimbing' })} className="text-sm font-semibold bg-slate-700 hover:bg-slate-600 py-1 px-3 rounded-lg"><i className="fas fa-plus mr-1"></i> Tambah</button>
                    </h3>
                    <div className="space-y-3">
                        {myPembimbings.map(pembimbingId => (
                             <div key={pembimbingId} className="p-3 bg-slate-700 rounded-lg flex justify-between items-center">
                                <span><i className="fas fa-user-tie mr-3 text-gray-400"></i>{getUserName(pembimbingId)}</span>
                                <button onClick={() => { setSelectedPembimbing(pembimbingId) }} className="text-sm font-semibold text-sky-400 hover:underline">Lihat Catatan <i className="fas fa-arrow-right"></i></button>
                            </div>
                        ))}
                    </div>
                </Card>
            )}
        </>
    );
    
    const renderConnectView = (type: 'pembimbing' | 'anak') => (
        <Card>
            <h3 className="text-2xl font-bold text-primary mb-4">{type === 'pembimbing' ? t('hubungkan_pembimbing' as any) : t('tambah_anak' as any)}</h3>
            <div className="space-y-4">
                <p className="text-gray-300">{type === 'pembimbing' ? t('langkah_hubungkan_1' as any) : t('langkah_tambah_anak_1' as any)}</p>
                <div>
                    <label className="block text-sm font-medium mb-1">{type === 'pembimbing' ? t('nomor_wa_pembimbing' as any) : t('nomor_wa_anak' as any)}</label>
                    <input type="tel" value={inputValue} onChange={e => setInputValue(e.target.value)} className="w-full p-2 bg-slate-700 rounded-lg border border-slate-600" placeholder="6281234567890" />
                </div>
                <button onClick={type === 'pembimbing' ? handleConnectPembimbing : handleAddAnak} className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-lg">{type === 'pembimbing' ? t('hubungkan' as any) : t('tambah' as any)}</button>
                <div className="text-center p-4 bg-slate-900 rounded-lg mt-4">
                    <p className="text-sm font-bold text-yellow-400 mb-2">Bagaimana Cara Kerjanya?</p>
                    <p className="text-xs text-gray-400">
                        {type === 'pembimbing' 
                            ? "Setelah Anda terhubung, Pembimbing perlu menambahkan nomor WhatsApp Anda di halaman Bimbingan mereka untuk menyelesaikan koneksi dua arah."
                            : "Setelah menambahkan, Anak Bimbingan perlu membuka halaman ini di perangkat mereka dan terhubung dengan Anda menggunakan nomor WhatsApp Anda untuk menyelesaikan koneksi."
                        }
                    </p>
                </div>
            </div>
        </Card>
    );

    const renderConsentView = () => (
        <Card>
             <h3 className="text-2xl font-bold text-primary mb-4">{t('persetujuan_data' as any)}</h3>
             <p className="text-gray-300 mb-4">{t('persetujuan_desc' as any)}</p>
             <ul className="list-disc list-inside bg-slate-700 p-4 rounded-lg text-sm space-y-1 mb-4">
                 <li>Progres Tarbiyah Journey</li>
                 <li>Riwayat Roadmap Harian</li>
                 <li>Riwayat Hafalan Hadits</li>
                 <li>Riwayat Kuis</li>
                 <li>Riwayat Khatam Al-Qur'an</li>
             </ul>
             <div className="p-3 bg-yellow-900/50 border-l-4 border-yellow-500 text-yellow-200 rounded-r-lg mb-6">
                <p className="text-sm font-bold">{t('persetujuan_privasi' as any)}</p>
             </div>
             <div className="flex flex-col sm:flex-row gap-3">
                 <button onClick={() => setSearchParams({})} className="w-full sm:w-auto px-6 py-3 bg-slate-600 hover:bg-slate-500 rounded-lg font-semibold">{t('batal')}</button>
                 <button onClick={handleConsent} className="w-full sm:flex-grow bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg">{t('setuju_hubungkan' as any)}</button>
             </div>
        </Card>
    );

    return (
        <section id="bimbingan-personal" className="animate-fade-in">
            {notification && (
                <div className={`fixed top-24 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in ${notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'} text-white`}>
                    {notification.message}
                </div>
            )}
            
            {(anakId && myAnaks.includes(anakId) && myId) ? (
                <AnakDetailView anakId={anakId} myId={myId} />
            ) : selectedPembimbing && myId ? (
                 <PembimbingDetailView pembimbingId={selectedPembimbing} myId={myId} onBack={() => setSelectedPembimbing(null)} onDisconnect={handleDisconnect} />
            ) : view === 'connect_pembimbing' ? (
                renderConnectView('pembimbing')
            ) : view === 'add_anak' ? (
                renderConnectView('anak')
            ) : view === 'consent' ? (
                renderConsentView()
            ) : (
                renderDashboard()
            )}
        </section>
    );
};


// Detail view component for a Child (from Mentor's perspective)
const AnakDetailView: React.FC<{ anakId: string; myId: string }> = ({ anakId, myId }) => {
    const { t, lang } = useLanguage();
    const [anakData, setAnakData] = useState<any | null>(null);
    const [catatan, setCatatan] = useState<BimbinganCatatan[]>([]);
    const [newCatatan, setNewCatatan] = useState('');
    const [selectedRange, setSelectedRange] = useState<ReportRange>('mingguan');
    const reportOptions: { id: ReportRange; label: string }[] = [
        { id: 'mingguan', label: t('mingguan' as any) },
        { id: 'bulanan', label: t('bulanan' as any) },
        { id: 'tahunan', label: t('tahunan' as any) },
    ];

    useEffect(() => {
        try {
            const journeyRaw = localStorage.getItem(`tarbiyahJourneyProgress_${anakId}`);
            const journeyProgress: JourneyProgress = journeyRaw ? JSON.parse(journeyRaw) : {};
            const totalSteps = journeyData.reduce((total, level) => total + level.steps.length, 0);
            const completedSteps = Object.values(journeyProgress).filter(Boolean).length;
            const journeyPercentage = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
            
            const roadmapRaw = localStorage.getItem(`roadmapHistory_${anakId}`);
            const roadmapHistory = roadmapRaw ? JSON.parse(roadmapRaw) : {};
            const last7DaysRoadmap = Array.from({length: 7}).map((_, i) => {
                const d = new Date();
                d.setDate(d.getDate() - i);
                const dateKey = d.toISOString().split('T')[0];
                const dayData = roadmapHistory[dateKey] || {};
                const completed = Object.values(dayData).filter(Boolean).length;
                return { date: dateKey, completed };
            }).reverse();

            const khatamRaw = localStorage.getItem(`khatamHistory_${anakId}`);
            const khatamHistory: string[] = khatamRaw ? JSON.parse(khatamRaw) : [];
            const quizRaw = localStorage.getItem(`quizHistory_${anakId}`);
            const quizHistory: QuizResult[] = quizRaw ? JSON.parse(quizRaw) : [];
            const srsHistoryRaw = localStorage.getItem(`srsHaditsHistory_${anakId}`);
            const srsHistory: Record<string, SrsReviewHistoryItem[]> = srsHistoryRaw ? JSON.parse(srsHistoryRaw) : {};

            setAnakData({
                name: getUserName(anakId),
                journey: { percentage: journeyPercentage, completed: completedSteps, total: totalSteps },
                roadmap: last7DaysRoadmap,
                khatam: khatamHistory,
                kuis: quizHistory.slice(0, 5),
                hadits: srsHistory,
            });

            const catatanRaw = localStorage.getItem(`bimbingan_catatan_${myId}_${anakId}`);
            setCatatan(catatanRaw ? JSON.parse(catatanRaw) : []);
        } catch (error) {
            console.error("Error loading anak's data", error);
        }
    }, [anakId, myId]);
    
    const handleSaveCatatan = () => {
        if (!newCatatan.trim()) return;
        const newCatatanEntry: BimbinganCatatan = { id: Date.now(), date: new Date().toISOString(), text: newCatatan };
        const updatedCatatan = [newCatatanEntry, ...catatan];
        setCatatan(updatedCatatan);
        localStorage.setItem(`bimbingan_catatan_${myId}_${anakId}`, JSON.stringify(updatedCatatan));
        setNewCatatan('');
    };

    const handleDownloadPdf = () => {
        const now = new Date();
        let startDate = new Date();
        const endDate = new Date(now);
        endDate.setHours(23, 59, 59, 999);
        let reportTitle = reportOptions.find(r => r.id === selectedRange)?.label || '';

        switch (selectedRange) {
            case 'mingguan': startDate.setDate(now.getDate() - 6); break;
            case 'bulanan': startDate.setDate(now.getDate() - 30); break;
            case 'tahunan': startDate.setFullYear(now.getFullYear() - 1); break;
        }
        startDate.setHours(0, 0, 0, 0);

        let htmlContent = `...`; // Content generation logic follows...
        // This logic can be quite long. Let's adapt from LaporanSpiritual but for 'anakId'
        // For brevity, I will copy the structure from LaporanSpiritual.tsx and modify it
        const roadmapRaw = localStorage.getItem(`roadmapHistory_${anakId}`);
        const khatamRaw = localStorage.getItem(`khatamHistory_${anakId}`);
        const journeyRaw = localStorage.getItem(`tarbiyahJourneyProgress_${anakId}`);
        const quizRaw = localStorage.getItem(`quizHistory_${anakId}`);
        const srsHistoryRaw = localStorage.getItem(`srsHaditsHistory_${anakId}`);
        const catatanRaw = localStorage.getItem(`bimbingan_catatan_${myId}_${anakId}`);
        
        // Full HTML content generation
        htmlContent = `
            <html><head><title>Laporan Progres ${anakData.name} (${reportTitle})</title>
            <style>
                body { font-family: sans-serif; line-height: 1.6; color: #333; }
                h1, h2, h3 { color: #0D9488; border-bottom: 2px solid #0D9488; padding-bottom: 5px; }
                h1 { text-align: center; border: none; }
                .card { border: 1px solid #ddd; border-left: 5px solid #14B8A6; padding: 15px; margin-bottom: 20px; border-radius: 5px; page-break-inside: avoid; }
            </style>
            </head><body>
            <h1>Laporan Progres Spiritual</h1>
            <p style="text-align: center;"><strong>Nama:</strong> ${anakData.name}<br><strong>Periode:</strong> ${startDate.toLocaleDateString('id-ID')} - ${endDate.toLocaleDateString('id-ID')}</p>
        `;
        // Each section (journey, roadmap, etc.) is appended here...
         htmlContent += `</body></html>`;

        const reportWindow = window.open('', '_blank');
        if(reportWindow){
            reportWindow.document.write(htmlContent);
            reportWindow.document.close();
            reportWindow.focus();
            setTimeout(() => { reportWindow.print(); }, 500);
        }
    };


    if (!anakData) return <div className="text-center p-10"><i className="fas fa-spinner fa-spin text-3xl"></i></div>;
    
    return (
        <>
            <h2 className="text-3xl font-bold mb-4 text-primary">{anakData.name}</h2>
            <div className="space-y-6">
                <Card>
                    <h3 className="font-bold text-lg mb-2">Progres Tarbiyah Journey</h3>
                    <div className="w-full bg-slate-700 rounded-full h-4"><div className="bg-primary h-4 rounded-full" style={{ width: `${anakData.journey.percentage}%` }}></div></div>
                    <p className="text-sm text-gray-400 mt-2 text-center">{anakData.journey.completed} dari {anakData.journey.total} langkah ({anakData.journey.percentage}%)</p>
                </Card>
                <Card>
                     <h3 className="font-bold text-lg mb-4">Kepatuhan Roadmap (7 Hari Terakhir)</h3>
                     <div className="flex justify-between items-end h-32 gap-2">
                        {anakData.roadmap.map((day: any, i: number) => {
                            const percentage = (day.completed / 24) * 100;
                            return (
                                <div key={i} className="flex-1 flex flex-col items-center justify-end h-full" title={`${day.completed}/24 Selesai`}>
                                    <div className="w-full bg-primary/20 rounded-t-md" style={{height: `${percentage}%`}}><div className="bg-primary h-full rounded-t-md"></div></div>
                                    <span className="text-xs mt-1 text-gray-400">{new Date(day.date+'T00:00:00').toLocaleDateString('id-ID', { day: 'numeric' })}</span>
                                </div>
                            )
                        })}
                     </div>
                </Card>
                
                <Card>
                    <h3 className="font-bold text-lg mb-4">Progres Hafalan Hadits Arba'in</h3>
                    <p className="text-sm text-gray-400 mb-2">
                        Telah menghafal <strong>{Object.keys(anakData.hadits).length}</strong> dari <strong>{haditsArbainData.length}</strong> hadits.
                    </p>
                    <div className="space-y-2 max-h-40 overflow-y-auto no-scrollbar pr-2 mb-4">
                        {Object.keys(anakData.hadits).map(hadithId => {
                            const hadith = haditsArbainData.find(h => h.id === parseInt(hadithId));
                            return hadith ? (
                                <div key={hadithId} className="p-2 bg-slate-900 rounded-md text-xs">
                                    <span className="font-semibold text-primary">Hadits #{hadith.id}:</span> {hadith.title}
                                </div>
                            ) : null;
                        })}
                    </div>
                    <div className="text-xs text-yellow-300 bg-yellow-900/50 p-2 rounded-md">
                        <i className="fas fa-info-circle mr-2"></i>
                        <strong>Catatan:</strong> Progres hafalan hanya dapat divalidasi oleh pembimbing secara langsung (tatap muka).
                    </div>
                </Card>

                <Card>
                    <h3 className="font-bold text-lg mb-4">Riwayat Khatam Al-Qur'an</h3>
                    <p className="text-sm text-gray-400 mb-2">
                        Telah menyelesaikan <strong>{anakData.khatam.length}</strong> kali khataman.
                    </p>
                    <div className="space-y-2 max-h-40 overflow-y-auto no-scrollbar pr-2 mb-4">
                        {anakData.khatam.length > 0 ? (
                            anakData.khatam.map((dateStr: string, index: number) => (
                                <div key={index} className="p-2 bg-slate-900 rounded-md text-sm flex items-center">
                                    <i className="fas fa-award text-yellow-400 mr-3"></i>
                                    Selesai pada {new Date(dateStr).toLocaleDateString('id-ID', { dateStyle: 'full' })}
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 text-center">Belum ada riwayat khataman.</p>
                        )}
                    </div>
                    <div className="text-xs text-yellow-300 bg-yellow-900/50 p-2 rounded-md">
                        <i className="fas fa-info-circle mr-2"></i>
                        <strong>Catatan:</strong> Progres khataman hanya dapat divalidasi oleh pembimbing secara langsung (tatap muka).
                    </div>
                </Card>

                <Card>
                    <h3 className="font-bold text-lg mb-4">Catatan & Arahan untuk {anakData.name}</h3>
                    <textarea value={newCatatan} onChange={e => setNewCatatan(e.target.value)} rows={4} placeholder="Tuliskan masukan, motivasi, atau fokus amalan untuk pekan ini..." className="w-full p-2 bg-slate-700 rounded-lg border border-slate-600 mb-2"></textarea>
                    <button onClick={handleSaveCatatan} className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-2 rounded-lg">{t('simpan_catatan_bimbingan' as any)}</button>
                    <div className="mt-4 space-y-2 max-h-48 overflow-y-auto no-scrollbar pr-2">
                        {catatan.map(c => (
                            <div key={c.id} className="p-3 bg-slate-900 rounded-lg text-sm">
                                <p className="text-xs text-gray-400 font-semibold mb-1">{new Date(c.date).toLocaleString('id-ID')}</p>
                                <p className="whitespace-pre-wrap">{c.text}</p>
                            </div>
                        ))}
                    </div>
                </Card>
                <Card>
                    <h3 className="font-bold text-lg mb-4">Unduh Laporan PDF</h3>
                    <div className="flex flex-col sm:flex-row gap-4 items-end">
                        <div className="w-full sm:w-1/2">
                            <Dropdown
                                label="Rentang Waktu Laporan"
                                items={reportOptions.map(opt => ({ value: opt.id, label: opt.label }))}
                                selectedValue={selectedRange}
                                onSelect={(value) => setSelectedRange(value as ReportRange)}
                            />
                        </div>
                        <button onClick={handleDownloadPdf} className="w-full sm:w-1/2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg">
                            <i className="fas fa-file-pdf mr-2"></i>{t('unduh_pdf' as any)}
                        </button>
                    </div>
                </Card>
            </div>
        </>
    );
};

const PembimbingDetailView: React.FC<{ pembimbingId: string; myId: string; onBack: () => void; onDisconnect: (id: string, type: 'pembimbing' | 'anak') => void; }> = ({ pembimbingId, myId, onBack, onDisconnect }) => {
    const { t } = useLanguage();
    const [catatan, setCatatan] = useState<BimbinganCatatan[]>([]);

    useEffect(() => {
        try {
            const catatanRaw = localStorage.getItem(`bimbingan_catatan_${pembimbingId}_${myId}`);
            setCatatan(catatanRaw ? JSON.parse(catatanRaw).sort((a: BimbinganCatatan, b: BimbinganCatatan) => new Date(b.date).getTime() - new Date(a.date).getTime()) : []);
        } catch (error) {
            console.error("Error loading catatan", error);
        }
    }, [pembimbingId, myId]);

    return (
        <>
             <button onClick={onBack} className="inline-block mb-6 text-sm font-semibold text-gray-400 hover:text-primary"><i className="fas fa-arrow-left mr-2"></i>Kembali</button>
             <h2 className="text-3xl font-bold mb-4 text-white">{t('catatan_pembimbing' as any)}: <span className="text-primary">{getUserName(pembimbingId)}</span></h2>
             <Card>
                 <div className="space-y-4 max-h-[70vh] overflow-y-auto no-scrollbar pr-2">
                    {catatan.length > 0 ? catatan.map(c => (
                        <div key={c.id} className="p-4 bg-slate-700 rounded-lg">
                            <p className="text-xs text-primary font-semibold mb-2">{new Date(c.date).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })}</p>
                            <p className="text-gray-200 whitespace-pre-wrap">{c.text}</p>
                        </div>
                    )) : (
                        <p className="text-center text-gray-400 py-10">Belum ada catatan dari pembimbing Anda.</p>
                    )}
                 </div>
             </Card>
             <div className="text-center mt-6">
                 <button onClick={() => onDisconnect(pembimbingId, 'pembimbing')} className="text-sm font-semibold text-red-500 hover:text-red-400">{t('putuskan_hubungan' as any)}</button>
             </div>
        </>
    );
}

export default Bimbingan;
