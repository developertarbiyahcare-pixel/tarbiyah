
import React, { useState } from 'react';
import Card from '../ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';
import { getAITarbiyahPlan } from '../../services/geminiService';
import type { AITarbiyahPlan } from '../../types';
import { Link } from 'react-router-dom';

const TarbiyahPersonal: React.FC = () => {
    const { t } = useLanguage();
    const [goal, setGoal] = useState('');
    const [aspect, setAspect] = useState('');
    const [time, setTime] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [plan, setPlan] = useState<AITarbiyahPlan | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleCreatePlan = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!goal || !aspect || !time) {
            setError("Mohon lengkapi semua isian.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setPlan(null);

        try {
            const result = await getAITarbiyahPlan(goal, aspect, time);
            setPlan(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Gagal membuat rencana. Silakan coba lagi.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="tarbiyah-personal" className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-white">{t('journey_ai_title' as any)}</h2>
            <Card>
                <p className="text-gray-300 mb-6">{t('journey_ai_desc' as any)}</p>
                
                {!plan ? (
                    <form onSubmit={handleCreatePlan} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-1">{t('journey_tujuan_label' as any)}</label>
                            <input 
                                type="text" 
                                value={goal} 
                                onChange={(e) => setGoal(e.target.value)} 
                                placeholder={t('journey_tujuan_placeholder' as any)}
                                className="w-full p-2.5 bg-slate-700 text-gray-100 border border-slate-600 rounded-lg focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-1">{t('journey_aspek_label' as any)}</label>
                            <select 
                                value={aspect} 
                                onChange={(e) => setAspect(e.target.value)} 
                                className="w-full p-2.5 bg-slate-700 text-gray-100 border border-slate-600 rounded-lg focus:ring-2 focus:ring-primary"
                                required
                            >
                                <option value="">Pilih Aspek</option>
                                <option value="Ibadah">Ibadah (Shalat, Puasa, dll)</option>
                                <option value="Akhlak">Akhlak & Perilaku</option>
                                <option value="Ilmu">Pengetahuan Agama</option>
                                <option value="Al-Qur'an">Al-Qur'an (Tilawah/Hafalan)</option>
                                <option value="Keluarga">Hubungan Keluarga</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-1">{t('journey_waktu_label' as any)}</label>
                            <select 
                                value={time} 
                                onChange={(e) => setTime(e.target.value)} 
                                className="w-full p-2.5 bg-slate-700 text-gray-100 border border-slate-600 rounded-lg focus:ring-2 focus:ring-primary"
                                required
                            >
                                <option value="">Pilih Durasi</option>
                                <option value="15 menit">15 Menit</option>
                                <option value="30 menit">30 Menit</option>
                                <option value="1 jam">1 Jam</option>
                                <option value="Lebih dari 1 jam">Lebih dari 1 Jam</option>
                            </select>
                        </div>
                        <button 
                            type="submit" 
                            disabled={isLoading} 
                            className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded-lg transition duration-300 disabled:opacity-50"
                        >
                            {isLoading ? t('ai_membuat_rencana' as any) : t('buat_rencana' as any)}
                        </button>
                        {error && <p className="text-center text-red-400 mt-2">{error}</p>}
                    </form>
                ) : (
                    <div className="animate-fade-in">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-primary mb-1">Rencana Mingguan Anda</h3>
                                <p className="text-gray-300 italic">Fokus: "{plan.focus}"</p>
                            </div>
                            <button onClick={() => setPlan(null)} className="text-sm text-gray-400 hover:text-white underline">
                                {t('rencana_baru' as any)}
                            </button>
                        </div>

                        <div className="space-y-4">
                            {plan.days.map((day, index) => (
                                <div key={index} className="bg-slate-700 rounded-lg p-4 border-l-4 border-primary">
                                    <h4 className="font-bold text-white mb-3">{day.day}</h4>
                                    <ul className="space-y-3">
                                        {day.tasks.map((task, idx) => (
                                            <li key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-800/50 p-2 rounded">
                                                <div>
                                                    <p className="font-semibold text-sky-300">{task.title}</p>
                                                    <p className="text-xs text-gray-400">{task.description}</p>
                                                </div>
                                                {task.link && (
                                                    <Link to={task.link} className="text-xs bg-slate-600 hover:bg-slate-500 px-3 py-1 rounded text-white text-center whitespace-nowrap">
                                                        Mulai <i className="fas fa-arrow-right ml-1"></i>
                                                    </Link>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                         <div className="mt-6 p-3 bg-yellow-900/30 border border-yellow-600 rounded text-xs text-center text-yellow-200">
                            Rencana ini disusun oleh AI berdasarkan input Anda. Istiqamah adalah kuncinya.
                        </div>
                    </div>
                )}
            </Card>
        </section>
    );
};

export default TarbiyahPersonal;
