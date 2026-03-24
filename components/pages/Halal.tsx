
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import { getAIMapsResponse } from '../../services/geminiService';
import { useLanguage } from '../../contexts/LanguageContext';
import { GenerateContentResponse } from '@google/genai';
import HalalCheck from '../ui/HalalCheck';

declare const L: any;

interface Restaurant {
    title: string;
    uri: string;
    reviewSnippets?: { text: string; uri: string }[];
}


const Halal: React.FC = () => {
    const { t, lang } = useLanguage();
    
    const [restaurantLoading, setRestaurantLoading] = useState(false);
    const [restaurantError, setRestaurantError] = useState<React.ReactNode | null>(null);
    const [restaurantResults, setRestaurantResults] = useState<Restaurant[]>([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
    const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
    const mapRef = useRef<any>(null);

    useEffect(() => {
        if (typeof L === 'undefined' || !userLocation || mapRef.current) {
            return;
        }

        const map = L.map('halal-map').setView([userLocation.lat, userLocation.lng], 15);
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


    const handleFindRestaurants = async () => {
        setRestaurantLoading(true);
        setRestaurantError(null);
        setRestaurantResults([]);
        
        if (mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
        }
    
        if (!navigator.geolocation || !navigator.permissions) {
            setRestaurantError(t('geolocation_not_supported' as any));
            setRestaurantLoading(false);
            return;
        }
    
        const permissionStatus = await navigator.permissions.query({ name: 'geolocation' as any });
        if (permissionStatus.state !== 'granted' && permissionStatus.state !== 'prompt') {
            setRestaurantError(<>Izin lokasi belum diberikan. Silakan aktifkan melalui <Link to="/pengaturan" className="font-bold underline text-primary">halaman Pengaturan</Link>.</>);
            setRestaurantLoading(false);
            return;
        }
    
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });

                    const response: GenerateContentResponse = await getAIMapsResponse("restoran halal terdekat", latitude, longitude, lang);
                    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
                    
                    const restaurantData: Restaurant[] = chunks
                        .filter((chunk: any) => chunk.maps?.uri && chunk.maps?.title)
                        .map((chunk: any) => ({
                            title: chunk.maps.title,
                            uri: chunk.maps.uri,
                            reviewSnippets: chunk.maps.placeAnswerSources?.reviewSnippets,
                        }));
                        
                    setRestaurantResults(restaurantData);

                    if (restaurantData.length === 0) {
                        setRestaurantError("Tidak ada restoran halal yang ditemukan di sekitar Anda saat ini.");
                    }

                } catch (err) {
                     setRestaurantError(err instanceof Error ? err.message : t('terjadi_kesalahan_ai' as any));
                } finally {
                    setRestaurantLoading(false);
                }
            },
            (err) => {
                setRestaurantError(<>
                    {`${t('geolocation_error' as any)}: ${err.message}. `}
                    Silakan aktifkan melalui <Link to="/pengaturan" className="font-bold underline text-primary">halaman Pengaturan</Link>.
                </>);
                setRestaurantLoading(false);
            }
        );
    };

    return (
        <section id="halal" className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-white">Panduan Gaya Hidup Halal</h2>

            <div className="mb-8">
                <HalalCheck text="" onAnalyze={() => {}} />
            </div>

            <Card className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-primary"><i className="fas fa-utensils mr-2"></i>Cari Restoran Halal</h3>
                <p className="text-gray-300 mb-4">Temukan restoran halal di sekitar lokasi Anda dengan bantuan AI dan Google Maps.</p>
                <button onClick={handleFindRestaurants} disabled={restaurantLoading} className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50 transition-colors">
                    {restaurantLoading ? 'Mencari...' : <><i className="fas fa-map-marker-alt mr-2"></i>Temukan Restoran Halal Terdekat</>}
                </button>
                
                <div id="halal-map" className="h-96 w-full rounded-lg my-6 shadow-lg z-0 bg-slate-700 flex items-center justify-center">
                    {!userLocation && !restaurantLoading && (
                        <div className="text-center text-gray-400">
                            <i className="fas fa-map-marked-alt text-4xl mb-3"></i>
                            <p>Klik tombol di atas untuk mencari dan menampilkan peta.</p>
                        </div>
                    )}
                    {restaurantLoading && (
                        <div className="text-center text-gray-400">
                             <i className="fas fa-spinner fa-spin text-4xl text-primary"></i>
                        </div>
                    )}
                </div>

                {restaurantError && <p className="text-center text-red-400">{restaurantError}</p>}
                
                {restaurantResults.length > 0 && (
                    <div className="space-y-3 max-h-[calc(100vh-16rem)] overflow-y-auto no-scrollbar pr-2">
                        {restaurantResults.map((restaurant, index) => (
                            <div key={index} onClick={() => setSelectedRestaurant(restaurant)} className="p-4 bg-slate-700 hover:bg-slate-600 rounded-lg cursor-pointer transition-colors">
                                <h4 className="font-bold text-lg text-primary">{restaurant.title}</h4>
                                <div className="mt-2 flex justify-end">
                                    <span className="text-xs font-semibold text-sky-300 hover:underline">Lihat Detail <i className="fas fa-info-circle ml-1"></i></span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Card>

            {selectedRestaurant && (
                <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4 animate-fade-in" onClick={() => setSelectedRestaurant(null)}>
                    <Card className="w-full max-w-lg" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-primary">Detail Restoran</h3>
                            <button onClick={() => setSelectedRestaurant(null)} className="text-2xl text-gray-400 hover:text-white">&times;</button>
                        </div>
                        <h4 className="text-2xl font-bold mb-4">{selectedRestaurant.title}</h4>

                        {selectedRestaurant.reviewSnippets && selectedRestaurant.reviewSnippets.length > 0 && (
                            <div className="mb-4">
                                <h5 className="font-semibold text-gray-300 mb-2">Ulasan Pengguna:</h5>
                                <div className="space-y-2 text-sm max-h-32 overflow-y-auto no-scrollbar pr-2">
                                {selectedRestaurant.reviewSnippets.map((review, i) => (
                                    <blockquote key={i} className="italic text-gray-400 border-l-2 border-slate-600 pl-2">
                                        "{review.text}" <a href={review.uri} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">(Lihat)</a>
                                    </blockquote>
                                ))}
                                </div>
                            </div>
                        )}
                        
                        <a 
                            href={selectedRestaurant.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full block text-center mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                        >
                            <i className="fas fa-directions mr-2"></i>Petunjuk Arah di Google Maps
                        </a>
                    </Card>
                </div>
            )}

            <Card>
                <h3 className="text-2xl font-bold mb-6 text-primary"><i className="fas fa-book-open mr-2"></i>Landasan & Logika Halal-Haram</h3>
                <div className="space-y-6 text-gray-300">
                    <div>
                        <h4 className="font-semibold text-lg mb-2">Dalil Naqli (Al-Qur'an & Hadits)</h4>
                        <blockquote className="border-l-4 border-primary pl-4 italic bg-slate-900 p-3 rounded-r-lg">
                            <p>"Wahai manusia! Makanlah dari (makanan) yang halal dan baik (thayyib) yang terdapat di bumi, dan janganlah kamu mengikuti langkah-langkah setan. Sungguh, setan itu musuh yang nyata bagimu."</p>
                            <footer className="text-right text-sm text-gray-400 mt-1">- QS. Al-Baqarah: 168 -</footer>
                        </blockquote>
                        <blockquote className="border-l-4 border-primary pl-4 italic mt-4 bg-slate-900 p-3 rounded-r-lg">
                            <p>"Sesungguhnya yang halal itu jelas dan yang haram itu jelas. Di antara keduanya terdapat perkara-perkara yang syubhat (samar-samar)... Maka barangsiapa yang menjauhi perkara syubhat, berarti ia telah membersihkan agama dan kehormatannya."</p>
                            <footer className="text-right text-sm text-gray-400 mt-1">- HR. Bukhari & Muslim -</footer>
                        </blockquote>
                    </div>
                     <div>
                        <h4 className="font-semibold text-lg mb-2">Dalil Aqli (Logika & Hikmah)</h4>
                        <ul className="list-disc list-inside space-y-2 text-sm">
                            <li><strong>Menjaga Kesehatan Jasmani & Rohani:</strong> Makanan haram seringkali terbukti berbahaya bagi kesehatan fisik (seperti daging babi atau darah). Secara spiritual, ia dapat mengeraskan hati dan menghalangi cahaya ilahi.</li>
                            <li><strong>Syarat Diterimanya Doa & Ibadah:</strong> Mengonsumsi yang haram dapat menjadi penghalang terkabulnya doa. Rasulullah SAW menceritakan tentang seorang musafir yang doanya tidak diterima karena makanan, minuman, dan pakaiannya haram.</li>
                            <li><strong>Membentuk Karakter (Akhlak):</strong> Apa yang kita konsumsi akan menjadi bagian dari diri kita. Makanan yang halal dan baik akan membentuk energi positif dan akhlak yang mulia, sementara yang haram sebaliknya.</li>
                            <li><strong>Bentuk Ketaatan (Taqwa):</strong> Memilih yang halal dan meninggalkan yang haram atau syubhat adalah wujud nyata ketakwaan dan kepatuhan seorang hamba kepada perintah Tuhannya.</li>
                        </ul>
                    </div>
                </div>
            </Card>
        </section>
    );
};

export default Halal;
