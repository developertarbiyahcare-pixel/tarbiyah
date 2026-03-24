import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Dropdown from '../ui/Dropdown';
import { useLanguage } from '../../contexts/LanguageContext';
import type { CalendarEvent } from '../../data/calendarEvents';

const getUserId = (): string | null => {
    try {
        const authData = localStorage.getItem('tarbiyahAuth');
        if (authData) {
            return JSON.parse(authData).waNumber;
        }
        return null;
    } catch {
        return null;
    }
};

const TambahAcara: React.FC = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const navigate = useNavigate();
    const { t, lang } = useLanguage();
    
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [type, setType] = useState<'nasional' | 'islami'>('islami');
    
    const isEditMode = !!eventId;

    useEffect(() => {
        if (isEditMode) {
            const userId = getUserId();
            if (!userId) return;
            try {
                const savedUserEventsRaw = localStorage.getItem(`userCalendarEvents_${userId}`);
                const savedUserEvents: CalendarEvent[] = savedUserEventsRaw ? JSON.parse(savedUserEventsRaw) : [];
                const eventToEdit = savedUserEvents.find(ev => ev.id === eventId);
                if (eventToEdit) {
                    const summary = typeof eventToEdit.summary === 'object' ? (eventToEdit.summary as any)[lang] : eventToEdit.summary;
                    setTitle(summary);
                    setDate(eventToEdit.date);
                    setType(eventToEdit.type);
                } else {
                    navigate('/kalender');
                }
            } catch (e) {
                console.error("Failed to load event for editing", e);
                navigate('/kalender');
            }
        }
    }, [eventId, isEditMode, lang, navigate]);
    
    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const userId = getUserId();
        if (!userId || !title || !date) return;

        const savedUserEventsRaw = localStorage.getItem(`userCalendarEvents_${userId}`);
        const userEvents: CalendarEvent[] = savedUserEventsRaw ? JSON.parse(savedUserEventsRaw) : [];
        let updatedUserEvents;

        if (isEditMode) {
            updatedUserEvents = userEvents.map(ev => 
                ev.id === eventId
                    ? { ...ev, summary: title, date: date, type: type }
                    : ev
            );
        } else {
            const newEvent: CalendarEvent = {
                id: `user-event-${Date.now()}`,
                summary: title,
                date: date,
                type: type,
            };
            updatedUserEvents = [...userEvents, newEvent];
        }
        
        localStorage.setItem(`userCalendarEvents_${userId}`, JSON.stringify(updatedUserEvents));
        navigate('/kalender');
    };

    const eventTypeItems = [
        { value: 'islami', label: t('kalender_jenis_islami' as any) },
        { value: 'nasional', label: t('kalender_jenis_nasional' as any) },
    ];

    return (
        <section id="tambah-acara" className="animate-fade-in">
            <h2 className="text-3xl font-bold text-white ApplicationTitle">{isEditMode ? t('kalender_edit_acara' as any) : t('kalender_tambah_acara_baru' as any)}</h2>
            <Card className="w-full max-w-md mx-auto">
                <form onSubmit={handleSave}>
                    <div className="mb-4">
                        <label htmlFor="event-title" className="block text-sm font-medium text-gray-200 mb-1">{t('kalender_judul_acara' as any)}</label>
                        <input type="text" id="event-title" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-2 border border-gray-500 rounded-lg bg-gray-700 text-white focus:ring-primary focus:border-primary"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="event-date" className="block text-sm font-medium text-gray-200 mb-1">{t('kalender_tanggal' as any)}</label>
                        <input type="date" id="event-date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full p-2 border border-gray-500 rounded-lg bg-gray-700 text-white focus:ring-primary focus:border-primary"/>
                    </div>
                    <div className="mb-6">
                        <Dropdown
                            label={t('kalender_jenis_acara' as any)}
                            items={eventTypeItems}
                            selectedValue={type}
                            onSelect={(val) => setType(val as 'nasional' | 'islami')}
                        />
                    </div>
                    <div className="flex justify-end gap-3">
                        <button type="button" onClick={() => navigate('/kalender')} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-white font-semibold">{t('batal')}</button>
                        <button type="submit" className="px-4 py-2 bg-primary hover:bg-primary-hover rounded-lg text-white font-bold">{t('simpan' as any)}</button>
                    </div>
                </form>
            </Card>
        </section>
    );
};

export default TambahAcara;