
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';

interface PengaturanProps {
    fontSize: string;
    setFontSize: (size: string) => void;
}

type PermissionName = 'geolocation' | 'camera';
type PermissionState = 'granted' | 'prompt' | 'denied';

const Pengaturan: React.FC<PengaturanProps> = ({ fontSize, setFontSize }) => {
    const { t } = useLanguage();
    
    const [locationStatus, setLocationStatus] = useState<PermissionState>('prompt');
    const [cameraStatus, setCameraStatus] = useState<PermissionState>('prompt');

    useEffect(() => {
        const checkPermissionStatus = async (name: PermissionName) => {
            if (!('permissions' in navigator)) return;
            try {
                const status = await navigator.permissions.query({ name: name as any });
                const updateState = (state: PermissionState) => {
                    if (name === 'geolocation') setLocationStatus(state);
                    else if (name === 'camera') setCameraStatus(state);
                };
                updateState(status.state);
                status.onchange = () => {
                    updateState(status.state);
                };
            } catch (error) {
                console.error(`Error checking permission for ${name}:`, error);
            }
        };

        checkPermissionStatus('geolocation');
        checkPermissionStatus('camera');
    }, []);
    
    const fontSizes = [
        { label: 'kecil', value: '85%' },
        { label: 'normal', value: '92%' },
        { label: 'besar', value: '100%' },
    ];

    const handleClearData = () => {
        if (window.confirm(t('hapus_data_konfirmasi' as any))) {
            const theme = localStorage.getItem('theme'); // Preserve theme
            localStorage.clear();
            if (theme) localStorage.setItem('theme', theme);
            
            alert(t('data_dihapus' as any));
            setTimeout(() => {
                window.location.href = '/'; 
                window.location.reload();
            }, 1000);
        }
    };

    const renderPermissionStatusText = (status: PermissionState) => {
        switch(status) {
            case 'granted': return <span className="text-sm text-green-400 font-semibold">Aktif</span>;
            case 'prompt':
                return <span className="text-sm text-yellow-400 font-semibold">Perlu Izin</span>;
            case 'denied': return <span className="text-sm text-red-400 font-semibold">Ditolak</span>;
            default: return null;
        }
    }

    return (
        <section id="pengaturan" className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-white">{t('pengaturan_title_page' as any)}</h2>

            <div className="space-y-8">
                <Card>
                    <h3 className="text-xl font-bold text-primary mb-4"><i className="fas fa-paint-brush mr-2"></i>{t('tampilan' as any)}</h3>
                    <div className="space-y-4">
                        {/* Font Size */}
                        <div className="p-3 bg-slate-700 rounded-lg">
                             <p className="font-semibold text-gray-200 mb-2">{t('ukuran_font' as any)}</p>
                             <div className="flex rounded-lg border border-slate-600">
                                {fontSizes.map((size, index) => (
                                    <button
                                        key={size.value}
                                        onClick={() => setFontSize(size.value)}
                                        className={`flex-1 py-2 text-sm font-bold transition-colors ${fontSize === size.value ? 'bg-primary text-white' : 'hover:bg-slate-600'} 
                                        ${index === 0 ? 'rounded-l-md' : ''} ${index === fontSizes.length - 1 ? 'rounded-r-md' : ''}`}
                                    >
                                        {t(size.label as any)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>
                
                <Card>
                    <h3 className="text-xl font-bold text-primary mb-4"><i className="fas fa-shield-alt mr-2"></i>Izin Aplikasi</h3>
                    <div className="space-y-3">
                        <div className="p-3 bg-slate-700 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-gray-200">Akses Lokasi</p>
                                    <p className="text-xs text-gray-400">Untuk Masjid Terdekat.</p>
                                </div>
                                <div className="text-right">
                                    {renderPermissionStatusText(locationStatus)}
                                </div>
                            </div>
                        </div>
                        <div className="p-3 bg-slate-700 rounded-lg">
                           <div className="flex items-center justify-between">
                               <div>
                                    <p className="font-semibold text-gray-200">Akses Kamera</p>
                                    <p className="text-xs text-gray-400">Untuk Pindai Komposisi Halal.</p>
                               </div>
                               <div className="text-right">
                                    {renderPermissionStatusText(cameraStatus)}
                                </div>
                           </div>
                        </div>
                    </div>
                </Card>

                <Card>
                    <h3 className="text-xl font-bold text-primary mb-4"><i className="fas fa-info-circle mr-2"></i>Informasi & Bantuan</h3>
                    <Link to="/faq" className="block p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                        <div className="flex items-center justify-between">
                            <span className="font-semibold text-gray-200">Pertanyaan Umum (FAQ)</span>
                            <i className="fas fa-chevron-right text-gray-400"></i>
                        </div>
                    </Link>
                </Card>

                <Card>
                    <h3 className="text-xl font-bold text-primary mb-4"><i className="fas fa-database mr-2"></i>{t('data_aplikasi' as any)}</h3>
                    <div className="p-3 bg-slate-700 rounded-lg">
                        <p className="font-semibold text-gray-200 mb-2">{t('hapus_data_lokal' as any)}</p>
                        <p className="text-xs text-gray-400 mb-3">{t('hapus_data_desc' as any)}</p>
                        <button onClick={handleClearData} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg">
                            <i className="fas fa-trash-alt mr-2"></i>Hapus Semua Data
                        </button>
                    </div>
                </Card>
            </div>
            
        </section>
    );
};

export default Pengaturan;
