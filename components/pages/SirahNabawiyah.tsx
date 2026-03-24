import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../ui/Card';
import ContentReader from '../ui/ContentReader';
import { sirahData } from '../../data/sirah';

const SirahNabawiyah: React.FC = () => {
    const { topicId } = useParams<{ topicId: string }>();
    const selectedTopic = topicId ? sirahData.find(t => t.id === topicId) : null;

    if (selectedTopic) {
        // The ContentReader expects `pages` to be an array of `ContentPage` objects.
        // We wrap the body content in a single page object for compatibility.
        const pageData = {
            title: selectedTopic.title, // Pass title to the page object for the reader's header
            body: selectedTopic.content,
        };

        return (
            <section id="sirah-reader" className="animate-fade-in">
                <Card>
                     <ContentReader 
                        title={selectedTopic.title}
                        subtitle={selectedTopic.subtitle}
                        icon={selectedTopic.icon}
                        pages={[pageData]} // Pass as an array with one page
                        basePath="/sirah"
                    />
                </Card>
            </section>
        );
    }

    return (
        <section id="sirah-list" className="animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white ApplicationTitle">Sirah Nabawiyah</h2>
            <Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sirahData.map((topic) => (
                        <Link
                            key={topic.id}
                            to={`/sirah/${topic.id}`}
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

export default SirahNabawiyah;