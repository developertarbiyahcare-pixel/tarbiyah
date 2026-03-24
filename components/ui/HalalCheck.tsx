import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
// FIX: Import getAIHalalAnalysis and getAIImageText from geminiService
import { getAIHalalAnalysis, getAIImageText } from '../../services/geminiService';
import type { HalalAnalysisResponse } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            const base64String = result.split(',')[1];
            resolve(base64String);
        };
        reader.onerror = error => reject(error);
    });
};

interface HalalCheckProps {
    text: string;
    onAnalyze: (ingredients: string) => void;
}

const HalalCheck: React.FC<HalalCheckProps> = ({ text }) => {
    const { t } = useLanguage();
    const [ingredientsInput, setIngredientsInput] = useState(text);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [analysisResult, setAnalysisResult] = useState<HalalAnalysisResponse | null>(null);
    const [error, setError] = useState<React.ReactNode | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAnalyze = async () => {
        if (!ingredientsInput.trim()) {
            setError("Silakan masukkan daftar bahan terlebih dahulu.");
            return;
        }
        setLoadingMessage(t('ai_menganalisis_bahan' as any));
        setIsLoading(true);
        setAnalysisResult(null);
        setError(null);
        try {
            const result = await getAIHalalAnalysis(ingredientsInput);
            setAnalysisResult(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Gagal menganalisis bahan. Silakan coba lagi.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClear = () => {
        setIngredientsInput('');
        setAnalysisResult(null);
        setError(null);
    };

    const handleScanClick = async () => {
        if (fileInputRef.current) {
            if (!navigator.permissions) {
                fileInputRef.current.click();
                return;
            }
            try {
                const permissionStatus = await navigator.permissions.query({ name: 'camera' as any });
                if (permissionStatus.state !== 'granted') {
                    setError(<>Izin kamera belum diberikan. Silakan aktifkan melalui <Link to="/pengaturan" className="font-bold underline">halaman Pengaturan</Link>.</>);
                    return;
                }
                fileInputRef.current.click();
            } catch (err) {
                fileInputRef.current.click();
            }
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setLoadingMessage(t('ai_membaca_gambar' as any));
        setIsLoading(true);
        setAnalysisResult(null);
        setError(null);
        
        try {
            const base64Image = await fileToBase64(file);
            const extractedText = await getAIImageText(base64Image);
            setIngredientsInput(extractedText);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Gagal membaca teks dari gambar. Silakan coba lagi atau ketik manual.");
            console.error(err);
        } finally {
            setIsLoading(false);
            if (event.target) {
                event.target.value = '';
            }
        }
    };

    const getStatusColor = (status: HalalAnalysisResponse['status'] | undefined) => {
        switch (status) {
            case 'HALAL': return 'bg-green-800 border-green-500';
            case 'HARAM': return 'bg-red-800 border-red-500';
            case 'SYUBHAT': return 'bg-yellow-800 border-yellow-500';
            default: return 'bg-gray-800 border-gray-600';
        }
    };
    
    const getStatusIcon = (status: HalalAnalysisResponse['status'] | undefined) => {
        switch (status) {
            case 'HALAL': return 'fa-check-circle text-green-400';
            case 'HARAM': return 'fa-times-circle text-red-400';
            case 'SYUBHAT': return 'fa-question-circle text-yellow-400';
            default: return 'fa-info-circle text-gray-400';
        }
    };

    return (
        <Card className="relative">
            {isLoading && (
                <div className="absolute inset-0 bg-slate-800 bg-opacity-80 flex flex-col items-center justify-center rounded-xl z-10">
                    <i className="fas fa-spinner fa-spin text-4xl text-primary"></i>
                    <p className="mt-4">{loadingMessage}</p>
                </div>
            )}
            <h3 className="text-2xl font-bold mb-4 text-primary"><i className="fas fa-search-plus mr-2"></i>Analisis Komposisi Produk</h3>
            <p className="text-gray-300 mb-4">Pindai komposisi produk menggunakan kamera atau ketik manual. AI akan membantu menganalisis untuk mengidentifikasi titik kritis kehalalan.</p>
            
            <input type="file" accept="image/*" capture="environment" ref={fileInputRef} onChange={handleFileChange} className="hidden" aria-hidden="true" />

            <textarea
                rows={5}
                value={ingredientsInput}
                onChange={(e) => setIngredientsInput(e.target.value)}
                placeholder="Contoh: Tepung terigu, gula, lemak nabati, kakao bubuk, pengemulsi (lesitin kedelai), gelatin (sapi), perisa sintetik..."
                className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white focus:ring-2 focus:ring-primary"
            ></textarea>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button onClick={handleClear} className="w-full sm:w-auto bg-slate-600 hover:bg-slate-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                    <i className="fas fa-trash-alt mr-2"></i>Bersihkan
                </button>
                <button onClick={handleScanClick} disabled={isLoading} className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50 transition-colors">
                    <i className="fas fa-camera mr-2"></i>Pindai dengan Kamera
                </button>
                <button onClick={handleAnalyze} disabled={isLoading} className="w-full sm:flex-grow bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50 transition-colors">
                    <i className="fas fa-brain mr-2"></i>Analisis dengan AI
                </button>
            </div>

             {error && <p className="text-center text-red-400 mt-4 animate-fade-in">{error}</p>}

            {analysisResult && (
                 <div className={`mt-6 animate-fade-in border-l-4 p-4 rounded-r-lg ${getStatusColor(analysisResult?.status)}`}>
                    <div className="flex items-center mb-2">
                         <i className={`fas ${getStatusIcon(analysisResult?.status)} text-2xl mr-3`}></i>
                         <h4 className="font-bold text-xl text-white">Hasil Analisis: {analysisResult.status}</h4>
                    </div>
                    <p className="text-gray-200 whitespace-pre-line pl-9">{analysisResult.explanation}</p>
                </div>
            )}
        </Card>
    );
};

export default HalalCheck;