
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
// FIX: Import getAIKhutbahOutline from geminiService
import { getAIKhutbahOutline } from '../../services/geminiService';
import type { KhutbahOutlineResponse } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import Dropdown from '../ui/Dropdown';

const KhutbahGenerator: React.FC = () => {
    const { t } = useLanguage();
    const [topic, setTopic] = useState('');
    const [selectedEvent, setSelectedEvent] = useState('acara_jumat');
    const [selectedStyle, setSelectedStyle] = useState('formal_lugas');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [khutbahOutline, setKhutbahOutline] = useState<KhutbahOutlineResponse | null>(null);

    const eventItems = [
        { value: 'acara_jumat', label: <><i className="fas fa-mosque w-5 mr-2 text-green-300"></i>{t('acara_jumat')}</> },
        { value: 'acara_fitri', label: <><i className="fas fa-calendar-check w-5 mr-2 text-teal-300"></i>{t('acara_fitri')}</> },
        { value: 'acara_adha', label: <><i className="fas fa-calendar-day w-5 mr-2 text-cyan-300"></i>{t('acara_adha')}</> },
        { value: 'acara_ramadhan', label: <><i className="fas fa-moon w-5 mr-2 text-blue-300"></i>{t('acara_ramadhan')}</> },
        { value: 'acara_maulid', label: <><i className="fas fa-star-and-crescent w-5 mr-2 text-purple-300"></i>{t('acara_maulid')}</> },
        { value: 'acara_isra', label: <><i className="fas fa-plane-departure w-5 mr-2 text-indigo-300"></i>{t('acara_isra')}</> },
        { value: 'acara_nikah', label: <><i className="fas fa-ring w-5 mr-2 text-pink-300"></i>{t('acara_nikah')}</> },
        { value: 'acara_umum', label: <><i className="fas fa-users w-5 mr-2 text-gray-300"></i>{t('acara_umum')}</> },
    ];

    const styleItems = [
        { value: 'formal_lugas', label: <><i className="fas fa-gavel w-5 mr-2 text-gray-300"></i>{t('gaya_formal')}</> },
        { value: 'menyentuh_hati', label: <><i className="fas fa-heart w-5 mr-2 text-red-300"></i>{t('gaya_emosional')}</> },
        { value: 'intelektual_mendalam', label: <><i className="fas fa-brain w-5 mr-2 text-sky-300"></i>{t('gaya_intelektual')}</> },
        { value: 'praktis_kekinian', label: <><i className="fas fa-lightbulb w-5 mr-2 text-yellow-300"></i>{t('gaya_praktis')}</> },
        { value: 'sederhana_mudah', label: <><i className="fas fa-child w-5 mr-2 text-green-300"></i>{t('gaya_sederhana')}</> },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic.trim()) {
            setError('Silakan masukkan tema khutbah terlebih dahulu.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setKhutbahOutline(null);

        try {
            const eventText = t(selectedEvent as any);
            const styleText = t(selectedStyle as any);
            const response = await getAIKhutbahOutline(topic, eventText, styleText);
            setKhutbahOutline(response);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Maaf, terjadi kesalahan saat membuat khutbah. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const renderResult = () => {
        if (!khutbahOutline) return null;

        return (
            <div className="space-y-6 text-gray-300 animate-fade-in">
                <h3 className="text-3xl font-bold text-center text-primary">{khutbahOutline.title}</h3>

                <div className="p-4 bg-slate-900 rounded-lg">
                    <h4 className="font-bold text-lg text-yellow-400 mb-2">Muqaddimah (Pembukaan)</h4>
                    <p className="whitespace-pre-line mb-3">{khutbahOutline.muqaddimah.pembukaan}</p>
                    <blockquote className="border-l-4 border-primary pl-4 italic">
                        <p>{khutbahOutline.muqaddimah.ayat_pembuka}</p>
                    </blockquote>
                </div>

                <div className="p-4 bg-slate-900 rounded-lg">
                    <h4 className="font-bold text-lg text-yellow-400 mb-2">Khutbah Pertama</h4>
                    <div className="space-y-4">
                        {khutbahOutline.khutbah_pertama.map((point, index) => (
                            <div key={index}>
                                <h5 className="font-semibold text-white">{index + 1}. {point.point_title}</h5>
                                <p className="text-sm my-2 pl-4">{point.explanation}</p>
                                <blockquote className="border-l-4 border-primary pl-4 italic text-sm">
                                    <p><strong>Dalil:</strong> {point.dalil}</p>
                                </blockquote>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-4 bg-slate-900 rounded-lg">
                    <h4 className="font-bold text-lg text-yellow-400 mb-2">Khutbah Kedua</h4>
                     <p className="text-sm mb-3"><strong className="text-white">Ringkasan:</strong> {khutbahOutline.khutbah_kedua.ringkasan}</p>
                     <p className="font-semibold text-white mb-2">Doa Penutup:</p>
                     <p className="text-right font-uthmanic text-xl whitespace-pre-line">{khutbahOutline.khutbah_kedua.doa_penutup}</p>
                </div>
            </div>
        );
    };

    return (
        <section id="khutbah-generator" className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-white">Asisten Khutbah AI</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <h3 className="text-xl font-bold mb-2 text-primary"><i className="fas fa-microphone-alt mr-2"></i>Generator Khutbah</h3>
                    <p className="text-sm text-gray-400 mb-4">Masukkan tema utama khutbah, dan AI akan membantu Anda menyusun draf khutbah yang terstruktur lengkap dengan muqaddimah, poin pembahasan beserta dalil, dan doa penutup.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="khutbah-topic" className="block text-sm font-medium text-gray-200 mb-1">Tema Khutbah</label>
                            <input
                                type="text"
                                id="khutbah-topic"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="Contoh: Pentingnya Menjaga Lisan, Hikmah di Balik Musibah"
                                className="w-full p-2.5 bg-slate-700 text-gray-100 border border-slate-600 rounded-lg focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Dropdown
                                label={t('acara_label' as any)}
                                items={eventItems}
                                selectedValue={selectedEvent}
                                onSelect={setSelectedEvent}
                            />
                            <Dropdown
                                label={t('gaya_label' as any)}
                                items={styleItems}
                                selectedValue={selectedStyle}
                                onSelect={setSelectedStyle}
                            />
                        </div>
                        <button type="submit" disabled={isLoading} className="mt-6 w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded-lg transition duration-300 disabled:opacity-50">
                            {isLoading ? 'Membuat Khutbah...' : 'Buat Khutbah'}
                        </button>
                    </form>
                </Card>

                <Card className="relative">
                     {isLoading && (
                        <div className="absolute inset-0 bg-slate-800 bg-opacity-80 flex flex-col items-center justify-center rounded-xl z-10">
                            <i className="fas fa-spinner fa-spin text-4xl text-primary"></i>
                            <p className="mt-4">{t('ai_menyusun_khutbah' as any)}</p>
                        </div>
                    )}
                    {error && <p className="text-center text-red-400">{error}</p>}
                    
                    {!isLoading && !error && !khutbahOutline && (
                         <div className="flex flex-col items-center justify-center text-center h-full">
                           <i className="fas fa-file-alt text-5xl text-gray-500 mb-4"></i>
                           <h3 className="text-xl font-semibold text-gray-300">Hasil Khutbah</h3>
                           <p className="text-gray-400 mt-2">Draf khutbah yang dihasilkan AI akan muncul di sini.</p>
                       </div>
                    )}
                    
                    <div className="overflow-y-auto h-full max-h-[70vh] no-scrollbar pr-2">
                         {renderResult()}
                    </div>
                </Card>
            </div>
            
             <div className="mt-8 p-4 bg-yellow-900/80 border-l-4 border-yellow-500 text-yellow-200 rounded-r-lg">
                <h4 className="font-bold">Disclaimer</h4>
                <p className="text-sm">Draf ini adalah alat bantu yang dihasilkan oleh AI. Wajib bagi khatib untuk memeriksa kembali semua dalil dan mengembangkannya dengan ilmu dan gaya bahasa sendiri sebelum disampaikan kepada jamaah.</p>
            </div>
        </section>
    );
};

export default KhutbahGenerator;