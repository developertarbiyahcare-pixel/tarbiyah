
import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import { calendarEventsData } from '../../data/calendarEvents';
import type { CalendarEvent } from '../../data/calendarEvents';
import { useLanguage } from '../../contexts/LanguageContext';

// Helper to get user-specific storage key
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

// Helper functions for date manipulation
const getStartOfWeek = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day; // adjust when day is Sunday (0)
    return new Date(d.setDate(diff));
};

const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

const Kalender: React.FC = () => {
    const { lang, t } = useLanguage();
    const navigate = useNavigate();
    // --- Calendar State ---
    const [view, setView] = useState<'month' | 'week'>('month');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(new Date()));
    const [events, setEvents] = useState<Record<string, CalendarEvent[]>>({});
    const [userEvents, setUserEvents] = useState<CalendarEvent[]>([]);
    const [selectedDayEvents, setSelectedDayEvents] = useState<CalendarEvent[] | null>(null);
    const [loadingCalendar, setLoadingCalendar] = useState(true);
    const [calendarError, setCalendarError] = useState<string | null>(null);
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // --- Calendar Logic ---
    useEffect(() => {
        const userId = getUserId();
        if (!userId) return;
        try {
            const savedUserEvents = localStorage.getItem(`userCalendarEvents_${userId}`);
            if (savedUserEvents) setUserEvents(JSON.parse(savedUserEvents));
        } catch (e) {
            console.error("Failed to load user events from localStorage", e);
        }
    }, []);

    useEffect(() => {
        const body = document.body;
        if (selectedDayEvents) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }
        return () => { body.style.overflow = 'auto'; };
    }, [selectedDayEvents]);

    const allEvents = useMemo(() => [...calendarEventsData, ...userEvents], [userEvents]);

    useEffect(() => {
        const processData = () => {
            setLoadingCalendar(true);
            setCalendarError(null);
            
            try {
                const monthEvents = allEvents.filter(event => {
                    const eventDate = new Date(event.date + 'T00:00:00');
                    return eventDate.getFullYear() === year && eventDate.getMonth() === month;
                });
                const eventsByDay: Record<string, CalendarEvent[]> = {};
                monthEvents.forEach(event => {
                    const day = new Date(event.date + 'T00:00:00').getDate();
                    if (!eventsByDay[day]) eventsByDay[day] = [];
                    eventsByDay[day].push(event);
                });
                setEvents(eventsByDay);
            } catch (err) {
                console.error("Error processing calendar events:", err);
                setCalendarError(err instanceof Error ? err.message : t('kalender_gagal_proses' as any));
            } finally {
                setLoadingCalendar(false);
            }
        };

        processData();
    }, [year, month, allEvents, t]);

    const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
    const handlePrevWeek = () => {
        const newWeekStart = addDays(currentWeekStart, -7);
        setCurrentWeekStart(newWeekStart);
        setCurrentDate(newWeekStart);
    };
    const handleNextWeek = () => {
        const newWeekStart = addDays(currentWeekStart, 7);
        setCurrentWeekStart(newWeekStart);
        setCurrentDate(newWeekStart);
    };

    const handleOpenEditModal = (event: CalendarEvent) => {
        setSelectedDayEvents(null); // Close day detail modal
        navigate(`/tambah-acara/${event.id}`);
    };

    const handleDeleteEvent = (eventId: string) => {
        const userId = getUserId();
        if (!userId) return;
        if (window.confirm(t('kalender_yakin_hapus' as any))) {
            const updatedUserEvents = userEvents.filter(event => event.id !== eventId);
            setUserEvents(updatedUserEvents);
            localStorage.setItem(`userCalendarEvents_${userId}`, JSON.stringify(updatedUserEvents));
            setSelectedDayEvents(null);
        }
    };
    
    const allEventsForMonth = useMemo(() => {
        return allEvents
            .filter(event => new Date(event.date).getMonth() === month && new Date(event.date).getFullYear() === year)
            .sort((a: CalendarEvent, b: CalendarEvent) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }, [allEvents, month, year]);

    // --- Render Functions ---

    const renderMonthGrid = () => {
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();
        const isCurrentMonthView = year === today.getFullYear() && month === today.getMonth();
        const emptyCells = Array.from({ length: firstDayOfMonth }, (_, i) => <div key={`empty-${i}`} className="border-r border-b border-slate-700"></div>);
        const dayCells = Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const dayEvents = events[day] || [];
            const isToday = isCurrentMonthView && day === today.getDate();
            const hasNasional = dayEvents.some(e => e.type === 'nasional');
            const hasIslami = dayEvents.some(e => e.type === 'islami');

            let cellClasses = `relative p-2 border-r border-b border-slate-700 min-h-[120px] transition-colors duration-200 flex flex-col justify-center items-center`;
            if (dayEvents.length > 0) {
                cellClasses += ' cursor-pointer bg-slate-800/30 hover:bg-slate-700/50';
            }

            const dayNumberClasses = `font-bold text-lg ${isToday ? 'bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center' : 'text-gray-200'}`;

            return (
                <div key={day} className={cellClasses} onClick={() => dayEvents.length > 0 && setSelectedDayEvents(dayEvents)}>
                    <span className={dayNumberClasses}>{day}</span>
                    {(hasIslami || hasNasional) && (
                        <div className="flex space-x-1 mt-2">
                            {hasIslami && <div className="w-2 h-2 bg-green-500 rounded-full" title={t('kalender_acara_islami' as any)}></div>}
                            {hasNasional && <div className="w-2 h-2 bg-red-500 rounded-full" title={t('kalender_acara_nasional' as any)}></div>}
                        </div>
                    )}
                </div>
            );
        });
        return [...emptyCells, ...dayCells];
    };

    const renderWeekSchedule = () => {
        const weekDays: Date[] = [];
        const weekEvents: Record<string, CalendarEvent[]> = {};
        const dayFormatter = new Intl.DateTimeFormat(lang, { weekday: 'short' });
        const dateFormatter = new Intl.DateTimeFormat(lang, { day: 'numeric' });
        for (let i = 0; i < 7; i++) {
            const day = addDays(currentWeekStart, i);
            const dateString = day.toISOString().split('T')[0];
            weekDays.push(day);
            weekEvents[dateString] = allEvents.filter(event => event.date === dateString);
        }
        const timeSlots = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);
        return (
            <div className="overflow-x-auto no-scrollbar">
                <div className="grid grid-cols-[auto_repeat(7,1fr)] min-w-[800px]">
                    <div className="sticky top-0 z-10 bg-slate-800"></div>
                    {weekDays.map(day => {
                        const isToday = day.toDateString() === new Date().toDateString();

                        return (
                            <div key={day.toISOString()} className={`sticky top-0 z-10 p-2 text-center border-b border-l border-slate-700 bg-slate-800/50 ${isToday ? 'bg-primary/20' : ''}`}>
                                <div className={`text-xs font-semibold uppercase ${isToday ? 'text-primary' : 'text-gray-400'}`}>{dayFormatter.format(day)}</div>
                                <div className={`text-2xl font-bold ${isToday ? 'text-primary' : 'text-white'}`}>{dateFormatter.format(day)}</div>
                            </div>
                        );
                    })}
                    <div className="text-xs font-semibold p-2 text-center border-r border-slate-700 flex items-center justify-center bg-slate-800/50"><span>{t('kalender_sepanjang_hari' as any)}</span></div>
                    {weekDays.map(day => {
                        const dateString = day.toISOString().split('T')[0];
                        const dayEvents = weekEvents[dateString] || [];
                        return (
                            <div key={day.toISOString()} className="p-1 border-b border-l border-slate-700 min-h-[60px]">
                                {dayEvents.map(event => (
                                    <div key={event.id || (typeof event.summary === 'string' ? event.summary : event.summary.id)} className={`text-xs p-1.5 rounded mb-1 ${event.type === 'nasional' ? 'bg-red-600 border border-red-500' : 'bg-green-600 border border-green-500'} text-white truncate shadow-md`}>
                                        <span className="font-semibold">{typeof event.summary === 'object' ? (event.summary as any)[lang] : event.summary}</span>
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                    {timeSlots.map(time => (
                         <React.Fragment key={time}>
                            <div className="text-xs text-right pr-2 text-gray-400 border-r border-slate-700 h-12 flex items-center justify-end -mt-px"><span className="-translate-y-1/2">{time}</span></div>
                            {weekDays.map(day => (<div key={`${day.toISOString()}-${time}`} className="border-b border-l border-slate-700 h-12"></div>))}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        );
    };
    
    const monthName = currentDate.toLocaleString(lang, { month: 'long', year: 'numeric' });
    const weekName = (() => {
        const endOfWeek = addDays(currentWeekStart, 6);
        const startMonth = currentWeekStart.toLocaleString(lang, { month: 'short' });
        const endMonth = endOfWeek.toLocaleString(lang, { month: 'short' });
        const startYear = currentWeekStart.getFullYear();
        const endYear = endOfWeek.getFullYear();
        if (startYear !== endYear) return `${currentWeekStart.getDate()} ${startMonth} ${startYear} - ${endOfWeek.getDate()} ${endMonth} ${endYear}`;
        if (startMonth !== endMonth) return `${currentWeekStart.getDate()} ${startMonth} - ${endOfWeek.getDate()} ${endMonth}, ${startYear}`;
        return `${currentWeekStart.getDate()} - ${endOfWeek.getDate()} ${startMonth}, ${startYear}`;
    })();
    const weekDaysHeader = lang === 'id' ? ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'] : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const renderHeader = () => (
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
            <div className="flex items-center gap-2">
                 <button onClick={view === 'month' ? handlePrevMonth : handlePrevWeek} className="w-10 h-10 flex items-center justify-center bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"><i className="fas fa-chevron-left"></i></button>
                 <button onClick={view === 'month' ? handleNextMonth : handleNextWeek} className="w-10 h-10 flex items-center justify-center bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"><i className="fas fa-chevron-right"></i></button>
                 <h3 className="text-xl md:text-2xl font-bold text-white capitalize ml-2">{view === 'month' ? monthName : weekName}</h3>
            </div>
            <div className="flex space-x-2 items-center flex-wrap gap-2">
                <div className="flex items-center bg-slate-700 rounded-lg p-1">
                    <button
                        onClick={() => setView('month')}
                        className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${view === 'month' ? 'bg-primary text-white' : 'text-gray-300 hover:bg-slate-600'}`}
                    >
                        Bulan
                    </button>
                    <button
                        onClick={() => setView('week')}
                        className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${view === 'week' ? 'bg-primary text-white' : 'text-gray-300 hover:bg-slate-600'}`}
                    >
                        Minggu
                    </button>
                </div>
                <Link to="/tambah-acara" className="px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-colors text-sm"><i className="fas fa-plus mr-2"></i>{t('kalender_tambah_acara')}</Link>
            </div>
        </div>
    );
    
    return (
        <section id="kalender" className="animate-fade-in">
            <h2 className="text-3xl font-bold text-white ApplicationTitle">{t('kalender')}</h2>

            <Card className="bg-slate-800">
                {renderHeader()}
                {loadingCalendar ? (<div className="text-center p-20"><i className="fas fa-spinner fa-spin text-4xl"></i></div>)
                : calendarError ? (<div className="text-center text-red-400 p-20"><p>{calendarError}</p></div>)
                : view === 'month' ? (
                    <>
                        <div className="grid grid-cols-7 text-center font-bold text-sm uppercase tracking-wider border-t border-l border-r border-slate-700 bg-slate-900/50 rounded-t-lg">
                            {weekDaysHeader.map(day => <div key={day} className="py-3 text-gray-400">{day}</div>)}
                        </div>
                        <div className="grid grid-cols-7 border-l border-slate-700 rounded-b-lg bg-slate-800">{renderMonthGrid()}</div>
                        {allEventsForMonth.length > 0 && (
                             <div className="mt-8">
                                <h4 className="font-bold text-lg mb-3 text-white"><i className="fas fa-bookmark mr-2 text-yellow-400"></i>{t('kalender_acara_penting' as any)}</h4>
                                <ul className="bg-slate-900 p-4 rounded-lg space-y-1">
                                    {allEventsForMonth.map((event, index) => {
                                        const dayEvents = allEvents.filter(e => e.date === event.date);
                                        const eventDate = new Date(event.date + 'T00:00:00');
                                        return (
                                            <li key={index} className="flex justify-between items-center text-sm cursor-pointer hover:bg-slate-800 p-2 -m-2 rounded-md transition-colors" onClick={() => setSelectedDayEvents(dayEvents)}>
                                                <div className="flex items-center">
                                                   <i className={`fas ${event.type === 'nasional' ? 'fa-flag text-red-400' : 'fa-moon text-green-400'} w-6 text-center mr-2`}></i>
                                                   <span className="text-gray-200">{typeof event.summary === 'object' ? (event.summary as any)[lang] : event.summary}</span>
                                                </div>
                                                <span className="font-semibold text-primary ml-4 whitespace-nowrap">{eventDate.toLocaleDateString(lang, { day: 'numeric', month: 'long' })}</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        )}
                    </>
                ) : (renderWeekSchedule())}
            </Card>

            {selectedDayEvents && (
                <div className="fixed inset-0 bg-black bg-opacity-75 z-40 flex justify-center items-start p-4 pt-16 animate-fade-in" onClick={() => setSelectedDayEvents(null)}>
                    <Card className="w-full max-w-md" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-700">
                            <h3 className="text-lg font-bold text-primary">{t('kalender_acara_pada' as any)} {new Date(selectedDayEvents[0].date + 'T00:00:00').toLocaleDateString(lang, { day: 'numeric', month: 'long' })}</h3>
                            <button onClick={() => setSelectedDayEvents(null)} className="text-xl text-gray-400 hover:text-white"><i className="fas fa-times"></i></button>
                        </div>
                        <ul className="space-y-3">
                           {selectedDayEvents.map((event, index) => (
                                <li key={index} className="p-3 bg-slate-700 rounded-md">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <i className={`fas ${event.type === 'nasional' ? 'fa-flag text-red-400' : 'fa-moon text-green-400'} w-6 text-center mr-2`}></i>
                                            <span className="text-gray-100">{typeof event.summary === 'object' ? (event.summary as any)[lang] : event.summary}</span>
                                        </div>
                                        {event.id?.startsWith('user-event-') && (
                                            <div className="flex gap-3">
                                                <button onClick={() => handleOpenEditModal(event)} className="text-sm text-yellow-400 hover:text-yellow-300" title={t('kalender_edit_acara' as any)}><i className="fas fa-pencil-alt"></i></button>
                                                <button onClick={() => handleDeleteEvent(event.id!)} className="text-sm text-red-500 hover:text-red-400" title={t('kalender_hapus_acara' as any)}><i className="fas fa-trash"></i></button>
                                            </div>
                                        )}
                                    </div>
                                </li>
                           ))}
                        </ul>
                    </Card>
                </div>
            )}
        </section>
    );
};

export default Kalender;