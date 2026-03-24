
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Routes, Route, useLocation, useNavigate, Link } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import PageHeader from './components/MobileHeader';
import Beranda from './components/pages/Beranda';
import Konsultasi from './components/pages/Konsultasi';
import Mushaf from './components/pages/Mushaf';
import MushafInsight from './components/pages/MushafInsight';
import Roadmap from './components/pages/Roadmap';
import Donasi from './components/pages/Donasi';
import Testimoni from './components/pages/Testimoni';
import Footer from './components/Footer';
import DoaHarian from './components/pages/DoaHarian';
import Kalender from './components/pages/Kalender';
import Tauhid from './components/pages/Tauhid';
import SirahNabawiyah from './components/pages/SirahNabawiyah';
import SejarahIslam from './components/pages/SejarahIslam';
import HaditsArbain from './components/pages/HaditsArbain';
import Pedoman from './components/pages/Pedoman';
import TokohBerpengaruh from './components/pages/TokohBerpengaruh';
import Sumber from './components/pages/Sumber';
import Istilah from './components/pages/Istilah';
import Peristiwa from './components/pages/Peristiwa';
import TimelineManusia from './components/pages/TimelineManusia';
import PetaPeristiwaQuran from './components/pages/PetaPeristiwaQuran';
import Kuis from './components/pages/Kuis';
import KisahNabi from './components/pages/KisahNabi';
import TanyaSejarahNabi from './components/pages/TanyaSejarahNabi';
import Ensiklopedia from './components/pages/Ensiklopedia';
import FAQ from './components/pages/TanyaJawab';
import KhutbahGenerator from './components/pages/KhutbahGenerator';
import Halal from './components/pages/Halal';
import KalkulatorIslami from './components/pages/KalkulatorIslami';
import LandingPage from './components/pages/LandingPage';
import Verifikasi from './components/pages/Verifikasi';
import HukumSyariah from './components/pages/HukumSyariah';
import Profil from './components/pages/Profil';
import Pengaturan from './components/pages/Pengaturan';
import JurnalMuhasabah from './components/pages/JurnalMuhasabah';
import { LanguageProvider } from './contexts/LanguageContext';
import { MoodProvider } from './contexts/MoodContext';
import LaporanSpiritual from './components/pages/LaporanSpiritual';
import LaporanReview from './components/pages/LaporanReview';
import TarbiyahJourney from './components/pages/TarbiyahJourney';
import MasjidTerdekat from './components/pages/MasjidTerdekat';
import TentangKami from './components/pages/TentangKami';
import PeloporIslam from './components/pages/PeloporIslam';
import Admin from './components/pages/Admin'; 
import Bimbingan from './components/pages/Bimbingan';
import * as trackingService from './services/trackingService';
import { showNotification } from './services/notificationService';
import { calendarEventsData } from './data/calendarEvents';
import Akhlak from './components/pages/Akhlak';
import CaraKerjaHafalan from './components/pages/CaraKerjaHafalan';
import QuranVsAlkitab from './components/pages/QuranVsAlkitab';
import Psikologi from './components/pages/Psikologi';
import PustakaIlmu from './components/pages/Ilmuwan';
import KitabKuning from './components/pages/KitabKuning';
import LenteraHati from './components/pages/LenteraHati';
import RiwayatAmalan from './components/pages/RiwayatAmalan';
import RiwayatKonsultasi from './components/pages/RiwayatKonsultasi';
import TambahAcara from './components/pages/Zakat';
import ThanksTo from './components/pages/Waris';
import FaktaIlmiah from './components/pages/FaktaIlmiah';
import KurikulumTarbiyah from './components/pages/KurikulumTarbiyah';
import KurikulumTarbiyahDetail from './components/pages/KurikulumTarbiyahDetail';
import TahsinAI from './components/pages/TahsinAI';
import TarbiyahPersonal from './components/pages/TarbiyahPersonal';
import TasbihDigital from './components/pages/TasbihDigital';

const AppContent: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isDarkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme === 'dark';
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });
    const [fontSize, setFontSize] = useState(() => {
        return localStorage.getItem('tarbiyah-fontSize') || '92%';
    });
    
    const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('tarbiyahAuth'));
    const location = useLocation();
    const navigate = useNavigate();
    
    useEffect(() => {
        trackingService.startSession();
    }, []);

    // Service Worker Registration for PWA
    useEffect(() => {
        if ('serviceWorker' in navigator) {
          window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
              .then(registration => {
                console.log('SW Registered: ', registration.scope);
                
                // Check for updates
                registration.onupdatefound = () => {
                    const installingWorker = registration.installing;
                    if (installingWorker) {
                        installingWorker.onstatechange = () => {
                            if (installingWorker.state === 'installed') {
                                if (navigator.serviceWorker.controller) {
                                    console.log('New content available; please refresh.');
                                } else {
                                    console.log('Content is cached for offline use.');
                                }
                            }
                        };
                    }
                };
              })
              .catch(error => {
                console.log('SW Registration failed: ', error);
              });
          });
        }
    }, []);

    useEffect(() => {
        const authData = localStorage.getItem('tarbiyahAuth');
        const loggedIn = !!authData;
        if (loggedIn !== isAuthenticated) {
            setIsAuthenticated(loggedIn);
        }
    
        const isAuthPage = location.pathname === '/' || location.pathname === '/verifikasi';
    
        if (loggedIn && isAuthPage) {
            navigate('/beranda', { replace: true });
        } else if (!loggedIn && !isAuthPage) {
            navigate('/', { replace: true });
        }
    }, [location.pathname, isAuthenticated, navigate]);


    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    useEffect(() => {
        // Lock body scroll when sidebar is open to prevent background scrolling
        if (isSidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isSidebarOpen]);

    useEffect(() => {
        document.documentElement.style.setProperty('--font-size-base', fontSize);
        localStorage.setItem('tarbiyah-fontSize', fontSize);
    }, [fontSize]);
    
    useEffect(() => {
        window.scrollTo(0, 0);
        trackingService.trackPageView(location.pathname);
    }, [location.pathname, location.search]);

    
    useEffect(() => {
        const notificationInterval = setInterval(() => {
            const now = new Date();
            const todayStr = now.toISOString().split('T')[0];
            const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            
            const checkAndNotify = (key: string, title: string, body: string) => {
                const notificationKey = `${key}_${todayStr}`;
                if (!localStorage.getItem(notificationKey)) {
                    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
                        showNotification(title, { body, icon: 'https://cdn-icons-png.flaticon.com/512/2886/2886062.png' });
                    }
                    localStorage.setItem(notificationKey, 'true');
                }
            };
            
            if (currentTime === '06:00') {
                checkAndNotify('dzikir_pagi', 'Waktunya Dzikir Pagi', 'Mulailah hari dengan mengingat Allah untuk mendapatkan perlindungan dan keberkahan.');
            }
            if (currentTime === '16:00') {
                checkAndNotify('dzikir_petang', 'Waktunya Dzikir Petang', 'Tutup hari Anda dengan berdzikir, memohon ampunan dan ketenangan.');
            }
            if (currentTime === '08:00') {
                const todayEvent = calendarEventsData.find(event => event.date === todayStr && event.type === 'islami');
                if (todayEvent) {
                    const summary = typeof todayEvent.summary === 'string' ? todayEvent.summary : todayEvent.summary.id;
                    checkAndNotify(`event_${todayStr}`, `Pengingat Hari Besar Islam`, `Hari ini adalah ${summary}. Perbanyak amalan dan doa.`);
                }
            }
        }, 60 * 1000); 

        return () => {
            clearInterval(notificationInterval);
        };
    }, []);


    const handleLogin = () => {
        setIsAuthenticated(true);
    };
    
    const handleLogout = () => {
        localStorage.removeItem('tarbiyahAuth');
        setIsAuthenticated(false);
    };

    const { isDeveloper, isAdmin } = useMemo(() => {
        const DEVELOPER_WA_NUMBER = '6281329466856';
        try {
            const authData = localStorage.getItem('tarbiyahAuth');
            if (!authData) {
                return { isDeveloper: false, isAdmin: false };
            }
            const { waNumber } = JSON.parse(authData);

            const developerCheck = waNumber === DEVELOPER_WA_NUMBER;

            const adminsRaw = localStorage.getItem('tarbiyahAdmins');
            const admins = adminsRaw ? JSON.parse(adminsRaw) : [];
            const adminCheck = admins.includes(waNumber);

            return { isDeveloper: developerCheck, isAdmin: developerCheck || adminCheck };
        } catch {
            return { isDeveloper: false, isAdmin: false };
        }
    }, [isAuthenticated]);

    const getBackPath = (pathname: string, search: string, state: any): string | undefined => {
        if (state?.from) { return state.from; }
        const standardBackPaths = ['/pengaturan', '/profil'];
        if (standardBackPaths.some(p => pathname.startsWith(p))) { return undefined; }
        if (pathname.endsWith('/edit')) { return pathname.substring(0, pathname.lastIndexOf('/')); }
        if (pathname.startsWith('/pedoman/shalat-')) { return '/pedoman/shalat'; }
        if (pathname.startsWith('/tambah-acara')) { return '/kalender'; }
        if (pathname.startsWith('/mushaf/insight')) { return '/mushaf'; }
        if (pathname.match(/^\/kurikulum-tarbiyah\/\d+\/[^/]+$/)) { return '/kurikulum-tarbiyah'; }
    
        const parentMap: { [key: string]: string } = {
            '/tauhid': '/pustaka-ilmu',
            '/akhlak': '/pustaka-ilmu',
            '/sirah': '/pustaka-ilmu',
            '/kisah-nabi': '/pustaka-ilmu',
            '/tanya-sejarah-nabi': '/pustaka-ilmu',
            '/sejarah': '/pustaka-ilmu',
            '/pelopor-islam': '/pustaka-ilmu',
            '/peristiwa': '/pustaka-ilmu',
            '/timeline-manusia': '/pustaka-ilmu',
            '/peta-peristiwa-quran': '/pustaka-ilmu',
            '/tokoh': '/pustaka-ilmu',
            '/hadits-arbain': '/pustaka-ilmu',
            '/cara-kerja-hafalan': '/pustaka-ilmu',
            '/istilah': '/pustaka-ilmu',
            '/ensiklopedia': '/pustaka-ilmu',
            '/pedoman': '/pustaka-ilmu',
            '/hukum-syariah': '/pustaka-ilmu',
            '/quran-vs-alkitab': '/pustaka-ilmu',
            '/psikologi': '/pustaka-ilmu',
            '/pustaka-ilmu': '/beranda',
            '/kitab-kuning': '/pustaka-ilmu',
            '/riwayat-amalan': '/roadmap',
            '/riwayat-konsultasi': '/konsultasi',
            '/pedoman/shalat': '/pedoman',
            '/fakta-ilmiah': '/beranda',
            '/kurikulum-tarbiyah': '/roadmap',
            '/tahsin-ai': '/beranda',
            '/tarbiyah-personal': '/beranda',
            '/tasbih-digital': '/roadmap'
        };
        if (parentMap[pathname]) { return parentMap[pathname]; }
        const searchParamDetailRoutes = ['/kuis', '/bimbingan', '/mushaf'];
        if (searchParamDetailRoutes.includes(pathname) && search) { return pathname; }
        const segments = pathname.split('/').filter(Boolean);
        if (segments.length > 1) { return `/${segments[0]}`; }
        if (segments.length === 1) { return '/beranda'; }
        return undefined;
    };

    const backPath = getBackPath(location.pathname, location.search, location.state);

    const showBackButton = useMemo(() => {
        return location.pathname !== '/' && location.pathname !== '/beranda' && location.pathname !== '/verifikasi';
    }, [location.pathname]);

    const showMainLayout = isAuthenticated;
    
    const AppRoutes = () => (
        <Routes>
            <Route path="/" element={<LandingPage onLogin={handleLogin} />} />
            <Route path="/verifikasi" element={<Verifikasi onLogin={handleLogin} />} />
            <Route path="/beranda" element={<Beranda />} />
            <Route path="/pustaka-ilmu" element={<PustakaIlmu />} />
            <Route path="/tauhid/:topicId" element={<Tauhid />} />
            <Route path="/tauhid" element={<Tauhid />} />
            <Route path="/akhlak/:topicId" element={<Akhlak />} />
            <Route path="/akhlak" element={<Akhlak />} />
            <Route path="/sirah/:topicId" element={<SirahNabawiyah />} />
            <Route path="/sirah" element={<SirahNabawiyah />} />
            <Route path="/kisah-nabi/:nabiId" element={<KisahNabi />} />
            <Route path="/kisah-nabi" element={<KisahNabi />} />
            <Route path="/tanya-sejarah-nabi" element={<TanyaSejarahNabi />} />
            <Route path="/sejarah/:topicId" element={<SejarahIslam />} />
            <Route path="/sejarah" element={<SejarahIslam />} />
            <Route path="/pelopor-islam" element={<PeloporIslam />} />
            <Route path="/peristiwa/:topicId" element={<Peristiwa />} />
            <Route path="/peristiwa" element={<Peristiwa />} />
            <Route path="/timeline-manusia" element={<TimelineManusia />} />
            <Route path="/peta-peristiwa-quran" element={<PetaPeristiwaQuran />} />
            <Route path="/tokoh/:tokohId" element={<TokohBerpengaruh />} />
            <Route path="/tokoh" element={<TokohBerpengaruh />} />
            <Route path="/hadits-arbain/:hadithId" element={<HaditsArbain />} />
            <Route path="/hadits-arbain" element={<HaditsArbain />} />
            <Route path="/cara-kerja-hafalan" element={<CaraKerjaHafalan />} />
            <Route path="/istilah" element={<Istilah />} />
            <Route path="/ensiklopedia/:topicId" element={<Ensiklopedia />} />
            <Route path="/ensiklopedia" element={<Ensiklopedia />} />
            <Route path="/pedoman/:topicId" element={<Pedoman />} />
            <Route path="/pedoman" element={<Pedoman />} />
            <Route path="/hukum-syariah/:topicId" element={<HukumSyariah />} />
            <Route path="/hukum-syariah" element={<HukumSyariah />} />
            <Route path="/kitab-kuning/:kitabId" element={<KitabKuning />} />
            <Route path="/kitab-kuning" element={<KitabKuning />} />
            <Route path="/quran-vs-alkitab/:topicId" element={<QuranVsAlkitab />} />
            <Route path="/quran-vs-alkitab" element={<QuranVsAlkitab />} />
            <Route path="/psikologi/:topicId" element={<Psikologi />} />
            <Route path="/psikologi" element={<Psikologi />} />
            <Route path="/konsultasi" element={<Konsultasi />} />
            <Route path="/riwayat-konsultasi" element={<RiwayatKonsultasi />} />
            <Route path="/tarbiyah-journey" element={<TarbiyahJourney />} />
            <Route path="/tarbiyah-personal" element={<TarbiyahPersonal />} />
            <Route path="/jurnal-muhasabah" element={<JurnalMuhasabah />} />
            <Route path="/lentera-hati" element={<LenteraHati />} />
            <Route path="/bimbingan" element={<Bimbingan />} />
            <Route path="/bimbingan/:anakId" element={<Bimbingan />} />
            <Route path="/mushaf" element={<Mushaf />} />
            <Route path="/mushaf/insight/:surahNumber/:ayahNumber/:type" element={<MushafInsight />} />
            <Route path="/tahsin-ai" element={<TahsinAI />} />
            <Route path="/doaharian" element={<DoaHarian />} />
            <Route path="/halal" element={<Halal />} />
            <Route path="/fakta-ilmiah" element={<FaktaIlmiah />} />
            <Route path="/kurikulum-tarbiyah" element={<KurikulumTarbiyah />} />
            <Route path="/kurikulum-tarbiyah/:levelId/:subjectId" element={<KurikulumTarbiyahDetail />} />
            <Route path="/kalkulator" element={<KalkulatorIslami />} />
            <Route path="/masjid-terdekat" element={<MasjidTerdekat />} />
            <Route path="/kalender" element={<Kalender />} />
            <Route path="/tambah-acara" element={<TambahAcara />} />
            <Route path="/tambah-acara/:eventId" element={<TambahAcara />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/tasbih-digital" element={<TasbihDigital />} />
            <Route path="/riwayat-amalan" element={<RiwayatAmalan />} />
            <Route path="/kuis" element={<Kuis />} />
            <Route path="/khutbah-generator" element={<KhutbahGenerator />} />
            <Route path="/laporan-spiritual" element={<LaporanSpiritual />} />
            <Route path="/laporan-spiritual/:range" element={<LaporanReview />} />
            <Route path="/testimoni" element={<Testimoni />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/profil/:userId" element={<Profil isAdmin={isAdmin} isDeveloper={isDeveloper} />} />
            <Route path="/profil" element={<Profil isAdmin={isAdmin} isDeveloper={isDeveloper} />} />
            <Route path="/pengaturan" element={<Pengaturan fontSize={fontSize} setFontSize={setFontSize} />} />
            <Route path="/sumber" element={<Sumber />} />
            <Route path="/donasi" element={<Donasi isDeveloper={isDeveloper} />} />
            <Route path="/tentang-kami" element={<TentangKami isDeveloper={isDeveloper} />} />
            <Route path="/thanks-to" element={<ThanksTo />} />
            <Route path="/admin" element={<Admin isDeveloper={isDeveloper} />} />
        </Routes>
    );

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-slate-900">
            <Sidebar 
                isSidebarOpen={isSidebarOpen}
                setSidebarOpen={setSidebarOpen}
                isLandingPage={!showMainLayout}
                isDeveloper={isDeveloper}
                onLogout={handleLogout}
            />
            
            {/* Main Content Area - Full Width */}
            <main className={`flex-1 bg-gray-100 dark:bg-slate-900 transition-all duration-300 w-full`}>
                <div className={showMainLayout ? "bg-gray-200 dark:bg-slate-800 min-h-screen flex flex-col" : ""}>
                    {showMainLayout && <PageHeader 
                        isSidebarOpen={isSidebarOpen} 
                        setSidebarOpen={setSidebarOpen} 
                        showBackButton={showBackButton} 
                        backPath={backPath}
                    />}
                    <div className={showMainLayout ? "flex-grow p-4 sm:p-6 md:p-8 flex flex-col" : "flex-grow"}>
                        <div id="page-content" className="flex-grow">
                            <AppRoutes />
                        </div>
                        {showMainLayout && <Footer />}
                    </div>
                </div>
            </main>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <LanguageProvider>
            <MoodProvider>
                <AppContent />
            </MoodProvider>
        </LanguageProvider>
    );
};

export default App;
