
import React, { useState, useMemo } from 'react';
import Card from '../ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';
import BookCard from '../ui/BookCard';

const libraryItems = [
    { 
        category: 'kategori_akidah', 
        items: [
            { id: 'tauhid', icon: 'fas fa-star-and-crescent', to: '/tauhid', subtitle: 'Mengkaji pilar-pilar keimanan dan esensi dari tauhid.' },
            { id: 'akhlak', icon: 'fas fa-seedling', to: '/akhlak', subtitle: 'Panduan membentuk karakter mulia sesuai teladan Rasulullah.' },
            { id: 'ensiklopedia', icon: 'fas fa-atlas', to: '/ensiklopedia', subtitle: 'Penjelasan mendalam tentang konsep-konsep penting dalam Islam.' },
            { id: 'psikologi', icon: 'fas fa-brain', to: '/psikologi', subtitle: 'Kajian perbandingan antara Psikologi Barat dan Islam.' },
        ] 
    },
    { 
        category: 'kategori_quran_hadits', 
        items: [
            { id: 'hadits', to: '/hadits-arbain', icon: 'fas fa-book', subtitle: 'Mempelajari dan menghafal 42 hadits fundamental dari Imam Nawawi.' },
            { id: 'quran-vs-alkitab', to: '/quran-vs-alkitab', icon: 'fas fa-balance-scale', subtitle: 'Kajian perbandingan antara Al-Qur\'an dan Alkitab.' },
        ] 
    },
    {
        category: 'kategori_sirah_kisah',
        items: [
            { id: 'sirah', to: '/sirah', icon: 'fas fa-mosque', subtitle: 'Menelusuri jejak kehidupan Nabi Muhammad SAW.' },
            { id: 'kisahnabi', to: '/kisah-nabi', icon: 'fas fa-book-journal-whills', subtitle: 'Kisah inspiratif 25 Nabi dan Rasul yang wajib diimani.' },
            { id: 'tanya-sejarah-nabi', to: '/tanya-sejarah-nabi', icon: 'fas fa-question-circle', subtitle: 'Tanya jawab interaktif seputar sejarah para nabi dengan AI.' },
        ]
    },
    { 
        category: 'kategori_sejarah_peradaban', 
        items: [
            { id: 'sejarah', to: '/sejarah', icon: 'fas fa-landmark', subtitle: 'Menjelajahi khazanah sejarah dan peradaban Islam.' },
            { id: 'pelopor_islam', to: '/pelopor-islam', icon: 'fas fa-flag-checkered', subtitle: 'Mengenal "Yang Pertama" dalam sejarah peradaban Islam.' },
            { id: 'tokoh', to: '/tokoh', icon: 'fas fa-award', subtitle: 'Biografi singkat tokoh-tokoh Muslim yang berpengaruh.' },
        ] 
    },
    {
        category: 'kategori_studi_quran',
        items: [
            { id: 'peristiwa', to: '/peristiwa', icon: 'fas fa-meteor', subtitle: 'Kisah-kisah penting dalam Al-Qur\'an di luar kisah para nabi.' },
            { id: 'timeline-manusia', to: '/timeline-manusia', icon: 'fas fa-hourglass-half', subtitle: 'Memahami perjalanan ruh dari alam azali hingga ke akhirat.' },
            { id: 'peta-peristiwa-quran', to: '/peta-peristiwa-quran', icon: 'fas fa-map-signs', subtitle: 'Jelajahi lokasi geografis peristiwa penting dalam Al-Qur\'an.' },
        ]
    },
    { 
        category: 'kategori_hukum_pedoman', 
        items: [
            { id: 'pedoman', to: '/pedoman', icon: 'fas fa-hands-praying', subtitle: 'Panduan praktis untuk ibadah sehari-hari seperti shalat dan bersuci.' },
            { id: 'kitab_kuning', to: '/kitab-kuning', icon: 'fas fa-scroll', subtitle: 'Kajian kitab-kitab klasik yang dipelajari di pesantren.' },
            { id: 'hukum-syariah', to: '/hukum-syariah', icon: 'fas fa-gavel', subtitle: 'Mengenal dasar-dasar dan sumber hukum dalam syariat Islam.' },
            { id: 'istilah', to: '/istilah', icon: 'fas fa-book-open', subtitle: 'Glosarium istilah-istilah penting dalam studi keislaman.' },
        ] 
    },
];

const PustakaIlmu: React.FC = () => {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredResults = useMemo(() => {
        const lowercasedTerm = searchTerm.toLowerCase().trim();
        if (!lowercasedTerm) {
            return libraryItems;
        }

        return libraryItems.map(category => {
            const filteredItems = category.items.filter(item =>
                t(item.id as any).toLowerCase().includes(lowercasedTerm) ||
                item.subtitle.toLowerCase().includes(lowercasedTerm) ||
                t(category.category as any).toLowerCase().includes(lowercasedTerm)
            );
            return { ...category, items: filteredItems };
        }).filter(category => category.items.length > 0);
    }, [searchTerm, t]);

    return (
        <section id="pustaka-ilmu" className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-white">{t('pustaka_ilmu')}</h2>
            <p className="text-gray-400 mb-8">Jelajahi berbagai cabang ilmu keislaman untuk memperdalam pemahaman Anda tentang agama, sejarah, dan pedoman hidup.</p>
            
            <Card className="mb-8 sticky top-4 z-10">
                <div className="relative">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Cari kitab, topik, atau kategori..."
                        className="w-full p-3 pl-10 bg-slate-700 text-white border border-slate-600 rounded-lg focus:ring-2 focus:ring-primary"
                    />
                    <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                </div>
            </Card>

            {filteredResults.length > 0 ? (
                <div className="space-y-8">
                    {filteredResults.map(category => (
                        <div key={category.category}>
                            <h3 className="text-2xl font-bold text-primary mb-4 border-b-2 border-primary/50 pb-2">{t(category.category as any)}</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                {category.items.map(book => (
                                    <BookCard
                                        key={book.id}
                                        to={book.to}
                                        icon={book.icon}
                                        title={t(book.id as any)}
                                        subtitle={book.subtitle}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <Card className="text-center py-16">
                    <p className="text-gray-400">Tidak ada kitab yang ditemukan untuk "{searchTerm}".</p>
                </Card>
            )}

        </section>
    );
};

export default PustakaIlmu;
