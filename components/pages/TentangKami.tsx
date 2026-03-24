
import React, { useState, useEffect, useRef } from 'react';
import Card from '../ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';
import { trackEvent } from '../../services/trackingService';

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

interface TentangKamiProps {
    isDeveloper: boolean;
}

const TentangKami: React.FC<TentangKamiProps> = ({ isDeveloper }) => {
    const { t } = useLanguage();
    const [devPhoto, setDevPhoto] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const savedPhoto = localStorage.getItem('developerProfilePhoto');
        if (savedPhoto) {
            setDevPhoto(savedPhoto);
        }
    }, []);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isDeveloper) return;
        const file = e.target.files?.[0];
        if (file) {
            const base64 = await fileToBase64(file);
            setDevPhoto(base64);
            localStorage.setItem('developerProfilePhoto', base64);
        }
    };

    const handleLinkClick = () => {
        trackEvent('link_click', { url: 'https://lynk.id/r_besar.id' });
    };
    
    const whatsappNumber = '6281329466856';
    const whatsappMessage = `Assalamualaikum...

Saya ingin memberikan masukan/melaporkan bug terkait aplikasi Tarbiyah Care Premium.

Terimakasih`;
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    const emailSubject = "Masukan Aplikasi Tarbiyah Care Premium";
    const emailBody = `Assalamualaikum...

Saya ingin memberikan masukan/saran/laporan bug untuk aplikasi Tarbiyah Care Premium:

...

Terima kasih.`;
    const emailLink = `mailto:rojudindigital.id@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;


    return (
        <section id="tentang-kami" className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-white">{t('tentang_kami' as any)}</h2>
            <Card className="p-8 text-gray-300 leading-relaxed space-y-6 max-w-2xl mx-auto">
                <div className="text-center">
                    <i className="fa-solid fa-leaf text-5xl text-primary mb-3"></i>
                    <h3 className="text-2xl font-bold text-white">TARBIYAH CARE PREMIUM</h3>
                    <p className="text-gray-400">Islamic Wellness & Life Guidance</p>
                </div>

                <div>
                    <h4 className="font-bold text-lg text-primary mb-2">Misi Kami</h4>
                    <p className="text-justify">
                        Tarbiyah Care Premium bertujuan menjadi teman setia dalam perjalanan spiritual setiap Muslim. Di tengah kesibukan dan tantangan hidup modern, kami menyediakan sebuah ruang digital yang tenang dan kaya akan ilmu untuk membantu Anda terhubung kembali dengan ajaran Islam yang murni, menemukan kedamaian batin, dan membangun kebiasaan positif yang berlandaskan Al-Qur'an dan Sunnah.
                    </p>
                </div>

                <div>
                    <h4 className="font-bold text-lg text-primary mb-2">Filosofi Kami</h4>
                    <p className="text-justify">
                        Kami percaya bahwa Islam adalah jalan hidup yang komprehensif (syumul) yang mencakup semua aspek kehidupan—spiritual, emosional, intelektual, dan sosial. Aplikasi ini dirancang untuk menjadi asisten pribadi Anda dalam menerapkan nilai-nilai Islam dalam kehidupan sehari-hari, mulai dari ibadah personal hingga interaksi sosial, semuanya dalam satu platform yang mudah diakses dan berlandaskan sumber-sumber yang terpercaya.
                    </p>
                </div>
                
                <div>
                    <h4 className="font-bold text-lg text-primary mb-2">Profil Developer</h4>
                     <div className="relative flex flex-col items-center p-6 bg-slate-700/50 rounded-lg mt-4">
                        {isDeveloper && (
                             <button onClick={() => fileInputRef.current?.click()} className="absolute top-4 right-4 text-gray-400 hover:text-primary" title="Ubah foto profil developer">
                                <i className="fas fa-camera text-lg"></i>
                            </button>
                        )}
                        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />

                        <div className="relative">
                            {devPhoto ? (
                                <img src={devPhoto} alt="Foto Developer" className="w-32 h-32 rounded-full object-cover border-4 border-primary mb-4" />
                            ) : (
                                <div className="w-32 h-32 rounded-full border-4 border-primary bg-slate-700 flex items-center justify-center mb-4">
                                    <i className="fas fa-user text-6xl text-slate-500"></i>
                                </div>
                            )}
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white">Rojudin</h3>
                        <p className="text-gray-400 italic text-center max-w-md mt-2">"Developers of the Tarbiyah Care Premium Application"</p>

                        <div className="mt-6 w-full max-w-md border-t border-slate-700 pt-6 space-y-3">
                            <div className="flex items-center text-gray-300">
                                <i className="fab fa-instagram w-6 text-center text-lg text-primary"></i>
                                <a href="https://www.instagram.com/r_besar.id" target="_blank" rel="noopener noreferrer" className="ml-3 text-sm hover:underline">r_besar.id</a>
                            </div>
                             <div className="flex items-center text-gray-300">
                                <i className="fab fa-whatsapp w-6 text-center text-lg text-primary"></i>
                                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="ml-3 text-sm hover:underline">+62 813 2946 6856</a>
                            </div>
                             <div className="flex items-center text-gray-300">
                                <i className="fas fa-map-marker-alt w-6 text-center text-lg text-primary"></i>
                                <span className="ml-3 text-sm">Karadenan, Cibinong, Bogor</span>
                            </div>
                        </div>

                        <div className="mt-6 w-full max-w-md border-t border-slate-700 pt-6 text-center">
                            <p className="mb-3 font-semibold text-white">Ikuti & Kunjungi Kami</p>
                            <div className="flex space-x-6 justify-center">
                                <a href="https://www.instagram.com/r_besar.id" target="_blank" rel="noopener noreferrer" className="hover:text-primary text-2xl" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                                <a href="https://lynk.id/r_besar.id" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick} className="hover:text-primary text-2xl" aria-label="Website"><i className="fas fa-globe"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            <Card className="p-8 text-gray-300 leading-relaxed space-y-4 max-w-2xl mx-auto mt-8">
                 <h4 className="font-bold text-lg text-primary text-center">{t('hubungi_kami')}</h4>
                 <p className="text-sm text-center text-gray-400">
                    {t('hubungi_kami_desc')}
                 </p>
                 <div className="text-center pt-4">
                     <div className="flex flex-col items-center gap-4">
                        <a
                            href={whatsappLink}
                            onClick={() => trackEvent('send_feedback_whatsapp')}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full max-w-xs inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                        >
                            <i className="fab fa-whatsapp mr-2"></i>
                            {t('kirim_pesan_wa' as any)}
                        </a>
                        <a
                            href={emailLink}
                            onClick={() => trackEvent('send_feedback_email')}
                            className="w-full max-w-xs inline-block bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                        >
                            <i className="fas fa-envelope mr-2"></i>
                            Kirim Pesan via Email
                        </a>
                    </div>
                 </div>
            </Card>
        </section>
    );
};

export default TentangKami;
