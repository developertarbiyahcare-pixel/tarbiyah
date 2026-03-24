
import React, { useState, useEffect } from 'react';
import Card from './Card';

const PrayerTimes: React.FC = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Format Date: Hari, DD Nama_Bulan YYYY
    const formatDate = (date: Date) => {
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const months = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        
        const dayName = days[date.getDay()];
        const day = date.getDate();
        const monthName = months[date.getMonth()];
        const year = date.getFullYear();
        return `${dayName}, ${day} ${monthName} ${year}`;
    };

    // Format Time: HH:MM:SS WIB
    const formatTime = (date: Date) => {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds} WIB`;
    };

    return (
        <Card className="mb-6 bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-primary shadow-lg text-white">
            <div className="flex flex-col items-start justify-start p-4 space-y-2">
                
                {/* Tanggal */}
                <div className="flex items-center gap-2 text-sm font-medium tracking-wide text-gray-300">
                    <i className="far fa-calendar-alt text-primary text-lg"></i>
                    <span>{formatDate(currentTime)}</span>
                </div>

                {/* Jam */}
                <div className="flex items-center gap-2 text-lg font-bold tracking-wide text-white">
                    <i className="far fa-clock text-primary"></i>
                    <span>{formatTime(currentTime)}</span>
                </div>

                {/* Lokasi */}
                <div className="flex items-center gap-2 text-sm font-medium tracking-wide text-gray-300">
                    <i className="fas fa-map-marker-alt text-red-500 text-lg"></i>
                    <span>Cibinong, Bogor</span>
                </div>

            </div>
        </Card>
    );
};

export default PrayerTimes;
