import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../ui/Card';
import ContentReader from '../ui/ContentReader';
import { kitabKuningData } from '../../data/kitabKuningData';
import { useLanguage } from '../../contexts/LanguageContext';

const KitabKuning: React.FC = () => {
    const { kitabId } = useParams<{ kitabId: string }>();
    const { t } = useLanguage();
    const selectedKitab = kitabId ? kitabKuningData.find(k => k.id === kitabId) : null;

    if (selectedKitab) {
        return (
            <section id="kitab-kuning-reader" className="animate-fade-in">
                <Card>
                    <ContentReader 
                        title={selectedKitab.title}
                        subtitle={`Karya: ${selectedKitab.author}`}
                        icon={selectedKitab.icon}
                        pages={selectedKitab.pages}
                        basePath="/kitab-kuning"
                    />
                </Card>
            </section>
        );
    }

    // Render topic list if no topic is selected
    return (
        <section id="kitab-kuning-list" className="animate-fade-in">
            <h2 className="text-3xl font-bold text-white ApplicationTitle">{t('kitab_kuning' as any)}</h2>
             <p className="text-gray-400 mb-6 text-center">
                Kumpulan matan (teks dasar) dan kitab-kitab klasik yang menjadi fondasi dalam studi keislaman di pesantren.
            </p>
            <Card>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {kitabKuningData.map((kitab) => (
                        <Link
                            key={kitab.id}
                            to={`/kitab-kuning/${kitab.id}`}
                            className="block p-6 bg-slate-700 hover:bg-slate-600 rounded-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <i className={`${kitab.icon} text-3xl text-primary mb-3`}></i>
                            <h3 className="font-bold text-lg text-white">{kitab.title}</h3>
                            <p className="text-sm text-gray-400">{kitab.subtitle}</p>
                            <p className="text-xs text-gray-500 mt-2">Karya: {kitab.author}</p>
                        </Link>
                    ))}
                </div>
            </Card>
        </section>
    );
};

export default KitabKuning;
