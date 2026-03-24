import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../ui/Card';
import ContentReader from '../ui/ContentReader';
import { psikologiData } from '../../data/psikologi';

const Psikologi: React.FC = () => {
    const { topicId } = useParams<{ topicId: string }>();
    const selectedTopic = topicId ? psikologiData.find(t => t.id === topicId) : null;

    if (selectedTopic) {
        return (
            <section id="psikologi-reader" className="animate-fade-in">
                <Card>
                    <ContentReader 
                        title={selectedTopic.title}
                        subtitle={selectedTopic.subtitle}
                        icon={selectedTopic.icon}
                        pages={[{ title: selectedTopic.title, body: selectedTopic.content }]}
                        basePath="/psikologi"
                    />
                </Card>
            </section>
        );
    }

    // Render topic list if no topic is selected
    return (
        <section id="psikologi-list" className="animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white ApplicationTitle">Psikologi Barat Vs Islam</h2>
            <Card>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {psikologiData.map((topic) => (
                        <Link
                            key={topic.id}
                            to={`/psikologi/${topic.id}`}
                            className="block p-6 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-xl transition-all duration-300 transform hover:-translate-y-1"
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

export default Psikologi;
