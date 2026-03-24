export interface PetaPeristiwaItem {
  id: string;
  title: string;
  description: string;
  coordinates: [number, number]; // [lat, lng]
  relatedPath?: string;
}

export const petaPeristiwaData: PetaPeristiwaItem[] = [
    {
        id: 'kabah',
        title: 'Ka\'bah, Makkah',
        description: 'Dibangun kembali oleh Nabi Ibrahim dan Ismail. Pusat ibadah haji dan kiblat umat Islam.',
        coordinates: [21.4225, 39.8262],
        relatedPath: '/kisah-nabi/ibrahim',
    },
    {
        id: 'madain_saleh',
        title: 'Al-Hijr (Mada\'in Saleh)',
        description: 'Tempat tinggal Kaum Tsamud, umat Nabi Saleh, yang memahat rumah di gunung batu.',
        coordinates: [26.8123, 37.9546],
        relatedPath: '/kisah-nabi/saleh',
    },
    {
        id: 'sodom',
        title: 'Sodom & Gomorrah (Laut Mati)',
        description: 'Lokasi Kaum Lut yang dibinasakan Allah karena perbuatan kejinya. Kini menjadi Laut Mati.',
        coordinates: [31.4895, 35.4796],
        relatedPath: '/kisah-nabi/lut',
    },
    {
        id: 'mount_judi',
        title: 'Gunung Judi',
        description: 'Tempat berlabuhnya bahtera Nabi Nuh setelah banjir besar.',
        coordinates: [37.3883, 42.3164],
        relatedPath: '/kisah-nabi/nuh',
    },
    {
        id: 'al_ahqaf',
        title: 'Al-Ahqaf (Rub\' al Khali)',
        description: 'Wilayah gundukan pasir tempat tinggal Kaum \'Ad, umat Nabi Hud.',
        coordinates: [20.0, 50.0],
        relatedPath: '/kisah-nabi/hud',
    },
    {
        id: 'ashabul_kahfi',
        title: 'Gua Ashabul Kahfi',
        description: 'Tempat berlindung para pemuda yang tertidur selama 309 tahun. (Salah satu lokasi yang diyakini)',
        coordinates: [31.9069, 35.9811], // Location near Amman, Jordan
        relatedPath: '/peristiwa/ashabul-kahfi',
    },
    {
        id: 'mount_sinai',
        title: 'Gunung Sinai (Tur Sina)',
        description: 'Tempat Nabi Musa menerima wahyu Taurat dari Allah SWT.',
        coordinates: [28.5383, 33.9750],
        relatedPath: '/kisah-nabi/musa',
    },
    {
        id: 'baitul_maqdis',
        title: 'Baitul Maqdis (Yerusalem)',
        description: 'Titik akhir perjalanan Isra\' dan titik awal Mi\'raj Nabi Muhammad. Kiblat pertama umat Islam.',
        coordinates: [31.7781, 35.2354],
        relatedPath: '/sejarah/khulafa',
    },
];
