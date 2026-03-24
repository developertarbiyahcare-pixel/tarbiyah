
import React from 'react';
import Card from '../ui/Card';
import { timelineManusiaData } from '../../data/timelineManusia';

const TimelineManusia: React.FC = () => {

    return (
        <section id="timeline-manusia" className="animate-fade-in">
            <div className="text-center mb-8">
                 <div className="flex justify-center items-center gap-4 mb-6">
                    <h2 className="text-3xl font-bold text-white">Timeline Perjalanan Manusia</h2>
                </div>
                <p className="text-gray-400 max-w-3xl mx-auto">
                    Sebuah gambaran perjalanan ruh dari alam primordial, melalui ujian di dunia, penantian di alam barzakh, hingga mencapai tujuan akhir di akhirat.
                </p>
            </div>


            <Card>
                <div className="relative border-l-4 border-primary pl-8 space-y-12">
                    {timelineManusiaData.map((item, index) => (
                        <div key={index} className="relative">
                            <div className="absolute -left-[2.1rem] top-0 flex items-center justify-center w-16 h-16 bg-gray-800 dark:bg-gray-900 rounded-full border-4 border-primary">
                                <i className={`${item.icon} text-2xl text-primary`}></i>
                            </div>
                            <div className="ml-8">
                                <p className="font-bold text-xl text-primary">{item.era}</p>
                                <h3 className="font-semibold text-2xl text-white mt-1 mb-2">{item.title}</h3>
                                <p className="text-gray-300 leading-relaxed text-justify">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </section>
    );
};

export default TimelineManusia;
