
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';
import { journeyData } from '../../data/journey';
import { haditsArbainData } from '../../data/haditsArbain';
import type { JurnalEntry, QuizResult, JourneyProgress, SrsReviewHistoryItem } from '../../types';

// Helper to get user-specific storage key
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

type ReportRange = 'harian' | 'mingguan' | 'bulanan' | 'tahunan';

const LaporanReview: React.FC = () => {
    const { range } = useParams<{ range: string }>();
    const { t, lang } = useLanguage();
    const [reviewData, setReviewData] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [chartData, setChartData] = useState<{ shalat: any[], roadmap: any[] }>({ shalat: [], roadmap: [] });

    
    const shalatWajibList = { subuh: "Subuh", dzuhur: "Dzuhur", jumat: "Jum'at", ashar: "Ashar", maghrib: "Maghrib", isya: "Isya" };
    const shalatSunnahList = { rawatib: "Rawatib", dhuha: "Dhuha", tahajud: "Tahajud", hajat: "Hajat", witir: "Witir", taubat: "Taubat" };
    const shalatRamadhanList = { tarawih: "Tarawih" };

    const isDateFriday = (date: Date) => date.getDay() === 5;
    const calculateWajibProgress = (tracker: Record<string, boolean>, date: Date) => {
        const friday = isDateFriday(date);
        const gender = localStorage.getItem(`userGender_${getUserId()}`) || 'male';
        const wajibPrayersForProgress = ['subuh', friday && gender === 'male' ? 'jumat' : 'dzuhur', 'ashar', 'maghrib', 'isya'];
        const completedWajibCount = wajibPrayersForProgress.filter(p => tracker[p]).length;
        return Math.round((completedWajibCount / wajibPrayersForProgress.length) * 100);
    };
    const calculateSunnahProgress = (tracker: Record<string, boolean>) => {
        const sunnahKeys = Object.keys(shalatSunnahList);
        const completedCount = sunnahKeys.filter(key => tracker[key]).length;
        return sunnahKeys.length > 0 ? Math.round((completedCount / sunnahKeys.length) * 100) : 0;
    };

    useEffect(() => {
        const userId = getUserId();
        if (!userId || !range) {
            setIsLoading(false);
            return;
        }

        const now = new Date();
        let startDate = new Date();
        const endDate = new Date(now);
        endDate.setHours(23, 59, 59, 999);

        switch (range) {
            case 'harian': startDate.setHours(0, 0, 0, 0); break;
            case 'mingguan': startDate.setDate(now.getDate() - 6); startDate.setHours(0, 0, 0, 0); break; // Last 7 days including today
            case 'bulanan': startDate.setMonth(now.getMonth() - 11); startDate.setDate(1); startDate.setHours(0, 0, 0, 0); break; // Last 12 months
            case 'tahunan': startDate.setFullYear(now.getFullYear() - 4); startDate.setMonth(0); startDate.setDate(1); startDate.setHours(0, 0, 0, 0); break; // Last 5 years
        }

        // --- Load Raw Data ---
        const jurnalRaw = localStorage.getItem(`jurnalMuhasabahEntries_${userId}`);
        const allJurnal: JurnalEntry[] = jurnalRaw ? JSON.parse(jurnalRaw) : [];
        const filteredJurnal = allJurnal.filter(e => new Date(e.date) >= startDate && new Date(e.date) <= endDate);

        const roadmapRaw = localStorage.getItem(`roadmapHistory_${userId}`);
        const roadmapHistory = roadmapRaw ? JSON.parse(roadmapRaw) : {};
        
        const quizRaw = localStorage.getItem(`quizHistory_${userId}`);
        const allQuiz: QuizResult[] = quizRaw ? JSON.parse(quizRaw) : [];
        const filteredQuiz = allQuiz.filter(r => {
                 try {
                    const datePart = r.date.split(',')[0];
                    const [day, month, year] = datePart.split('/');
                    const resultDate = new Date(`${year}-${month}-${day}`);
                    return resultDate >= startDate && resultDate <= endDate;
                } catch { return false; }
            });

        const srsHistoryRaw = localStorage.getItem(`srsHaditsHistory_${userId}`);
        const allSrs: Record<string, SrsReviewHistoryItem[]> = srsHistoryRaw ? JSON.parse(srsHistoryRaw) : {};
        const filteredSrs = Object.entries(allSrs).map(([hadithId, reviews]) => {
            const filteredReviews = reviews.filter(r => new Date(r.date) >= startDate && new Date(r.date) <= endDate);
            const hadith = haditsArbainData.find(h => h.id === parseInt(hadithId));
            return {
                hadithTitle: hadith ? `Hadits #${hadith.id}: ${hadith.title}` : `Hadits #${hadithId}`,
                reviews: filteredReviews
            };
        }).filter(item => item.reviews.length > 0);
        
        const shalatRaw = localStorage.getItem(`shalatHistory_${userId}`);
        const shalatHistory = shalatRaw ? JSON.parse(shalatRaw) : {};

        // --- Process Chart Data based on Range ---
        let processedShalatData = [];
        let processedRoadmapData = [];

        if (range === 'harian' || range === 'mingguan') {
            // Daily breakdown
            const daysToShow = range === 'harian' ? 1 : 7;
            for (let i = daysToShow - 1; i >= 0; i--) {
                const d = new Date(now);
                d.setDate(d.getDate() - i);
                const dateKey = d.toISOString().split('T')[0];
                const dateLabel = d.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'numeric' }); // e.g. Sen, 25/12

                // Shalat
                const shalatDay = shalatHistory[dateKey] || {};
                processedShalatData.push({
                    label: dateLabel,
                    wajib: calculateWajibProgress(shalatDay, d),
                    sunnah: calculateSunnahProgress(shalatDay)
                });

                // Roadmap
                const roadmapDay = roadmapHistory[dateKey] || {};
                const completed = Object.values(roadmapDay).filter(Boolean).length;
                const percentage = Math.round((completed / 40) * 100); // Assuming 40 tasks
                processedRoadmapData.push({
                    label: dateLabel,
                    value: percentage,
                    completed: completed
                });
            }
        } else if (range === 'bulanan') {
             // Monthly breakdown (Last 12 months)
             for (let i = 11; i >= 0; i--) {
                const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
                const monthLabel = d.toLocaleDateString('id-ID', { month: 'short', year: '2-digit' }); // e.g. Jan 24
                const monthKeyPrefix = d.toISOString().slice(0, 7); // YYYY-MM

                // Aggregate Shalat
                let totalWajib = 0, totalSunnah = 0, daysCount = 0;
                Object.keys(shalatHistory).forEach(key => {
                    if (key.startsWith(monthKeyPrefix)) {
                        totalWajib += calculateWajibProgress(shalatHistory[key], new Date(key));
                        totalSunnah += calculateSunnahProgress(shalatHistory[key]);
                        daysCount++;
                    }
                });
                processedShalatData.push({
                    label: monthLabel,
                    wajib: daysCount > 0 ? Math.round(totalWajib / daysCount) : 0,
                    sunnah: daysCount > 0 ? Math.round(totalSunnah / daysCount) : 0
                });

                // Aggregate Roadmap
                let totalCompleted = 0, roadmapDaysCount = 0;
                Object.keys(roadmapHistory).forEach(key => {
                    if (key.startsWith(monthKeyPrefix)) {
                        totalCompleted += Object.values(roadmapHistory[key]).filter(Boolean).length;
                        roadmapDaysCount++;
                    }
                });
                // Average percentage per day in that month
                const avgPercentage = roadmapDaysCount > 0 ? Math.round((totalCompleted / (roadmapDaysCount * 40)) * 100) : 0;
                processedRoadmapData.push({
                    label: monthLabel,
                    value: avgPercentage,
                    completed: Math.round(totalCompleted / (roadmapDaysCount || 1)) // Avg completed tasks/day
                });
             }
        } else if (range === 'tahunan') {
            // Yearly breakdown (Last 5 years)
             for (let i = 4; i >= 0; i--) {
                const yearVal = now.getFullYear() - i;
                const yearLabel = yearVal.toString();

                // Aggregate Shalat
                let totalWajib = 0, totalSunnah = 0, daysCount = 0;
                Object.keys(shalatHistory).forEach(key => {
                    if (key.startsWith(yearVal.toString())) {
                        totalWajib += calculateWajibProgress(shalatHistory[key], new Date(key));
                        totalSunnah += calculateSunnahProgress(shalatHistory[key]);
                        daysCount++;
                    }
                });
                processedShalatData.push({
                    label: yearLabel,
                    wajib: daysCount > 0 ? Math.round(totalWajib / daysCount) : 0,
                    sunnah: daysCount > 0 ? Math.round(totalSunnah / daysCount) : 0
                });

                // Aggregate Roadmap
                let totalCompleted = 0, roadmapDaysCount = 0;
                Object.keys(roadmapHistory).forEach(key => {
                    if (key.startsWith(yearVal.toString())) {
                        totalCompleted += Object.values(roadmapHistory[key]).filter(Boolean).length;
                        roadmapDaysCount++;
                    }
                });
                const avgPercentage = roadmapDaysCount > 0 ? Math.round((totalCompleted / (roadmapDaysCount * 40)) * 100) : 0;
                processedRoadmapData.push({
                    label: yearLabel,
                    value: avgPercentage,
                    completed: Math.round(totalCompleted / (roadmapDaysCount || 1))
                });
             }
        }

        setChartData({ shalat: processedShalatData, roadmap: processedRoadmapData });
        
        setReviewData({
            title: t(range as any),
            period: range === 'harian' ? new Date().toLocaleDateString('id-ID', { dateStyle: 'full' }) : 
                   range === 'mingguan' ? '7 Hari Terakhir' :
                   range === 'bulanan' ? '12 Bulan Terakhir' : '5 Tahun Terakhir',
            jurnal: filteredJurnal,
            kuis: filteredQuiz,
            hadits: filteredSrs,
        });
        setIsLoading(false);

    }, [range, t, lang]);


    if (isLoading) {
        return <div className="text-center p-10"><i className="fas fa-spinner fa-spin text-3xl"></i></div>;
    }

    if (!reviewData) {
        return <Card><p className="text-center text-red-400">Gagal memuat data laporan. Pastikan Anda telah masuk dan memiliki aktivitas.</p></Card>;
    }

    return (
        <section className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-2 text-white">Laporan {reviewData.title}</h2>
            <p className="text-gray-400 mb-6 text-center">{reviewData.period}</p>
            <div className="space-y-6">
                 <Card>
                    <h4 className="font-bold text-lg mb-4 text-primary">Visualisasi Progres Shalat</h4>
                    <div className="flex justify-between items-end h-40 gap-2 px-1 overflow-x-auto">
                        {chartData.shalat.map((data: any, index: number) => (
                             <div key={index} className="flex-1 flex flex-col items-center group relative h-full min-w-[40px]">
                                <div className="w-full flex-grow flex items-end justify-center gap-0.5 sm:gap-1">
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 px-2 py-1 rounded-md shadow-lg w-max z-10 pointer-events-none">
                                        <span className="text-primary">Wajib: {data.wajib}%</span>
                                        <span className="ml-2 text-sky-400">Sunnah: {data.sunnah}%</span>
                                    </div>
                                    <div className="w-1/2 bg-slate-700 rounded-t-sm h-full flex flex-col-reverse">
                                        <div className="bg-primary rounded-t-sm transition-all duration-500" style={{ height: `${data.wajib}%` }}></div>
                                    </div>
                                    <div className="w-1/2 bg-slate-700 rounded-t-sm h-full flex flex-col-reverse">
                                        <div className="bg-sky-500 rounded-t-sm transition-all duration-500" style={{ height: `${data.sunnah}%` }}></div>
                                    </div>
                                </div>
                                <span className="text-[10px] mt-2 text-gray-400 font-semibold text-center leading-tight truncate w-full">{data.label}</span>
                            </div>
                        ))}
                    </div>
                </Card>

                 <Card>
                    <h4 className="font-bold text-lg mb-4 text-primary">Visualisasi Progres Roadmap</h4>
                    <div className="flex justify-between items-end h-40 gap-2 px-1 overflow-x-auto">
                        {chartData.roadmap.map((data: any, index: number) => (
                             <div key={index} className="flex-1 flex flex-col items-center group relative h-full min-w-[40px]">
                                <div className="w-full flex-grow flex items-end justify-center">
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 px-2 py-1 rounded-md shadow-lg w-max z-10 pointer-events-none">
                                        {data.value}% (Rata-rata {data.completed} Tugas)
                                    </div>
                                    <div className="w-full bg-slate-700 rounded-t-sm h-full flex flex-col-reverse">
                                        <div className="bg-primary rounded-t-sm transition-all duration-500" style={{ height: `${data.value}%` }}></div>
                                    </div>
                                </div>
                                <span className="text-[10px] mt-2 text-gray-400 font-semibold text-center leading-tight truncate w-full">{data.label}</span>
                            </div>
                        ))}
                    </div>
                </Card>

                 <Card>
                    <h4 className="font-bold text-lg mb-2 text-primary">Jurnal Muhasabah</h4>
                    {reviewData.jurnal.length > 0 ? (
                        <div className="space-y-2 max-h-60 overflow-y-auto no-scrollbar pr-2">
                        {reviewData.jurnal.map((entry: JurnalEntry) => (
                            <div key={entry.id} className="p-3 bg-slate-800 rounded-lg mb-2">
                                <p className="text-xs text-gray-400">{new Date(entry.date).toLocaleString('id-ID', { dateStyle: 'medium' })}</p>
                                <p className="font-semibold italic text-gray-200">"{lang === 'id' ? entry.prompt.id : entry.prompt.en}"</p>
                                <p className="text-sm mt-1 whitespace-pre-wrap text-gray-300">{entry.entry}</p>
                            </div>
                        ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-400">Tidak ada catatan pada periode ini.</p>
                    )}
                </Card>
                <Card>
                    <h4 className="font-bold text-lg mb-2 text-primary">Riwayat Kuis</h4>
                    {reviewData.kuis.length > 0 ? (
                         <div className="space-y-2 max-h-40 overflow-y-auto no-scrollbar pr-2">
                         {reviewData.kuis.map((r: QuizResult, i: number) => (
                            <div key={i} className="text-sm p-2 bg-slate-800 rounded-lg mb-2">
                                {r.date}: Skor <strong>{r.score}</strong> (Tingkat {t( ('kuis_' + r.difficulty) as any)})
                            </div>
                         ))}
                         </div>
                    ) : (
                        <p className="text-sm text-gray-400">Tidak ada riwayat kuis pada periode ini.</p>
                    )}
                </Card>
                <Card>
                    <h4 className="font-bold text-lg mb-2 text-primary">Riwayat Hafalan Hadits</h4>
                    {reviewData.hadits.length > 0 ? (
                         <div className="space-y-2 max-h-40 overflow-y-auto no-scrollbar pr-2">
                         {reviewData.hadits.map((item: any, i: number) => (
                            <div key={i} className="p-3 bg-slate-800 rounded-lg mb-2">
                                <p className="font-semibold text-gray-200 text-sm">{item.hadithTitle}</p>
                                {item.reviews.length > 0 ? item.reviews.map((review: SrsReviewHistoryItem, r_idx: number) => (
                                     <p key={r_idx} className="text-xs pl-2 text-gray-400">
                                        - {new Date(review.date).toLocaleDateString('id-ID')}: <span className={review.status === 'Lancar' ? 'text-green-400' : 'text-red-400'}>{review.status}</span>
                                     </p>
                                )) : <p className="text-xs pl-2 text-gray-500">- Belum ada review pada periode ini.</p>}
                            </div>
                         ))}
                         </div>
                    ) : (
                        <p className="text-sm text-gray-400">Tidak ada riwayat hafalan pada periode ini.</p>
                    )}
                </Card>
            </div>
        </section>
    );
};
export default LaporanReview;
