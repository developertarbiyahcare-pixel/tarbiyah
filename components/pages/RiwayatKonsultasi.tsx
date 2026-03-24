import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import type { ConsultationHistoryItem, SearchHistoryItem } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

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

type CombinedHistoryItem = ConsultationHistoryItem | SearchHistoryItem;

const RiwayatKonsultasi: React.FC = () => {
    const { t } = useLanguage();
    const [consultationHistory, setConsultationHistory] = useState<ConsultationHistoryItem[]>([]);
    const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);

    useEffect(() => {
        const userId = getUserId();
        if (!userId) return;
        try {
            const savedConsultations = localStorage.getItem(`consultationHistory_${userId}`);
            if (savedConsultations) {
                setConsultationHistory(JSON.parse(savedConsultations));
            }
            const savedSearches = localStorage.getItem(`searchHistory_${userId}`);
            if (savedSearches) {
                setSearchHistory(JSON.parse(savedSearches));
            }
        } catch (error) {
            console.error("Failed to load history:", error);
            setConsultationHistory([]);
            setSearchHistory([]);
        }
    }, []);

    const handleDeleteHistory = (id: string) => {
        const userId = getUserId();
        if (!userId) return;

        if (window.confirm("Apakah Anda yakin ingin menghapus riwayat ini?")) {
            const updatedConsultations = consultationHistory.filter(item => item.id !== id);
            const updatedSearches = searchHistory.filter(item => item.id !== id);

            setConsultationHistory(updatedConsultations);
            setSearchHistory(updatedSearches);

            localStorage.setItem(`consultationHistory_${userId}`, JSON.stringify(updatedConsultations));
            localStorage.setItem(`searchHistory_${userId}`, JSON.stringify(updatedSearches));
        }
    };

    const combinedHistory = useMemo(() => 
        [...consultationHistory, ...searchHistory].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
        [consultationHistory, searchHistory]
    );

    const getIconForMode = (mode: CombinedHistoryItem['mode']) => {
        switch (mode) {
            case 'konsultasi': return 'fa-brain';
            case 'dalil': return 'fa-book-open';
            case 'tadabbur': return 'fa-spa';
            case 'pengetahuan': return 'fa-search-location';
            default: return 'fa-history';
        }
    };
    
    const getModeLabel = (mode: CombinedHistoryItem['mode']) => {
        switch (mode) {
            case 'konsultasi': return t('konsultasi_umum');
            case 'tadabbur': return t('refleksi_tadabbur');
            case 'dalil': return t('pencari_dalil');
            case 'pengetahuan': return t('pengetahuan_umum' as any);
            default: return mode;
        }
    };

    return (
        <section id="riwayat-konsultasi" className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-white">Riwayat Konsultasi AI</h2>
            
            <Card>
                {combinedHistory.length > 0 ? (
                    <ul className="space-y-4">
                        {combinedHistory.map(item => (
                            <li key={item.id} className="p-4 bg-slate-700 rounded-lg group">
                                <div className="flex justify-between items-start">
                                    <div className="flex-grow flex items-start">
                                        <i className={`fas ${getIconForMode(item.mode)} text-primary text-xl mt-1 w-8 text-center`}></i>
                                        <div className="ml-3">
                                            <p className="font-semibold text-white truncate text-md">
                                                 {item.mode === 'konsultasi' ? item.aiResponse.title : item.query}
                                            </p>
                                            <p className="text-xs text-gray-400 capitalize">
                                                {getModeLabel(item.mode)} - {new Date(item.timestamp).toLocaleString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                    <button onClick={() => handleDeleteHistory(item.id)} className="ml-4 text-gray-500 hover:text-red-500 transition-colors" aria-label="Hapus riwayat">
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-16">
                        <i className="fas fa-history text-5xl text-gray-500 mb-4"></i>
                        <p className="text-gray-400">{t('belum_ada_riwayat')}</p>
                    </div>
                )}
            </Card>
        </section>
    );
};

export default RiwayatKonsultasi;
