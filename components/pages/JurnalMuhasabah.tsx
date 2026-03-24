
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import { jurnalPrompts } from '../../data/jurnalPrompts';
import type { JurnalEntry } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { trackEvent } from '../../services/trackingService';
import { getAIJournalInsight } from '../../services/geminiService';

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

const JournalActivityChart: React.FC<{ entries: JurnalEntry[]; lang: 'id' | 'en' }> = ({ entries, lang }) => {
    const chartData = useMemo(() => {
        const data: { date: Date; count: number }[] = [];
        const today = new Date();
        const entriesByDate: Record<string, number> = {};

        entries.forEach(entry => {
            const entryDate = new Date(entry.date).toISOString().split('T')[0];
            entriesByDate[entryDate] = (entriesByDate[entryDate] || 0) + 1;
        });
        
        for (let i = 29; i >= 0; i--) {
            const date = new Date();
            date.setDate(today.getDate() - i);
            const dateString = date.toISOString().split('T')[0];
            
            data.push({
                date: date,
                count: entriesByDate[dateString] || 0,
            });
        }
        return data;
    }, [entries]);

    const maxCount = useMemo(() => Math.max(...chartData.map(d => d.count), 1), [chartData]);
    
    const currentMonthYear = useMemo(() => {
        const now = new Date();
        const locale = lang === 'id' ? 'id-ID' : 'en-US';
        return now.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
    }, [lang]);

    return (
        <div className="p-4 bg-slate-900/50 rounded-lg">
            <h4 className="font-bold text-lg mb-6 text-white">Aktivitas Jurnal ({currentMonthYear})</h4>
            <div className="flex justify-between items-end h-40 gap-1 px-2">
                {chartData.map((dayData, index) => {
                    const barHeight = (dayData.count / maxCount) * 100;
                    const isToday = dayData.date.toDateString() === new Date().toDateString();
                    return (
                        <div key={index} className="flex-1 flex flex-col items-center group relative h-full">
                            <div className="w-full flex-grow flex items-end justify-center">
                                <div 
                                    className={`w-full rounded-t-md transition-all duration-300 ${dayData.count > 0 ? 'bg-primary' : 'bg-slate-700'}`}
                                    style={{ height: `${barHeight}%`, minHeight: '2px' }}
                                ></div>
                            </div>
                            <span className={`text-xs mt-2 font-semibold ${isToday ? 'text-primary' : 'text-gray-400'}`}>{dayData.date.getDate()}</span>
                             <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 px-2 py-1 rounded-md shadow-lg w-max z-10 pointer-events-none">
                                {dayData.date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}: 
                                <span className="text-primary ml-1">{dayData.count} catatan</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const JurnalMuhasabah: React.FC = () => {
    const { t, lang } = useLanguage();
    const [entries, setEntries] = useState<JurnalEntry[]>([]);
    const [currentEntry, setCurrentEntry] = useState('');
    const [editingEntry, setEditingEntry] = useState<JurnalEntry | null>(null);
    const [view, setView] = useState<'new' | 'list'>('new');
    const [insightLoadingId, setInsightLoadingId] = useState<number | null>(null);
    const [today, setToday] = useState(new Date()); // State for the current date

    // Effect to check if date has changed and update it to be "real-time"
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            if (now.getDate() !== today.getDate()) {
                setToday(now);
            }
        }, 1000 * 60); // Check every minute

        return () => clearInterval(interval);
    }, [today]);
    
    const promptOfTheDay = useMemo(() => {
        const dayIndex = today.getDate() % jurnalPrompts.length;
        return jurnalPrompts[dayIndex];
    }, [today]);

    const userId = getUserId();

    useEffect(() => {
        if (!userId) return;
        try {
            const savedEntries = localStorage.getItem(`jurnalMuhasabahEntries_${userId}`);
            if (savedEntries) {
                setEntries(JSON.parse(savedEntries));
            }
        } catch (error) {
            console.error("Failed to load journal entries:", error);
        }
    }, [userId]);

    const saveEntriesToStorage = (updatedEntries: JurnalEntry[]) => {
        if (!userId) return;
        localStorage.setItem(`jurnalMuhasabahEntries_${userId}`, JSON.stringify(updatedEntries));
    };

    const saveEntry = () => {
        if (!userId || !currentEntry.trim()) return;

        let updatedEntries;
        const isEditing = !!editingEntry;
        if (editingEntry) {
            updatedEntries = entries.map(e => e.id === editingEntry.id ? { ...e, entry: currentEntry } : e);
        } else {
            const newEntry: JurnalEntry = {
                id: Date.now(),
                date: new Date().toISOString(),
                prompt: promptOfTheDay,
                entry: currentEntry,
            };
            updatedEntries = [newEntry, ...entries];
        }
        
        setEntries(updatedEntries);
        saveEntriesToStorage(updatedEntries);
        
        trackEvent('journal_entry_saved', { isEditing });
        
        setCurrentEntry('');
        setEditingEntry(null);
        setView('list');
    };

    const handleGenerateInsight = async (entry: JurnalEntry) => {
        if (entry.aiInsight || !userId) return;
        setInsightLoadingId(entry.id);
        try {
            const insight = await getAIJournalInsight(entry.entry);
            const updatedEntries = entries.map(e => 
                e.id === entry.id ? { ...e, aiInsight: insight } : e
            );
            setEntries(updatedEntries);
            saveEntriesToStorage(updatedEntries);
        } catch (error) {
            console.error("Failed to generate insight", error);
            alert("Gagal mendapatkan wawasan dari AI. Coba lagi nanti.");
        } finally {
            setInsightLoadingId(null);
        }
    };
    
    const handleEdit = (entry: JurnalEntry) => {
        setEditingEntry(entry);
        setCurrentEntry(entry.entry);
        setView('new');
    };
    
    const handleDelete = (id: number) => {
        if (!userId) return;
        if (window.confirm(t('yakin_hapus_catatan' as any))) {
            const updatedEntries = entries.filter(e => e.id !== id);
            setEntries(updatedEntries);
            saveEntriesToStorage(updatedEntries);
        }
    };

    const handleCancelEdit = () => {
        setEditingEntry(null);
        setCurrentEntry('');
        setView('list');
    };

    const renderNewEntryView = () => (
        <Card>
            <h3 className="text-xl font-bold text-primary mb-2">
                {editingEntry ? t('mengedit_catatan' as any) : t('catatan_muhasabah_hari_ini' as any)}
            </h3>
            <p className="text-sm text-gray-400 mb-4">
                {new Date(editingEntry ? editingEntry.date : today).toLocaleDateString(lang, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            <blockquote className="border-l-4 border-primary pl-4 italic bg-slate-700/50 p-3 rounded-r-lg mb-4">
                <p className="text-gray-200">{(editingEntry ? editingEntry.prompt : promptOfTheDay)[lang]}</p>
            </blockquote>
            <textarea
                rows={10}
                value={currentEntry}
                onChange={(e) => setCurrentEntry(e.target.value)}
                placeholder={t('tulis_refleksi_placeholder' as any)}
                className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white focus:ring-2 focus:ring-primary"
            ></textarea>
            <div className="flex justify-end gap-3 mt-4">
                {(view === 'list' || editingEntry) && (
                     <button onClick={handleCancelEdit} className="px-6 py-2 bg-slate-600 hover:bg-slate-500 rounded-lg font-semibold">
                        {t('batal')}
                    </button>
                )}
                <button onClick={saveEntry} className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg font-bold">
                    <i className="fas fa-save mr-2"></i>{t('simpan_catatan' as any)}
                </button>
            </div>
        </Card>
    );

    const renderListView = () => (
        <>
            <Card className="mb-6">
                <JournalActivityChart entries={entries} lang={lang} />
            </Card>

            <Card>
                <div className="space-y-4">
                    {entries.length > 0 ? entries.map(entry => (
                        <div key={entry.id} className="p-4 bg-slate-700 rounded-lg">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs text-gray-400 font-semibold">{new Date(entry.date).toLocaleDateString(lang, { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                    <p className="italic text-gray-300 mt-1">"{entry.prompt[lang]}"</p>
                                </div>
                                <div className="flex gap-3 text-gray-400">
                                    <button onClick={() => handleEdit(entry)} className="hover:text-primary" title={t('edit' as any)}><i className="fas fa-pen"></i></button>
                                    <button onClick={() => handleDelete(entry.id)} className="hover:text-red-500" title={t('hapus')}><i className="fas fa-trash"></i></button>
                                </div>
                            </div>
                            <p className="text-sm text-gray-200 mt-3 whitespace-pre-line line-clamp-4">{entry.entry}</p>

                            {entry.aiInsight ? (
                                <div className="mt-4 p-3 bg-slate-800 border-l-4 border-sky-500 rounded-r-lg">
                                    <h5 className="font-bold text-sm text-sky-400 mb-2"><i className="fas fa-lightbulb mr-2"></i>Wawasan AI</h5>
                                    <p className="text-xs text-gray-400"><strong>Emosi terdeteksi:</strong> {entry.aiInsight.emotion}</p>
                                    <blockquote className="my-2 p-2 bg-slate-900 rounded-md">
                                        <p className="font-uthmanic text-lg text-right">{entry.aiInsight.verse}</p>
                                        <footer className="text-xs text-gray-500 text-right mt-1">{entry.aiInsight.verseSource}</footer>
                                    </blockquote>
                                    <p className="text-xs text-gray-400"><strong>Saran amalan:</strong> {entry.aiInsight.action}</p>
                                </div>
                            ) : (
                                <div className="mt-4">
                                    <button 
                                        onClick={() => handleGenerateInsight(entry)} 
                                        disabled={insightLoadingId === entry.id}
                                        className="text-xs font-semibold bg-sky-600 hover:bg-sky-700 text-white py-1 px-3 rounded-md disabled:opacity-50"
                                    >
                                        {insightLoadingId === entry.id ? <><i className="fas fa-spinner fa-spin mr-2"></i>Memproses...</> : <><i className="fas fa-brain mr-2"></i>Dapatkan Wawasan dari AI</>}
                                    </button>
                                </div>
                            )}
                        </div>
                    )) : (
                        <div className="text-center py-10">
                            <i className="fas fa-book-open text-4xl text-gray-500 mb-3"></i>
                            <p className="text-gray-400">{t('belum_ada_catatan' as any)}</p>
                            <p className="text-sm text-gray-500">{t('mulai_tulis_refleksi' as any)}</p>
                        </div>
                    )}
                </div>
            </Card>
        </>
    );

    return (
        <section id="jurnal-muhasabah" className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-white">{t('jurnal_title_page')}</h2>
            
            <div className="mb-6 border-b border-slate-700">
                <div className="flex -mb-px">
                    <button onClick={() => setView('new')} className={`inline-block p-3 border-b-2 font-semibold ${view === 'new' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-gray-200'}`}>
                        <i className="fas fa-plus-circle mr-2"></i>{t('tulis_catatan_baru' as any)}
                    </button>
                    <button onClick={() => setView('list')} className={`inline-block p-3 border-b-2 font-semibold ${view === 'list' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-gray-200'}`}>
                        <i className="fas fa-list-ul mr-2"></i>{t('lihat_semua_catatan' as any)} ({entries.length})
                    </button>
                </div>
            </div>

            {view === 'new' ? renderNewEntryView() : renderListView()}

            <div className="mt-8 p-4 bg-yellow-900/80 border-l-4 border-yellow-500 text-yellow-200 rounded-r-lg">
                <h4 className="font-bold"><i className="fas fa-lock mr-2"></i> {t('privasi_terjamin' as any)}</h4>
                <p className="text-sm">{t('privasi_desc' as any)}</p>
            </div>
        </section>
    );
};

export default JurnalMuhasabah;
