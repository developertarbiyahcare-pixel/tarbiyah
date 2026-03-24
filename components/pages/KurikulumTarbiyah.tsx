
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import { kurikulumTarbiyahData } from '../../data/kurikulumTarbiyahData';

const KurikulumTarbiyah: React.FC = () => {
    const [activeLevel, setActiveLevel] = useState<number>(1);

    const selectedLevel = kurikulumTarbiyahData.find(l => l.level === activeLevel);

    return (
        <section id="kurikulum-tarbiyah" className="animate-fade-in">
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-white">Kurikulum Tarbiyah</h2>
                <p className="text-gray-400 text-sm">Roadmap Pembelajaran Islam Berjenjang (8 Level)</p>
            </div>

            {/* Level Selector */}
            <div className="mb-6 overflow-x-auto pb-2 no-scrollbar">
                <div className="flex space-x-2">
                    {kurikulumTarbiyahData.map((item) => (
                        <button
                            key={item.level}
                            onClick={() => setActiveLevel(item.level)}
                            className={`px-4 py-2 rounded-full whitespace-nowrap font-semibold transition-all duration-300 ${
                                activeLevel === item.level
                                    ? 'bg-primary text-white shadow-lg scale-105'
                                    : 'bg-slate-700 text-gray-400 hover:bg-slate-600'
                            }`}
                        >
                            Level {item.level}
                        </button>
                    ))}
                </div>
            </div>

            {selectedLevel && (
                <div className="space-y-6 animate-fade-in" key={selectedLevel.level}>
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-primary">{selectedLevel.title}</h3>
                        <p className="text-gray-400">Durasi Estimasi: {selectedLevel.duration}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {selectedLevel.subjects.map((subject) => (
                            <Link 
                                key={subject.id} 
                                to={`/kurikulum-tarbiyah/${selectedLevel.level}/${subject.id}`}
                                className="block h-full group"
                            >
                                <Card className="h-full border-t-4 border-transparent hover:border-primary transition-all duration-300 hover:bg-slate-700 cursor-pointer">
                                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-3 ${subject.color}`}>
                                        {subject.category}
                                    </div>
                                    <div className="space-y-2">
                                         <h4 className="font-bold text-white group-hover:text-primary transition-colors">{subject.description}</h4>
                                         <p className="text-xs text-gray-400 flex items-center mt-3">
                                            Baca Materi Lengkap <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                                         </p>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-8 p-4 bg-slate-800/50 border border-slate-700 rounded-lg text-center text-sm text-gray-400">
                <p><i className="fas fa-info-circle mr-2 text-primary"></i>Kurikulum ini disusun bertahap. Selesaikan materi di setiap level sebelum melanjutkan ke level berikutnya untuk pemahaman yang kokoh.</p>
            </div>
        </section>
    );
};

export default KurikulumTarbiyah;
