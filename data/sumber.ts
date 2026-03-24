export interface SumberItem {
  title: { id: string; en: string };
  description: { id: string; en: string };
  url: string;
  icon: string;
}

export const sumberData: SumberItem[] = [
  // Quran & Hadith Primary Sources
  {
    title: { id: 'Quran.com', en: 'Quran.com' },
    description: { id: 'Sumber utama untuk teks Al-Qur\'an, terjemahan dalam berbagai bahasa, dan tafsir. Digunakan untuk data pada fitur Mushaf Al-Qur\'an.', en: 'Primary source for Qur\'an text, translations in various languages, and tafsir. Used for data in the Mushaf Al-Qur\'an feature.' },
    url: 'https://quran.com',
    icon: 'fas fa-book-quran'
  },
  {
    title: { id: 'Sunnah.com', en: 'Sunnah.com' },
    description: { id: 'Koleksi hadits terlengkap dari berbagai kitab (Bukhari, Muslim, Tirmidzi, dll). Menjadi referensi utama untuk konten hadits.', en: 'The most complete hadith collection from various books (Bukhari, Muslim, Tirmidhi, etc.). Serves as the main reference for hadith content.' },
    url: 'https://sunnah.com',
    icon: 'fas fa-book'
  },
  // Indonesian Official & Major Sources
  {
    title: { id: 'MUI Digital', en: 'MUI Digital' },
    description: { id: 'Situs resmi Majelis Ulama Indonesia. Sumber utama fatwa dan pandangan keagamaan resmi untuk umat Islam di Indonesia.', en: 'Official website of the Indonesian Ulema Council. The main source for official fatwas and religious views for Muslims in Indonesia.' },
    url: 'https://mui.or.id',
    icon: 'fas fa-landmark'
  },
  {
    title: { id: 'Lajnah Pentashihan Mushaf Al-Qur\'an', en: 'Lajnah for Mushaf Tashih' },
    description: { id: 'Lembaga resmi di bawah Kementerian Agama RI yang bertugas mentashih (memverifikasi) Mushaf Al-Qur\'an. Sumber otoritatif untuk studi Al-Qur\'an di Indonesia.', en: 'An official institution under the Indonesian Ministry of Religious Affairs tasked with verifying (tashih) the Mushaf Al-Qur\'an. An authoritative source for Qur\'anic studies in Indonesia.' },
    url: 'https://lajnah.kemenag.go.id',
    icon: 'fas fa-book-quran'
  },
  {
    title: { id: 'NU Online', en: 'NU Online' },
    description: { id: 'Referensi untuk pedoman ibadah, tahlil, dan doa-doa harian yang sesuai dengan tradisi Ahlussunnah wal Jama\'ah di Indonesia.', en: 'Reference for worship guides, tahlil, and daily prayers according to the Ahlussunnah wal Jama\'ah tradition in Indonesia.' },
    url: 'https://nu.or.id',
    icon: 'fas fa-mosque'
  },
  {
    title: { id: 'Muhammadiyah.or.id', en: 'Muhammadiyah.or.id' },
    description: { id: 'Situs resmi PP Muhammadiyah. Sumber fatwa Majelis Tarjih dan Tajdid serta berita seputar organisasi Islam modernis terbesar di Indonesia.', en: 'Official website of PP Muhammadiyah. Source of fatwas from the Tarjih and Tajdid Council and news about Indonesia\'s largest modernist Islamic organization.' },
    url: 'https://muhammadiyah.or.id',
    icon: 'fas fa-sun'
  },
  // Indonesian Philanthropy & Zakat Bodies
  {
    title: { id: 'BAZNAS', en: 'BAZNAS' },
    description: { id: 'Badan Amil Zakat Nasional. Referensi utama untuk informasi seputar zakat, infaq, dan sedekah di Indonesia.', en: 'The National Zakat Agency. The main reference for information about zakat, infaq, and sadaqah in Indonesia.' },
    url: 'https://baznas.go.id',
    icon: 'fas fa-donate'
  },
  {
    title: { id: 'KitaBisa', en: 'KitaBisa' },
    description: { id: 'Platform crowdfunding sosial untuk donasi dan zakat. Memberikan perspektif praktis tentang filantropi Islam modern.', en: 'A social crowdfunding platform for donations and zakat. Provides practical perspectives on modern Islamic philanthropy.' },
    url: 'https://kitabisa.com',
    icon: 'fas fa-hands-helping'
  },
  {
    title: { id: 'Dompet Dhuafa', en: 'Dompet Dhuafa' },
    description: { id: 'Lembaga filantropi Islam yang berkhidmat dalam pemberdayaan kaum dhuafa. Sumber inspirasi dan data mengenai program kemanusiaan.', en: 'An Islamic philanthropic institution dedicated to empowering the poor. A source of inspiration and data on humanitarian programs.' },
    url: 'https://dompetdhuafa.org',
    icon: 'fas fa-wallet'
  },
  {
    title: { id: 'Rumah Zakat', en: 'Rumah Zakat' },
    description: { id: 'Lembaga amil zakat nasional yang fokus pada program-program pemberdayaan masyarakat di bidang pendidikan, kesehatan, ekonomi, dan lingkungan.', en: 'A national zakat institution focusing on community empowerment programs in education, health, economy, and the environment.' },
    url: 'https://www.rumahzakat.org',
    icon: 'fas fa-home'
  },
  {
    title: { id: 'LAZISNU', en: 'LAZISNU' },
    description: { id: 'Lembaga Amil Zakat, Infak, dan Sedekah Nahdlatul Ulama. Mengelola dana ZISWAF dari warga Nahdliyin untuk program sosial dan keagamaan.', en: 'The Zakat, Infaq, and Sadaqah Agency of Nahdlatul Ulama. Manages ZISWAF funds from Nahdliyin for social and religious programs.' },
    url: 'https://nucare.id',
    icon: 'fas fa-mosque'
  },
  {
    title: { id: 'LAZISMU', en: 'LAZISMU' },
    description: { id: 'Lembaga Amil Zakat, Infak, dan Sedekah Muhammadiyah. Berfokus pada program-program pemberdayaan dan filantropi Islam yang modern dan terstruktur.', en: 'The Zakat, Infaq, and Sadaqah Agency of Muhammadiyah. Focuses on modern and structured Islamic empowerment and philanthropy programs.' },
    url: 'https://lazismu.org',
    icon: 'fas fa-sun'
  },
  // Indonesian Da'wah Portals
  {
    title: { id: 'Muslim.or.id', en: 'Muslim.or.id' },
    description: { id: 'Artikel-artikel mengenai tauhid, aqidah, dan pemahaman dasar-dasar keislaman. Menjadi salah satu acuan konten edukasi.', en: 'Articles on tawhid, aqidah, and understanding the fundamentals of Islam. Serves as one of the educational content references.' },
    url: 'https://muslim.or.id',
    icon: 'fas fa-star-and-crescent'
  },
  {
    title: { id: 'Rumaysho.com', en: 'Rumaysho.com' },
    description: { id: 'Situs yang menyajikan pembahasan fiqh, aqidah, dan amalan harian secara mendalam berdasarkan Al-Qur\'an dan Sunnah dengan pemahaman salafus shalih.', en: 'A site that presents in-depth discussions of fiqh, aqidah, and daily practices based on the Qur\'an and Sunnah with the understanding of the salafus shalih.' },
    url: 'https://rumaysho.com',
    icon: 'fas fa-feather-alt'
  },
  {
    title: { id: 'KonsultasiSyariah.com', en: 'KonsultasiSyariah.com' },
    description: { id: 'Media tanya jawab seputar hukum Islam (fiqh) sehari-hari yang diasuh oleh para ustadz ahlussunnah. Referensi untuk masalah-masalah kontemporer.', en: 'A Q&A platform regarding daily Islamic law (fiqh) hosted by Ahlussunnah scholars. Reference for contemporary issues.' },
    url: 'https://konsultasisyariah.com',
    icon: 'fas fa-comments'
  },
  {
    title: { id: 'Almanhaj.or.id', en: 'Almanhaj.or.id' },
    description: { id: 'Menyajikan artikel-artikel aqidah, manhaj, dan fiqh berdasarkan pemahaman Salafus Shalih. Referensi tambahan untuk studi keislaman.', en: 'Presents articles on aqidah, manhaj, and fiqh based on the understanding of the Salafus Shalih. An additional reference for Islamic studies.' },
    url: 'https://almanhaj.or.id',
    icon: 'fas fa-book-reader'
  },
  {
    title: { id: 'LIDWA PUSAKA', en: 'LIDWA PUSAKA' },
    description: { id: 'Pusat studi hadits di Indonesia, pengembang Ensiklopedi Hadits Kitab 9 Imam. Referensi untuk verifikasi dan studi hadits.', en: 'A center for hadith studies in Indonesia, developer of the 9 Imams Hadith Encyclopedia. A reference for hadith verification and study.' },
    url: 'https://lidwa.com',
    icon: 'fas fa-database'
  },
  // International Portals & Fatwa Banks
  {
    title: { id: 'IslamQA.info', en: 'IslamQA.info' },
    description: { id: 'Bank data fatwa dan jawaban Islami yang luas, mencakup berbagai pertanyaan fiqh dan aqidah. Salah satu referensi tanya jawab Islam terbesar.', en: 'A vast databank of fatwas and Islamic answers, covering various fiqh and aqidah questions. One of the largest Islamic Q&A references.' },
    url: 'https://islamqa.info',
    icon: 'fas fa-question-circle'
  },
  {
    title: { id: 'Islamweb.net', en: 'Islamweb.net' },
    description: { id: 'Portal Islam internasional yang menyediakan bank fatwa yang luas, artikel, dan konsultasi dalam berbagai bahasa, termasuk bahasa Indonesia.', en: 'An international Islamic portal that provides an extensive fatwa bank, articles, and consultations in various languages, including Indonesian.' },
    url: 'https://www.islamweb.net',
    icon: 'fas fa-globe'
  },
  // International Academic & Research Institutes
  {
    title: { id: 'Yaqeen Institute', en: 'Yaqeen Institute' },
    description: { id: 'Lembaga penelitian Islam internasional yang menyediakan riset mendalam dan artikel mengenai berbagai topik keislaman kontemporer dan klasik.', en: 'An international Islamic research institute that provides in-depth research and articles on various contemporary and classic Islamic topics.' },
    url: 'https://yaqeeninstitute.org',
    icon: 'fas fa-university'
  },
  {
    title: { id: 'SeekersGuidance', en: 'SeekersGuidance' },
    description: { id: 'Akademi Islam global online yang menyediakan kursus dan jawaban terverifikasi berdasarkan kurikulum madzhab Sunni tradisional.', en: 'A global online Islamic academy providing courses and verified answers based on the traditional Sunni madhhab curriculum.' },
    url: 'https://seekersguidance.org',
    icon: 'fas fa-graduation-cap'
  },
  {
    title: { id: 'Bayna (Zaytuna College)', en: 'Bayna (Zaytuna College)' },
    description: { id: 'Publikasi online dari Zaytuna College, perguruan tinggi Islam liberal pertama di AS. Menyajikan esai mendalam tentang pemikiran Islam, seni, dan budaya.', en: 'Online publication from Zaytuna College, the first liberal arts Islamic college in the US. Presents in-depth essays on Islamic thought, art, and culture.' },
    url: 'https://bayna.zaytuna.edu',
    icon: 'fas fa-scroll'
  },
  // Media & General Portals
  {
    title: { id: 'Muslim Central', en: 'Muslim Central' },
    description: { id: 'Arsip audio ceramah Islam terbesar dari berbagai penceramah di seluruh dunia. Tersedia dalam format podcast dan streaming.', en: 'The largest audio archive of Islamic lectures from various speakers worldwide. Available in podcast and streaming formats.' },
    url: 'https://muslimcentral.com',
    icon: 'fas fa-podcast'
  },
  {
    title: { id: 'About Islam', en: 'About Islam' },
    description: { id: 'Portal Islam internasional yang berbasis di Kanada. Menyediakan jawaban atas pertanyaan tentang Islam, artikel gaya hidup, dan dukungan bagi mualaf.', en: 'An international Islamic portal based in Canada. Provides answers to questions about Islam, lifestyle articles, and support for converts.' },
    url: 'https://aboutislam.net',
    icon: 'fas fa-info-circle'
  },
  {
    title: { id: 'Islamicity.org', en: 'Islamicity.org' },
    description: { id: 'Salah satu situs web Islam tertua dan terbesar yang berbasis di AS. Menyediakan berita, artikel, dan berbagai sumber daya tentang Islam dan dunia Muslim.', en: 'One of the oldest and largest Islamic websites based in the US. Provides news, articles, and various resources about Islam and the Muslim world.' },
    url: 'https://www.islamicity.org',
    icon: 'fas fa-globe-americas'
  },
  {
    title: { id: 'Islamic Relief Worldwide', en: 'Islamic Relief Worldwide' },
    description: { id: 'Organisasi kemanusiaan internasional yang terinspirasi oleh nilai-nilai Islam. Sumber perspektif tentang aksi sosial dalam Islam.', en: 'An international humanitarian organization inspired by Islamic values. A source for perspectives on social action in Islam.' },
    url: 'https://islamic-relief.org',
    icon: 'fas fa-hands-helping'
  },
  {
    title: { id: 'ProductiveMuslim', en: 'ProductiveMuslim' },
    description: { id: 'Platform internasional yang fokus pada produktivitas dari perspektif Islam. Sumber inspirasi untuk menggabungkan iman dengan pengembangan diri.', en: 'An international platform focusing on productivity from an Islamic perspective. A source of inspiration for combining faith with self-development.' },
    url: 'https://productivemuslim.com',
    icon: 'fas fa-chart-line'
  },
  // General Encyclopedic Sources
  {
    title: { id: 'Wikipedia', en: 'Wikipedia' },
    description: { id: 'Ensiklopedia online sebagai referensi awal untuk garis waktu dan data umum mengenai sejarah peradaban Islam, ilmuwan, dan peristiwa penting.', en: 'Online encyclopedia as an initial reference for timelines and general data regarding the history of Islamic civilization, scientists, and important events.' },
    url: 'https://en.wikipedia.org',
    icon: 'fab fa-wikipedia-w'
  },
  {
    title: { id: 'Britannica Encyclopedia', en: 'Britannica Encyclopedia' },
    description: { id: 'Ensiklopedia umum bereputasi tinggi yang digunakan sebagai referensi silang untuk data sejarah non-religius, seperti biografi ilmuwan dan garis waktu peradaban.', en: 'A reputable general encyclopedia used for cross-referencing non-religious historical data, such as biographies of scientists and civilization timelines.' },
    url: 'https://www.britannica.com',
    icon: 'fas fa-atlas'
  }
];