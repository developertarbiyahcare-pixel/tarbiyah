

import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import { doaData } from '../../data/doa';
import type { Doa, DoaCategory } from '../../data/doa';
import { useLanguage } from '../../contexts/LanguageContext';

const DoaHarian: React.FC = () => {
    const { lang, t } = useLanguage();
    const [selectedCategory, setSelectedCategory] = useState<DoaCategory>(doaData[0]);

    return (
        <section id="doaharian" className="animate-fade-in">
            <div className="relative mb-6">
                <h2 className="text-3xl font-bold text-white ApplicationTitle">{t('doa_harian_title')}</h2>
            </div>

            <h3 className="text-xl font-bold mb-4 text-gray-200">{t('kategori_doa_lainnya')}</h3>
            <div className="mb-6 grid grid-cols-3 md:grid-cols-6 gap-2">
                {doaData.map((cat) => (
                    <button
                        key={cat.category.id}
                        onClick={() => setSelectedCategory(cat)}
                        className={`flex flex-col items-center justify-center p-3 rounded-lg text-sm font-semibold transition-colors duration-300 text-center aspect-square ${
                            selectedCategory.category.id === cat.category.id
                                ? 'bg-primary text-white shadow-lg transform scale-105'
                                : 'bg-gray-600 hover:bg-gray-500 text-gray-200'
                        }`}
                    >
                        <i className={`${cat.icon} text-xl mb-2`}></i>
                        <span className="leading-tight">{cat.category[lang]}</span>
                    </button>
                ))}
            </div>

            <h3 className="text-2xl font-semibold mb-4 text-gray-100">{selectedCategory.category[lang]}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedCategory.prayers.map((doa, index) => (
                    <Card key={index} className="flex flex-col">
                        <h4 className="text-xl font-bold text-primary mb-4">{doa.title[lang]}</h4>
                        <div className="space-y-4 flex-grow">
                            <div>
                                <p className="font-uthmanic text-3xl text-right mb-2 leading-relaxed whitespace-pre-line">{doa.arabic}</p>
                            </div>
                            <div>
                                <p className="italic text-gray-300 mb-1 whitespace-pre-line">{doa.latin}</p>
                            </div>
                             <div>
                                <p className="text-sm text-gray-200 whitespace-pre-line">
                                    <strong>{t('artinya')}:</strong> "{doa.translation[lang]}"
                                </p>
                            </div>
                        </div>
                        <div className="text-right text-xs text-gray-400 mt-4 pt-2 border-t border-gray-500">
                            <p>{doa.source}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default DoaHarian;