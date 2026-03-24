import React, { useState, useEffect, useMemo } from 'react';
import Card from '../ui/Card';

interface TrackerData {
    shalat: any;
    kajian: string;
    silaturahmi: string;
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

const RiwayatAmalan: React.FC = () => {
    const [historyData, setHistoryData] = useState<Record<string, TrackerData>>({});

    useEffect(() => {
        const userId = getUserId();
        if (!userId) return;
        try {
            const savedData = localStorage.getItem(`ramadhanTrackerData_${userId}`);
            if (savedData) {
                setHistoryData(JSON.parse(savedData));
            }
        } catch (error) {
            console.error("Failed to load Ramadhan data:", error);
        }
    }, []);

    const historicalActivities = useMemo(() =>
        (Object.entries(historyData) as [string, TrackerData][])
            .filter(([, data]) => (data.kajian && data.kajian.trim() !== '') || (data.silaturahmi && data.silaturahmi.trim() !== ''))
            .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime()),
        [historyData]
    );

    return (
        <section id="riwayat-amalan" className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-white">Riwayat Catatan Amalan</h2>
            <Card>
                <div className="space-y-4 max-h-[75vh] overflow-y-auto no-scrollbar pr-2">
                    {historicalActivities.length > 0 ? (
                        historicalActivities.map(([date, data]) => (
                            <div key={date} className="p-4 bg-slate-700 rounded-lg">
                                <p className="font-bold text-primary text-md">
                                    {new Date(date + 'T00:00:00').toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                </p>
                                {data.kajian && (
                                    <div className="mt-2">
                                        <strong className="text-gray-300">Kajian/Ilmu yang Dipelajari:</strong>
                                        <p className="text-sm text-gray-400 pl-2">{data.kajian}</p>
                                    </div>
                                )}
                                {data.silaturahmi && (
                                    <div className="mt-2">
                                        <strong className="text-gray-300">Silaturahmi yang Dijaga:</strong>
                                        <p className="text-sm text-gray-400 pl-2">{data.silaturahmi}</p>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-400 py-10">Belum ada catatan amalan yang tersimpan.</p>
                    )}
                </div>
            </Card>
        </section>
    );
};

export default RiwayatAmalan;