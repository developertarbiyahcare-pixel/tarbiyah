
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';

interface LandingPageProps {
    onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    
    // Developer login state
    const [isDevLoginVisible, setDevLoginVisible] = useState(false);
    const [devCode, setDevCode] = useState('');

    const DEVELOPER_WA_NUMBER_FULL = '6281329466856';
    const DEVELOPER_CODE = '024434';

    const handleDevLogin = () => {
        if (devCode === DEVELOPER_CODE) {
            setError('');
            const authData = { loggedIn: true, waNumber: DEVELOPER_WA_NUMBER_FULL };
            localStorage.setItem('tarbiyahAuth', JSON.stringify(authData));
            
            const usersRaw = localStorage.getItem('tarbiyahUsers');
            const users = usersRaw ? JSON.parse(usersRaw) : [];
            if (!users.includes(DEVELOPER_WA_NUMBER_FULL)) {
                users.push(DEVELOPER_WA_NUMBER_FULL);
                localStorage.setItem('tarbiyahUsers', JSON.stringify(users));
            }
            
            onLogin();
        } else {
            setError('Kode developer salah.');
        }
    };
    
    const handleGoogleLogin = () => {
        // Placeholder for Google Login logic
        alert("Fitur Login Google sedang dalam pengembangan. Silakan gunakan Verifikasi WhatsApp untuk saat ini.");
    };

    const renderDevLogin = () => (
        <div className="w-full max-w-sm text-center animate-fade-in">
            <Card className="mb-6 border-2 border-yellow-500 bg-yellow-900/30">
                 <div className="flex flex-col items-center">
                    <i className="fas fa-exclamation-triangle text-3xl text-yellow-400 mb-3"></i>
                    <h4 className="font-bold text-yellow-300">PERINGATAN AKSES TERBATAS</h4>
                    <p className="text-xs text-yellow-200 mt-2">
                        Fitur ini ditujukan khusus untuk keperluan pengembangan dan debugging. Penyalahgunaan akses dapat menyebabkan kerusakan data dan akan ditindaklanjuti.
                    </p>
                </div>
            </Card>

            <Card>
                <h3 className="text-2xl font-bold text-primary mb-4">Developer Access</h3>
                <p className="text-gray-300 mb-4 text-sm">This access route is restricted. Please enter the developer code below to proceed with authentication.</p>
                <div className="space-y-4">
                    <div>
                        <input 
                            type="tel" 
                            value={DEVELOPER_WA_NUMBER_FULL} 
                            readOnly
                            className="w-full p-2.5 bg-slate-800 text-gray-400 rounded-lg border border-slate-600 text-center cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <input 
                            type="password" 
                            value={devCode} 
                            onChange={e => setDevCode(e.target.value)} 
                            className="w-full p-2.5 bg-slate-700 rounded-lg border border-slate-600 text-center tracking-widest" 
                            placeholder="_ _ _ _ _ _"
                            maxLength={6}
                        />
                    </div>
                    {error && <p className="text-xs text-red-400">{error}</p>}
                    <button onClick={handleDevLogin} className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-lg">
                        <i className="fas fa-user-shield mr-2"></i>Go To Access
                    </button>
                    <button onClick={() => { setDevLoginVisible(false); setError(''); }} className="w-full bg-slate-600 hover:bg-slate-500 text-white font-semibold py-3 rounded-lg mt-2">
                        <i className="fas fa-arrow-left mr-2"></i>Kembali
                    </button>
                </div>
            </Card>
        </div>
    );

    // Memisahkan judul dan isi dari teks deskripsi untuk styling yang lebih baik
    const fullDescription = t('deskripsi_aplikasi_detail');
    const splitIndex = fullDescription.indexOf('\n');
    const titleText = splitIndex !== -1 ? fullDescription.substring(0, splitIndex) : fullDescription;
    const bodyText = splitIndex !== -1 ? fullDescription.substring(splitIndex).trim() : '';

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-slate-900 p-4">
            
            {isDevLoginVisible ? (
                renderDevLogin()
            ) : (
                <div className="animate-fade-in text-center w-full">
                    <div className="text-center mb-8">
                        <i className="fa-solid fa-leaf text-6xl text-primary mb-4 animate-bounce-slow"></i>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
                            TARBIYAH CARE PREMIUM
                        </h1>
                        <p className="text-lg text-gray-500 dark:text-gray-400 mt-2 tracking-widest uppercase text-xs font-semibold">
                            Islamic Wellness & Life Guidance
                        </p>
                    </div>

                    <div className="w-full max-w-3xl mx-auto">
                        <Card className="text-center border-2 border-primary shadow-xl shadow-primary/20 p-8 md:p-10 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm relative overflow-hidden group">
                            {/* Efek dekoratif background */}
                            <div className="absolute top-0 left-0 w-20 h-20 bg-primary/10 rounded-br-full transition-transform duration-500 group-hover:scale-110"></div>
                            <div className="absolute bottom-0 right-0 w-20 h-20 bg-primary/10 rounded-tl-full transition-transform duration-500 group-hover:scale-110"></div>
                            
                            <div className="relative z-10">
                                <h2 className="text-base sm:text-xl md:text-3xl font-bold text-primary mb-6 tracking-wide border-b-2 border-primary/20 pb-4 inline-block whitespace-nowrap">
                                    {titleText}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed whitespace-pre-wrap max-w-2xl mx-auto">
                                    {bodyText}
                                </p>
                            </div>
                        </Card>
                    </div>
                    
                    <div className="mt-10 w-full max-w-sm mx-auto space-y-4">
                        <button
                            onClick={handleGoogleLogin}
                            className="w-full bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 font-bold py-3.5 px-6 rounded-full text-lg shadow-md transition-all transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center"
                        >
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-6 h-6 mr-3">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                            </svg>
                            Sign in with Google
                        </button>

                         <button onClick={() => { setDevLoginVisible(true); setError(''); }} className="w-full bg-slate-700 hover:bg-slate-600 text-gray-300 font-bold py-3.5 px-6 rounded-full text-lg transition-all transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center gap-3 mt-6">
                            <i className="fas fa-user-shield"></i> Panel Developer
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default LandingPage;
