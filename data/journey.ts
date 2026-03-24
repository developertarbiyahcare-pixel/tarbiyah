

import type { JourneyLevel } from '../types';

export const journeyData: JourneyLevel[] = [
  {
    id: 'level-1',
    title: { id: 'l1_title', en: 'Level 1: Fondasi Iman' },
    subtitle: { id: 'l1_subtitle', en: 'Memperkokoh pilar-pilar keyakinan dan memahami esensi dari Rukun Iman dan Rukun Islam.' },
    steps: [
      { id: 'l1s1', title: { id: 'l1s1_title', en: 'Memahami Dua Kalimat Syahadat' }, path: '/tauhid/syahadat', icon: 'fas fa-file-contract', duration: 'Minggu 1', frequency: '1x Selesai' },
      { id: 'l1s2', title: { id: 'l1s2_title', en: 'Mengkaji Rukun Iman' }, path: '/tauhid/iman', icon: 'fas fa-shield-heart', duration: 'Minggu 1', frequency: '1x Selesai' },
      { id: 'l1s3', title: { id: 'l1s3_title', en: 'Mengkaji Rukun Islam' }, path: '/tauhid/islam', icon: 'fas fa-kaaba', duration: 'Minggu 1', frequency: '1x Selesai' },
      { id: 'l1s4', title: { id: 'l1s4_title', en: 'Mengenal Sifat-sifat Allah' }, path: '/tauhid/sifat', icon: 'fas fa-infinity', duration: 'Minggu 2', frequency: 'Dibaca Harian' },
      { id: 'l1s5', title: { id: 'l1s5_title', en: 'Mengenal 10 Malaikat Utama' }, path: '/tauhid/malaikat', icon: 'fas fa-feather-alt', duration: 'Minggu 2', frequency: '1x Selesai' },
      { id: 'l1s6', title: { id: 'l1s6_title', en: 'Perjalanan Manusia: Dari Ruh ke Akhirat' }, path: '/timeline-manusia', icon: 'fas fa-hourglass-half', duration: 'Minggu 3', frequency: '1x Selesai' },
      { id: 'l1s7', title: { id: 'l1s7_title', en: 'Peristiwa Hari Kiamat' }, path: '/peristiwa/kiamat', icon: 'fas fa-meteor', duration: 'Minggu 4', frequency: '1x Selesai' },
    ]
  },
  {
    id: 'level-2',
    title: { id: 'l2_title', en: 'Level 2: Meneladani Rasulullah' },
    subtitle: { id: 'l2_subtitle', en: 'Mempelajari perjalanan hidup Nabi Muhammad SAW dan para sahabat untuk dijadikan teladan.' },
    steps: [
      { id: 'l2s1', title: { id: 'l2s1_title', en: 'Garis Waktu Kehidupan Nabi' }, path: '/sirah/timeline', icon: 'fas fa-stream', duration: 'Minggu 5', frequency: '1x Selesai' },
      { id: 'l2s2', title: { id: 'l2s2_title', en: 'Mengenal Silsilah Rasulullah' }, path: '/sirah/silsilah', icon: 'fas fa-network-wired', duration: 'Minggu 5', frequency: '1x Selesai' },
      { id: 'l2s3', title: { id: 'l2s3_title', en: 'Mengenal Keluarga Nabi' }, path: '/sirah/family', icon: 'fas fa-users', duration: 'Minggu 6', frequency: '1x Selesai' },
      { id: 'l2s4', title: { id: 'l2s4_title', en: 'Peperangan di Zaman Nabi' }, path: '/sirah/peperangan', icon: 'fas fa-shield-alt', duration: 'Minggu 7', frequency: '1x Selesai' },
      { id: 'l2s5', title: { id: 'l2s5_title', en: 'Sejarah Khulafaur Rasyidin' }, path: '/sejarah/khulafa', icon: 'fas fa-users', duration: 'Minggu 8', frequency: '1x Selesai' },
    ]
  },
  {
    id: 'level-3',
    title: { id: 'l3_title', en: 'Level 3: Fiqih Ibadah' },
    subtitle: { id: 'l3_subtitle', en: 'Memahami tata cara ibadah wajib dan sunnah sesuai dengan tuntunan syariat.' },
    steps: [
      { id: 'l3s1', title: { id: 'l3s1_title', en: 'Pedoman Bersuci (Thaharah)' }, path: '/pedoman/bersuci', icon: 'fas fa-hands-wash', duration: 'Harian', frequency: 'Praktik Rutin' },
      { id: 'l3s2', title: { id: 'l3s2_title', en: 'Pedoman Shalat' }, path: '/pedoman/shalat', icon: 'fas fa-person-praying', duration: 'Harian', frequency: '5x Sehari' },
      { id: 'l3s3', title: { id: 'l3s3_title', en: 'Pedoman Dzikir Setelah Shalat' }, path: '/pedoman/dzikir', icon: 'fas fa-mosque', duration: 'Harian', frequency: '5x Sehari' },
      { id: 'l3s4', title: { id: 'l3s4_title', en: 'Pedoman Haji & Umrah' }, path: '/pedoman/haji-umrah', icon: 'fas fa-kaaba', duration: 'Kondisional', frequency: '1x Seumur Hidup' },
      { id: 'l3s5', title: { id: 'l3s5_title', en: 'Memahami Dasar Fiqih Ibadah' }, path: '/pedoman/fiqih', icon: 'fas fa-balance-scale', duration: 'Minggu 9', frequency: '1x Selesai' },
    ]
  },
  {
    id: 'level-4',
    title: { id: 'l4_title', en: 'Level 4: Membentuk Akhlak Muslim' },
    subtitle: { id: 'l4_subtitle', en: 'Mengkaji dan meneladani sifat-sifat terpuji dalam Islam untuk membentuk karakter yang mulia.' },
    steps: [
      { id: 'l4s1', title: { id: 'l4s1_title', en: 'Pengertian & Kedudukan Akhlak' }, path: '/akhlak/pengertian', icon: 'fas fa-lightbulb', duration: 'Minggu 10', frequency: '1x Selesai' },
      { id: 'l4s2', title: { id: 'l4s2_title', en: 'Akhlak kepada Allah' }, path: '/akhlak/kepada-allah', icon: 'fas fa-praying-hands', duration: 'Harian', frequency: 'Sepanjang Hayat' },
      { id: 'l4s3', title: { id: 'l4s3_title', en: 'Akhlak kepada Sesama Manusia' }, path: '/akhlak/kepada-manusia', icon: 'fas fa-users', duration: 'Harian', frequency: 'Sepanjang Hayat' },
      { id: 'l4s4', title: { id: 'l4s4_title', en: 'Hadits #1: Niat dan Ikhlas' }, path: '/hadits-arbain/1', icon: 'fas fa-book', duration: 'Minggu 11', frequency: 'Hafalan' },
      { id: 'l4s5', title: { id: 'l4s5_title', en: 'Hadits #7: Agama adalah Nasihat' }, path: '/hadits-arbain/7', icon: 'fas fa-book', duration: 'Minggu 11', frequency: 'Hafalan' },
      { id: 'l4s6', title: { id: 'l4s6_title', en: 'Hadits #16: Jangan Marah' }, path: '/hadits-arbain/16', icon: 'fas fa-book', duration: 'Minggu 12', frequency: 'Hafalan' },
    ]
  },
  {
    id: 'level-5',
    title: { id: 'l5_title', en: 'Level 5: Sejarah & Peradaban Islam' },
    subtitle: { id: 'l5_subtitle', en: 'Menjelajahi keagungan dan pelajaran dari sejarah Islam.' },
    steps: [
      { id: 'l5s1', title: { id: 'l5s1_title', en: 'Dinasti Umayyah' }, path: '/sejarah/umayyah', icon: 'fas fa-archway', duration: 'Minggu 13', frequency: '1x Selesai' },
      { id: 'l5s2', title: { id: 'l5s2_title', en: 'Dinasti Abbasiyah' }, path: '/sejarah/abbasiyah', icon: 'fas fa-book-open-reader', duration: 'Minggu 14', frequency: '1x Selesai' },
      { id: 'l5s3', title: { id: 'l5s3_title', en: 'Zaman Keemasan Islam' }, path: '/sejarah/emas', icon: 'fas fa-flask', duration: 'Minggu 15', frequency: '1x Selesai' },
      { id: 'l5s4', title: { id: 'l5s4_title', en: 'Islam di Andalusia' }, path: '/sejarah/andalusia', icon: 'fas fa-mosque', duration: 'Minggu 16', frequency: '1x Selesai' },
      { id: 'l5s5', title: { id: 'l5s5_title', en: 'Perang Salib' }, path: '/sejarah/salib', icon: 'fas fa-shield-halved', duration: 'Minggu 17', frequency: '1x Selesai' },
      { id: 'l5s6', title: { id: 'l5s6_title', en: 'Kesultanan Utsmaniyah' }, path: '/sejarah/utsmaniyah', icon: 'fas fa-moon', duration: 'Minggu 18', frequency: '1x Selesai' },
      { id: 'l5s7', title: { id: 'l5s7_title', en: 'Islam di Indonesia' }, path: '/sejarah/indonesia', icon: 'fas fa-mosque', duration: 'Minggu 19', frequency: '1x Selesai' },
    ]
  },
  {
    id: 'level-6',
    title: { id: 'l6_title', en: 'Level 6: Mendalami Ulumul Qur\'an & Hadits' },
    subtitle: { id: 'l6_subtitle', en: 'Knowing the fundamental sciences for understanding revelation.' },
    steps: [
      { id: 'l6s1', title: { id: 'l6s1_title', en: 'Sejarah Turunnya Al-Qur\'an' }, path: '/sejarah/alquran', icon: 'fas fa-book-quran', duration: 'Minggu 20', frequency: '1x Selesai' },
      { id: 'l6s2', title: { id: 'l6s2_title', en: 'Pengantar Ulumul Qur\'an' }, path: '/ensiklopedia/ulumul-quran', icon: 'fas fa-book-quran', duration: 'Minggu 21', frequency: '1x Selesai' },
      { id: 'l6s3', title: { id: 'l6s3_title', en: 'Pengantar Ulumul Hadits' }, path: '/ensiklopedia/ulumul-hadits', icon: 'fas fa-book', duration: 'Minggu 22', frequency: '1x Selesai' },
    ]
  },
  {
    id: 'level-7',
    title: { id: 'l7_title', en: 'Level 7: Fiqih Kehidupan' },
    subtitle: { id: 'l7_subtitle', en: 'Memahami hukum-hukum Islam dalam interaksi sosial dan ekonomi.' },
    steps: [
      { id: 'l7s1', title: { id: 'l7s1_title', en: 'Fiqih Muamalah (Ekonomi)' }, path: '/pedoman/muamalah', icon: 'fas fa-handshake', duration: 'Minggu 23', frequency: '1x Selesai' },
      { id: 'l7s2', title: { id: 'l7s2_title', en: 'Fiqih Munakahat (Pernikahan)' }, path: '/ensiklopedia/fiqh-munakahat', icon: 'fas fa-ring', duration: 'Minggu 24', frequency: '1x Selesai' },
      { id: 'l7s3', title: { id: 'l7s3_title', en: 'Fiqih Jinayat (Hukum Pidana)' }, path: '/ensiklopedia/fiqh-jinayat', icon: 'fas fa-gavel', duration: 'Minggu 25', frequency: '1x Selesai' },
      { id: 'l7s4', title: { id: 'l7s4_title', en: 'Mengenal Mazhab Fiqih' }, path: '/ensiklopedia/madzhab', icon: 'fas fa-code-branch', duration: 'Minggu 26', frequency: '1x Selesai' },
      { id: 'l7s5', title: { id: 'l7s5_title', en: 'Memahami Maqashid Syariah' }, path: '/hukum-syariah/maqashid-syariah', icon: 'fas fa-bullseye', duration: 'Minggu 27', frequency: '1x Selesai' },
      { id: 'l7s6', title: { id: 'l7s6_title', en: 'Klasifikasi Hukum Islam' }, path: '/hukum-syariah/klasifikasi-hukum', icon: 'fas fa-clipboard-list', duration: 'Minggu 28', frequency: '1x Selesai' },
    ]
  },
  {
    id: 'level-8',
    title: { id: 'l8_title', en: 'Level 8: Penyucian Jiwa (Tazkiyatun Nafs)' },
    subtitle: { id: 'l8_subtitle', en: 'Mendalami aspek batiniah untuk mencapai kedekatan dengan Allah.' },
    steps: [
      { id: 'l8s1', title: { id: 'l8s1_title', en: 'Sejarah Tasawuf & Sufisme' }, path: '/sejarah/tasawuf', icon: 'fas fa-heart', duration: 'Minggu 29', frequency: '1x Selesai' },
      { id: 'l8s2', title: { id: 'l8s2_title', en: 'Struktur Jiwa (Ruh, Nafs, Qalb)' }, path: '/psikologi/struktur-jiwa', icon: 'fas fa-puzzle-piece', duration: 'Minggu 30', frequency: '1x Selesai' },
      { id: 'l8s3', title: { id: 'l8s3_title', en: 'Hakikat Kesabaran' }, path: '/akhlak/sabar', icon: 'fas fa-leaf', duration: 'Harian', frequency: 'Praktik' },
      { id: 'l8s4', title: { id: 'l8s4_title', en: 'Hakikat Rasa Syukur' }, path: '/akhlak/syukur', icon: 'fas fa-pray', duration: 'Harian', frequency: 'Praktik' },
      { id: 'l8s5', title: { id: 'l8s5_title', en: 'Hakikat Keikhlasan' }, path: '/akhlak/ikhlas', icon: 'fas fa-seedling', duration: 'Harian', frequency: 'Praktik' },
      { id: 'l8s6', title: { id: 'l8s6_title', en: 'Hakikat Tawadhu (Rendah Hati)' }, path: '/akhlak/tawadhu', icon: 'fas fa-feather-alt', duration: 'Harian', frequency: 'Praktik' },
      { id: 'l8s7', title: { id: 'l8s7_title', en: 'Hakikat Zuhud' }, path: '/akhlak/zuhud', icon: 'fas fa-hand-holding', duration: 'Harian', frequency: 'Praktik' },
      { id: 'l8s8', title: { id: 'l8s8_title', en: 'Hakikat Tawakal' }, path: '/akhlak/tawakal', icon: 'fas fa-dove', duration: 'Harian', frequency: 'Praktik' },
    ]
  }
];
