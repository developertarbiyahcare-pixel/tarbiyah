import React, { useState, useRef } from 'react';
import Card from '../ui/Card';
// FIX: Import getAISejarahNabiAnswer from geminiService
import { getAISejarahNabiAnswer } from '../../services/geminiService';
import { useLanguage } from '../../contexts/LanguageContext';

const TanyaSejarahNabi: React.FC = () => {
    const { t } = useLanguage();
    const [question, setQuestion] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [aiResponse, setAiResponse] = useState<string | null>(null);
    const resultCardRef = useRef<HTMLDivElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!question.trim()) {
            setError('Silakan masukkan pertanyaan Anda terlebih dahulu.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setAiResponse(null);

        try {
            const response = await getAISejarahNabiAnswer(question);
            setAiResponse(response);
            resultCardRef.current?.scrollIntoView({ behavior: 'smooth' });
        } catch (err) {
            setError(err instanceof Error ? err.message : t('terjadi_kesalahan_ai' as any));
        } finally {
            setIsLoading(false);
        }
    };

    const handleClear = () => {
        setQuestion('');
        setAiResponse(null);
        setError(null);
    };

    return (
        <section id="tanya-sejarah-nabi" className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-2 text-white">{t('tanya_sejarah_title' as any)}</h2>
            <p className="text-gray-400 mb-6">{t('tanya_sejarah_desc' as any)}</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="question" className="block text-sm font-medium text-gray-200 mb-1">{t('ajukan_pertanyaan_nabi' as any)}</label>
                            <textarea
                                id="question"
                                rows={5}
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                placeholder={t('pertanyaan_nabi_placeholder' as any)}
                                className="w-full p-2.5 bg-slate-700 text-gray-100 border border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-150"
                                required
                            ></textarea>
                        </div>
                        <button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                            {isLoading ? t('memproses') : t('cari_jawaban_ai' as any)}
                        </button>
                    </form>
                </Card>

                <div ref={resultCardRef}>
                    <Card className="relative min-h-[300px] flex flex-col">
                        {isLoading && (
                            <div className="absolute inset-0 bg-slate-800 bg-opacity-80 flex flex-col items-center justify-center rounded-xl z-10 p-4">
                                <i className="fas fa-spinner fa-spin text-4xl text-primary"></i>
                                <p className="mt-4 text-white font-semibold">AI sedang mencari jawaban...</p>
                            </div>
                        )}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-primary">Jawaban AI</h3>
                            {(aiResponse || error) && (
                                <button onClick={handleClear} className="text-gray-400 hover:text-white" title={t('hapus_hasil' as any)}>
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            )}
                        </div>
                        <div className="flex-grow overflow-y-auto">
                            {error && <p className="text-red-400 text-center">{error}</p>}
                            {aiResponse ? (
                                <p className="text-gray-200 whitespace-pre-wrap">{aiResponse}</p>
                            ) : (
                                !isLoading && !error && (
                                    <div className="flex flex-col items-center justify-center text-center h-full">
                                        <i className="fas fa-book-reader text-5xl text-gray-500 mb-4"></i>
                                        <p className="text-gray-400">{t('jawaban_ai_muncul_disini' as any)}</p>
                                    </div>
                                )
                            )}
                        </div>
                    </Card>
                </div>
            </div>
            <div className="mt-8 p-4 bg-yellow-900/80 border-l-4 border-yellow-500 text-yellow-200 rounded-r-lg">
                <h4 className="font-bold">{t('disclaimer_syariah')}</h4>
                <p className="text-sm">Jawaban dari AI bersifat informatif dan dirangkum dari berbagai sumber. Untuk pendalaman ilmu, selalu rujuk kepada kitab-kitab para ulama yang mu'tabar dan bimbingan guru yang terpercaya.</p>
            </div>
        </section>
    );
};

export default TanyaSejarahNabi;