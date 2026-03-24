import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../ui/Card';
import ContentReader from '../ui/ContentReader';
import { hukumSyariahData } from '../../data/hukumSyariah';

const HukumSyariah: React.FC = () => {
    const { topicId } = useParams<{ topicId: string }>();
    const selectedTopic = topicId ? hukumSyariahData.find(t => t.id === topicId) : null;

    if (selectedTopic) {
        return (
            <section id="hukum-reader" className="animate-fade-in">
                <Card>
                    <ContentReader 
                        title={selectedTopic.title}
                        subtitle={selectedTopic.subtitle}
                        icon={selectedTopic.icon}
                        pages={[{ title: selectedTopic.title, body: selectedTopic.content }]}
                        basePath="/hukum-syariah"
                    />
                </Card>
            </section>
        );
    }

    return (
        <section id="hukum-list" className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Pokok-Pokok Hukum Syari'ah</h2>
            <Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {hukumSyariahData.map((topic) => (
                        <Link
                            key={topic.id}
                            to={`/hukum-syariah/${topic.id}`}
                            className="block p-6 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-xl transition-all duration-300 transform hover:-translate-y-1 h-full"
                        >
                            <i className={`${topic.icon} text-3xl text-primary mb-3`}></i>
                            <h3 className="font-bold text-lg text-gray-800 dark:text-white">{topic.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{topic.subtitle}</p>
                        </Link>
                    ))}
                </div>
            </Card>
        </section>
    );
};

export default HukumSyariah;