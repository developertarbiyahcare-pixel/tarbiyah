
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../ui/Card';
import ContentReader from '../ui/ContentReader';
import { pedomanData, basePedomanData } from '../../data/pedoman';

const ContentBlockRenderer: React.FC<{ items: any[] }> = ({ items }) => (
    <div className="space-y-4 text-gray-300">
      {items.map((item: any, index: number) => {
        if (item.type === 'paragraph') {
          return (
            <div key={index}>
              {item.title && <h4 className="font-semibold text-lg text-gray-100 mb-2">{item.title}</h4>}
              <p className="leading-relaxed text-justify">{item.text}</p>
            </div>
          );
        }
        if (item.type === 'list') {
          return (
            <div key={index}>
              {item.title && <h4 className="font-semibold text-lg text-gray-100 mb-2">{item.title}</h4>}
              <ul className="list-disc list-inside space-y-2 pl-2">
                {item.items?.map((listItem: any, i: number) => {
                  if (typeof listItem === 'string') {
                    return <li key={i}>{listItem}</li>;
                  } else if (listItem && typeof listItem === 'object' && 'title' in listItem && 'points' in listItem) {
                    return (
                        <li key={i} className="list-none">
                            <strong>{listItem.title}</strong>
                            <ul className="list-['-_'] list-inside pl-6 space-y-1 mt-1 text-gray-400">
                                {listItem.points.map((point: string, pIndex: number) => <li key={pIndex}>{point}</li>)}
                            </ul>
                        </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>
          );
        }
        return null;
      })}
    </div>
  );

const Pedoman: React.FC = () => {
    const { topicId } = useParams<{ topicId: string }>();
    const selectedTopic = topicId ? pedomanData.find(t => t.id === topicId) : null;

    const [activeTab, setActiveTab] = useState('wajib');

    if (selectedTopic && selectedTopic.id === 'shalat') {
        const shalatIntroData = selectedTopic.content.find((c: any) => c.type === 'intro');
        const shalatWajibData = selectedTopic.content.find((c: any) => c.type === 'wajib');
        const shalatSunnahData = selectedTopic.content.find((c: any) => c.type === 'sunnah');
        const shalatJamakQasharData = selectedTopic.content.find((c: any) => c.type === 'jamak-qashar');

        return (
            <section id="shalat-guide" className="animate-fade-in">
                <header className="mb-6">
                    <div className="flex items-center mb-4">
                        <i className={`${selectedTopic.icon} text-4xl text-primary mr-4`}></i>
                        <div>
                            <h3 className="text-3xl font-bold text-white">{selectedTopic.title}</h3>
                            <p className="text-gray-400 italic">{selectedTopic.subtitle}</p>
                        </div>
                    </div>
                </header>

                {shalatIntroData && (
                    <Card className="mb-8">
                        <h3 className="text-2xl font-bold text-primary mb-4">{shalatIntroData.title}</h3>
                        <ContentBlockRenderer items={shalatIntroData.items} />
                    </Card>
                )}

                <div className="mb-6 border-b border-slate-700">
                    <div className="flex -mb-px flex-wrap">
                        <button onClick={() => setActiveTab('wajib')} className={`inline-block p-3 border-b-2 font-semibold ${activeTab === 'wajib' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-gray-200'}`}>
                            <i className="fas fa-star mr-2"></i>{shalatWajibData.title}
                        </button>
                        <button onClick={() => setActiveTab('sunnah')} className={`inline-block p-3 border-b-2 font-semibold ${activeTab === 'sunnah' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-gray-200'}`}>
                            <i className="far fa-star mr-2"></i>{shalatSunnahData.title}
                        </button>
                        <button onClick={() => setActiveTab('jamak-qashar')} className={`inline-block p-3 border-b-2 font-semibold ${activeTab === 'jamak-qashar' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-gray-200'}`}>
                            <i className="fas fa-route mr-2"></i>{shalatJamakQasharData.title}
                        </button>
                    </div>
                </div>
                
                {activeTab === 'wajib' && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-fade-in">
                        {shalatWajibData.items.map((shalat: any) => (
                            <Link to={`/pedoman/${shalat.id}`} key={shalat.id}>
                                <Card className="!p-4 text-center h-full cursor-pointer hover:bg-slate-700 transition-colors">
                                    <h4 className="font-bold text-lg text-primary">{shalat.name}</h4>
                                    {shalat.rakaat && <p className="text-sm text-gray-400">{shalat.rakaat}</p>}
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
                
                {activeTab === 'sunnah' && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-fade-in">
                        {shalatSunnahData.items.map((shalat: any) => (
                            <Link to={`/pedoman/${shalat.id}`} key={shalat.id}>
                                <Card className="!p-4 text-center h-full cursor-pointer hover:bg-slate-700 transition-colors">
                                    <h4 className="font-bold text-lg text-primary">{shalat.name}</h4>
                                    {shalat.rakaat && <p className="text-sm text-gray-400">{shalat.rakaat}</p>}
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
                
                {activeTab === 'jamak-qashar' && (
                    <Card className="animate-fade-in">
                        <ContentBlockRenderer items={shalatJamakQasharData.items} />
                    </Card>
                )}
            </section>
        );
    }

    if (selectedTopic) {
        return (
            <section id="pedoman-reader" className="animate-fade-in">
                <Card>
                    <ContentReader 
                        title={selectedTopic.title}
                        subtitle={selectedTopic.subtitle}
                        icon={selectedTopic.icon}
                        pages={[{ title: selectedTopic.title, body: selectedTopic.content }]}
                        basePath="/pedoman"
                    />
                </Card>
            </section>
        );
    }

    // Render topic list if no topic is selected
    return (
        <section id="pedoman-list" className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Pedoman Ibadah</h2>
            <Card>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {basePedomanData.map((topic) => (
                        <Link
                            key={topic.id}
                            to={`/pedoman/${topic.id}`}
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

export default Pedoman;
