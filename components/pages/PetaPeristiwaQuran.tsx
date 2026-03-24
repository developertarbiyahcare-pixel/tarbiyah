
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import { petaPeristiwaData } from '../../data/petaPeristiwaData';
import { useLanguage } from '../../contexts/LanguageContext';

declare const L: any;

const PetaPeristiwaQuran: React.FC = () => {
    const mapRef = useRef<any>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const { t } = useLanguage();
    const navigate = useNavigate();

    useEffect(() => {
        if (typeof L === 'undefined' || !mapContainerRef.current || mapRef.current) {
            return;
        }

        const map = L.map(mapContainerRef.current).setView([28, 45], 4); // Center on Arabian Peninsula
        mapRef.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        petaPeristiwaData.forEach(item => {
            const popupContent = `
                <div class="text-gray-800">
                    <h4 class="font-bold text-lg text-emerald-600">${item.title}</h4>
                    <p class="text-sm">${item.description}</p>
                    ${item.relatedPath ? `<br/><a href="#${item.relatedPath}" data-path="${item.relatedPath}" class="quran-event-link text-sky-600 font-bold hover:underline">Baca Kisahnya &rarr;</a>` : ''}
                </div>
            `;
            L.marker(item.coordinates).addTo(map)
                .bindPopup(popupContent);
        });

        // Event delegation to handle clicks within popups
        map.on('popupopen', (e: any) => {
            const popupNode = e.popup.getElement();
            if (!popupNode) return;

            const link = popupNode.querySelector('.quran-event-link');
            if (link) {
                link.addEventListener('click', (event: MouseEvent) => {
                    event.preventDefault();
                    const path = (event.currentTarget as HTMLAnchorElement).dataset.path;
                    if (path) {
                        navigate(path, { state: { from: '/peta-peristiwa-quran' } });
                    }
                });
            }
        });


        return () => {
            if (mapRef.current) {
                mapRef.current.off(); // Clean up all map event listeners
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [navigate, t]);

    return (
        <section id="peta-peristiwa" className="animate-fade-in">
             <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-bold text-white">{t('peta-peristiwa-quran' as any)}</h2>
                    <p className="text-gray-400">Jelajahi lokasi geografis peristiwa-peristiwa penting dalam Al-Qur'an.</p>
                </div>
            </div>
            <Card className="!p-2">
                <div id="quran-event-map" ref={mapContainerRef} style={{ height: '70vh', width: '100%', borderRadius: '0.75rem' }} className="z-0"></div>
            </Card>
        </section>
    );
};

export default PetaPeristiwaQuran;
