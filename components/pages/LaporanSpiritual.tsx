
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';
import { journeyData } from '../../data/journey';
import { haditsArbainData } from '../../data/haditsArbain';
import type { JurnalEntry, QuizResult, JourneyProgress, SrsReviewHistoryItem, ConsultationHistoryItem, SearchHistoryItem } from '../../types';

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
type CombinedHistoryItem = ConsultationHistoryItem | SearchHistoryItem;

const LaporanSpiritual: React.FC = () => {
    const { t, lang } = useLanguage();
    const navigate = useNavigate();
    const [selectedRange, setSelectedRange] = useState<ReportRange>('harian');
    const [history, setHistory] = useState<CombinedHistoryItem[]>([]);
    
    React.useEffect(() => {
        const userId = getUserId();
        if (!userId) return;

        const consultationData = localStorage.getItem(`consultationHistory_${userId}`);
        const searchData = localStorage.getItem(`searchHistory_${userId}`);
        
        let allHistory: CombinedHistoryItem[] = [];

        try {
            if (consultationData) {
                allHistory = [...allHistory, ...JSON.parse(consultationData)];
            }
            if (searchData) {
                allHistory = [...allHistory, ...JSON.parse(searchData)];
            }
            allHistory.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
            setHistory(allHistory);
        } catch (error) {
            console.error("Failed to parse history data:", error);
        }
    }, []);

    const reportOptions: { id: ReportRange; icon: string }[] = [
        { id: 'harian', icon: 'fas fa-calendar-day' },
        { id: 'mingguan', icon: 'fas fa-calendar-week' },
        { id: 'bulanan', icon: 'fas fa-calendar-alt' },
        { id: 'tahunan', icon: 'fas fa-calendar' },
    ];

    const getIconForMode = (mode: CombinedHistoryItem['mode']) => {
        switch (mode) {
            case 'konsultasi': return 'fa-brain';
            case 'dalil': return 'fa-search';
            case 'tadabbur': return 'fa-spa';
            case 'pengetahuan': return 'fa-map-marker-alt';
            default: return 'fa-history';
        }
    };
    
    const handleDownloadPdf = () => {
        const gatherReportDataForPdf = (range: ReportRange) => {
            const userId = getUserId();
            if (!userId) {
                alert("Tidak dapat memproses laporan: Pengguna tidak ditemukan.");
                return null;
            }
    
            const now = new Date();
            let startDate = new Date();
            const endDate = new Date(now);
            endDate.setHours(23, 59, 59, 999);
    
            switch (range) {
                case 'harian': startDate.setHours(0, 0, 0, 0); break;
                case 'mingguan': startDate.setDate(now.getDate() - 6); startDate.setHours(0, 0, 0, 0); break;
                case 'bulanan': startDate.setDate(now.getDate() - 30); startDate.setHours(0, 0, 0, 0); break;
                case 'tahunan': startDate.setFullYear(now.getFullYear() - 1); startDate.setHours(0, 0, 0, 0); break;
            }
    
            const profileRaw = localStorage.getItem(`tarbiyahUserProfile_${userId}`);
            const profile = profileRaw ? JSON.parse(profileRaw) : {};
    
            const jurnalRaw = localStorage.getItem(`jurnalMuhasabahEntries_${userId}`);
            const allJurnal: JurnalEntry[] = jurnalRaw ? JSON.parse(jurnalRaw) : [];
            const filteredJurnal = allJurnal.filter(e => new Date(e.date) >= startDate && new Date(e.date) <= endDate);
    
            const roadmapRaw = localStorage.getItem(`roadmapHistory_${userId}`);
            const roadmapHistory = roadmapRaw ? JSON.parse(roadmapRaw) : {};
            const filteredRoadmap = Object.entries(roadmapHistory)
                .filter(([date]) => new Date(date + 'T00:00:00') >= startDate && new Date(date + 'T00:00:00') <= endDate)
                .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime());
    
            const khatamRaw = localStorage.getItem(`khatamHistory_${userId}`);
            const allKhatam: string[] = khatamRaw ? JSON.parse(khatamRaw) : [];
            const filteredKhatam = allKhatam.filter(d => new Date(d) >= startDate && new Date(d) <= endDate);
            
            const journeyRaw = localStorage.getItem(`tarbiyahJourneyProgress_${userId}`);
            const journeyProgress: JourneyProgress = journeyRaw ? JSON.parse(journeyRaw) : {};
            const totalSteps = journeyData.reduce((total, level) => total + level.steps.length, 0);
            const completedSteps = Object.values(journeyProgress).filter(Boolean).length;
            const journeyPercentage = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
            
            const quizRaw = localStorage.getItem(`quizHistory_${userId}`);
            const allQuiz: QuizResult[] = quizRaw ? JSON.parse(quizRaw) : [];
            const filteredQuiz = allQuiz.filter(r => {
                 try {
                    // Assuming date is 'DD/MM/YYYY, HH:mm'
                    const datePart = r.date.split(',')[0];
                    const [day, month, year] = datePart.split('/');
                    const resultDate = new Date(`${year}-${month}-${day}`);
                    return resultDate >= startDate && resultDate <= endDate;
                } catch {
                    return false;
                }
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
            const filteredShalat = Object.entries(shalatHistory)
                .filter(([date]) => new Date(date + 'T00:00:00') >= startDate && new Date(date + 'T00:00:00') <= endDate)
                .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime());
    
            return {
                title: t(range as any),
                period: `${startDate.toLocaleDateString('id-ID')} - ${endDate.toLocaleDateString('id-ID')}`,
                profile,
                jurnal: filteredJurnal,
                roadmap: filteredRoadmap,
                khatam: filteredKhatam,
                journey: { percentage: journeyPercentage, completed: completedSteps, total: totalSteps, progress: journeyProgress },
                kuis: filteredQuiz,
                hadits: filteredSrs,
                shalat: filteredShalat
            };
        };

        const data = gatherReportDataForPdf(selectedRange);
        if (!data) return;
        
        const shalatWajibList = { subuh: "Subuh", dzuhur: "Dzuhur", jumat: "Jum'at", ashar: "Ashar", maghrib: "Maghrib", isya: "Isya" };
        const shalatSunnahList = { rawatib: "Rawatib", dhuha: "Dhuha", tahajud: "Tahajud", hajat: "Hajat", witir: "Witir", taubat: "Taubat" };
        const shalatRamadhanList = { tarawih: "Tarawih" };

        let htmlContent = `
            <html>
            <head>
                <title>Laporan Spiritual ${data.title} - Tarbiyah Care Premium</title>
                <style>
                    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; }
                    h1, h2, h3 { color: #0D9488; border-bottom: 2px solid #0D9488; padding-bottom: 5px; }
                    h1 { font-size: 28px; text-align: center; border: none; margin-bottom: 5px; }
                    h2 { font-size: 22px; margin-top: 35px; page-break-before: always; }
                    h3 { font-size: 18px; border-bottom: 1px solid #ccc; color: #333; }
                    .card { background-color: #f8f9fa; border: 1px solid #dee2e6; border-left: 5px solid #14B8A6; padding: 15px; margin-bottom: 20px; border-radius: 5px; page-break-inside: avoid; }
                    .date { font-weight: bold; color: #495057; }
                    p, li { color: #495057; }
                    ul { padding-left: 20px; }
                    .no-break { page-break-before: auto !important; }
                    @media print {
                        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                        h1, h2, h3 { color: #0D9488 !important; }
                        .card { border-left-color: #14B8A6 !important; }
                    }
                </style>
            </head>
            <body>
                <h1>Laporan Spiritual Pengguna (${data.title})</h1>
                <p style="text-align: center; color: #6c757d;">Periode: ${data.period}</p>
        `;

        // Profile Data
        htmlContent += `<h2 class="no-break" style="margin-top: 20px;">Profil Pengguna</h2><div class="card"><p><strong>Nama:</strong> ${data.profile.name || 'Belum diatur'}</p><p><strong>WhatsApp:</strong> ${data.profile.whatsapp || 'Tidak ada'}</p></div>`;

        // Shalat History
        htmlContent += `<h2>Riwayat Shalat Harian</h2>`;
        if (data.shalat.length > 0) {
            data.shalat.forEach(([date, shalatData]: [string, Record<string, boolean>]) => {
                const completedWajib = Object.keys(shalatData).filter(k => shalatData[k] && shalatWajibList[k as keyof typeof shalatWajibList]).map(k => shalatWajibList[k as keyof typeof shalatWajibList]).join(', ');
                const completedSunnah = Object.keys(shalatData).filter(k => shalatData[k] && shalatSunnahList[k as keyof typeof shalatSunnahList]).map(k => shalatSunnahList[k as keyof typeof shalatSunnahList]).join(', ');
                const completedRamadhan = Object.keys(shalatData).filter(k => shalatData[k] && shalatRamadhanList[k as keyof typeof shalatRamadhanList]).map(k => shalatRamadhanList[k as keyof typeof shalatRamadhanList]).join(', ');
                
                htmlContent += `<div class="card">
                    <p class="date">${new Date(date + 'T00:00:00').toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                    <p><strong>Wajib:</strong> ${completedWajib || '-'}</p>
                    <p><strong>Sunnah:</strong> ${completedSunnah || '-'}</p>
                    ${completedRamadhan ? `<p><strong>Ramadhan:</strong> ${completedRamadhan}</p>` : ''}
                </div>`;
            });
        } else {
             htmlContent += `<p>Tidak ada riwayat shalat pada rentang waktu ini.</p>`;
        }

        // Jurnal Muhasabah
        htmlContent += `<h2>Jurnal Muhasabah</h2>`;
        if (data.jurnal.length > 0) {
            data.jurnal.forEach(entry => {
                htmlContent += `<div class="card"><p class="date">${new Date(entry.date).toLocaleString('id-ID', { dateStyle: 'full' })}</p><h3>Prompt: "${lang === 'id' ? entry.prompt.id : entry.prompt.en}"</h3><p>${entry.entry.replace(/\n/g, '<br>')}</p></div>`;
            });
        } else {
            htmlContent += `<p>Tidak ada catatan jurnal pada rentang waktu ini.</p>`;
        }
        
        // Roadmap Progress
        htmlContent += `<h2>Riwayat Roadmap Harian</h2>`;
        if(data.roadmap.length > 0){
            data.roadmap.forEach(([date, tasks]) => {
                const completedCount = Object.values(tasks as object).filter(Boolean).length;
                htmlContent += `<div class="card"><p class="date">${new Date(date + 'T00:00:00').toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })} - <strong>${completedCount}/40 Tugas Selesai</strong></p></div>`;
            });
        } else {
             htmlContent += `<p>Tidak ada riwayat roadmap pada rentang waktu ini.</p>`;
        }

        // Khatam History
        htmlContent += `<h2>Riwayat Khatam Al-Qur'an</h2>`;
        if (data.khatam.length > 0) {
            htmlContent += `<div class="card"><ul>`;
            data.khatam.forEach(dateStr => {
                htmlContent += `<li>Selesai pada ${new Date(dateStr).toLocaleDateString('id-ID', { dateStyle: 'full' })}</li>`;
            });
            htmlContent += `</ul></div>`;
        } else {
            htmlContent += `<p>Belum ada riwayat khataman.</p>`;
        }

        // Tarbiyah Journey
        htmlContent += `<h2>Progres Tarbiyah Journey</h2>`;
        htmlContent += `<div class="card"><h3>Ringkasan</h3><p><strong>Penyelesaian Keseluruhan:</strong> ${data.journey.percentage}% (${data.journey.completed} dari ${data.journey.total} langkah)</p><h3>Langkah yang Telah Selesai:</h3><ul>`;
        const completedStepTitles: string[] = [];
        journeyData.forEach(level => {
            level.steps.forEach(step => {
                if (data.journey.progress[step.id]) {
                    completedStepTitles.push(step.title[lang]);
                }
            });
        });
        if (completedStepTitles.length > 0) {
            completedStepTitles.forEach(title => { htmlContent += `<li>${title}</li>`; });
        } else {
            htmlContent += `<li>Belum ada langkah yang diselesaikan.</li>`;
        }
        htmlContent += `</ul></div>`;
        

        // Quiz History
        htmlContent += `<h2>Riwayat Kuis</h2>`;
        if(data.kuis.length > 0) {
            htmlContent += `<div class="card"><ul>`;
            data.kuis.forEach(r => {
                htmlContent += `<li>${r.date}: Skor <strong>${r.score}</strong> (Tingkat ${t( ('kuis_' + r.difficulty) as any)})</li>`;
            });
            htmlContent += `</ul></div>`;
        } else {
             htmlContent += `<p>Tidak ada riwayat kuis pada rentang waktu ini.</p>`;
        }
        
        // Hadits Arba'in Memorization History
        htmlContent += `<h2>Riwayat Hafalan Hadits Arba'in</h2>`;
        if (data.hadits.length > 0) {
            data.hadits.forEach(item => {
                htmlContent += `<div class="card"><h3>${item.hadithTitle}</h3><ul>`;
                item.reviews.forEach(review => {
                    const reviewStatusText = review.status === 'Lancar' ? 'Lancar' : 'Kurang Lancar';
                    htmlContent += `<li>${new Date(review.date).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })} - Status: <strong>${reviewStatusText}</strong> (Interval berikutnya: ${review.reviewInterval} hari)</li>`;
                });
                htmlContent += `</ul></div>`;
            });
        } else {
            htmlContent += `<p>Tidak ada riwayat hafalan hadits pada rentang waktu ini.</p>`;
        }


        htmlContent += `</body></html>`;

        const reportWindow = window.open('', '_blank');
        if(reportWindow){
            reportWindow.document.write(htmlContent);
            reportWindow.document.close();
            reportWindow.focus();
            setTimeout(() => {
                 reportWindow.print();
            }, 500);
        } else {
            alert("Gagal membuka jendela baru. Mohon izinkan pop-up untuk situs ini.");
        }
    };

    return (
        <section id="laporan-spiritual" className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-white">{t('laporan_spiritual')}</h2>

            <Card className="p-8 mb-8">
                <p className="text-center text-gray-300 mb-8">Pilih rentang waktu laporan untuk melihat analisis aktivitas ibadah, progres roadmap, dan catatan muhasabah Anda.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {reportOptions.map(option => (
                        <Card 
                            key={option.id}
                            className={`!p-4 transition-all duration-300 ${selectedRange === option.id ? 'bg-primary/20 ring-2 ring-primary' : 'bg-slate-700'}`}
                        >
                            <div className="flex justify-between items-center">
                                <div onClick={() => setSelectedRange(option.id)} className="cursor-pointer flex-grow">
                                    <div className="flex items-center gap-4">
                                        <i className={`fas ${option.icon} text-3xl ${selectedRange === option.id ? 'text-primary' : 'text-gray-400'}`}></i>
                                        <h3 className="font-bold text-lg text-white">{t(option.id)}</h3>
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate(`/laporan-spiritual/${option.id}`)}
                                    className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-lg text-sm flex-shrink-0"
                                >
                                    <i className="fas fa-eye mr-2"></i>Review
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="mt-8 text-center border-t border-slate-700 pt-6">
                    <button 
                        onClick={handleDownloadPdf}
                        className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                    >
                        <i className="fas fa-file-pdf mr-2"></i>{t('unduh_pdf')}
                    </button>
                </div>
            </Card>

             <Card className="mb-8">
                <h3 className="font-bold text-xl mb-4 text-primary"><i className="fas fa-history mr-2"></i>Riwayat Pencarian & Konsultasi</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto no-scrollbar pr-2">
                    {history.length > 0 ? (
                        history.map(item => (
                            <div key={item.id} className="p-3 bg-slate-700 rounded-lg cursor-pointer hover:bg-slate-600" onClick={() => navigate('/konsultasi')}>
                                <div className="flex items-center">
                                    <i className={`fas ${getIconForMode(item.mode)} w-6 text-center text-gray-400`}></i>
                                    <div className="ml-3">
                                        <p className="font-semibold text-sm truncate">{item.mode === 'konsultasi' ? (item as ConsultationHistoryItem).aiResponse.title : item.query}</p>
                                        <p className="text-xs text-gray-400 capitalize">{t(item.mode as any) || item.mode} - {new Date(item.timestamp).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-400 py-4">{t('belum_ada_riwayat')}</p>
                    )}
                </div>
            </Card>
        </section>
    );
};

export default LaporanSpiritual;
