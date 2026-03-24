import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import { journeyData } from '../../data/journey';
import type { JourneyProgress } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import ProgressRing from '../ui/ProgressRing'; // Import the new component

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

const TarbiyahJourney: React.FC = () => {
    const { t, lang } = useLanguage();
    const [progress, setProgress] = React.useState<JourneyProgress>({});

    React.useEffect(() => {
        const userId = getUserId();
        if (!userId) return;

        const progressKey = `tarbiyahJourneyProgress_${userId}`;
        const savedProgress = localStorage.getItem(progressKey);
        if (savedProgress) {
            try {
                setProgress(JSON.parse(savedProgress));
            } catch (error) {
                console.error("Failed to parse journey progress:", error);
                setProgress({}); // Start fresh if data is corrupted
            }
        }
    }, []);

    const playCompletionSound = () => {
        try {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4 note
            gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5); // Play for 500ms
        } catch (e) {
            console.error("Web Audio API is not supported in this browser.", e);
        }
    };

    const handleToggleStep = (stepId: string) => {
        const userId = getUserId();
        if (!userId) return;

        const isCompleting = !progress[stepId];
        
        if (isCompleting) {
            playCompletionSound();
        }
        
        const newProgress = { ...progress, [stepId]: isCompleting };
        
        setProgress(newProgress);
        localStorage.setItem(`tarbiyahJourneyProgress_${userId}`, JSON.stringify(newProgress));
    };

    const totalSteps = journeyData.reduce((total, level) => total + level.steps.length, 0);
    const completedSteps = Object.values(progress).filter(Boolean).length;
    const overallPercentage = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

    return (
        <section id="tarbiyah-journey" className="animate-fade-in">
            <div className="text-center mb-8">
                <i className="fas fa-crown text-5xl text-yellow-500 mb-2"></i>
                <h2 className="text-3xl font-bold text-white">{t('journey_title_page')}</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    {t('journey_desc')}
                </p>
            </div>

            <Card className="mb-8">
                <h3 className="font-bold text-lg mb-2">{t('progres_keseluruhan')}</h3>
                <div className="w-full bg-slate-700 rounded-full h-4">
                    <div
                        className="bg-primary h-4 rounded-full flex items-center justify-center text-xs font-bold text-white transition-all duration-500"
                        style={{ width: `${overallPercentage}%` }}
                    >
                       {overallPercentage > 10 && `${overallPercentage}%`}
                    </div>
                </div>
                <p className="text-sm text-gray-400 mt-2 text-center">
                    {completedSteps} {t('dari' as any)} {totalSteps} {t('langkah_diselesaikan')}
                </p>
            </Card>

            <div className="space-y-8">
                {journeyData.map((level) => {
                    const levelSteps = level.steps.length;
                    const completedLevelSteps = level.steps.filter(step => progress[step.id]).length;
                    const levelPercentage = levelSteps > 0 ? Math.round((completedLevelSteps / levelSteps) * 100) : 0;

                    return (
                        <Card key={level.id}>
                            <div className="flex flex-col sm:flex-row items-center gap-6 mb-4">
                                <ProgressRing percentage={levelPercentage} />
                                <div className="flex-grow text-center sm:text-left">
                                    <h3 className="text-2xl font-bold text-primary mb-1">{t(level.title.id as any)}</h3>
                                    <p className="text-sm text-gray-400">{t(level.subtitle.id as any)}</p>
                                </div>
                            </div>
                            <div className="space-y-3 border-t border-slate-700 pt-4">
                                {level.steps.map(step => {
                                    const isChecked = !!progress[step.id];
                                    return (
                                    <div key={step.id} className="flex items-stretch bg-slate-700 rounded-lg group">
                                        <div
                                            className="flex items-center justify-center p-4 cursor-pointer hover:bg-slate-600 rounded-l-lg"
                                            onClick={() => handleToggleStep(step.id)}
                                            aria-label={`Tandai ${t(step.title.id as any)}`}
                                        >
                                            <div className={`w-7 h-7 rounded-md border-2 ${isChecked ? 'bg-primary border-primary' : 'border-gray-400 group-hover:border-primary'} flex items-center justify-center transition-colors`}>
                                                {isChecked && <i className="fas fa-check text-white"></i>}
                                            </div>
                                        </div>
                                        <Link to={step.path} state={{ from: '/tarbiyah-journey' }} className="flex-grow p-3 border-l border-slate-600 hover:bg-slate-600 rounded-r-lg flex flex-col justify-center">
                                            <div className="flex items-center">
                                                <p className={`font-semibold ${isChecked ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                                                    <i className={`${step.icon} mr-3 text-gray-400`}></i>
                                                    {t(step.title.id as any)}
                                                </p>
                                            </div>
                                            {/* Display Duration and Frequency Tags */}
                                            {(step.duration || step.frequency) && (
                                                <div className="flex gap-2 mt-2 ml-8">
                                                    {step.duration && (
                                                        <span className="text-[10px] bg-slate-800 text-gray-400 px-2 py-0.5 rounded border border-slate-600">
                                                            <i className="far fa-clock mr-1"></i>{step.duration}
                                                        </span>
                                                    )}
                                                    {step.frequency && (
                                                        <span className="text-[10px] bg-slate-800 text-primary px-2 py-0.5 rounded border border-slate-600">
                                                            <i className="fas fa-sync-alt mr-1"></i>{step.frequency}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </Link>
                                    </div>
                                )})}
                            </div>
                        </Card>
                    );
                })}
            </div>
        </section>
    );
};

export default TarbiyahJourney;