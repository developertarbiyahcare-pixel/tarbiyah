
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import type { Testimonial } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

const staticTestimonials: Omit<Testimonial, 'id' | 'date'>[] = [
    { name: "Muhammad Rifa'i", rating: 5, comment: { id: "MasyaAllah, aplikasi ini sangat membantu saya mendapatkan ketenangan saat sedang banyak pikiran. Nasihatnya ringkas tapi mengena.", en: "MasyaAllah, this app really helps me find peace when my mind is racing. The advice is concise but impactful." } },
    { name: "Rendi Sasmita", rating: 5, comment: { id: "Fitur kalkulator zakatnya sangat praktis! Tidak perlu bingung lagi menghitung zakat mal. Jazakumullah khair.", en: "The zakat calculator feature is so practical! No more confusion in calculating zakat mal. Jazakumullah khair." } },
    { name: "Iskandar", rating: 4, comment: { id: "Tampilan mushafnya bersih dan mudah dibaca. Tafsir Kemenag-nya sangat membantu pendalaman.", en: "The mushaf interface is clean and easy to read. The Kemenag tafsir is very helpful for deeper understanding." } }
];

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

const Testimoni: React.FC = () => {
    const { t, lang } = useLanguage();
    const [newName, setNewName] = useState('');
    const [newRating, setNewRating] = useState(5);
    const [hoverRating, setHoverRating] = useState(0);
    const [newTestimonial, setNewTestimonial] = useState('');
    const [userTestimonials, setUserTestimonials] = useState<Testimonial[]>([]);
    
    useEffect(() => {
        const userId = getUserId();
        if (!userId) return;
        try {
            const savedTestimonials = localStorage.getItem(`userTestimonials_${userId}`);
            if (savedTestimonials) {
                setUserTestimonials(JSON.parse(savedTestimonials));
            }
        } catch (error) {
            console.error("Failed to load user testimonials from localStorage:", error);
        }
    }, []);

    const handleSubmit = () => {
        const userId = getUserId();
        if (!userId) return;

        if (!newName.trim()) {
            alert("Mohon isi nama Anda.");
            return;
        }
        
        const trimmedTestimonial = newTestimonial.trim();
        if (!trimmedTestimonial) {
            alert(t('testimoni_mohon_tulis'));
            return;
        }

        const phoneNumber = '6281329466856';
        const message = `*Testimoni Baru dari ${newName} (Rating: ${newRating}/5):*\n\n"${trimmedTestimonial}"`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, '_blank');

        const newEntry: Testimonial = {
            id: Date.now(),
            name: newName,
            rating: newRating,
            comment: { id: trimmedTestimonial, en: trimmedTestimonial },
            date: new Date().toLocaleDateString('id-ID')
        };

        const updatedTestimonials = [newEntry, ...userTestimonials];
        setUserTestimonials(updatedTestimonials);
        localStorage.setItem(`userTestimonials_${userId}`, JSON.stringify(updatedTestimonials));

        setNewTestimonial('');
        setNewName('');
        setNewRating(5);
    };
    
    return (
        <section id="testimoni" className="animate-fade-in">
            <h2 className="text-3xl font-bold text-white ApplicationTitle">{t('testimoni_title_page')}</h2>
            
            <Card className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-primary">
                    <i className="fas fa-pen-alt mr-2"></i>{t('testimoni_bagikan_pengalaman')}
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                    {t('testimoni_desc_kirim')}
                </p>
                <div className="mb-4">
                    <label htmlFor="testimonial-name" className="block text-sm font-medium text-gray-300 mb-1">Nama Anda</label>
                    <input
                        id="testimonial-name"
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="Tuliskan nama Anda..."
                        className="w-full p-2 border border-gray-500 rounded-lg bg-gray-700 text-white focus:ring-primary focus:border-primary"
                    />
                </div>
                 <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Rating Aplikasi</label>
                    <div className="flex items-center text-3xl">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`cursor-pointer transition-colors duration-200 ${
                                    star <= (hoverRating || newRating) ? 'text-yellow-400' : 'text-gray-500'
                                }`}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setNewRating(star)}
                                aria-label={`Beri ${star} bintang`}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>
                <textarea
                    rows={4}
                    value={newTestimonial}
                    onChange={(e) => setNewTestimonial(e.target.value)}
                    placeholder={t('testimoni_placeholder')}
                    className="w-full p-2 border border-gray-500 rounded-lg bg-gray-700 text-white focus:ring-primary focus:border-primary"
                ></textarea>
                <button
                    onClick={handleSubmit}
                    className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center"
                >
                    <i className="fab fa-whatsapp mr-2"></i>{t('testimoni_kirim_wa')}
                </button>
            </Card>

            {userTestimonials.length > 0 && (
                <Card className="mb-8 animate-fade-in">
                    <h3 className="text-xl font-bold mb-4 text-white">
                        <i className="fas fa-history mr-2"></i>{t('testimoni_riwayat_anda')}
                    </h3>
                    <div className="space-y-4 max-h-60 overflow-y-auto no-scrollbar pr-2 pb-4">
                        {userTestimonials.map((t) => (
                            <div key={t.id} className="bg-gray-700 dark:bg-gray-900 p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="font-bold">{t.name}</p>
                                    <div className="text-yellow-400 text-sm">
                                        {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                                    </div>
                                </div>
                                <p className="text-sm italic text-gray-300">"{typeof t.comment === 'object' ? (t.comment as any)[lang] : t.comment}"</p>
                                <p className="text-right text-xs text-gray-400 mt-2">{t.date}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            <Card>
                <h3 className="text-xl font-bold mb-4 text-white">
                    <i className="fas fa-star mr-2"></i>{t('testimoni_pengguna_lain')}
                </h3>
                <div className="space-y-4 max-h-96 overflow-y-auto no-scrollbar pr-2 pb-4">
                    {userTestimonials.map((testi) => (
                         <div key={testi.id} className="bg-slate-800/50 border-l-4 border-primary p-4 rounded-r-lg animate-fade-in">
                            <div className="flex justify-between items-center mb-2">
                                <p className="font-bold">{testi.name}</p>
                                <div className="text-yellow-400">
                                    {'★'.repeat(testi.rating)}{'☆'.repeat(5 - testi.rating)}
                                </div>
                            </div>
                            <p className="text-sm italic text-gray-300">"{typeof testi.comment === 'object' ? (testi.comment as any)[lang] : testi.comment}"</p>
                        </div>
                    ))}
                    {staticTestimonials.map((testi, index) => (
                        <div key={index} className="bg-gray-700 dark:bg-gray-900 p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <p className="font-bold">{testi.name}</p>
                                <div className="text-yellow-400">
                                    {'★'.repeat(testi.rating)}{'☆'.repeat(5 - testi.rating)}
                                </div>
                            </div>
                            <p className="text-sm italic text-gray-300">"{(testi.comment as any)[lang]}"</p>
                        </div>
                    ))}
                </div>
            </Card>
        </section>
    );
};

export default Testimoni;