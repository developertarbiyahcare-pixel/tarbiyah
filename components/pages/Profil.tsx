
import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from '../ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';
import Dropdown from '../ui/Dropdown';
import type { UserProfile } from '../../types';

interface UserEvent {
    name: string;
    details: Record<string, any>;
}
interface PageView {
    path: string;
    duration: number;
}
interface Session {
    duration: number;
    events: UserEvent[];
    pageViews: PageView[];
}
interface EngagementMetrics {
    sessions: Session[];
}
interface AnalyticsData {
    totalUsers: number;
    totalSessions: number;
    totalEvents: number;
    eventCounts: { name: string; count: number }[];
    pageViewCounts: { path: string; count: number; totalDuration: number }[];
}


const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

const getLoggedInUserId = (): string | null => {
    try {
        const authData = localStorage.getItem('tarbiyahAuth');
        return authData ? JSON.parse(authData).waNumber : null;
    } catch (error) {
        console.error("Failed to parse auth data from localStorage:", error);
        return null;
    }
};

const AdminDashboard: React.FC<{ isOpen: boolean; onClose: () => void; isDeveloper: boolean }> = ({ isOpen, onClose, isDeveloper }) => {
    const [activeTab, setActiveTab] = useState<'info' | 'insight' | 'manage'>('info');
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
    const [dynamicEvents, setDynamicEvents] = useState<{ name: string; count: number }[]>([]);
    const [liveTotalDuration, setLiveTotalDuration] = useState<number | null>(null);

    const formatDuration = (totalSeconds: number): string => {
        if (isNaN(totalSeconds) || totalSeconds < 0) return '00:00:00';
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);
    
        return [hours, minutes, seconds]
            .map(v => v.toString().padStart(2, '0'))
            .join(':');
    };

    useEffect(() => {
        let chartInterval: number | undefined;

        if (isOpen && activeTab === 'insight') {
            const usersRaw = localStorage.getItem('tarbiyahUsers');
            const users = usersRaw ? JSON.parse(usersRaw) : [];
            const totalUsers = users.length;
            
            const metricsRaw = localStorage.getItem('tarbiyahEngagementMetrics');
            const metrics: EngagementMetrics = metricsRaw ? JSON.parse(metricsRaw) : { sessions: [] };
            
            const totalSessions = metrics.sessions.length;
            const totalDurationSeconds = metrics.sessions.reduce((acc, s) => acc + s.duration, 0);
            setLiveTotalDuration(Math.round(totalDurationSeconds));
    
            const allEvents = metrics.sessions.flatMap(s => s.events);
            const totalEvents = allEvents.length;
    
            const eventCountsMap: Record<string, number> = {};
            allEvents.forEach(event => {
                eventCountsMap[event.name] = (eventCountsMap[event.name] || 0) + 1;
            });
            const eventCounts = Object.entries(eventCountsMap).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
    
            setAnalytics({
                totalUsers,
                totalSessions,
                totalEvents,
                eventCounts,
                pageViewCounts: [],
            });
    
            if (eventCounts.length > 0) {
                const topEvents = eventCounts.slice(0, 7);
                setDynamicEvents(topEvents);
    
                chartInterval = window.setInterval(() => {
                    setDynamicEvents(prevEvents => {
                        if (prevEvents.length === 0) return [];
                        const newEvents = prevEvents.map(e => ({...e}));
                        const randomIndex = Math.floor(Math.random() * newEvents.length);
                        newEvents[randomIndex].count += Math.floor(Math.random() * 2) + 1;
                        return newEvents.sort((a, b) => b.count - a.count);
                    });
                }, 2000);
            }
        }

        return () => {
            if (chartInterval) clearInterval(chartInterval);
            setDynamicEvents([]);
            setAnalytics(null);
            setLiveTotalDuration(null);
        };
    }, [isOpen, activeTab]);

    useEffect(() => {
        if (liveTotalDuration === null || activeTab !== 'insight' || !isOpen) {
            return;
        }

        const interval = setInterval(() => {
            setLiveTotalDuration(prev => (prev !== null ? prev + 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, [liveTotalDuration, activeTab, isOpen]);


    if (!isOpen) return null;

    const maxCount = dynamicEvents.length > 0 ? dynamicEvents[0].count : 1;

    return (
        <div className="fixed inset-0 bg-slate-900 z-50">
            <Card className="w-full h-full flex flex-col rounded-none shadow-none" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-3 flex-shrink-0">
                    <h3 className="text-xl font-bold text-primary"><i className="fas fa-user-shield mr-2"></i>Dashboard Admin</h3>
                    <button onClick={onClose} className="text-2xl text-gray-400 hover:text-white">&times;</button>
                </div>
                
                <div className="border-b border-slate-600 mb-4 flex-shrink-0">
                    <div className="flex -mb-px">
                        <button onClick={() => setActiveTab('info')} className={`inline-block p-3 border-b-2 font-semibold ${activeTab === 'info' ? 'border-primary text-primary' : 'border-transparent hover:text-gray-300'}`}>Info</button>
                        <button onClick={() => setActiveTab('insight')} className={`inline-block p-3 border-b-2 font-semibold ${activeTab === 'insight' ? 'border-primary text-primary' : 'border-transparent hover:text-gray-300'}`}>Insight</button>
                        {isDeveloper && (
                            <button onClick={() => setActiveTab('manage')} className={`inline-block p-3 border-b-2 font-semibold ${activeTab === 'manage' ? 'border-primary text-primary' : 'border-transparent hover:text-gray-300'}`}>Admin Management</button>
                        )}
                    </div>
                </div>

                <div className="overflow-y-auto no-scrollbar pr-2 pb-4 flex-grow">
                    {activeTab === 'info' && (
                        <div className="space-y-3">
                            <div className="p-3 bg-slate-700 rounded-lg flex items-center"><strong className="w-24">Nama</strong>: Rojudin</div>
                            <div className="p-3 bg-slate-700 rounded-lg flex items-center"><strong className="w-24">Status</strong>: {isDeveloper ? 'Developer' : 'Admin'}</div>
                        </div>
                    )}
                    {activeTab === 'insight' && (
                        analytics ? (
                             <div className="space-y-6">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                    <div className="p-4 bg-slate-900 rounded-lg">
                                        <p className="text-3xl font-bold text-primary">{analytics.totalUsers}</p>
                                        <p className="text-sm text-gray-400">Total Pengguna Terverifikasi</p>
                                    </div>
                                    <div className="p-4 bg-slate-900 rounded-lg">
                                        <p className="text-3xl font-bold text-primary">{analytics.totalSessions}</p>
                                        <p className="text-sm text-gray-400">Total Sesi</p>
                                    </div>
                                     <div className="p-4 bg-slate-900 rounded-lg">
                                        <p className="text-3xl font-bold text-primary tabular-nums tracking-wider">{liveTotalDuration !== null ? formatDuration(liveTotalDuration) : '00:00:00'}</p>
                                        <p className="text-sm text-gray-400">Total Durasi Sesi</p>
                                    </div>
                                    <div className="p-4 bg-slate-900 rounded-lg">
                                        <p className="text-3xl font-bold text-primary">{analytics.totalEvents}</p>
                                        <p className="text-sm text-gray-400">Total Event</p>
                                    </div>
                                </div>
                                
                                <div>
                                    <h4 className="font-bold mb-4">Interaksi Pengguna Teratas (Live)</h4>
                                    {dynamicEvents.length > 0 ? (
                                        <div className="space-y-3">
                                            {dynamicEvents.map(event => {
                                                const barWidth = maxCount > 0 ? (event.count / maxCount) * 100 : 0;
                                                return (
                                                    <div key={event.name} className="flex items-center gap-4 text-sm animate-fade-in" style={{ textTransform: 'capitalize' }}>
                                                        <span className="w-1/3 truncate text-gray-300 font-semibold text-right">{event.name.replace(/_/g, ' ')}</span>
                                                        <div className="w-2/3 bg-slate-700 rounded-full h-6 overflow-hidden">
                                                            <div
                                                                className="bg-primary h-6 rounded-full flex items-center justify-end px-2 text-white font-bold transition-all duration-1000 ease-linear text-xs"
                                                                style={{ width: `${barWidth}%`, minWidth: '30px' }}
                                                            >
                                                               {event.count}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500 text-center py-4">Tidak ada data interaksi untuk ditampilkan.</p>
                                    )}
                                </div>
                             </div>
                        ) : (
                             <div className="text-center p-10"><i className="fas fa-spinner fa-spin text-3xl"></i></div>
                        )
                    )}
                    {activeTab === 'manage' && isDeveloper && (
                        <div className="space-y-4 max-w-md mx-auto text-center">
                            <p className="text-sm text-gray-400">Admin management (add/remove) and user management can be accessed via the Management Page.</p>
                            <Link to="/admin" onClick={onClose} className="inline-block bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-lg">
                                <i className="fas fa-arrow-right mr-2"></i> Open Management Page
                            </Link>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};

interface ProfilProps {
    isAdmin: boolean;
    isDeveloper: boolean;
}

const Profil: React.FC<ProfilProps> = ({ isAdmin, isDeveloper }) => {
    const { t } = useLanguage();
    const { userId: paramUserId } = useParams<{ userId: string }>();
    
    const [profile, setProfile] = useState<UserProfile>({});
    const [isEditing, setIsEditing] = useState(false);
    const [isDashboardOpen, setIsDashboardOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const verificationCardRef = useRef<HTMLDivElement>(null);

    const [editDay, setEditDay] = useState('');
    const [editMonth, setEditMonth] = useState('');
    const [editYear, setEditYear] = useState('');

    // --- Verification State ---
    const [verificationStage, setVerificationStage] = useState<'idle' | 'code-generated'>('idle');
    const [generatedCode, setGeneratedCode] = useState('');
    const [inputCode, setInputCode] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [verificationError, setVerificationError] = useState('');

    // State for dynamic stats
    const [verifiedUsers, setVerifiedUsers] = useState(100);
    const [onlineUsers, setOnlineUsers] = useState(75);

    const loggedInUserId = getLoggedInUserId();
    const targetUserId = (isDeveloper && paramUserId) ? paramUserId : loggedInUserId;
    const isOwnProfile = loggedInUserId === targetUserId;

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

    useEffect(() => {
        if (!targetUserId) {
            if (isOwnProfile) setIsEditing(true);
            return;
        }
        
        try {
            const profileKey = `tarbiyahUserProfile_${targetUserId}`;
            const savedProfileRaw = localStorage.getItem(profileKey);
            const savedProfile = savedProfileRaw ? JSON.parse(savedProfileRaw) : {};
            
            savedProfile.whatsapp = targetUserId;
            
            setProfile(savedProfile);

            if ((!savedProfile.name) && isOwnProfile) {
                setIsEditing(true);
            }
        } catch (error) {
            console.error("Failed to load user profile:", error);
            if (isOwnProfile) setIsEditing(true);
        }
    }, [targetUserId, isOwnProfile]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const base64 = await fileToBase64(file);
            setProfile(prev => ({ ...prev, photo: base64 }));
        }
    };

    const handleEnterEditMode = () => {
        if (!isOwnProfile) return;

        if (profile.tanggalLahir) {
            const [y, m, d] = profile.tanggalLahir.split('-');
            setEditYear(y || '');
            setEditMonth(m || '');
            setEditDay(d || '');
        } else {
            setEditDay(''); setEditMonth(''); setEditYear('');
        }
        setIsEditing(true);
    };

    const handleVerifyNowClick = () => {
        setIsEditing(true);
        setTimeout(() => {
            verificationCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    };

    const handleSave = () => {
        if (!isOwnProfile) {
            alert("Anda tidak dapat mengubah profil pengguna lain.");
            return;
        }
        if (!loggedInUserId) {
            alert("Gagal menyimpan profil: Pengguna tidak ditemukan.");
            return;
        }

        const updatedProfile = { ...profile };
        if (editYear && editMonth && editDay) {
            updatedProfile.tanggalLahir = `${editYear}-${editMonth.padStart(2, '0')}-${editDay.padStart(2, '0')}`;
        } else {
            delete updatedProfile.tanggalLahir;
        }

        try {
            const profileKey = `tarbiyahUserProfile_${loggedInUserId}`;
            localStorage.setItem(profileKey, JSON.stringify(updatedProfile));
            setProfile(updatedProfile);
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to save profile:", error);
            alert("Gagal menyimpan profil.");
        }
    };
    
    // --- Verification Handlers ---
    const handleStartVerification = () => {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedCode(code);
        setVerificationStage('code-generated');
        setIsCodeSent(false);
        setVerificationError('');
        setInputCode('');
    };

    const handleConfirmCode = () => {
        if (inputCode !== generatedCode) {
            setVerificationError('Kode verifikasi salah. Mohon periksa kembali.');
            return;
        }
        
        setVerificationError('');
        const updatedProfile = { ...profile, isVerified: true };
        setProfile(updatedProfile);
        if(loggedInUserId) {
            localStorage.setItem(`tarbiyahUserProfile_${loggedInUserId}`, JSON.stringify(updatedProfile));
        }
        setVerificationStage('idle');
    };

    const DEVELOPER_WA_NUMBER_FULL = '6281329466856';
    const requestMessage = `Assalamualaikum. Mohon verifikasi Tarbiyah Care Premium dengan kode: *${generatedCode}*`;
    const whatsappUrl = `https://wa.me/${DEVELOPER_WA_NUMBER_FULL}?text=${encodeURIComponent(requestMessage)}`;
    
    const months = [
        { value: '01', label: 'Januari' }, { value: '02', label: 'Februari' },
        { value: '03', label: 'Maret' }, { value: '04', label: 'April' },
        { value: '05', label: 'Mei' }, { value: '06', label: 'Juni' },
        { value: '07', label: 'Juli' }, { value: '08', label: 'Agustus' },
        { value: '09', label: 'September' }, { value: '10', label: 'Oktober' },
        { value: '11', label: 'November' }, { value: '12', label: 'Desember' }
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
    const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

    if (isEditing) {
        return (
            <section id="profil-edit" className="animate-fade-in">
                <h2 className="text-3xl font-bold mb-6 text-white">Edit Profil</h2>
                <Card>
                    <div className="flex flex-col items-center space-y-6">
                        <div className="relative">
                            {profile.photo ? (
                                <img
                                    src={profile.photo}
                                    alt="Foto Profil"
                                    className="w-32 h-32 rounded-full object-cover border-4 border-primary"
                                />
                            ) : (
                                <div className="w-32 h-32 rounded-full border-4 border-primary bg-slate-700 flex items-center justify-center">
                                    <i className="fas fa-user text-6xl text-slate-500"></i>
                                </div>
                            )}
                            <button onClick={() => fileInputRef.current?.click()} className="absolute -bottom-2 -right-2 bg-slate-600 h-10 w-10 rounded-full flex items-center justify-center text-white hover:bg-slate-500">
                                <i className="fas fa-camera"></i>
                            </button>
                            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
                        </div>
                        
                        <div className="w-full max-w-md space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300">Nama Lengkap</label>
                                <input type="text" name="name" value={profile.name || ''} onChange={handleInputChange} className="mt-1 w-full p-2.5 bg-slate-700 rounded-lg border border-slate-600" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300">Bio Singkat</label>
                                <textarea name="bio" value={profile.bio || ''} onChange={handleInputChange} className="mt-1 w-full p-2.5 bg-slate-700 rounded-lg border border-slate-600" rows={3} placeholder="Ceritakan sedikit tentang diri Anda..."></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300">Kota</label>
                                <input type="text" name="kota" value={profile.kota || ''} onChange={handleInputChange} className="mt-1 w-full p-2.5 bg-slate-700 rounded-lg border border-slate-600" placeholder="Contoh: Jakarta" />
                            </div>
                            <div>
                                <p className="block text-sm font-medium text-gray-300 mb-1">Tanggal Lahir</p>
                                <div className="grid grid-cols-3 gap-2">
                                    <Dropdown
                                        placeholder="Tanggal"
                                        items={days.map(d => ({ value: d, label: d }))}
                                        selectedValue={editDay}
                                        onSelect={setEditDay}
                                    />
                                    <Dropdown
                                        placeholder="Bulan"
                                        items={months}
                                        selectedValue={editMonth}
                                        onSelect={setEditMonth}
                                    />
                                    <Dropdown
                                        placeholder="Tahun"
                                        items={years.map(y => ({ value: y.toString(), label: y.toString() }))}
                                        selectedValue={editYear}
                                        onSelect={setEditYear}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300">Username Instagram</label>
                                <input type="text" name="instagram" value={profile.instagram || ''} onChange={handleInputChange} className="mt-1 w-full p-2.5 bg-slate-700 rounded-lg border border-slate-600" placeholder="@username" />
                            </div>
                        </div>

                        {isOwnProfile && (
                             <Card ref={verificationCardRef} className="mt-6 w-full max-w-md bg-slate-800 border-2 border-primary shadow-lg shadow-primary/20">
                                <h4 className="font-bold text-lg text-primary mb-3">Verifikasi WhatsApp</h4>
                                {profile.isVerified ? (
                                    <div className="p-3 bg-green-800/50 text-green-300 rounded-lg flex items-center justify-center gap-2">
                                        <i className="fas fa-check-circle"></i>
                                        <span className="font-semibold">Nomor Terverifikasi</span>
                                    </div>
                                ) : (
                                    verificationStage === 'idle' ? (
                                        <div>
                                            <p className="text-sm text-gray-400 mb-3">Nomor WhatsApp Anda belum terverifikasi. Verifikasi diperlukan untuk mengakses beberapa fitur komunitas.</p>
                                            <button onClick={handleStartVerification} className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 rounded-lg">
                                                Mulai Verifikasi
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <p className="text-sm text-gray-300">1. Kirim kode di bawah ini ke Developer via WhatsApp sebagai syarat verifikasi.</p>
                                            <div className="text-center p-3 bg-slate-900 rounded-lg">
                                                <p className="text-xs text-gray-400">Kode Unik Anda</p>
                                                <p className="text-2xl font-bold tracking-widest text-primary">{generatedCode}</p>
                                            </div>
                                            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => setIsCodeSent(true)} className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg">
                                                <i className="fab fa-whatsapp mr-2"></i> Kirim Kode
                                            </a>
                                            <p className="text-sm text-gray-300">2. Setelah terkirim, masukkan kembali kode yang sama di bawah ini.</p>
                                            <div>
                                                <input type="tel" value={inputCode} onChange={e => setInputCode(e.target.value)} className="w-full p-2 bg-slate-700 rounded-lg border border-slate-600 text-center text-lg tracking-widest" placeholder="_ _ _ _ _ _" maxLength={6} />
                                            </div>
                                            {verificationError && <p className="text-xs text-red-400 text-center">{verificationError}</p>}
                                            <div className="flex gap-3">
                                                <button onClick={() => setVerificationStage('idle')} className="w-1/3 bg-slate-600 hover:bg-slate-500 text-white font-semibold py-3 rounded-lg">Batal</button>
                                                <button onClick={handleConfirmCode} className="w-2/3 bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed" disabled={!isCodeSent}>
                                                    Konfirmasi Kode
                                                </button>
                                            </div>
                                        </div>
                                    )
                                )}
                            </Card>
                        )}


                        <button onClick={handleSave} className="w-full max-w-md bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-lg">
                            Simpan Perubahan
                        </button>
                    </div>
                </Card>
            </section>
        );
    }

    return (
        <section id="profil-view" className="animate-fade-in">
             <h2 className="text-3xl font-bold mb-6 text-white">
                {isOwnProfile ? t('profil_title_page' as any) : `Profil Pengguna`}
             </h2>

            {isOwnProfile && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <Card>
                        <div className="flex items-center gap-4">
                            <i className="fas fa-users text-4xl text-primary"></i>
                            <div>
                                <h4 className="font-bold text-lg text-white">Total Pengguna Terverifikasi</h4>
                                <p className="text-3xl font-bold text-gray-200">{verifiedUsers.toLocaleString('id-ID')}</p>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex items-center gap-4">
                            <div className="relative flex items-center justify-center">
                                <span className="relative flex h-4 w-4">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 shadow-[0_0_8px_2px_rgba(34,197,94,0.8)]"></span>
                                </span>
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-white">Pengguna Online</h4>
                                <p className="text-3xl font-bold text-gray-200">{onlineUsers.toLocaleString('id-ID')}</p>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

             <Card>
                <div className="relative flex flex-col items-center p-6">
                    {isOwnProfile && (
                        <button onClick={handleEnterEditMode} className="absolute top-4 right-4 text-gray-400 hover:text-primary">
                            <i className="fas fa-pencil-alt text-lg"></i>
                        </button>
                    )}
                    {profile.photo ? (
                        <img
                            src={profile.photo}
                            alt="Foto Profil"
                            className="w-32 h-32 rounded-full object-cover border-4 border-primary mb-4"
                        />
                    ) : (
                        <div className="w-32 h-32 rounded-full border-4 border-primary bg-slate-700 flex items-center justify-center mb-4">
                            <i className="fas fa-user text-6xl text-slate-500"></i>
                        </div>
                    )}
                    <h3 className="text-2xl font-bold text-white">{profile.name || 'Nama Belum Diatur'}</h3>
                    {profile.bio && (
                        <p className="text-gray-400 italic text-center max-w-md mt-2">"{profile.bio}"</p>
                    )}

                    <div className="mt-6 w-full max-w-md border-t border-slate-700 pt-6 space-y-3">
                        {profile.kota && (
                            <div className="flex items-center text-gray-300">
                                <i className="fas fa-map-marker-alt w-6 text-center text-lg text-primary"></i>
                                <span className="ml-3">{profile.kota}</span>
                            </div>
                        )}
                        {profile.tanggalLahir && (
                            <div className="flex items-center text-gray-300">
                                <i className="fas fa-calendar-alt w-6 text-center text-lg text-primary"></i>
                                <span className="ml-3">{new Date(profile.tanggalLahir + 'T00:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            </div>
                        )}
                        {profile.instagram && (
                            <div className="flex items-center text-gray-300">
                                <i className="fab fa-instagram w-6 text-center text-lg text-primary"></i>
                                <span className="ml-3">{profile.instagram}</span>
                            </div>
                        )}
                        {profile.whatsapp && (
                             <div className="flex items-center text-gray-300">
                                <i className="fab fa-whatsapp w-6 text-center text-lg text-primary"></i>
                                <span className="ml-3">{profile.whatsapp}</span>
                                {profile.isVerified ? (
                                    <span className="ml-3 px-2 py-1 bg-green-200 text-green-800 text-xs font-bold rounded-full flex items-center">
                                        <i className="fas fa-check-circle mr-1"></i>
                                        Terverifikasi
                                    </span>
                                ) : (
                                     <span className="ml-3 px-2 py-1 bg-red-200 text-red-800 text-xs font-bold rounded-full">
                                        Belum Terverifikasi
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {(isAdmin && isOwnProfile) && (
                        <div className="mt-6 w-full max-w-md border-t border-slate-700 pt-6">
                            <button onClick={() => setIsDashboardOpen(true)} className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 rounded-lg">
                                <i className="fas fa-user-shield mr-2"></i>Dashboard Admin
                            </button>
                        </div>
                    )}
                </div>
             </Card>

             {!profile.isVerified && isOwnProfile && (
                <Card className="mt-6 w-full max-w-2xl mx-auto border-2 border-primary shadow-lg shadow-primary/20">
                    <div className="text-center">
                        <h4 className="font-bold text-lg text-primary mb-2">Verifikasi Nomor WhatsApp Anda</h4>
                        <p className="text-sm text-gray-400 mb-4">Nomor Anda belum terverifikasi. Verifikasi diperlukan untuk mengakses beberapa fitur komunitas dan memastikan keamanan akun.</p>
                        <button onClick={handleVerifyNowClick} className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-6 rounded-lg">
                            Verifikasi Sekarang
                        </button>
                    </div>
                </Card>
            )}

            <AdminDashboard isOpen={isDashboardOpen} onClose={() => setIsDashboardOpen(false)} isDeveloper={isDeveloper} />
        </section>
    );
};

export default Profil;
