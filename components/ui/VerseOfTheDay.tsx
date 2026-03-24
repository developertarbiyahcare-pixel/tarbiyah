
import React, { useState, useEffect } from 'react';
import Card from './Card';

interface VerseData {
    text: string;
    translation: string;
    surah: {
        englishName: string;
        number: number;
    };
    numberInSurah: number;
}

const BACKUP_VERSES: VerseData[] = [
    {
        text: "لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا ٱكْتَسَبَتْ",
        translation: "Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya. Ia mendapat pahala (dari kebajikan) yang diusahakannya dan ia mendapat siksa (dari kejahatan) yang dikerjakannya.",
        surah: { englishName: "Al-Baqarah", number: 2 },
        numberInSurah: 286
    },
    {
        text: "فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا",
        translation: "Karena sesungguhnya sesudah kesulitan itu ada kemudahan.",
        surah: { englishName: "Al-Insyirah", number: 94 },
        numberInSurah: 5
    },
    {
        text: "وَإِذَا سَأَلَكَ عِبَادِى عَنِّى فَإِنِّى قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ ٱلدَّاعِ إِذَا دَعَانِ",
        translation: "Dan apabila hamba-hamba-Ku bertanya kepadamu tentang Aku, maka (jawablah), bahwasanya Aku adalah dekat. Aku mengabulkan permohonan orang yang berdoa apabila ia memohon kepada-Ku.",
        surah: { englishName: "Al-Baqarah", number: 2 },
        numberInSurah: 186
    },
    {
        text: "يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ ٱسْتَعِينُوا۟ بِٱلصَّبْرِ وَٱلصَّلَوٰةِ ۚ إِنَّ ٱللَّهَ مَعَ ٱلصَّٰبِرِينَ",
        translation: "Hai orang-orang yang beriman, jadikanlah sabar dan shalat sebagai penolongmu, sesungguhnya Allah beserta orang-orang yang sabar.",
        surah: { englishName: "Al-Baqarah", number: 2 },
        numberInSurah: 153
    }
];

// Helper function untuk konversi angka ke angka Arab
const toArabicNumerals = (n: number) => {
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return n.toString().split('').map(digit => arabicDigits[parseInt(digit)]).join('');
};

const VerseOfTheDay: React.FC = () => {
    const [verse, setVerse] = useState<VerseData | null>(null);
    const [loading, setLoading] = useState(true);
    const [arabicFont, setArabicFont] = useState(() => {
        return localStorage.getItem('tarbiyah-arabicFont') || 'font-uthmanic';
    });

    const fetchRandomVerse = async () => {
        setLoading(true);
        try {
            // Pilih nomor surat secara acak (1-114)
            const randomSurahNumber = Math.floor(Math.random() * 114) + 1;
            
            // Timeout controller
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 detik timeout
            
            try {
                // Menggunakan API equran.id v2
                const response = await fetch(`https://equran.id/api/v2/surat/${randomSurahNumber}`, {
                    signal: controller.signal
                });
                clearTimeout(timeoutId);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                
                if (result.code === 200 && result.data) {
                    const surahData = result.data;
                    const ayahs = surahData.ayat;
                    
                    if (ayahs && ayahs.length > 0) {
                        // Pilih ayat secara acak dari surat tersebut
                        const randomAyahIndex = Math.floor(Math.random() * ayahs.length);
                        const selectedAyah = ayahs[randomAyahIndex];

                        setVerse({
                            text: selectedAyah.teksArab,
                            translation: selectedAyah.teksIndonesia,
                            surah: {
                                englishName: surahData.namaLatin,
                                number: surahData.nomor
                            },
                            numberInSurah: selectedAyah.nomorAyat
                        });
                    } else {
                        throw new Error('No ayahs found');
                    }
                } else {
                    throw new Error('API Error');
                }
            } catch (fetchErr) {
                throw fetchErr;
            }
        } catch (err) {
            console.warn("Gagal mengambil ayat dari API, menggunakan data cadangan.", err);
            const randomBackup = BACKUP_VERSES[Math.floor(Math.random() * BACKUP_VERSES.length)];
            setVerse(randomBackup);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRandomVerse();
        
        // Listen for storage changes to update font in real-time if changed in Mushaf
        const handleStorageChange = () => {
            const savedFont = localStorage.getItem('tarbiyah-arabicFont');
            if (savedFont) setArabicFont(savedFont);
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    if (loading) {
        return (
            <Card className="mb-6 animate-pulse">
                <div className="h-4 bg-slate-700 rounded w-1/4 mb-4"></div>
                <div className="h-8 bg-slate-700 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-8 bg-slate-700 rounded w-1/2 mx-auto mb-4"></div>
                <div className="h-3 bg-slate-700 rounded w-full mb-1"></div>
                <div className="h-3 bg-slate-700 rounded w-2/3 mx-auto"></div>
            </Card>
        );
    }

    if (!verse) return null;

    return (
        <Card className="mb-6 border-2 border-primary bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden group transition-all duration-300">
            {/* Dekorasi Latar Belakang */}
            <div className={`absolute top-0 right-0 p-4 opacity-5 text-9xl text-primary ${arabicFont} pointer-events-none select-none`}>
                ۞
            </div>
            
            <div className="relative z-10">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-primary flex items-center gap-2 mb-1">
                        <i className="fas fa-quran"></i> Ayat Pilihan
                    </h3>
                    <button 
                        onClick={fetchRandomVerse} 
                        className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-700" 
                        title="Acak Ayat Lain"
                    >
                        <i className="fas fa-sync-alt"></i>
                    </button>
                </div>

                <div className="text-center mb-6 px-2">
                    <p className={`${arabicFont} text-2xl md:text-3xl text-white leading-[2.2] mb-4`} dir="rtl">
                        {verse.text} <span className="inline-flex items-center justify-center w-7 h-7 border border-current rounded-full text-[10px] align-middle mr-2 font-sans opacity-60">{toArabicNumerals(verse.numberInSurah)}</span>
                    </p>
                    <p className="text-gray-300 text-sm italic leading-relaxed">
                        "{verse.translation}"
                    </p>
                </div>

                {/* Referensi Ayat - Dipusatkan */}
                <div className="flex justify-center items-center border-t border-slate-700 pt-4">
                    <div className="text-xs text-gray-400 font-semibold bg-slate-800 px-3 py-1 rounded-full border border-slate-600">
                        QS. {verse.surah.englishName}: {verse.numberInSurah}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default VerseOfTheDay;
