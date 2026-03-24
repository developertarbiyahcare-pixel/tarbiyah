
import React, { useState } from 'react';
import Card from '../ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';
import { faktaIlmiahData } from '../../data/faktaIlmiah';

const FaktaIlmiah: React.FC = () => {
    const { t } = useLanguage();
    const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);

    const toggleAccordion = (id: string) => {
        setOpenAccordionId(openAccordionId === id ? null : id);
    };

    return (
        <section id="fakta-ilmiah" className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-white text-center">Fakta Ilmiah di Balik Ibadah</h2>

            <Card className="mb-8">
                <h3 className="text-xl font-bold text-primary mb-2">Ibadah sebagai Sistem Kesehatan Holistik dalam Islam</h3>
                <p className="text-gray-300 text-sm text-justify whitespace-pre-line">
                    Dalam pandangan Islam, manusia adalah makhluk yang terdiri dari jasad (tubuh), ruh (spiritual), akal (mental), dan sosial. Ibadah-ibadah yang diperintahkan Allah tidak hanya fokus pada aspek pahala, tetapi juga mengandung hikmah besar untuk kesehatan psikologis, fisiologis, sosial, dan moral.
                    {'\n\n'}
                    Penelitian modern — terutama di bidang psikoneuroimunologi, neurosains spiritual, dan behavioral health — menunjukkan bahwa ritual yang dijalankan secara konsisten, disiplin, dan penuh makna mampu memengaruhi sistem saraf, hormon, otak, metabolisme, hingga sistem imun.
                    {'\n\n'}
                    Islam sudah mengajarkan hal itu 1400 tahun lalu.
                </p>
            </Card>

            <div className="space-y-4">
                {faktaIlmiahData.map((item) => {
                    const isOpen = openAccordionId === item.id;
                    return (
                        <div key={item.id} className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
                            <button
                                onClick={() => toggleAccordion(item.id)}
                                className="w-full flex justify-between items-center text-left p-4"
                                aria-expanded={isOpen}
                            >
                                <div className="flex items-center">
                                    <i className={`${item.icon} text-xl text-primary mr-4 w-6 text-center`}></i>
                                    <h3 className="font-semibold text-gray-100">{item.title}</h3>
                                </div>
                                <i className={`fas fa-chevron-down transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
                            </button>
                            {isOpen && (
                                <div className="p-4 border-t border-slate-700 animate-fade-in">
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-bold text-lg text-sky-400 mb-2">⚛️ Fakta Ilmiah</h4>
                                            <div className="space-y-3 text-gray-300 text-sm">
                                                {item.faktaIlmiah.map((fact, index) => {
                                                    if (typeof fact === 'string') {
                                                        return <p key={index} className="list-disc list-inside">{fact}</p>;
                                                    } else if (fact && typeof fact === 'object' && 'title' in fact && 'points' in fact) {
                                                        return (
                                                            <div key={index}>
                                                                <h5 className="font-semibold text-sky-300">{fact.title}</h5>
                                                                <ul className="list-disc list-inside space-y-1 pl-4 mt-1">
                                                                    {fact.points.map((point, pIndex) => (
                                                                        <li key={pIndex}>{point}</li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                })}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-emerald-400 mb-2">🕌 Perspektif Islam</h4>
                                            <p className="text-gray-300 text-sm">{item.perspektifIslam}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

             <Card className="mt-8 bg-slate-800/50">
                <h3 className="text-xl font-bold text-white mb-4 text-left">Kesimpulan</h3>
                <div className="text-left text-gray-300 whitespace-pre-line">
                    <p>
                        Ibadah dalam Islam adalah sistem kesehatan holistik yang mencakup:
                    </p>
                    <div className="mt-4 space-y-2 font-semibold">
                        <p className="text-green-400">✔ Fisik: metabolisme, hormon, imun, sirkulasi</p>
                        <p className="text-sky-400">✔ Mental: ketenangan, fokus, kebahagiaan, reduksi stres</p>
                        <p className="text-yellow-400">✔ Spiritual: kedekatan dengan Allah, makna hidup</p>
                        <p className="text-pink-400">✔ Sosial: solidaritas, empati, hubungan sehat</p>
                    </div>
                </div>
                <p className="text-gray-400 mt-6 italic text-left border-t border-slate-700 pt-4">Ilmu modern membuktikan apa yang Islam ajarkan sejak berabad-abad lalu.</p>
            </Card>
        </section>
    );
};

export default FaktaIlmiah;
