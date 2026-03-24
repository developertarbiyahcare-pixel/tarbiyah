
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';

// Audio Basmalah High Quality (EveryAyah - Alafasy 128kbps)
const BASMALAH_AUDIO = "https://everyayah.com/data/Alafasy_128kbps/001001.mp3";

// Helper function untuk generate URL audio High Quality
const getAudioUrl = (surahNumber: number, ayahNumber: number) => {
    const s = surahNumber.toString().padStart(3, '0');
    const a = ayahNumber.toString().padStart(3, '0');
    return `https://everyayah.com/data/Alafasy_128kbps/${s}${a}.mp3`;
};

interface Surah {
    number: number;
    name: string; // Arabic name
    englishName: string; // Latin name
    englishNameTranslation: string; // Meaning
    numberOfAyahs: number;
    revelationType: string; // Mekah/Madinah
}

interface Ayah {
    number: number;
    text: string;
    numberInSurah: number;
    juz?: number;
    page?: number;
    audio: string;
    translation: string;
}

interface SurahDetail extends Surah {
    ayahs: Ayah[];
}

// Helper function untuk konversi angka ke angka Arab
const toArabicNumerals = (n: number) => {
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return n.toString().split('').map(digit => arabicDigits[parseInt(digit)]).join('');
};

const Mushaf: React.FC = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const activeSurahNumber = searchParams.get('surah');

    const [surahs, setSurahs] = useState<Surah[]>([]);
    const [selectedSurah, setSelectedSurah] = useState<SurahDetail | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    
    // Audio State
    const [currentAudio, setCurrentAudio] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    
    // playingVerseIndex: 
    // null = tidak ada yang diputar
    // -1   = sedang memutar Basmalah (intro)
    // 0...n = sedang memutar ayat ke-n
    const [playingVerseIndex, setPlayingVerseIndex] = useState<number | null>(null);
    const [isSurahPlayMode, setIsSurahPlayMode] = useState<boolean>(false);

    // User Data State
    const [favorites, setFavorites] = useState<string[]>([]);
    const [bookmark, setBookmark] = useState<{surah: number, ayah: number} | null>(null);
    const [arabicFont, setArabicFont] = useState(() => {
        return localStorage.getItem('tarbiyah-arabicFont') || 'font-uthmanic';
    });
    
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const verseRefs = useRef<{[key: number]: HTMLDivElement | null}>({});
    const bismillahRef = useRef<HTMLDivElement | null>(null);

    // Helper untuk local storage
    const getUserId = () => {
        try {
            const authData = localStorage.getItem('tarbiyahAuth');
            return authData ? JSON.parse(authData).waNumber : 'guest';
        } catch { return 'guest'; }
    }

    // Fetch List of Surahs from equran.id
    useEffect(() => {
        const fetchSurahs = async () => {
            try {
                const response = await fetch('https://equran.id/api/v2/surat');
                const result = await response.json();
                if (result.code === 200 && result.data) {
                    const mappedSurahs: Surah[] = result.data.map((item: any) => ({
                        number: item.nomor,
                        name: item.nama,
                        englishName: item.namaLatin,
                        englishNameTranslation: item.arti,
                        numberOfAyahs: item.jumlahAyat,
                        revelationType: item.tempatTurun
                    }));
                    setSurahs(mappedSurahs);
                } else {
                    setError('Gagal memuat daftar surah.');
                }
            } catch (err) {
                setError('Terjadi kesalahan koneksi.');
            }
        };
        fetchSurahs();

        // Load User Data
        const userId = getUserId();
        const favs = localStorage.getItem(`tarbiyahFavorites_${userId}`);
        if (favs) setFavorites(JSON.parse(favs));
        
        const bkmrk = localStorage.getItem(`tarbiyahBookmark_${userId}`);
        if (bkmrk) setBookmark(JSON.parse(bkmrk));
    }, []);

    // Handle selection changes based on URL
    useEffect(() => {
        if (activeSurahNumber) {
            const surahNum = parseInt(activeSurahNumber);
            if (!isNaN(surahNum)) {
                if (selectedSurah?.number !== surahNum) {
                    handleSelectSurah(surahNum);
                }
            }
        } else {
            if (selectedSurah) {
                 handleBack(); // Clear selection if param removed
            }
        }
    }, [activeSurahNumber]);

    // Fetch Surah Details (Text, Translation, Audio) from equran.id
    const handleSelectSurah = async (surahNumber: number) => {
        setLoading(true);
        setError(null);
        // Reset player state
        setPlayingVerseIndex(null);
        setIsSurahPlayMode(false);
        setIsPlaying(false);
        // Removed direct pause calls here, let state change handle it via useEffect

        try {
            const response = await fetch(`https://equran.id/api/v2/surat/${surahNumber}`);
            const result = await response.json();

            if (result.code === 200 && result.data) {
                const data = result.data;
                
                const mappedAyahs: Ayah[] = data.ayat.map((ayah: any) => ({
                    number: ayah.nomorAyat, // Using nomorAyat as ID
                    text: ayah.teksArab.replace(/[\u06DD\u06DE\u06DF]/g, '').trim(), // Remove end of ayah markers (boxes)
                    translation: ayah.teksIndonesia,
                    numberInSurah: ayah.nomorAyat,
                    // Keep using manual audio construction for consistency/reliability
                    audio: getAudioUrl(surahNumber, ayah.nomorAyat),
                    // equran v2 detail doesn't always provide juz/page per verse in basic detail, so we make them optional
                }));

                const surahDetail: SurahDetail = {
                    number: data.nomor,
                    name: data.nama,
                    englishName: data.namaLatin,
                    englishNameTranslation: data.arti,
                    numberOfAyahs: data.jumlahAyat,
                    revelationType: data.tempatTurun,
                    ayahs: mappedAyahs
                };

                setSelectedSurah(surahDetail);
            } else {
                setError('Gagal memuat detail surah.');
            }
        } catch (err) {
            setError('Terjadi kesalahan koneksi saat memuat ayat.');
        } finally {
            setLoading(false);
            window.scrollTo(0, 0);
        }
    };

    const handleBack = () => {
        setSelectedSurah(null);
        setPlayingVerseIndex(null);
        setIsSurahPlayMode(false);
        setIsPlaying(false);
        setSearchParams({});
    };

    // Audio Control Logic
    const handlePlayVerse = (index: number) => {
        if (!selectedSurah) return;
        
        if (playingVerseIndex === index) {
            setIsPlaying(!isPlaying);
        } else {
            setPlayingVerseIndex(index);
            
            if (index === -1) {
                setCurrentAudio(BASMALAH_AUDIO);
            } else {
                setCurrentAudio(selectedSurah.ayahs[index].audio);
            }
            setIsPlaying(true);
        }
    };

    const handleStickyPlayClick = () => {
        if (!selectedSurah) return;

        setIsSurahPlayMode(true);

        if (playingVerseIndex === null) {
            if (selectedSurah.number === 1 || selectedSurah.number === 9) {
                handlePlayVerse(0);
            } else {
                handlePlayVerse(-1);
                bismillahRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
            setIsPlaying(!isPlaying);
        }
    };

    const handleAudioEnded = () => {
        if (isSurahPlayMode && selectedSurah && playingVerseIndex !== null) {
            const nextIndex = playingVerseIndex + 1;
            
            if (nextIndex < selectedSurah.ayahs.length) {
                handlePlayVerse(nextIndex);
                if (nextIndex === 0) {
                     verseRefs.current[0]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                     verseRefs.current[nextIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } else {
                setIsPlaying(false);
                setIsSurahPlayMode(false);
                setPlayingVerseIndex(null);
            }
        } else {
            setIsPlaying(false);
        }
    };

    // Consolidated Audio Effect
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleAudio = async () => {
            try {
                if (currentAudio) {
                    // Update source only if it changes
                    if (audio.src !== currentAudio) {
                        audio.src = currentAudio;
                        // audio.load(); // Usually not needed if just setting src, but can help reset
                    }

                    if (isPlaying) {
                        await audio.play();
                    } else {
                        audio.pause();
                    }
                } else {
                    audio.pause();
                }
            } catch (error: any) {
                // Ignore AbortError which happens when pause() interrupts play()
                if (error.name !== 'AbortError') {
                    console.error("Audio playback error:", error);
                    setIsPlaying(false);
                }
            }
        };

        handleAudio();

    }, [currentAudio, isPlaying]);

    // --- Interactive Features Logic ---

    const handleFavorite = (ayah: Ayah) => {
        if(!selectedSurah) return;
        const verseKey = `${selectedSurah.number}:${ayah.numberInSurah}`;
        const userId = getUserId();
        
        let newFavorites;
        if (favorites.includes(verseKey)) {
            newFavorites = favorites.filter(k => k !== verseKey);
        } else {
            newFavorites = [...favorites, verseKey];
        }
        
        setFavorites(newFavorites);
        localStorage.setItem(`tarbiyahFavorites_${userId}`, JSON.stringify(newFavorites));
    };

    const handleBookmark = (ayah: Ayah) => {
        if(!selectedSurah) return;
        const userId = getUserId();
        
        if (bookmark?.surah === selectedSurah.number && bookmark?.ayah === ayah.numberInSurah) {
            setBookmark(null);
            localStorage.removeItem(`tarbiyahBookmark_${userId}`);
        } else {
            const newBookmark = { surah: selectedSurah.number, ayah: ayah.numberInSurah };
            setBookmark(newBookmark);
            localStorage.setItem(`tarbiyahBookmark_${userId}`, JSON.stringify(newBookmark));
        }
    };

    const navigateToInsight = (ayah: Ayah, type: string) => {
        if (!selectedSurah) return;
        
        const path = `/mushaf/insight/${selectedSurah.number}/${ayah.numberInSurah}/${type}`;
        
        navigate(path, {
            state: {
                surahName: selectedSurah.englishName,
                ayahText: ayah.text,
                ayahTranslation: ayah.translation
            }
        });
    };

    const handleShowTafsir = (ayah: Ayah) => navigateToInsight(ayah, 'tafsir');
    const handleShowAsbabun = (ayah: Ayah) => navigateToInsight(ayah, 'asbabun');
    const handleShowDalil = (ayah: Ayah) => navigateToInsight(ayah, 'dalil');

    const handleFontChange = (fontClass: string) => {
        setArabicFont(fontClass);
        localStorage.setItem('tarbiyah-arabicFont', fontClass);
    };

    const filteredSurahs = surahs.filter(s => {
        return s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.englishNameTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.number.toString().includes(searchQuery);
    });

    // Helper untuk klik bookmark
    function handleSelectSelectSurah(surahNumber: number) {
         setSearchParams({ surah: surahNumber.toString() });
    }

    // --- RENDER LIST VIEW ---
    if (!selectedSurah) {
        return (
            <section className="animate-fade-in">
                <h2 className="text-3xl font-bold mb-6 text-white text-center">Al-Qur'an Digital</h2>
                
                {bookmark && surahs.length > 0 && (
                    <div 
                        onClick={() => handleSelectSelectSurah(bookmark.surah)}
                        className="mb-6 p-4 bg-primary/20 border-l-4 border-primary rounded-r-lg cursor-pointer hover:bg-primary/30 transition-colors"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="font-bold text-primary flex items-center gap-2"><i className="fas fa-bookmark"></i> Terakhir Dibaca</h4>
                                <p className="text-sm text-gray-300 mt-1">Lanjutkan: {surahs.find(s => s.number === bookmark.surah)?.englishName} Ayat {bookmark.ayah}</p>
                            </div>
                            <i className="fas fa-chevron-right text-primary"></i>
                        </div>
                    </div>
                )}

                <Card className="mb-6 sticky top-0 z-10 shadow-lg">
                    <div className="flex flex-col gap-4">
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder={t('cari_surah_placeholder')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full p-3 pl-10 bg-slate-700 text-white border border-slate-600 rounded-lg focus:ring-2 focus:ring-primary"
                            />
                            <i className="fas fa-search absolute left-3 top-1/2 -translate-x-0 -translate-y-1/2 text-gray-400"></i>
                        </div>
                        
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                            <span className="text-xs text-gray-400 whitespace-nowrap mr-2">Font Arab:</span>
                            {[
                                { id: 'font-uthmanic', name: 'Uthmanic' },
                                { id: 'font-amiri', name: 'Amiri' },
                                { id: 'font-scheherazade', name: 'Scheherazade' },
                                { id: 'font-noto-naskh', name: 'Naskh' },
                                { id: 'font-lateef', name: 'Lateef' }
                            ].map(font => (
                                <button
                                    key={font.id}
                                    onClick={() => handleFontChange(font.id)}
                                    className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-all ${arabicFont === font.id ? 'bg-primary text-white' : 'bg-slate-800 text-gray-400 hover:bg-slate-700'}`}
                                >
                                    {font.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </Card>

                {loading && <div className="text-center p-10"><i className="fas fa-spinner fa-spin text-4xl text-primary"></i></div>}
                {error && <div className="text-center text-red-400 p-4">{error}</div>}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredSurahs.map(surah => (
                        <div 
                            key={surah.number} 
                            onClick={() => setSearchParams({ surah: surah.number.toString() })}
                            className="bg-slate-700 hover:bg-slate-600 p-4 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.02] border border-slate-600 hover:border-primary flex items-center justify-between group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 flex items-center justify-center bg-slate-800 rounded-full font-bold text-primary group-hover:bg-primary group-hover:text-white transition-colors relative">
                                    <span className="text-sm">{surah.number}</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-white">{surah.englishName}</h3>
                                    <p className="text-xs text-gray-400">{surah.englishNameTranslation} • {surah.numberOfAyahs} Ayat</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`${arabicFont} text-xl text-gray-400`}>{surah.name}</p>
                                <p className="text-[10px] text-gray-500 uppercase mt-1">{surah.revelationType}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    // --- RENDER DETAIL VIEW ---
    return (
        <section className="animate-fade-in pb-10">
            {/* Sticky Header */}
            <div className="sticky top-16 z-30 bg-gray-100 dark:bg-slate-900/95 backdrop-blur-sm border-b border-gray-300 dark:border-slate-700 py-3 mb-4 -mx-4 px-4 sm:mx-0 sm:px-0 shadow-md rounded-b-lg">
                <div className="flex justify-center items-center relative">
                    <div className="text-center px-2">
                         <h2 className="text-lg sm:text-xl font-bold text-primary leading-tight">{selectedSurah.englishName}</h2>
                         <p className="text-xs text-gray-500">{selectedSurah.englishNameTranslation} • {selectedSurah.numberOfAyahs} Ayat</p>
                    </div>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center animate-slide-up">
                    <div className="flex items-center gap-8 mb-4">
                        <button 
                            onClick={() => {
                                if(playingVerseIndex !== null && playingVerseIndex > 0) handlePlayVerse(playingVerseIndex - 1);
                            }}
                            className="text-gray-400 hover:text-primary disabled:opacity-30 transition-colors"
                            disabled={playingVerseIndex === null || playingVerseIndex <= 0}
                        >
                            <i className="fas fa-step-backward text-lg"></i>
                        </button>
                        
                        <button 
                            onClick={handleStickyPlayClick} 
                            className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary-hover shadow-lg transform active:scale-95 transition-all"
                            title="Putar Semua"
                        >
                            <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'} text-xl`}></i>
                        </button>
                        
                        <button 
                            onClick={() => {
                                if(playingVerseIndex !== null && playingVerseIndex < selectedSurah.ayahs.length - 1) handlePlayVerse(playingVerseIndex + 1);
                            }}
                            className="text-gray-400 hover:text-primary disabled:opacity-30 transition-colors"
                            disabled={playingVerseIndex === null || playingVerseIndex === selectedSurah.ayahs.length - 1}
                        >
                            <i className="fas fa-step-forward text-lg"></i>
                        </button>
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-full px-4">
                        {[
                            { id: 'font-uthmanic', name: 'Uthmanic' },
                            { id: 'font-amiri', name: 'Amiri' },
                            { id: 'font-scheherazade', name: 'Scheherazade' },
                            { id: 'font-noto-naskh', name: 'Naskh' },
                            { id: 'font-lateef', name: 'Lateef' }
                        ].map(font => (
                            <button
                                key={font.id}
                                onClick={() => handleFontChange(font.id)}
                                className={`px-3 py-1 rounded-full text-[10px] whitespace-nowrap transition-all ${arabicFont === font.id ? 'bg-primary text-white' : 'bg-slate-200 dark:bg-slate-800 text-gray-500 dark:text-gray-400'}`}
                            >
                                {font.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bismillah Header (Except At-Taubah) */}
            {selectedSurah.number !== 9 && (
                <div 
                    ref={bismillahRef}
                    className={`text-center mb-8 py-4 rounded-xl border transition-all duration-500 ${playingVerseIndex === -1 ? 'bg-slate-800/80 border-primary ring-2 ring-primary shadow-lg scale-[1.02]' : 'bg-slate-800/50 border-slate-700'}`}
                >
                    <p className={`${arabicFont} text-3xl transition-colors duration-500 ${playingVerseIndex === -1 ? 'text-primary' : 'text-white'}`}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
                </div>
            )}

            {/* List of Ayahs */}
            <div className="space-y-4">
                {selectedSurah.ayahs.map((ayah, index) => {
                    const verseKey = `${selectedSurah.number}:${ayah.numberInSurah}`;
                    const isFav = favorites.includes(verseKey);
                    const isBookmarked = bookmark?.surah === selectedSurah.number && bookmark?.ayah === ayah.numberInSurah;
                    
                    return (
                    <Card 
                        key={ayah.number} 
                        ref={el => verseRefs.current[index] = el}
                        className={`transition-all duration-500 border ${playingVerseIndex === index ? 'border-primary bg-slate-800/90 ring-1 ring-primary shadow-lg transform scale-[1.01]' : 'border-transparent bg-slate-800/60'}`}
                    >
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center bg-slate-900/50 p-2 rounded-lg border-b border-slate-700/50 flex-wrap gap-y-2">
                                <div className="flex items-center gap-3">
                                    <span className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-full shadow-sm transition-colors ${playingVerseIndex === index ? 'bg-primary text-white' : 'bg-slate-700 text-gray-300'}`}>
                                        {ayah.numberInSurah}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => handleShowTafsir(ayah)} className="text-gray-400 hover:text-white transition-colors" title={t('lihat_tafsir')}><i className="fas fa-book-open"></i></button>
                                     <button onClick={() => handleShowAsbabun(ayah)} className="text-gray-400 hover:text-white transition-colors" title={t('lihat_asbabun_nuzul')}><i className="fas fa-history"></i></button>
                                     <button onClick={() => handleShowDalil(ayah)} className="text-gray-400 hover:text-white transition-colors" title={t('lihat_dalil_pendukung')}><i className="fas fa-link"></i></button>
                                     <button onClick={() => handleFavorite(ayah)} className={`transition-colors ${isFav ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`} title={t('favoritkan_ayat')}><i className={`${isFav ? 'fas' : 'far'} fa-heart`}></i></button>
                                    <button onClick={() => handleBookmark(ayah)} className={`transition-colors ${isBookmarked ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-400'}`} title={isBookmarked ? "Hapus Penanda" : "Tandai Terakhir Dibaca"}><i className={`${isBookmarked ? 'fas' : 'far'} fa-bookmark`}></i></button>
                                    <div className="w-px h-4 bg-slate-600 mx-1"></div>
                                    <button onClick={() => { setIsSurahPlayMode(false); handlePlayVerse(index); }} className={`text-gray-400 hover:text-primary transition-colors p-1 ${playingVerseIndex === index ? 'text-primary' : ''}`} title={playingVerseIndex === index && isPlaying ? t('jeda_audio') : t('putar_audio')}><i className={`fas ${playingVerseIndex === index && isPlaying ? 'fa-pause-circle' : 'fa-play-circle'} text-2xl`}></i></button>
                                </div>
                            </div>

                            <div className="text-right pl-2 py-2">
                                <p className={`${arabicFont} text-3xl sm:text-4xl ${playingVerseIndex === index ? 'text-primary' : 'text-gray-100'} leading-[2]`} dir="rtl">
                                    {ayah.text} <span className="inline-flex items-center justify-center w-8 h-8 border border-current rounded-full text-xs align-middle mr-2 font-sans opacity-60">{toArabicNumerals(ayah.numberInSurah)}</span>
                                </p>
                            </div>

                            <div className="text-left mt-2 pt-4 border-t border-slate-700/50">
                                <p className={`text-sm leading-relaxed ${playingVerseIndex === index ? 'text-gray-200' : 'text-gray-400'}`}>{ayah.translation}</p>
                            </div>
                        </div>
                    </Card>
                )})}
            </div>
            
            <audio ref={audioRef} onEnded={handleAudioEnded} crossOrigin="anonymous" />
        </section>
    );
};

export default Mushaf;
