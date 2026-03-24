
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';
import { getAIMapsResponse } from '../../services/geminiService';
import { GenerateContentResponse } from '@google/genai';

declare const L: any;

interface Mosque {
    title: string;
    uri: string;
    reviewSnippets?: { text: string; uri: string }[];
}

const MasjidTerdekat: React.FC = () => {
    const { t, lang } = useLanguage();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<React.ReactNode | null>(null);
    const [mosques, setMosques] = useState<Mosque[]>([]);
    const [selectedMosque, setSelectedMosque] = useState<Mosque | null>(null);
    const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
    const mapRef = useRef<any>(null);

    useEffect(() => {
        const fetchMosques = async (latitude: number, longitude: number) => {
            try {
                const response: GenerateContentResponse = await getAIMapsResponse("masjid terdekat", latitude, longitude, lang);
                const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
                
                const mosqueData: Mosque[] = chunks
                    .filter((chunk: any) => chunk.maps?.uri && chunk.maps?.title)
                    .map((chunk: any) => ({
                        title: chunk.maps.title,
                        uri: chunk.maps.uri,
                        reviewSnippets: chunk.maps.placeAnswerSources?.reviewSnippets,
                    }));

                if (mosqueData.length > 0) {
                    setMosques(mosqueData);
                } else {
                    setError(t('tidak_ada_masjid' as any));
                }

            } catch (err) {
                setError(err instanceof Error ? err.message : t('gagal_muat_masjid' as any));
            } finally {
                setLoading(false);
            }
        };

        const handleLocationRequest = () => {
            if (!navigator.geolocation) {
                setError(t('geolocation_not_supported' as any));
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                    fetchMosques(latitude, longitude);
                },
                () => {
                    setError(
                        <>
                            {t('geolocation_error' as any)}. Silakan aktifkan izin lokasi di <Link to="/pengaturan" className="font-bold underline text-primary">halaman Pengaturan</Link>.
                        </>
                    );
                    setLoading(false);
                },
                { timeout: 10000, enableHighAccuracy: true }
            );
        };

        if (navigator.permissions) {
            navigator.permissions.query({ name: 'geolocation' as any }).then((result) => {
                if (result.state === 'granted') {
                    handleLocationRequest();
                } else if (result.state === 'denied') {
                    setError(
                        <>
                            Izin lokasi ditolak. Silakan aktifkan melalui <Link to="/pengaturan" className="font-bold underline text-primary">halaman Pengaturan</Link>.
                        </>
                    );
                    setLoading(false);
                } else { // prompt state
                    handleLocationRequest();
                }
            });
        } else {
            handleLocationRequest(); // Fallback for older browsers
        }
    }, [t, lang]);

    useEffect(() => {
        if (typeof L === 'undefined' || !userLocation || mapRef.current) {
            return;
        }

        const mapContainer = document.getElementById('map');
        if (!mapContainer) return;

        const map = L.map('map').setView([userLocation.lat, userLocation.lng], 15);
        mapRef.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([userLocation.lat, userLocation.lng]).addTo(map)
            .bindPopup('<b>Lokasi Anda Saat Ini</b>')
            .openPopup();
        
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [userLocation]);


    return (
        <section id="masjid-terdekat" className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-white">{t('masjid_terdekat' as any)}</h2>
            <p className="text-gray-400 mb-6">{t('masjid_terdekat_desc' as any)}</p>

            <div id="map" className="h-96 w-full rounded-lg mb-8 shadow-lg z-0 bg-slate-700 flex items-center justify-center">
                 {loading ? (
                    <div className="text-center text-gray-400">
                        <i className="fas fa-spinner fa-spin text-4xl text-primary"></i>
                        <p className="mt-4">{t('memuat_lokasi_masjid' as any)}</p>
                    </div>
                 ) : !userLocation && (
                    <div className="text-center text-gray-400">
                        <i className="fas fa-map-marked-alt text-4xl mb-3"></i>
                        <p>Menunggu izin dan data lokasi...</p>
                    </div>
                )}
            </div>

            <Card>
                {loading ? (
                     <div className="flex flex-col items-center justify-center h-48">
                        {/* The map container has its own loading indicator, so this can be minimal */}
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center h-48 text-red-400 text-center">
                         <i className="fas fa-exclamation-triangle text-4xl mb-4"></i>
                         <p>{error}</p>
                    </div>
                ) : mosques.length > 0 ? (
                    <div className="space-y-3 max-h-[calc(100vh-16rem)] overflow-y-auto no-scrollbar pr-2">
                        {mosques.map((mosque, index) => (
                            <div key={index} onClick={() => setSelectedMosque(mosque)} className="p-4 bg-slate-700 hover:bg-slate-600 rounded-lg cursor-pointer transition-colors">
                                <h4 className="font-bold text-lg text-primary">{mosque.title}</h4>
                                <div className="mt-2 flex justify-end">
                                    <span className="text-xs font-semibold text-sky-300 hover:underline">Lihat Detail <i className="fas fa-info-circle ml-1"></i></span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-48 text-center">
                        <i className="fas fa-search-location text-4xl text-gray-500 mb-4"></i>
                        <p className="text-gray-400">{t('tidak_ada_masjid' as any)}</p>
                    </div>
                )}
            </Card>
            
            {selectedMosque && (
                <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4 animate-fade-in" onClick={() => setSelectedMosque(null)}>
                    <Card className="w-full max-w-lg" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-primary">{t('detail_masjid' as any)}</h3>
                            <button onClick={() => setSelectedMosque(null)} className="text-2xl text-gray-400 hover:text-white">&times;</button>
                        </div>
                        <h4 className="text-2xl font-bold mb-4">{selectedMosque.title}</h4>

                        {selectedMosque.reviewSnippets && selectedMosque.reviewSnippets.length > 0 && (
                            <div className="mb-4">
                                <h5 className="font-semibold text-gray-300 mb-2">Ulasan Pengguna:</h5>
                                <div className="space-y-2 text-sm max-h-32 overflow-y-auto no-scrollbar pr-2">
                                {selectedMosque.reviewSnippets.map((review, i) => (
                                    <blockquote key={i} className="italic text-gray-400 border-l-2 border-slate-600 pl-2">
                                        "{review.text}" <a href={review.uri} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">(Lihat)</a>
                                    </blockquote>
                                ))}
                                </div>
                            </div>
                        )}
                        
                        <a 
                            href={selectedMosque.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full block text-center mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                        >
                            <i className="fas fa-directions mr-2"></i>{t('petunjuk_arah' as any)} di Google Maps
                        </a>
                    </Card>
                </div>
            )}
        </section>
    );
};

export default MasjidTerdekat;
