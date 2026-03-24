
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import Card from '../ui/Card';
import { getAITafsir, getAIAsbabunNuzul, getAIDalilPendukung } from '../../services/geminiService';
import { useLanguage } from '../../contexts/LanguageContext';

const MushafInsight: React.FC = () => {
    const { t } = useLanguage();
    const { surahNumber, ayahNumber, type } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    
    // Data passed from Mushaf.tsx via navigation state
    const { surahName, ayahText, ayahTranslation } = location.state || {};

    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getTitle = () => {
        switch (type) {
            case 'tafsir': return t('tafsir_title') + ` ${surahName}: ${ayahNumber}`;
            case 'asbabun': return t('asbabun_nuzul_title') + ` ${surahName}: ${ayahNumber}`;
            case 'dalil': return t('dalil_pendukung_title') + ` ${surahName}: ${ayahNumber}`;
            default: return 'Detail Ayat';
        }
    };

    const getTypeName = () => {
        switch (type) {
            case 'tafsir': return 'Tafsir';
            case 'asbabun': return 'Asbabun Nuzul';
            case 'dalil': return 'Dalil Pendukung';
            default: return 'Insight';
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'tafsir': return 'fa-book-open';
            case 'asbabun': return 'fa-history';
            case 'dalil': return 'fa-link';
            default: return 'fa-info-circle';
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!surahName || !ayahNumber || !ayahText) {
                setError("Data ayat tidak lengkap. Silakan kembali ke daftar surah.");
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                let result = '';
                const sName = surahName;
                const aNum = parseInt(ayahNumber || '0');

                if (type === 'tafsir') {
                    result = await getAITafsir(sName, aNum, ayahText, ayahTranslation);
                } else if (type === 'asbabun') {
                    result = await getAIAsbabunNuzul(sName, aNum);
                } else if (type === 'dalil') {
                    result = await getAIDalilPendukung(sName, aNum, ayahText);
                }
                
                setContent(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Terjadi kesalahan saat memuat data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [surahName, ayahNumber, ayahText, ayahTranslation, type]);

    if (!location.state) {
        return (
            <section className="animate-fade-in p-4">
                <Card className="text-center py-10">
                    <p className="text-red-400">Data tidak ditemukan. Mohon akses halaman ini melalui Mushaf.</p>
                    <button onClick={() => navigate('/mushaf')} className="mt-4 px-4 py-2 bg-primary text-white rounded-lg">Kembali ke Mushaf</button>
                </Card>
            </section>
        );
    }

    return (
        <section className="animate-fade-in pb-10">
            {/* Breadcrumb Navigation */}
            <div className="mb-6 flex items-center gap-2 text-sm text-gray-400 flex-wrap">
                <Link to="/mushaf" className="hover:text-primary transition-colors">Al-Qur'an</Link>
                <i className="fas fa-chevron-right text-[10px]"></i>
                <Link to={`/mushaf?surah=${surahNumber}`} className="hover:text-primary transition-colors">
                    {surahName || `Surah ${surahNumber}`}
                </Link>
                <i className="fas fa-chevron-right text-[10px]"></i>
                <span className="text-primary font-semibold">{getTypeName()} Ayat {ayahNumber}</span>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <i className={`fas ${getIcon()} text-primary`}></i>
                    {getTitle()}
                </h2>
            </div>

            <Card className="mb-6 bg-slate-800 border border-slate-700">
                <div className="p-2">
                    <p className="font-uthmanic text-2xl md:text-3xl text-right mb-4 text-white leading-relaxed">{ayahText}</p>
                    <p className="text-sm text-gray-400 italic">"{ayahTranslation}"</p>
                </div>
            </Card>

            <Card className="min-h-[300px]">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <i className="fas fa-spinner fa-spin text-4xl text-primary mb-4"></i>
                        <p className="text-gray-400 text-center animate-pulse">
                            {type === 'tafsir' ? t('tafsir_kemenag') 
                             : type === 'asbabun' ? t('ai_mencari_riwayat') 
                             : t('ai_mencari_dalil')}
                        </p>
                    </div>
                ) : error ? (
                    <div className="text-center py-10 text-red-400">
                        <i className="fas fa-exclamation-triangle text-3xl mb-2"></i>
                        <p>{error}</p>
                        <button onClick={() => window.location.reload()} className="mt-4 text-sm underline hover:text-red-300">Coba Lagi</button>
                    </div>
                ) : (
                    <div className="prose prose-invert max-w-none text-gray-200 leading-relaxed whitespace-pre-line text-justify">
                        {content}
                    </div>
                )}
            </Card>
        </section>
    );
};

export default MushafInsight;
