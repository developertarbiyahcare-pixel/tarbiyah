

import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Card from '../ui/Card';
import { kuisData } from '../../data/kuis';
import type { KuisQuestion } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { trackEvent } from '../../services/trackingService';

type Difficulty = 'mudah' | 'sedang' | 'sulit';

interface QuizResult {
    date: string;
    score: number;
    correct: number;
    incorrect: number;
    timeTaken: string;
    difficulty: Difficulty;
}

const getUserId = (): string | null => {
    try {
        const authData = localStorage.getItem('tarbiyahAuth');
        if (authData) {
            return JSON.parse(authData).waNumber;
        }
        return null;
    } catch (error) {
        console.error("Failed to parse auth data from localStorage:", error);
        return null;
    }
};

const Kuis: React.FC = () => {
    const { t } = useLanguage();
    const [questions, setQuestions] = useState<KuisQuestion[]>([]);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState<number | null>(null);
    const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [quizInProgress, setQuizInProgress] = useState(false);
    const [timeLeft, setTimeLeft] = useState(120 * 60); // 120 minutes in seconds
    const [quizStartTime, setQuizStartTime] = useState<Date | null>(null);
    const [quizHistory, setQuizHistory] = useState<QuizResult[]>([]);
    const [isHistorySaved, setIsHistorySaved] = useState(false);
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
    const questionPanelRef = useRef<HTMLDivElement>(null);
    
    const [searchParams, setSearchParams] = useSearchParams();
    const difficultyFromUrl = searchParams.get('difficulty') as Difficulty | null;

    useEffect(() => {
        const userId = getUserId();
        if (!userId) return;
        const savedHistory = localStorage.getItem(`quizHistory_${userId}`);
        if (savedHistory) {
            setQuizHistory(JSON.parse(savedHistory));
        }
    }, []);

    useEffect(() => {
        if (difficultyFromUrl) {
            const questionSet = kuisData[difficultyFromUrl];
            const shuffled = [...questionSet].sort(() => Math.random() - 0.5);
            setQuestions(shuffled);
            setUserAnswers(new Array(shuffled.length).fill(null));
            setActiveQuestionIndex(null);
            setCorrectCount(0);
            setIncorrectCount(0);
            setShowResult(false);
            setTimeLeft(120 * 60);
            setQuizStartTime(new Date());
            setIsHistorySaved(false);
            setSelectedDifficulty(difficultyFromUrl);
            setQuizInProgress(true);
        } else {
            setQuizInProgress(false);
            setShowResult(false);
            setQuestions([]);
            setActiveQuestionIndex(null);
            setSelectedDifficulty(null);
        }
    }, [difficultyFromUrl]);


    const initializeQuiz = (difficulty: Difficulty) => {
        setSearchParams({ difficulty });
    };

    useEffect(() => {
        if (!quizInProgress || showResult) return;

        if (timeLeft <= 0) {
            setShowResult(true);
            return;
        }

        const timerId = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft, quizInProgress, showResult]);
    
    useEffect(() => {
        if (questions.length > 0 && quizInProgress && !showResult) {
            const allAnswered = userAnswers.every(answer => answer !== null);
            if (allAnswered) {
                setShowResult(true);
            }
        }
    }, [userAnswers, questions.length, quizInProgress, showResult]);

    useEffect(() => {
        if (activeQuestionIndex !== null && questionPanelRef.current) {
            questionPanelRef.current.scrollIntoView({ behavior: 'auto', block: 'center' });
        }
    }, [activeQuestionIndex]);

    const handleNumberClick = (index: number) => {
        setActiveQuestionIndex(index);
    };

    const handleAnswerSelect = (optionIndex: number, questionIndex: number) => {
        if (userAnswers[questionIndex] !== null) return;

        const currentQuestion = questions[questionIndex];
        const isCorrect = optionIndex === currentQuestion.answer;
        
        const newAnswers = [...userAnswers];
        newAnswers[questionIndex] = optionIndex;
        setUserAnswers(newAnswers);

        if (isCorrect) {
            setCorrectCount(prev => prev + 1);
        } else {
            setIncorrectCount(prev => prev + 1);
        }
    };
    
    const handleBackToMenu = () => {
        setSearchParams({});
    };

    const handleSaveScore = () => {
        const userId = getUserId();
        if (!userId || !quizStartTime || isHistorySaved || !selectedDifficulty) return;

        const timeTakenMs = new Date().getTime() - quizStartTime.getTime();
        const totalSeconds = Math.floor(timeTakenMs / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const timeTakenString = `${minutes}m ${seconds}s`;
        const finalScore = (correctCount * 2) - incorrectCount;

        const newResult: QuizResult = {
            date: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
            score: finalScore,
            correct: correctCount,
            incorrect: incorrectCount,
            timeTaken: timeTakenString,
            difficulty: selectedDifficulty,
        };

        const updatedHistory = [newResult, ...quizHistory].slice(0, 10); // Keep last 10 results
        setQuizHistory(updatedHistory);
        localStorage.setItem(`quizHistory_${userId}`, JSON.stringify(updatedHistory));
        setIsHistorySaved(true);

        trackEvent('quiz_completed', {
            difficulty: selectedDifficulty,
            score: finalScore,
            correct: correctCount,
            incorrect: incorrectCount,
        });
    };
    
    const handleClearHistory = () => {
        const userId = getUserId();
        if (!userId) return;
        if (window.confirm("Apakah Anda yakin ingin menghapus semua riwayat kuis?")) {
            setQuizHistory([]);
            localStorage.removeItem(`quizHistory_${userId}`);
        }
    };
    
    const renderResult = () => {
        if (!quizStartTime) return null;

        const timeTakenMs = new Date().getTime() - quizStartTime.getTime();
        const totalSeconds = Math.floor(timeTakenMs / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const timeTakenString = `${minutes} menit ${seconds} detik`;
        const finalScore = (correctCount * 2) - incorrectCount;
        
        return (
            <Card className="text-center p-8 animate-fade-in">
                <h3 className="text-2xl font-bold mb-4">Kuis Selesai!</h3>
                <p className="text-lg text-gray-300">Skor Akhir Anda (Tingkat <span className="capitalize font-semibold">{selectedDifficulty}</span>):</p>
                <p className="text-6xl font-bold my-4 text-primary">
                    {finalScore}
                </p>
                <div className="flex justify-center gap-6 text-gray-300 mb-6">
                    <div><strong>Benar:</strong> <span className="text-green-400">{correctCount}</span></div>
                    <div><strong>Salah:</strong> <span className="text-red-400">{incorrectCount}</span></div>
                    <div><strong>Waktu:</strong> <span className="text-yellow-400">{timeTakenString}</span></div>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        onClick={handleSaveScore}
                        disabled={isHistorySaved}
                        className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-full disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        <i className={`fas ${isHistorySaved ? 'fa-check' : 'fa-save'} mr-2`}></i>
                        {isHistorySaved ? 'Skor Tersimpan' : 'Simpan Skor'}
                    </button>
                    <button
                        onClick={handleBackToMenu}
                        className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 rounded-full"
                    >
                        <i className="fas fa-home mr-2"></i>Kembali ke Awal
                    </button>
                </div>
            </Card>
        );
    }
    
    const getDifficultyClass = (difficulty: Difficulty | null) => {
        switch (difficulty) {
            case 'mudah': return 'bg-green-600 text-green-100';
            case 'sedang': return 'bg-yellow-600 text-yellow-100';
            case 'sulit': return 'bg-red-600 text-red-100';
            default: return 'bg-gray-600 text-gray-100';
        }
    };

    const renderQuiz = () => {
        const currentQuestion = activeQuestionIndex !== null ? questions[activeQuestionIndex] : null;
        const userAnswer = activeQuestionIndex !== null ? userAnswers[activeQuestionIndex] : null;
        const isQuestionAnswered = userAnswer !== null;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        const currentScore = (correctCount * 2) - incorrectCount;

        return (
            <>
                <Card className="mb-6">
                    <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                        <div className="flex items-center gap-4">
                             <button onClick={handleBackToMenu} className="text-white font-bold py-2 px-4 rounded-lg bg-green-600 hover:bg-green-700 transition-colors text-sm">
                                <i className="fas fa-arrow-left mr-2"></i>Kembali
                            </button>
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                Pilih Soal
                                {selectedDifficulty && (
                                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${getDifficultyClass(selectedDifficulty)}`}>
                                        {t(`kuis_${selectedDifficulty}` as any)}
                                    </span>
                                )}
                            </h3>
                        </div>
                        <div className="flex gap-4 items-center">
                            <p className="font-semibold text-lg">Skor: <span className="text-primary">{currentScore}</span></p>
                            <div className="font-bold text-lg text-red-400 tabular-nums">
                                <i className="far fa-clock mr-2"></i>
                                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-9 sm:grid-cols-11 gap-2">
                        {questions.map((question, index) => {
                            const answer = userAnswers[index];
                            let statusClass = 'bg-slate-700 hover:bg-slate-600 text-white';
                            if (answer !== null) {
                                statusClass = answer === question.answer ? 'bg-green-600 text-white' : 'bg-red-600 text-white';
                            }
                            if (index === activeQuestionIndex) {
                                statusClass += ' ring-2 ring-primary scale-110';
                            }
                            return (
                                <button
                                    key={index}
                                    onClick={() => handleNumberClick(index)}
                                    className={`w-full aspect-square flex items-center justify-center font-bold rounded-lg transition-all duration-200 text-sm ${statusClass}`}
                                    style={{lineHeight: 1}}
                                    aria-label={`Soal nomor ${index + 1}`}
                                >
                                    {index + 1}
                                </button>
                            );
                        })}
                    </div>
                </Card>

                <div ref={questionPanelRef}>
                    {currentQuestion ? (
                        <Card className="animate-fade-in">
                             <div className="flex justify-between items-start mb-4">
                                <h4 className="text-lg font-bold text-primary">Soal Nomor {activeQuestionIndex! + 1}</h4>
                                <button onClick={() => setActiveQuestionIndex(null)} className="text-gray-400 hover:text-white text-xl">&times;</button>
                            </div>
                            <p className="text-lg text-gray-200 mb-6 min-h-[50px]">{currentQuestion.question}</p>
                            <div className="space-y-3">
                                {currentQuestion.options.map((option, index) => {
                                    let buttonClass = "w-full text-left p-3 rounded-lg border-2 border-gray-500 hover:bg-gray-500 transition-colors";
                                    if (isQuestionAnswered) {
                                        const isCorrectAnswer = index === currentQuestion.answer;
                                        const isSelectedAnswer = index === userAnswer;
                                        if (isCorrectAnswer) {
                                            buttonClass += " bg-green-800 border-green-500 text-white";
                                        } else if (isSelectedAnswer) {
                                            buttonClass += " bg-red-800 border-red-500 text-white";
                                        }
                                    }
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleAnswerSelect(index, activeQuestionIndex!)}
                                            className={buttonClass}
                                            disabled={isQuestionAnswered}
                                        >
                                            {option}
                                        </button>
                                    );
                                })}
                            </div>
                            {isQuestionAnswered && (
                                <div className="mt-4 p-3 bg-gray-700 rounded-lg animate-fade-in">
                                    <p className="font-bold text-primary">Penjelasan:</p>
                                    <p className="text-sm text-gray-300">{currentQuestion.explanation}</p>
                                </div>
                            )}
                        </Card>
                    ) : (
                        <Card className="text-center py-10">
                            <p className="text-gray-400">Silakan klik nomor soal di atas untuk memulai.</p>
                        </Card>
                    )}
                </div>
            </>
        );
    };

    const renderStartScreen = () => (
        <>
            <Card className="text-center p-8 mb-6">
                <h3 className="text-2xl font-bold text-primary mb-4">{t('kuis_selamat_datang')}</h3>
                <p className="text-gray-300 mb-6">{t('kuis_deskripsi')}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button onClick={() => initializeQuiz('mudah')} className="p-4 bg-green-700 hover:bg-green-600 rounded-lg font-bold text-white transition-transform transform hover:scale-105">
                        <i className="fas fa-child text-2xl mb-2"></i><br/>{t('kuis_mudah')}
                    </button>
                    <button onClick={() => initializeQuiz('sedang')} className="p-4 bg-yellow-700 hover:bg-yellow-600 rounded-lg font-bold text-white transition-transform transform hover:scale-105">
                        <i className="fas fa-graduation-cap text-2xl mb-2"></i><br/>{t('kuis_sedang')}
                    </button>
                    <button onClick={() => initializeQuiz('sulit')} className="p-4 bg-red-700 hover:bg-red-600 rounded-lg font-bold text-white transition-transform transform hover:scale-105">
                        <i className="fas fa-brain text-2xl mb-2"></i><br/>{t('kuis_sulit')}
                    </button>
                </div>
            </Card>
            {quizHistory.length > 0 && (
                <Card>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold"><i className="fas fa-history mr-2"></i>{t('kuis_riwayat')}</h3>
                        <button onClick={handleClearHistory} className="text-sm text-red-400 hover:text-red-300 font-semibold">
                            <i className="fas fa-trash mr-1"></i> {t('kuis_bersihkan_riwayat')}
                        </button>
                    </div>
                    <div className="space-y-3 max-h-60 overflow-y-auto no-scrollbar pr-2">
                        {quizHistory.map((result, index) => (
                            <div key={index} className="p-3 bg-slate-700 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <p className="font-bold text-lg text-primary">{result.score} <span className="text-sm text-gray-300">Poin</span></p>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${result.difficulty === 'mudah' ? 'bg-green-800 text-green-200' : result.difficulty === 'sedang' ? 'bg-yellow-800 text-yellow-200' : 'bg-red-800 text-red-200'}`}>{t(`kuis_${result.difficulty}` as any)}</span>
                                    <p className="text-xs text-gray-400">{result.date}</p>
                                </div>
                                <div className="flex justify-between text-sm text-gray-400 mt-1">
                                    <span>Benar: <span className="font-semibold text-green-400">{result.correct}</span></span>
                                    <span>Salah: <span className="font-semibold text-red-400">{result.incorrect}</span></span>
                                    <span>Waktu: <span className="font-semibold text-yellow-400">{result.timeTaken}</span></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            )}
        </>
    );

    return (
        <section id="kuis" className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-white">{t('kuis_title_page')}</h2>
            
            {showResult ? renderResult() : (quizInProgress ? renderQuiz() : renderStartScreen())}
        </section>
    );
};

export default Kuis;