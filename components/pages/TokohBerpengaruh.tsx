import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../ui/Card';
import ContentReader from '../ui/ContentReader';
import { tokohData } from '../../data/tokoh';

const TokohBerpengaruh: React.FC = () => {
    const { tokohId } = useParams<{ tokohId: string }>();
    const selectedTokoh = tokohId ? tokohData.find(t => t.id === tokohId) : null;

    if (selectedTokoh) {
        return (
            <section id="tokoh-reader" className="animate-fade-in">
                <Card>
                    <ContentReader 
                        title={selectedTokoh.name}
                        subtitle={selectedTokoh.subtitle}
                        icon={selectedTokoh.icon}
                        pages={selectedTokoh.content}
                        basePath="/tokoh"
                    />
                </Card>
            </section>
        );
    }

    return (
        <section id="tokoh-list" className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-white">Tokoh Muslim Berpengaruh</h2>
            <Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {tokohData.map((tokoh) => (
                        <Link
                            key={tokoh.id}
                            to={`/tokoh/${tokoh.id}`}
                            className="flex flex-col p-6 bg-slate-700 hover:bg-slate-600 rounded-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <i className={`${tokoh.icon} text-3xl text-primary mb-3`}></i>
                            <div className="flex-grow">
                                <h3 className="font-bold text-lg text-white">{tokoh.name}</h3>
                                <p className="text-sm text-gray-400 mt-1">{tokoh.subtitle} ({tokoh.period})</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </Card>
        </section>
    );
};

export default TokohBerpengaruh;