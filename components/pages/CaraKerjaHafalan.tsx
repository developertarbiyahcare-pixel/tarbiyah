import React from 'react';
import Card from '../ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';

const CaraKerjaHafalan: React.FC = () => {
    const { t } = useLanguage();

    return (
        <section id="cara-kerja-hafalan" className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-white">{t('cara_kerja_title_page')}</h2>
            <Card>
                <div className="overflow-y-auto pr-2 pb-4 no-scrollbar text-gray-300 space-y-4">
                    <p className="text-lg">{t('how_it_works_intro')}</p>
                    <ol className="list-decimal list-inside space-y-4">
                        <li>
                            <strong className="text-white">{t('how_it_works_step1_title')}:</strong>
                            <p className="pl-6 text-gray-400">{t('how_it_works_step1_desc')}</p>
                        </li>
                        <li>
                            <strong className="text-white">{t('how_it_works_step2_title')}:</strong>
                            <p className="pl-6 text-gray-400">{t('how_it_works_step2_desc')}</p>
                        </li>
                        <li>
                            <strong className="text-white">{t('how_it_works_step3_title')}:</strong>
                            <p className="pl-6 text-gray-400">{t('how_it_works_step3_desc')}</p>
                        </li>
                        <li>
                            <strong className="text-white">{t('how_it_works_step4_title')}:</strong>
                            <p className="pl-6 text-gray-400">{t('how_it_works_step4_desc')}</p>
                        </li>
                         <li>
                            <strong className="text-white">{t('how_it_works_step5_title')}:</strong>
                            <p className="pl-6 text-gray-400">{t('how_it_works_step5_desc')}</p>
                            <ul className="list-disc list-inside pl-12 mt-2 text-gray-400 space-y-1">
                                <li>{t('how_it_works_step5_ingat')}</li>
                                <li>{t('how_it_works_step5_lupa')}</li>
                            </ul>
                        </li>
                         <li>
                            <strong className="text-white">{t('how_it_works_step6_title')}:</strong>
                            <p className="pl-6 text-gray-400">{t('how_it_works_step6_desc')}</p>
                        </li>
                    </ol>
                     <div className="pt-4 border-t border-slate-700">
                        <h4 className="font-semibold text-xl text-white mb-2">{t('how_it_works_goals_title')}</h4>
                        <ul className="list-disc list-inside space-y-2 pl-2 text-gray-400">
                            <li>{t('how_it_works_goal1')}</li>
                            <li>{t('how_it_works_goal2')}</li>
                            <li>{t('how_it_works_goal3')}</li>
                            <li>{t('how_it_works_goal4')}</li>
                        </ul>
                    </div>
                    <p className="font-bold pt-4 border-t border-slate-700 text-lg text-white">{t('how_it_works_conclusion')}</p>
                </div>
            </Card>
        </section>
    );
};

export default CaraKerjaHafalan;
