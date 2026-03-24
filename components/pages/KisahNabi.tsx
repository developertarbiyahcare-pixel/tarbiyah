
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../ui/Card';
import ContentReader from '../ui/ContentReader';
import { kisahNabiData } from '../../data/kisahNabi';

const KisahNabi: React.FC = () => {
    const { nabiId } = useParams<{ nabiId: string }>();
    const selectedNabi = nabiId ? kisahNabiData.find(t => t.id === nabiId) : null;

    if (selectedNabi) {
        return (
            <section id="kisah-nabi-reader" className="animate-fade-in">
                <Card>
                    <ContentReader 
                        title={selectedNabi.name}
                        subtitle={selectedNabi.subtitle}
                        icon={selectedNabi.icon}
                        pages={selectedNabi.content}
                        basePath="/kisah-nabi"
                    />
                </Card>
            </section>
        );
    }

    return (
        <section id="kisah-nabi-list" className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Kisah 25 Nabi & Rasul</h2>
            <Card>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {kisahNabiData.map((nabi, index) => (
                        <Link
                            key={nabi.id}
                            to={`/kisah-nabi/${nabi.id}`}
                            className="flex flex-col items-center text-center p-4 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <span className="font-bold text-lg text-primary">{index + 1}.</span>
                            <i className={`${nabi.icon} text-2xl text-primary my-2`}></i>
                            <h3 className="font-semibold text-md text-gray-800 dark:text-white">{nabi.name}</h3>
                        </Link>
                    ))}
                </div>
            </Card>
        </section>
    );
};

export default KisahNabi;