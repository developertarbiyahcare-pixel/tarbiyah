import type { ContentPage } from '../types';

export interface SirahTopic {
    id: string;
    title: string;
    icon: string;
    subtitle: string;
    content: any[]; // Matches the structure of other data files like sejarah.ts
}

const rawSirahData = {
    timeline: [
        { year: "570 M", event: "Kelahiran Nabi (Tahun Gajah)", description: "Lahir di Makkah pada hari Senin, 12 Rabiul Awal. Ayahnya, Abdullah, telah wafat sebelum kelahirannya." },
        { year: "576 M", event: "Wafatnya Ibunda", description: "Ibunya, Aminah, wafat saat beliau berusia 6 tahun. Diasuh oleh kakeknya, Abdul Muthalib." },
        { year: "578 M", event: "Wafatnya Kakek", description: "Kakeknya, Abdul Muthalib, wafat. Diasuh oleh pamannya, Abu Thalib." },
        { year: "595 M", event: "Menikah dengan Khadijah", description: "Pada usia 25 tahun, beliau menikah dengan Khadijah binti Khuwailid, seorang saudagar wanita terhormat." },
        { year: "610 M", event: "Penerimaan Wahyu Pertama", description: "Di usia 40 tahun, menerima wahyu pertama di Gua Hira melalui Malaikat Jibril. Diangkat menjadi Nabi dan Rasul." },
        { year: "613 M", event: "Dakwah Terang-terangan", description: "Setelah tiga tahun berdakwah secara sembunyi-sembunyi, beliau memulai dakwah secara terang-terangan." },
        { year: "619 M", event: "Tahun Kesedihan ('Amul Huzn)", description: "Ditinggal wafat oleh istri tercinta, Khadijah, dan paman pelindungnya, Abu Thalib." },
        { year: "621 M", event: "Isra' Mi'raj", description: "Perjalanan spiritual dari Masjidil Haram ke Masjidil Aqsa, lalu naik ke Sidratul Muntaha untuk menerima perintah shalat lima waktu." },
        { year: "622 M", event: "Hijrah ke Madinah", description: "Bersama Abu Bakar, beliau berhijrah dari Makkah ke Yatsrib (Madinah) untuk menghindari ancaman kaum Quraisy. Menjadi awal penanggalan kalender Islam." },
        { year: "624 M", event: "Perang Badar", description: "Kemenangan besar pertama kaum Muslimin melawan kaum Quraisy Makkah." },
        { year: "628 M", event: "Perjanjian Hudaibiyah", description: "Perjanjian damai antara kaum Muslimin dengan kaum Quraisy yang membuka jalan bagi dakwah Islam." },
        { year: "630 M", event: "Fathu Makkah (Penaklukan Makkah)", description: "Nabi dan kaum Muslimin kembali ke Makkah dan menaklukkannya tanpa pertumpahan darah." },
        { year: "632 M", event: "Haji Wada' (Haji Perpisahan)", description: "Melaksanakan ibadah haji terakhirnya dan menyampaikan khutbah perpisahan yang monumental di Arafah." },
        { year: "632 M", event: "Wafatnya Rasulullah SAW", description: "Wafat pada hari Senin, 12 Rabiul Awal tahun 11 Hijriah di Madinah pada usia 63 tahun." },
    ],
    genealogy: [
        { name: "Adam A.S.", period: "Manusia & Nabi Pertama", description: "Nabi dan manusia pertama yang diciptakan Allah. Seluruh umat manusia adalah keturunannya." },
        { name: "Nuh A.S.", period: "Rasul Ulul Azmi", description: "Salah satu dari lima Rasul Ulul Azmi, leluhur kedua umat manusia setelah banjir besar." },
        { name: "Ibrahim A.S.", period: "Bapak Para Nabi (Abul Anbiya)", description: "Rasul Ulul Azmi yang membangun kembali Ka'bah bersama putranya, Ismail. Leluhur dari banyak nabi." },
        { name: "Ismail A.S.", period: "Putra Ibrahim A.S.", description: "Nabi yang sabar, membantu ayahnya membangun Ka'bah dan menjadi leluhur bagi bangsa Arab Musta'ribah." },
        { name: "Adnan", period: "Hidup sekitar Abad ke-2 SM", description: "Tokoh yang disepakati oleh para sejarawan sebagai nenek moyang bangsa Arab Adnaniyah (Arab Utara) dan titik silsilah yang paling otentik ke atas." },
        { name: "Ma'add bin Adnan", period: "Hidup sekitar Abad ke-1 SM", description: "Seorang pejuang pemberani yang keturunannya menyebar ke seluruh Jazirah Arab." },
        { name: "Nizar bin Ma'add", period: "Hidup sekitar Abad ke-1 M", description: "Menjadi leluhur dari banyak suku Arab besar." },
        { name: "Mudar bin Nizar", period: "Hidup sekitar Abad ke-2 M", description: "Leluhur dari suku-suku Mudar, salah satu dari dua cabang besar suku Arab Utara." },
        { name: "Ilyas bin Mudar", period: "Hidup sekitar Abad ke-2 M", description: "Orang pertama yang memulai tradisi mengkhususkan unta untuk dikorbankan di Ka'bah." },
        { name: "Mudrikah bin Ilyas", period: "Hidup sekitar Abad ke-3 M", description: "Namanya berarti 'yang mencapai', karena ia dikatakan berhasil menemukan kembali warisan ayahnya." },
        { name: "Khuzaymah bin Mudrikah", period: "Hidup sekitar Abad ke-3 M", description: "Seorang tokoh yang dihormati di kalangan keturunannya." },
        { name: "Kinanah bin Khuzaymah", period: "Hidup sekitar Abad ke-3 M", description: "Leluhur dari suku Bani Kinanah, sebuah suku besar yang mencakup suku Quraisy." },
        { name: "An-Nadr bin Kinanah", period: "Hidup sekitar Abad ke-4 M", description: "Beberapa riwayat menyebutkan bahwa namanya adalah Qais." },
        { name: "Malik bin An-Nadr", period: "Hidup sekitar Abad ke-4 M", description: "Leluhur yang melanjutkan garis keturunan terhormat menuju Nabi Muhammad." },
        { name: "Fihr bin Malik (Quraisy)", period: "Hidup sekitar Abad ke-4 M", description: "Tokoh yang sangat berpengaruh sehingga seluruh keturunannya mulai diidentifikasi sebagai suku 'Quraisy'." },
        { name: "Ghalib bin Fihr", period: "Hidup sekitar Abad ke-4 M", description: "Dikenal karena kekuatan dan kemenangannya (ghalib berarti 'pemenang') dalam melindungi Makkah." },
        { name: "Lu'ayy bin Ghalib", period: "Hidup sekitar Abad ke-4 M", description: "Leluhur yang semakin mengukuhkan posisi keturunannya di Makkah." },
        { name: "Ka'b bin Lu'ayy", period: "Wafat ~373 M", description: "Seorang pemimpin yang sangat dihormati. Ia adalah orang pertama yang menetapkan hari Jumat (Jumu'ah) sebagai hari berkumpul." },
        { name: "Murrah bin Ka'b", period: "Wafat ~404 M", description: "Di sinilah garis keturunan Abu Bakar Ash-Shiddiq dan Nabi Muhammad berpisah." },
        { name: "Kilab bin Murrah", period: "Wafat ~428 M", description: "Namanya berarti 'anjing pemburu', karena kecintaannya pada berburu. Ia leluhur dari klan Bani Zuhrah (klan ibunda Nabi)." },
        { name: "Qusayy bin Kilab", period: "Lahir ~400 M, Wafat ~480 M", description: "Tokoh revolusioner yang menyatukan kembali suku Quraisy, merebut kembali kendali atas Makkah dan Ka'bah, serta mendirikan Dar An-Nadwah (balai pertemuan)." },
        { name: "Abdu Manaf bin Qusayy", period: "Lahir ~430 M", description: "Mewarisi kehormatan ayahnya dan menjadi leluhur dari empat klan utama Quraisy: Bani Hashim, Bani Abd Syams, Bani Muththalib, dan Bani Nawfal." },
        { name: "Hashim bin Abdu Manaf", period: "Lahir ~464 M, Wafat ~497 M", description: "Seorang pemimpin yang sangat dermawan, memulai tradisi perjalanan dagang musim dingin dan musim panas. Leluhur dari klan Bani Hashim." },
        { name: "Abdul Muttalib bin Hashim", period: "Lahir ~497 M, Wafat 578 M", description: "Kakek Nabi Muhammad SAW. Ia menemukan kembali sumur Zamzam dan menjadi pemimpin Makkah yang disegani, termasuk saat menghadapi pasukan gajah Abrahah." },
        { name: "Abdullah bin Abdul Muttalib", period: "Lahir ~546 M, Wafat 570 M", description: "Ayah dari Nabi Muhammad SAW. Ia wafat dalam perjalanan dagang ke Syam beberapa bulan sebelum kelahiran putranya." },
        { name: "Muhammad SAW", period: "Lahir 570 M, Wafat 632 M", description: "Rasul terakhir, penutup para nabi, dan pembawa risalah Islam. Rahmat bagi seluruh alam." },
    ],
    battles: [
        { name: "Perang Badar", year: "2 H / 624 M", muslimTroops: "313", enemyTroops: "1.000 (Quraisy)", outcome: "Kemenangan telak bagi kaum Muslimin." },
        { name: "Perang Uhud", year: "3 H / 625 M", muslimTroops: "700", enemyTroops: "3.000 (Quraisy)", outcome: "Kekalahan bagi kaum Muslimin karena ketidakpatuhan sebagian pasukan." },
        { name: "Perang Khandaq (Ahzab)", year: "5 H / 627 M", muslimTroops: "3.000", enemyTroops: "10.000 (Ahzab/Koalisi)", outcome: "Kemenangan strategis bagi kaum Muslimin melalui taktik parit." },
        { name: "Perang Khaibar", year: "7 H / 628 M", muslimTroops: "1.400", enemyTroops: "10.000 (Yahudi Khaibar)", outcome: "Kemenangan kaum Muslimin atas Yahudi di benteng Khaibar." },
        { name: "Perang Mu'tah", year: "8 H / 629 M", muslimTroops: "3.000", enemyTroops: "~200.000 (Bizantium & sekutunya)", outcome: "Pertempuran sengit, Khalid bin Walid menunjukkan kehebatannya." },
        { name: "Fathu Makkah", year: "8 H / 630 M", muslimTroops: "10.000", enemyTroops: "Quraisy Makkah", outcome: "Penaklukan kota Makkah secara damai." },
        { name: "Perang Hunain", year: "8 H / 630 M", muslimTroops: "12.000", enemyTroops: "20.000 (Suku Hawazin & Tsaqif)", outcome: "Kemenangan setelah sempat terdesak di awal pertempuran." },
        { name: "Perang Tabuk", year: "9 H / 630 M", muslimTroops: "30.000", enemyTroops: "Bizantium", outcome: "Ekspedisi militer terbesar tanpa terjadinya pertempuran." },
    ],
    wives: [
        { name: "Khadijah binti Khuwailid", description: "Istri pertama dan satu-satunya selama hidupnya. Seorang saudagar cerdas dan wanita pertama yang beriman." },
        { name: "Saudah binti Zam'ah", description: "Dinikahi setelah wafatnya Khadijah, seorang janda yang sudah berumur." },
        { name: "Aisyah binti Abu Bakar", description: "Putri sahabat terdekat, Abu Bakar. Dikenal karena kecerdasan dan banyak meriwayatkan hadis." },
        { name: "Hafsah binti Umar", description: "Putri dari Umar bin Khattab. Diberi amanah untuk menjaga mushaf Al-Qur'an pertama." },
        { name: "Zainab binti Khuzaimah", description: "Dikenal dengan julukan 'Ummul Masakin' (Ibu orang-orang miskin) karena kedermawanannya." },
        { name: "Ummu Salamah", description: "Seorang janda dengan beberapa anak, dikenal karena kebijaksanaannya." },
        { name: "Zainab binti Jahsy", description: "Pernikahannya dengan Nabi adalah perintah langsung dari Allah dalam Al-Qur'an." },
        { name: "Juwairiyah binti al-Harits", description: "Putri pemimpin Bani Musthaliq, pernikahannya membebaskan banyak tawanan perang." },
        { name: "Ummu Habibah (Ramlah binti Abu Sufyan)", description: "Putri dari Abu Sufyan, yang saat itu masih memusuhi Islam." },
        { name: "Shafiyah binti Huyay", description: "Berasal dari kalangan Yahudi Bani Nadhir, ayahnya adalah seorang pemimpin." },
        { name: "Maimunah binti al-Harits", description: "Istri terakhir yang dinikahi oleh Rasulullah SAW." },
    ],
    children: [
        { name: "Al-Qasim", description: "Putra pertama, dari Khadijah. Wafat saat masih kecil. Nabi dijuluki 'Abul Qasim'." },
        { name: "Zainab", description: "Putri tertua, dari Khadijah. Menikah dengan Abul 'Ash bin ar-Rabi'." },
        { name: "Ruqayyah", description: "Putri kedua, dari Khadijah. Menikah dengan Utsman bin Affan." },
        { name: "Ummu Kultsum", description: "Putri ketiga, dari Khadijah. Menikah dengan Utsman bin Affan setelah Ruqayyah wafat." },
        { name: "Fatimah Az-Zahra", description: "Putri bungsu, dari Khadijah. Sangat dicintai Nabi, menikah dengan Ali bin Abi Thalib." },
        { name: "Abdullah", description: "Putra kedua, dari Khadijah. Juga wafat saat masih kecil. Dijuluki Ath-Thayyib dan Ath-Thahir." },
        { name: "Ibrahim", description: "Putra dari Mariyah Al-Qibtiyyah. Wafat saat masih bayi, membuat Nabi sangat bersedih." },
    ]
};

export const sirahData: SirahTopic[] = [
    {
        id: 'timeline',
        title: 'Garis Waktu Kehidupan Nabi',
        icon: 'fas fa-stream',
        subtitle: 'Perjalanan hidup Nabi Muhammad SAW dari lahir hingga wafat.',
        content: [{
            type: 'table',
            table: {
                headers: ['Tahun (M)', 'Peristiwa', 'Deskripsi'],
                rows: rawSirahData.timeline.map(e => [e.year, e.event, e.description])
            }
        }]
    },
    {
        id: 'silsilah',
        title: 'Silsilah Nasab Rasulullah',
        icon: 'fas fa-network-wired',
        subtitle: 'Garis keturunan mulia dari Nabi Adam hingga Nabi Muhammad SAW.',
        content: [{
            type: 'list',
            items: rawSirahData.genealogy.map(e => ({ title: `${e.name} (${e.period})`, points: [e.description] }))
        }]
    },
    {
        id: 'peperangan',
        title: 'Peperangan di Zaman Nabi',
        icon: 'fas fa-shield-alt',
        subtitle: 'Daftar pertempuran utama yang dihadapi kaum Muslimin.',
        content: [{
            type: 'table',
            table: {
                headers: ['Nama Perang', 'Tahun', 'Pasukan Muslimin', 'Pasukan Musuh', 'Hasil'],
                rows: rawSirahData.battles.map(b => [b.name, b.year, b.muslimTroops, b.enemyTroops, b.outcome])
            }
        }]
    },
    {
        id: 'family',
        title: 'Keluarga Rasulullah SAW',
        icon: 'fas fa-users',
        subtitle: 'Mengenal istri-istri dan putra-putri Nabi Muhammad SAW.',
        content: [
            {
                type: 'list',
                title: 'Istri-Istri Nabi (Ummul Mukminin)',
                items: rawSirahData.wives.map(w => ({ title: w.name, points: [w.description] }))
            },
            {
                type: 'list',
                title: 'Putra-Putri Nabi',
                items: rawSirahData.children.map(c => ({ title: c.name, points: [c.description] }))
            }
        ]
    },
];