import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import { sumberData } from '../../data/sumber';
import { useLanguage } from '../../contexts/LanguageContext';

const Sumber: React.FC = () => {
    const { t, lang } = useLanguage();
    return (
        <section id="sumber" className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-white">{t('sumber')}</h2>
            <Card>
                <p className="mb-6 text-gray-300">
                    {t('sumber_desc' as any)}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sumberData.map((sumber, index) => (
                        <div key={index} className="bg-gray-700 dark:bg-gray-900 p-5 rounded-lg shadow-md flex flex-col">
                            <div className="flex items-center mb-3">
                                <i className={`${sumber.icon} text-2xl text-primary mr-4 w-8 text-center`}></i>
                                <h3 className="text-xl font-bold text-white">{sumber.title[lang]}</h3>
                            </div>
                            <p className="text-gray-400 text-sm mb-4 flex-grow">{sumber.description[lang]}</p>
                            <a
                                href={sumber.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-auto text-center bg-primary hover:bg-primary-hover text-white font-semibold py-2 px-4 rounded-lg transition duration-300 text-sm"
                            >
                                {t('situs')} <i className="fas fa-external-link-alt ml-2"></i>
                            </a>
                        </div>
                    ))}
                </div>
                <p className="mt-8 text-sm text-gray-500 italic">
                    {t('sumber_catatan_tambahan' as any)}
                </p>
            </Card>
        </section>
    );
};

export default Sumber;