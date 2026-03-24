
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../ui/Card';
import ContentReader from '../ui/ContentReader';
import { kurikulumTarbiyahData } from '../../data/kurikulumTarbiyahData';

const KurikulumTarbiyahDetail: React.FC = () => {
    const { levelId, subjectId } = useParams<{ levelId: string; subjectId: string }>();
    
    // Find the Level
    const levelData = kurikulumTarbiyahData.find(l => l.level.toString() === levelId);
    
    // Find the Subject within that Level
    const subjectData = levelData?.subjects.find(s => s.id === subjectId);

    if (!levelData || !subjectData) {
        return (
            <section className="animate-fade-in text-center py-10">
                <Card>
                    <h3 className="text-xl font-bold text-red-500 mb-2">Materi Tidak Ditemukan</h3>
                    <p className="text-gray-400 mb-6">Maaf, materi pembelajaran yang Anda cari belum tersedia atau URL salah.</p>
                    <Link to="/kurikulum-tarbiyah" className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg transition-colors">
                        Kembali ke Kurikulum
                    </Link>
                </Card>
            </section>
        );
    }

    return (
        <section className="animate-fade-in">
             <div className="mb-6 flex items-center gap-2 text-sm text-gray-400 flex-wrap">
                <Link to="/kurikulum-tarbiyah" className="hover:text-primary transition-colors">Kurikulum</Link>
                <i className="fas fa-chevron-right text-[10px]"></i>
                <span className="text-gray-300">Level {levelData.level}</span>
                <i className="fas fa-chevron-right text-[10px]"></i>
                <span className="text-primary font-semibold">{subjectData.category}</span>
            </div>

            <Card>
                <ContentReader 
                    title={subjectData.category}
                    subtitle={`Materi Pembelajaran - ${levelData.title}`}
                    icon="fas fa-book-reader"
                    pages={subjectData.content.length > 0 ? subjectData.content : [{ title: "Materi Belum Tersedia", body: [{ type: 'paragraph', text: "Konten lengkap untuk materi ini sedang dalam proses penyusunan. Silakan cek kembali nanti." }] }]}
                    basePath={`/kurikulum-tarbiyah/${levelId}`} // Base path for potential internal navigation
                />
            </Card>
        </section>
    );
};

export default KurikulumTarbiyahDetail;
