

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import Dropdown from '../ui/Dropdown';
import { getAIResponse, getAIDalil, getAITadabbur, getAISearchResponse } from '../../services/geminiService';
import type { AIResponse, DalilResponse, ConsultationHistoryItem, TadabburResponse, SearchHistoryItem } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { GenerateContentResponse } from '@google/genai';
import { trackEvent } from '../../services/trackingService';

type Mode = 'konsultasi' | 'tadabbur' | 'dalil' | 'pengetahuan';

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

const Konsultasi: React.FC = () => {
    const { lang, t } = useLanguage();

    const categoryItems = [
        { value: 'spiritualitas', label: <><i className="fas fa-mosque w-5 mr-2 text-emerald-300"></i>{t('cat_spiritualitas')}</> },
        { value: 'akhlak', label: <><i className="fas fa-seedling w-5 mr-2 text-pink-300"></i>{t('cat_akhlak')}</> },
        { value: 'fiqih', label: <><i className="fas fa-balance-scale w-5 mr-2 text-teal-300"></i>{t('cat_fiqih')}</> },
        { value: 'keluarga', label: <><i className="fas fa-users w-5 mr-2 text-sky-300"></i>{t('cat_keluarga')}</> },
        { value: 'parenting', label: <><i className="fas fa-child-reaching w-5 mr-2 text-cyan-300"></i>{t('cat_parenting')}</> },
        { value: 'remaja', label: <><i className="fas fa-user-graduate w-5 mr-2 text-purple-300"></i>{t('cat_remaja')}</> },
        { value: 'sosial', label: <><i className="fas fa-handshake-angle w-5 mr-2 text-fuchsia-300"></i>{t('cat_sosial')}</> },
        { value: 'mental', label: <><i className="fas fa-heart-pulse w-5 mr-2 text-rose-300"></i>{t('cat_mental')}</> },
        { value: 'kesehatan', label: <><i className="fas fa-briefcase-medical w-5 mr-2 text-green-300"></i>{t('cat_kesehatan')}</> },
        { value: 'pendidikan', label: <><i className="fas fa-book-open-reader w-5 mr-2 text-violet-300"></i>{t('cat_pendidikan')}</> },
        { value: 'karir', label: <><i className="fas fa-briefcase w-5 mr-2 text-amber-300"></i>{t('cat_karir')}</> },
        { value: 'keuangan', label: <><i className="fas fa-sack-dollar w-5 mr-2 text-lime-300"></i>{t('cat_keuangan')}</> },
        { value: 'sejarah', label: <><i className="fas fa-landmark w-5 mr-2 text-orange-300"></i>{t('cat_sejarah')}</> },
        { value: 'mimpi', label: <><i className="fas fa-moon w-5 mr-2 text-indigo-300"></i>{t('cat_mimpi')}</> },
    ];
    
    const [mode, setMode] = useState<Mode>('konsultasi');
    const [category, setCategory] = useState('spiritualitas');
    const [description, setDescription] = useState('');
    const [situation, setSituation] = useState('');
    const [topic, setTopic] = useState('');
    const [pengetahuanQuery, setPengetahuanQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<React.ReactNode | null>(null);
    const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
    const [dalilResponse, setDalilResponse] = useState<DalilResponse | null>(null);
    const [tadabburResponse, setTadabburResponse] = useState<TadabburResponse | null>(null);
    const [groundedResponse, setGroundedResponse] = useState<GenerateContentResponse | null>(null);
    const [loadingMessage, setLoadingMessage] = useState<string>('');

    const resultCardRef = useRef<HTMLDivElement>(null);

    const loadingMessages = [
        'AI sedang merenungkan masalah Anda...',
        'Mencari dalil-dalil yang relevan dari Al-Qur\'an dan Sunnah...',
        'Menyusun langkah-langkah praktis untuk Anda...',
        'Memformulasikan doa yang menenangkan hati...',
        'Sedikit lagi, nasihat terbaik sedang disiapkan...',
    ];

    useEffect(() => {
        let intervalId: number | undefined;

        if (isLoading) {
            let messageIndex = 0;
            setLoadingMessage(loadingMessages[messageIndex]);

            intervalId = window.setInterval(() => {
                messageIndex = (messageIndex + 1) % loadingMessages.length;
                setLoadingMessage(loadingMessages[messageIndex]);
            }, 3000); // Change message every 3 seconds
        }

        return () => {
            if (intervalId) {
                window.clearInterval(intervalId);
            }
        };
    }, [isLoading]);

    const saveToHistory = (newItem: ConsultationHistoryItem | SearchHistoryItem) => {
        const userId = getUserId();
        if (!userId) return;

        if ('aiResponse' in newItem) {
            const key = `consultationHistory_${userId}`;
            const savedRaw = localStorage.getItem(key);
            const prev = savedRaw ? JSON.parse(savedRaw) : [];
            const updated = [newItem, ...prev].slice(0, 20);
            localStorage.setItem(key, JSON.stringify(updated));
        } else {
            const key = `searchHistory_${userId}`;
            const savedRaw = localStorage.getItem(key);
            const prev = savedRaw ? JSON.parse(savedRaw) : [];
            const updated = [newItem, ...prev].slice(0, 20);
            localStorage.setItem(key, JSON.stringify(updated));
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setAiResponse(null);
        setDalilResponse(null);
        setTadabburResponse(null);
        setGroundedResponse(null);

        try {
            if (mode === 'konsultasi') {
                const categoryLabel = categoryItems.find(c => c.value === category)?.label;
                const categoryText = typeof categoryLabel === 'string' ? categoryLabel : category;
                
                const response = await getAIResponse(categoryText, description, lang);
                setAiResponse(response);
                
                saveToHistory({
                    id: `C-${Date.now()}`,
                    timestamp: new Date().toISOString(),
                    mode: 'konsultasi',
                    query: description,
                    category: categoryText,
                    aiResponse: response,
                });
                trackEvent('ai_consultation_success', { mode, category: categoryText });

            } else if (mode === 'tadabbur') {
                const response = await getAITadabbur(situation);
                setTadabburResponse(response);
                 saveToHistory({
                    id: `T-${Date.now()}`,
                    timestamp: new Date().toISOString(),
                    mode: 'tadabbur',
                    query: situation,
                    response: response,
                });
                trackEvent('ai_consultation_success', { mode });
            } else if (mode === 'dalil') {
                const response = await getAIDalil(topic);
                setDalilResponse(response);
                saveToHistory({
                    id: `D-${Date.now()}`,
                    timestamp: new Date().toISOString(),
                    mode: 'dalil',
                    query: topic,
                    response: response,
                });
                trackEvent('ai_consultation_success', { mode });
            } else if (mode === 'pengetahuan') {
                const response = await getAISearchResponse(pengetahuanQuery, lang);
                setGroundedResponse(response);
                saveToHistory({
                    id: `P-${Date.now()}`,
                    timestamp: new Date().toISOString(),
                    mode: 'pengetahuan',
                    query: pengetahuanQuery,
                    response: { text: response.text, grounding: response.candidates?.[0]?.groundingMetadata?.groundingChunks || [] },
                });
                trackEvent('ai_consultation_success', { mode });
            }

        } catch (err) {
            setError(err instanceof Error ? err.message : t('terjadi_kesalahan_ai' as any));
        } finally {
            setIsLoading(false);
        }
    };

    const clearOutput = () => {
        setAiResponse(null);
        setDalilResponse(null);
        setTadabburResponse(null);
        setGroundedResponse(null);
        setError(null);
    }
    
    const renderForm = () => {
        if (mode === 'konsultasi') {
            return (
                <>
                    <div className="mb-4">
                        <Dropdown 
                            label={t('kategori_masalah' as any)}
                            items={categoryItems}
                            selectedValue={category}
                            onSelect={setCategory}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-200 mb-1">{t('deskripsi_masalah')}</label>
                        <textarea id="description" rows={5} value={description} onChange={(e) => setDescription(e.target.value)} placeholder={t('deskripsi_placeholder' as any)} className="w-full p-2.5 bg-slate-700 text-gray-100 border border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-150" required></textarea>
                    </div>
                </>
            );
        } else if (mode === 'tadabbur') {
            return (
                <div className="mb-4">
                    <label htmlFor="situation" className="block text-sm font-medium text-gray-200 mb-1">{t('ceritakan_perasaan')}</label>
                    <textarea id="situation" rows={5} value={situation} onChange={(e) => setSituation(e.target.value)} placeholder={t('contoh_situasi' as any)} className="w-full p-2.5 bg-slate-700 text-gray-100 border border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-150" required></textarea>
                </div>
            )
        } else if (mode === 'pengetahuan') {
            return (
                <div className="mb-4">
                    <label htmlFor="pengetahuan" className="block text-sm font-medium text-gray-200 mb-1">{t('pertanyaan_umum_label' as any)}</label>
                    <input type="text" id="pengetahuan" value={pengetahuanQuery} onChange={(e) => setPengetahuanQuery(e.target.value)} placeholder={t('pertanyaan_umum_placeholder' as any)} className="w-full p-2.5 bg-slate-700 text-gray-100 border border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-150" required />
                </div>
            )
        } else { // mode === 'dalil'
            return (
                <div className="mb-4">
                    <label htmlFor="topic" className="block text-sm font-medium text-gray-200 mb-1">{t('topik_dalil')}</label>
                    <input type="text" id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder={t('contoh_topik' as any)} className="w-full p-2.5 bg-slate-700 text-gray-100 border border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-150" required />
                </div>
            );
        }
    };

    const renderResult = () => {
        if (aiResponse) {
            return (
                <Card className="animate-fade-in border border-slate-600 flex-1">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-bold text-primary">{aiResponse.title}</h3>
                        <button onClick={clearOutput} className="text-gray-400 hover:text-white" title={t('hapus_hasil' as any)}>
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </div>
                    <div className="space-y-5">
                        <div>
                            <h4 className="font-semibold text-lg mb-2"><i className="fas fa-quran mr-2"></i>{t('ayat_quran')}</h4>
                            <div className="bg-slate-900 p-4 rounded-lg">
                                <p className="font-uthmanic text-2xl text-right mb-2">{aiResponse.quran_arabic}</p>
                                <p className="text-sm italic text-gray-300">{aiResponse.quran_translation}</p>
                            </div>
                        </div>
                        {aiResponse.hadith && (
                        <div>
                            <h4 className="font-semibold text-lg mb-2"><i className="fas fa-book-open mr-2"></i>{t('hadis_shahih')}</h4>
                            <div className="bg-slate-900 p-4 rounded-lg">
                                <p className="italic mb-2">"{aiResponse.hadith}"</p>
                                <p className="text-right font-semibold text-gray-400">- {aiResponse.hadith_source} -</p>
                            </div>
                        </div>
                        )}
                        <div>
                            <h4 className="font-semibold text-lg mb-2"><i className="fas fa-praying-hands mr-2"></i>{t('doa_ringkas')}</h4>
                            <div className="bg-slate-900 p-4 rounded-lg">
                                <p className="font-uthmanic text-2xl text-right mb-2">{aiResponse.doa_arabic}</p>
                                <p className="italic mb-1">{aiResponse.doa_latin}</p>
                                <p className="text-sm">{t('artinya')}: "{aiResponse.doa_translation}"</p>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg mb-2"><i className="fas fa-shoe-prints mr-2"></i>{t('langkah_praktis')}</h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-200">
                                {aiResponse.steps.map((step, index) => <li key={index}>{step}</li>)}
                            </ul>
                        </div>
                    </div>
                </Card>
            );
        }
        if (dalilResponse) {
             return (
                <Card className="animate-fade-in border border-slate-600 flex-1">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-bold text-primary">{t('dalil_tentang' as any)} "{topic}"</h3>
                        <button onClick={clearOutput} className="text-gray-400 hover:text-white" title={t('hapus_hasil' as any)}>
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </div>
                     <div className="space-y-5">
                        <div>
                            <h4 className="font-semibold text-lg mb-2"><i className="fas fa-quran mr-2"></i>{t('dalil_quran')}</h4>
                            <div className="bg-slate-900 p-4 rounded-lg">
                                <p className="font-uthmanic text-2xl text-right mb-2">{dalilResponse.quran_arabic}</p>
                                <p className="text-sm italic text-gray-300">"{dalilResponse.quran_translation}"</p>
                                <p className="text-right font-semibold text-gray-400 mt-2">- {dalilResponse.quran_ref} -</p>
                            </div>
                        </div>
                         <div>
                            <h4 className="font-semibold text-lg mb-2"><i className="fas fa-book-open mr-2"></i>{t('dalil_hadits')}</h4>
                            <div className="bg-slate-900 p-4 rounded-lg">
                                <p className="italic mb-2">"{dalilResponse.hadith_text}"</p>
                                <p className="text-right font-semibold text-gray-400">- {dalilResponse.hadith_ref} -</p>
                            </div>
                        </div>
                    </div>
                </Card>
            );
        }
        if (tadabburResponse) {
            return (
                <Card className="animate-fade-in border border-slate-600 flex-1">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-bold text-primary">{tadabburResponse.story_title}</h3>
                        <button onClick={clearOutput} className="text-gray-400 hover:text-white" title={t('hapus_hasil' as any)}>
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </div>
                    <div className="space-y-5">
                         <blockquote className="border-l-4 border-primary pl-4 italic bg-slate-900 p-4 rounded-r-lg">
                            <p className="whitespace-pre-line">{tadabburResponse.story_text}</p>
                            <footer className="text-right font-semibold text-gray-400 mt-2">- {tadabburResponse.story_source} -</footer>
                        </blockquote>
                        <div>
                            <h4 className="font-semibold text-lg mb-2"><i className="fas fa-spa mr-2"></i>{t('poin_perenungan')}</h4>
                            <ul className="list-decimal list-inside space-y-2 text-gray-200">
                                {tadabburResponse.reflection_points.map((point, index) => <li key={index}>{point}</li>)}
                            </ul>
                        </div>
                    </div>
                </Card>
            );
        }
        if (groundedResponse) {
            const text = groundedResponse.text;
            const chunks = groundedResponse.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
            const title = mode === 'pengetahuan' ? t('hasil_pencarian_pengetahuan' as any) : 'Hasil Pencarian';
            const sourceTitle = mode === 'pengetahuan' ? t('sumber_web' as any) : 'Sumber';
            const sourceIcon = 'fa-link';
    
            return (
                <Card className="animate-fade-in border border-slate-600 flex-1">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-bold text-primary">{title}</h3>
                        <button onClick={clearOutput} className="text-gray-400 hover:text-white" title={t('hapus_hasil' as any)}>
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </div>
                    <div className="space-y-5">
                        <div className="whitespace-pre-wrap text-gray-200">{text}</div>
                        {chunks.length > 0 && (
                            <div>
                                <h4 className="font-semibold text-lg mb-2 mt-4"><i className={`fas ${sourceIcon} mr-2`}></i>{sourceTitle}</h4>
                                <ul className="list-disc list-inside space-y-2">
                                    {chunks.map((chunk: any, index: number) => {
                                        if (chunk.web?.uri && chunk.web?.title) {
                                            return (
                                                <li key={index}>
                                                    <a href={chunk.web.uri} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
                                                        {chunk.web.title}
                                                    </a>
                                                </li>
                                            );
                                        }
                                        if (chunk.maps?.uri && chunk.maps?.title) {
                                            return (
                                                <li key={index}>
                                                    <a href={chunk.maps.uri} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
                                                        {chunk.maps.title}
                                                    </a>
                                                    {chunk.maps.placeAnswerSources?.reviewSnippets?.map((review: any, rIndex: number) => (
                                                         <blockquote key={rIndex} className="text-xs italic text-gray-400 border-l-2 border-slate-600 pl-2 mt-1">
                                                             "{review.text}" <a href={review.uri} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">(Lihat)</a>
                                                         </blockquote>
                                                    ))}
                                                </li>
                                            );
                                        }
                                        return null;
                                    })}
                                </ul>
                            </div>
                        )}
                    </div>
                </Card>
            );
        }

        return (
            <Card className="flex flex-col items-center justify-center text-center border border-slate-600 flex-1 min-h-[400px]">
                <i className="fas fa-search text-6xl text-gray-500"></i>
            </Card>
        );
    };

    return (
        <section id="konsultasi" className="animate-fade-in">
            <h2 className="text-3xl font-bold text-white ApplicationTitle">{t('konsultasi_title')}</h2>
            <div className="mb-6 p-4 bg-yellow-900/80 border-l-4 border-yellow-500 text-yellow-200 rounded-r-lg">
                <h4 className="font-bold">{t('disclaimer_syariah')}</h4>
                <p className="text-sm">{t('disclaimer_text')}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="flex flex-col border border-slate-600">
                    <div className="mb-6 border-b border-slate-600">
                        <div className="flex -mb-px flex-wrap">
                             <button onClick={() => setMode('konsultasi')} className={`inline-block p-3 border-b-2 font-semibold ${mode === 'konsultasi' ? 'border-primary text-primary' : 'border-transparent hover:text-gray-300'}`}>
                                <i className="fas fa-brain mr-2"></i>{t('konsultasi_umum')}
                            </button>
                             <button onClick={() => setMode('tadabbur')} className={`inline-block p-3 border-b-2 font-semibold ${mode === 'tadabbur' ? 'border-primary text-primary' : 'border-transparent hover:text-gray-300'}`}>
                                <i className="fas fa-spa mr-2"></i>{t('refleksi_tadabbur')}
                            </button>
                             <button onClick={() => setMode('dalil')} className={`inline-block p-3 border-b-2 font-semibold ${mode === 'dalil' ? 'border-primary text-primary' : 'border-transparent hover:text-gray-300'}`}>
                                <i className="fas fa-book-open mr-2"></i>{t('pencari_dalil')}
                            </button>
                            <button onClick={() => setMode('pengetahuan')} className={`inline-block p-3 border-b-2 font-semibold ${mode === 'pengetahuan' ? 'border-primary text-primary' : 'border-transparent hover:text-gray-300'}`}>
                                <i className="fas fa-search-location mr-2"></i>{t('pengetahuan_umum' as any)}
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="flex-grow">
                        {renderForm()}
                        <button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                            {isLoading ? t('memproses') : (mode === 'konsultasi' ? t('dapatkan_nasihat') : mode === 'tadabbur' ? t('dapatkan_refleksi') : mode === 'pengetahuan' ? t('dapatkan_jawaban' as any) : t('cari_dalil'))}
                        </button>
                    </form>

                    <Link to="/riwayat-konsultasi" className="mt-6 w-full block text-center bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
                        <i className="fas fa-history mr-2"></i>Lihat Riwayat
                    </Link>

                </Card>

                <div className="flex flex-col" ref={resultCardRef}>
                    {isLoading ? (
                        <Card className="flex flex-col items-center justify-center text-center border border-slate-600 flex-1 min-h-[400px]">
                            <div className="relative flex items-center justify-center">
                                <div className="absolute h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
                                <i className="fas fa-brain text-2xl text-primary"></i>
                            </div>
                            <p className="mt-6 text-sm text-gray-300 text-center transition-opacity duration-500 ease-in-out h-10">
                                {loadingMessage}
                            </p>
                        </Card>
                    ) : error ? (
                        <Card className="border border-slate-600 flex-1 flex items-center justify-center min-h-[400px]">
                            <p className="text-red-400 text-center">{error}</p>
                        </Card>
                    ) : (
                        renderResult()
                    )}
                </div>
            </div>
        </section>
    );
};

export default Konsultasi;