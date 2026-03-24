import React, { useState } from 'react';
import Card from './Card';

interface QrCodeModalProps {
    url: string;
    title: string;
    onClose: () => void;
}

const QrCodeModal: React.FC<QrCodeModalProps> = ({ url, title, onClose }) => {
    const [copyText, setCopyText] = useState('Salin');

    const handleCopy = () => {
        navigator.clipboard.writeText(url).then(() => {
            setCopyText('Disalin!');
            setTimeout(() => setCopyText('Salin'), 2000);
        });
    };
    
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-start p-4 pt-16 animate-fade-in" onClick={onClose}>
            <Card className="w-full max-w-sm text-center" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                     <h3 className="text-xl font-bold text-primary">{title}</h3>
                     <button onClick={onClose} className="text-2xl text-gray-400 hover:text-white">&times;</button>
                </div>
                <img src={qrCodeUrl} alt="QR Code" className="mx-auto my-4 border-4 border-white rounded-lg bg-white" />
                <div className="flex items-center mt-4">
                    <input type="text" readOnly value={url} className="w-full p-2 border border-gray-500 rounded-l-lg bg-gray-700 text-white text-sm truncate" />
                    <button onClick={handleCopy} className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-r-lg flex-shrink-0">
                        <i className="fas fa-copy mr-2"></i> {copyText}
                    </button>
                </div>
            </Card>
        </div>
    );
};

export default QrCodeModal;