
export interface CalendarEvent {
    id?: string;
    date: string; // YYYY-MM-DD
    // FIX: Changed type to support both string and bilingual object for summary
    summary: string | { id: string, en: string };
    type: 'nasional' | 'islami';
}

export const calendarEventsData: CalendarEvent[] = [
    // --- 2025 National Holidays ---
    { date: '2025-01-01', summary: 'Tahun Baru 2025 Masehi', type: 'nasional' },
    { date: '2025-01-27', summary: 'Isra Mikraj Nabi Muhammad SAW', type: 'nasional' },
    { date: '2025-01-29', summary: 'Tahun Baru Imlek 2576 Kongzili', type: 'nasional' },
    { date: '2025-03-29', summary: 'Hari Suci Nyepi Tahun Baru Saka 1947', type: 'nasional' },
    { date: '2025-03-31', summary: 'Hari Raya Idul Fitri 1446 Hijriah', type: 'nasional' },
    { date: '2025-04-01', summary: 'Hari Raya Idul Fitri 1446 Hijriah', type: 'nasional' },
    { date: '2025-04-18', summary: 'Wafat Isa Al Masih', type: 'nasional' },
    { date: '2025-05-01', summary: 'Hari Buruh Internasional', type: 'nasional' },
    { date: '2025-05-12', summary: 'Hari Raya Waisak 2569 BE', type: 'nasional' },
    { date: '2025-05-29', summary: 'Kenaikan Isa Al Masih', type: 'nasional' },
    { date: '2025-06-01', summary: 'Hari Lahir Pancasila', type: 'nasional' },
    { date: '2025-06-07', summary: 'Hari Raya Idul Adha 1446 Hijriah', type: 'nasional' },
    { date: '2025-06-27', summary: 'Tahun Baru Islam 1447 Hijriah', type: 'nasional' },
    { date: '2025-08-17', summary: 'Hari Kemerdekaan Republik Indonesia', type: 'nasional' },
    { date: '2025-09-05', summary: 'Maulid Nabi Muhammad SAW', type: 'nasional' },
    { date: '2025-12-25', summary: 'Hari Raya Natal', type: 'nasional' },

    // --- 2025 Islamic Important Days (some might overlap with national) ---
    { date: '2025-02-14', summary: 'Nisfu Syakban 1446 H', type: 'islami' },
    { date: '2025-03-01', summary: 'Awal Ramadan 1446 H', type: 'islami' },
    { date: '2025-03-17', summary: 'Nuzulul Qur\'an 1446 H', type: 'islami' },
    { date: '2025-06-06', summary: 'Wukuf di Arafah (9 Dzulhijjah) 1446 H', type: 'islami' },
    { date: '2025-07-06', summary: 'Hari Asyura (10 Muharram) 1447 H', type: 'islami' },
];
