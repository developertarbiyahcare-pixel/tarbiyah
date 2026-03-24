import React, { useState, useMemo } from 'react';
import Card from '../ui/Card';
import { peloporIslamData } from '../../data/peloporIslam';
import type { PeloporCategory } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

const PeloporIslam: React.FC = () => {
    const { t, lang } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<PeloporCategory>(peloporIslamData[0]);

    const searchResults = useMemo(() => {
        if (!searchTerm.trim()) {
            return null; // No search, so we'll show the tabbed view
        }
        
        const results: PeloporCategory[] = [];
        peloporIslamData.forEach(category => {
            const matchingItems = category.items.filter(item =>
                item.title[lang].toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description[lang].toLowerCase().includes(searchTerm.toLowerCase())
            );
            
            if (matchingItems.length > 0) {
                results.push({ ...category, items: matchingItems });
            }
        });
        return results;
    }, [searchTerm, lang]);

    return (
        <section id="pelopor-islam" className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-2 text-white">{t('pelopor_title_page')}</h2>
            <p className="text-gray-400 mb-6">{t('pelopor_desc')}</p>

            <Card className="mb-6 sticky top-0 lg:top-4 z-10">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={t('cari_pelopor')}
                    className="w-full p-3 bg-slate-700 text-white border border-slate-600 rounded-lg focus:ring-2 focus:ring-primary"
                />
            </Card>
            
            {searchResults ? (
                // Search Results View
                <div className="space-y-6">
                    {searchResults.length > 0 ? (
                        searchResults.map(category => (
                            <div key={category.category.id}>
                                <h3 className="text-xl font-bold text-primary mb-3 flex items-center">
                                    <i className={`fas ${category.icon} mr-3`}></i>
                                    {category.category[lang]}
                                </h3>
                                <div className="space-y-4">
                                    {category.items.map(item => (
                                        <Card key={item.id}>
                                            <div className="flex items-start gap-4">
                                                <i className={`${item.icon} text-3xl text-gray-400 w-8 text-center mt-1`}></i>
                                                <div>
                                                    <h4 className="font-bold text-lg text-white">{item.title[lang]}</h4>
                                                    <p className="text-sm text-gray-300 mt-1">{item.description[lang]}</p>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <Card className="text-center py-10">
                            <p className="text-gray-400">Tidak ada hasil yang ditemukan untuk "{searchTerm}".</p>
                        </Card>
                    )}
                </div>
            ) : (
                // Tabbed View
                <>
                    <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-2">
                        {peloporIslamData.map(cat => (
                            <button 
                                key={cat.category.id} 
                                onClick={() => setSelectedCategory(cat)}
                                className={`flex flex-col items-center justify-center p-3 rounded-lg text-sm font-semibold transition-colors duration-300 text-center aspect-[4/3] ${
                                    selectedCategory.category.id === cat.category.id
                                        ? 'bg-primary text-white shadow-lg transform scale-105'
                                        : 'bg-slate-700 hover:bg-slate-600 text-gray-200'
                                }`}
                            >
                                <i className={`fas ${cat.icon} text-2xl mb-2`}></i>
                                <span className="leading-tight">{cat.category[lang]}</span>
                            </button>
                        ))}
                    </div>

                    <div className="space-y-4 animate-fade-in">
                        {selectedCategory.items.map(item => (
                            <Card key={item.id}>
                                <div className="flex items-start gap-4">
                                    <i className={`${item.icon} text-3xl text-primary w-8 text-center mt-1`}></i>
                                    <div>
                                        <h3 className="font-bold text-lg text-white">{item.title[lang]}</h3>
                                        <p className="text-sm text-gray-300 mt-1">{item.description[lang]}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </>
            )}
        </section>
    );
};

export default PeloporIslam;
