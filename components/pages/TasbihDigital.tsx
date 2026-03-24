
import React, { useState } from 'react';
import Card from '../ui/Card';

const TasbihDigital: React.FC = () => {
    const [count, setCount] = useState(0);
    const [target, setTarget] = useState(33);

    const handleIncrement = () => {
        const newCount = count + 1;
        setCount(newCount);
        if (target > 0 && newCount > 0 && newCount % target === 0) {
             try {
                // Vibrate if supported
                if (navigator.vibrate) navigator.vibrate(200);
            } catch (e) {
                // Ignore errors
            }
        }
    };

    const handleReset = () => setCount(0);

    const size = 200;
    const strokeWidth = 15;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = target > 0 ? (count % target) / target : 0;
    const offset = circumference - progress * circumference;

    return (
        <section id="tasbih-digital" className="animate-fade-in flex flex-col items-center justify-center min-h-[70vh]">
            <h2 className="text-3xl font-bold mb-6 text-white">Tasbih Digital</h2>
            
            <Card className="w-full max-w-md flex flex-col items-center p-8">
                <div className="relative mb-8" style={{ width: size, height: size }}>
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            className="text-slate-700"
                            strokeWidth={strokeWidth}
                            stroke="currentColor"
                            fill="transparent"
                            r={radius}
                            cx={size / 2}
                            cy={size / 2}
                        />
                        <circle
                            className="text-primary"
                            strokeWidth={strokeWidth}
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r={radius}
                            cx={size / 2}
                            cy={size / 2}
                            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer select-none" onClick={handleIncrement}>
                        <span className="text-6xl font-bold text-white tabular-nums">{count}</span>
                        <span className="text-xs text-gray-400 mt-2">Target: {target}</span>
                    </div>
                </div>

                <div className="w-full flex gap-4 mb-6">
                     <button 
                        onClick={handleReset} 
                        className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-transform active:scale-95"
                    >
                        <i className="fas fa-undo mr-2"></i> Reset
                    </button>
                    <button 
                        onClick={handleIncrement} 
                        className="flex-[2] py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg text-xl shadow-lg transition-transform active:scale-95"
                    >
                        <i className="fas fa-plus"></i>
                    </button>
                </div>

                <div className="flex items-center gap-3 w-full bg-slate-700 p-3 rounded-lg">
                    <span className="text-sm font-semibold text-gray-300 whitespace-nowrap">Set Target:</span>
                    <div className="flex gap-2 flex-grow justify-end">
                        {[33, 99, 100].map(val => (
                            <button
                                key={val}
                                onClick={() => setTarget(val)}
                                className={`px-3 py-1 rounded text-xs font-bold transition-colors ${target === val ? 'bg-primary text-white' : 'bg-slate-600 text-gray-300 hover:bg-slate-500'}`}
                            >
                                {val}
                            </button>
                        ))}
                    </div>
                </div>
            </Card>
        </section>
    );
};

export default TasbihDigital;
