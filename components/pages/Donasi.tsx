
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';

interface DonasiProps {
    isDeveloper: boolean;
}

const Donasi: React.FC<DonasiProps> = ({ isDeveloper }) => {
    const { t } = useLanguage();
    const [customAmount, setCustomAmount] = useState<string>('');
    const [isLocked, setIsLocked] = useState(() => {
        try {
            return localStorage.getItem('tarbiyahSupportLock') === 'true';
        } catch {
            return false;
        }
    });

    const handleToggleLock = () => {
        const newLockState = !isLocked;
        setIsLocked(newLockState);
        try {
            localStorage.setItem('tarbiyahSupportLock', String(newLockState));
        } catch (error) {
            console.error("Failed to save lock state:", error);
        }
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, ''); // Allow only digits
        setCustomAmount(value);
    };

    const isValidAmount = customAmount && Number(customAmount) > 0;
    const supportLink = isValidAmount 
        ? `https://link.dana.id/send?phone=081329466856&amount=${customAmount}`
        : '#';
        
    return (
        <section id="donasi" className="animate-fade-in">
            <h2 className="text-3xl font-bold text-white ApplicationTitle">{t('donasi_title_page' as any)}</h2>

            {isDeveloper && (
                <Card className="mb-6 bg-yellow-900/30 border-yellow-500 border">
                    <div className="flex justify-between items-center gap-4">
                        <h4 className="font-bold text-yellow-300 flex items-center gap-3">
                            <i className="fas fa-user-shield text-2xl"></i>
                            <span className="text-xl">Panel Developer</span>
                        </h4>
                        <button 
                            onClick={handleToggleLock} 
                            className={`w-36 px-4 py-2 font-bold rounded-lg text-sm transition-colors duration-200 flex items-center justify-center
                                ${isLocked
                                    ? 'bg-green-600 hover:bg-green-700 text-white'
                                    : 'bg-yellow-600 hover:bg-yellow-700 text-white'
                                }
                            `}
                            title={isLocked ? "Buka akses support DANA untuk semua pengguna" : "Kunci akses support DANA untuk semua pengguna"}
                        >
                            <i className={`fas ${isLocked ? 'fa-lock' : 'fa-unlock'} mr-2`}></i>
                            <span>{isLocked ? 'Buka Kunci' : 'Kunci Fitur'}</span>
                        </button>
                    </div>
                </Card>
            )}

            <Card className="p-8 text-center">
                <p className="text-gray-300 mb-6">{t('donasi_desc')}</p>
                
                <div className="flex flex-col items-center gap-6">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo_dana_blue.svg/2560px-Logo_dana_blue.svg.png" alt="Logo DANA" className="h-24 w-auto" />

                    <div>
                        <p className="text-lg font-semibold">DANA : {isLocked ? '••••••••••••' : '081329466856'} (ROJUDIN)</p>
                    </div>

                    {isLocked ? (
                         <div className="p-4 bg-slate-900 rounded-lg text-red-300 text-center w-full max-w-sm mt-4 border border-red-500">
                            <p className="font-bold flex items-center justify-center gap-2"><i className="fas fa-lock"></i> Akses Support Ditutup</p>
                            <p className="text-sm mt-1">Untuk saat ini, fitur support langsung ke developer sedang ditutup. Mohon salurkan kebaikan Anda melalui lembaga resmi yang kami rekomendasikan di bawah ini.</p>
                        </div>
                    ) : (
                        <>
                            <div className="w-full max-w-sm">
                                <label htmlFor="donation-amount" className="mb-3 text-gray-200 block">Masukkan Nominal</label>
                                <div className="relative">
                                    <input 
                                        id="donation-amount"
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        value={customAmount}
                                        onChange={handleAmountChange}
                                        className="w-full p-3 text-center bg-gray-700 rounded-lg border border-gray-600 focus:ring-primary focus:border-primary font-bold text-lg"
                                        disabled={isLocked}
                                    />
                                </div>
                            </div>
                            
                            <a 
                                href={supportLink} 
                                target={isValidAmount && !isLocked ? "_blank" : "_self"}
                                rel="noopener noreferrer"
                                onClick={(e) => (!isValidAmount || isLocked) && e.preventDefault()}
                                className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 text-lg flex items-center justify-center ${!isValidAmount || isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {t('donasi')}
                            </a>
                        </>
                    )}
                </div>
            </Card>

            <Card className="mt-8 p-6 bg-yellow-900/20 border border-yellow-500/30 text-yellow-200">
                {!isLocked && (
                    <h3 className="text-xl font-bold mb-4 text-yellow-400 text-center"><i className="fas fa-exclamation-triangle mr-2"></i>CATATAN PENTING</h3>
                )}
                <div className="space-y-4 text-sm text-center">
                    {!isLocked && (
                        <p>
                            Segala bentuk kebaikan berawal dari niat yang tulus. Namun, kami sangat tidak menyarankan untuk memberikan support dalam bentuk transfer uang ke nomor rekening atau e-wallet pribadi kami.
                        </p>
                    )}
                    <p>
                        Agar keberkahan dan manfaat dari harta yang Anda titipkan benar-benar sampai kepada yang berhak, sebaiknya salurkan niat tersebut melalui lembaga resmi yang amanah dan terpercaya.
                    </p>
                    <p className="font-bold text-yellow-300">✨ Rekomendasi lembaga penyalur kebaikan :</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 py-4">
                        <a href="https://baznas.go.id" target="_blank" rel="noopener noreferrer" className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                            <i className="fas fa-landmark mr-2"></i> BAZNAS
                        </a>
                        <a href="https://kitabisa.com" target="_blank" rel="noopener noreferrer" className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                            <i className="fas fa-hands-helping mr-2"></i> KitaBisa
                        </a>
                    </div>
                    <p>
                        InsyaAllah, melalui lembaga-lembaga tersebut, setiap sedekah dan zakat yang Anda salurkan akan menjadi amal kebaikan yang terus mengalir pahalanya.
                    </p>
                    <p className="font-semibold">
                        Jazakumullah khairan...!
                    </p>
                </div>
            </Card>
        </section>
    );
};

export default Donasi;
