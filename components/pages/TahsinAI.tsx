
import React, { useState, useRef } from 'react';
import Card from '../ui/Card';
import Dropdown from '../ui/Dropdown';
import { getAITahsinFeedback } from '../../services/geminiService';
import { useLanguage } from '../../contexts/LanguageContext';
import { juzAmma } from '../../data/juzAmma';

const surahOptions = [
    { value: 'Al-Fatihah', label: 'QS. 1. Al-Fatihah (Pembukaan)' },
    ...juzAmma.map(surah => ({
        value: surah.name,
        label: `QS. ${surah.number}. ${surah.name} (${surah.arti})`
    }))
];

const TahsinAI: React.FC = () => {
    const { t } = useLanguage();
    const [selectedSurah, setSelectedSurah] = useState('Al-Fatihah');
    const [isRecording, setIsRecording] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const handleStartRecording = async () => {
        setError(null);
        setFeedback(null);
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            setError("API Media tidak didukung di browser ini. Mohon gunakan browser modern seperti Chrome atau Firefox.");
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorderRef.current.onstop = async () => {
                // Stop the stream to release the microphone immediately
                stream.getTracks().forEach(track => track.stop());

                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });

                if (audioBlob.size < 1000) { // Threshold for silence
                    setError("Tidak ada suara yang terdeteksi. Mohon ulangi bacaan sesuai surat yang Anda pilih.");
                    setIsLoading(false);
                    return;
                }

                try {
                    const aiFeedback = await getAITahsinFeedback(selectedSurah);
                    setFeedback(aiFeedback);
                } catch (err) {
                    setError(err instanceof Error ? err.message : "Gagal mendapatkan umpan balik dari AI.");
                } finally {
                    setIsLoading(false);
                }
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (err) {
            console.error("Error accessing microphone:", err);
            if (err instanceof Error && err.name === 'NotAllowedError') {
                setError("Izin mikrofon ditolak. Mohon aktifkan izin mikrofon di pengaturan browser Anda untuk menggunakan fitur ini.");
            } else {
                setError("Tidak dapat mengakses mikrofon. Pastikan tidak ada aplikasi lain yang sedang menggunakannya.");
            }
        }
    };

    const handleStopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            setIsLoading(true);
        }
    };

    return (
        <section id="tahsin-ai" className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-2 text-white">Tahsin AI</h2>
            <p className="text-gray-400 mb-6">Latih dan perbaiki bacaan Al-Qur'an Anda dengan umpan balik dari AI.</p>
            
            <Card>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-2 text-primary">1. Pilih Surah yang Akan Dilatih</h3>
                        <Dropdown
                            items={surahOptions}
                            selectedValue={selectedSurah}
                            onSelect={setSelectedSurah}
                        />
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-2 text-primary">2. Rekam Bacaan Anda</h3>
                        <div className="flex flex-col items-center">
                            <button
                                onClick={isRecording ? handleStopRecording : handleStartRecording}
                                disabled={isLoading}
                                className={`w-24 h-24 rounded-full flex items-center justify-center text-white transition-all duration-300 disabled:opacity-50 ${
                                    isRecording ? 'bg-red-600 animate-pulse' : 'bg-primary hover:bg-primary-hover'
                                }`}
                            >
                                <i className={`fas ${isRecording ? 'fa-stop' : 'fa-microphone-alt'} text-3xl`}></i>
                            </button>
                            <p className="mt-3 text-sm font-semibold text-gray-300">
                                {isRecording ? 'Sedang Merekam...' : 'Ketuk untuk Mulai Merekam'}
                            </p>
                        </div>
                    </div>

                    <div className="relative">
                        <h3 className="text-lg font-semibold mb-2 text-primary">3. Umpan Balik dari AI</h3>
                        {isLoading && (
                             <div className="absolute inset-0 bg-slate-800 bg-opacity-80 flex flex-col items-center justify-center rounded-xl z-10 p-4">
                                <i className="fas fa-spinner fa-spin text-4xl text-primary"></i>
                                <p className="mt-4 text-white font-semibold">AI sedang menganalisis bacaan Anda...</p>
                            </div>
                        )}
                        <Card className="min-h-[200px] bg-slate-900/50">
                            {error && <p className="text-red-400 text-center">{error}</p>}
                            {feedback ? (
                                <div className="text-gray-300 whitespace-pre-line leading-relaxed">{feedback}</div>
                            ) : (
                                !isLoading && !error && (
                                    <p className="text-center text-gray-500">Umpan balik tajwid akan muncul di sini setelah Anda selesai merekam.</p>
                                )
                            )}
                        </Card>
                    </div>
                </div>

                 <div className="mt-8 p-4 bg-yellow-900/80 border-l-4 border-yellow-500 text-yellow-200 rounded-r-lg">
                    <h4 className="font-bold">Disclaimer</h4>
                    <p className="text-sm">Umpan balik dari AI adalah alat bantu belajar dan tidak menggantikan bimbingan dari seorang guru (talaqqi). Untuk hasil terbaik, selalu konfirmasikan bacaan Anda kepada guru yang kompeten.</p>
                </div>
            </Card>
        </section>
    );
};

export default TahsinAI;
