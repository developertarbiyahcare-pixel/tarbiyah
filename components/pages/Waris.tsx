
import React from 'react';
import Card from '../ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';

const ThanksTo: React.FC = () => {
    const { t } = useLanguage();

    const thanksData = [
        {
            title: '۞ Allah SWT',
            content: `Terima kasih kepada Dzat pengatur nafas kehidupan dan pemenuh segalaku.\nOnly Allah SWT is the almighty most powerfull, my important than everything for my life and my first love in my life`
        },
        {
            title: '۞ Nabi Muhammad SAW',
            content: 'Terima kasih wahai pembawa risalah agama yang sempurna, serta penerang mata hati dengan nur Ilahi hingga akhir zaman.'
        },
        {
            title: '۞ Keluarga Besar',
            content: `Terima kasih atas segala hal yang bermakna. Bagi saya kalian adalah penjaga api kehidupan saya agar tidak padam. Terima kasih sudah memberikan sebuah kehidupan yang diliputi dengan cinta, support dan persahabatan.\n\nThanks for the gen...!`
        },
        {
            title: '۞ Wajah Penyayang',
            content: `Terima kasih kepada wajah penyayangmu, dan atas segala lamunan itu. Dalam setiap do'a, ku harap kau tetap ke lurus. Karya ini terlahir atas sebab izinmu.\n\n14 Februari`
        },
        {
            title: '۞ Sahabat',
            content: `Kalian seperti baja yang keras, yang mendorong lokomotif kehidupan saya agar terus berjalan.\n\nThanks my bro, keep solid...!`
        },
        {
            title: '۞ Lainnya',
            content: `Melalui Tarbiyah Care Premium, kami ingin mengucapkan terima kasih serta memberikan apresiasi yang tulus untuk para pendidik yang telah menjadi cahaya dalam perjalanan hidup kami. Semoga setiap ilmu yang beliau ajarkan menjadi amal kebaikan yang akan terus mengalir tanpa henti, mengiringi langkahmu dengan keberkahan.\n\nAamiin...`
        }
    ];

    return (
        <section id="thanks-to" className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-white ApplicationTitle">Thanks To</h2>
            <div className="space-y-6">
                {thanksData.map((item, index) => (
                    <Card key={index}>
                        <h3 className="text-2xl font-bold text-primary mb-3">{item.title}</h3>
                        <p className="text-gray-300 whitespace-pre-line leading-relaxed">{item.content}</p>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default ThanksTo;
