import React from 'react';
import Card from './Card';
import { Link } from 'react-router-dom';

interface PermissionModalProps {
    isOpen: boolean;
    onClose: () => void;
    permissionName: 'Lokasi' | 'Kamera';
    featureName: string;
}

const PermissionModal: React.FC<PermissionModalProps> = ({ isOpen, onClose, permissionName, featureName }) => {

    if (!isOpen) {
        return null;
    }

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4 animate-fade-in"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <Card 
                className="w-full max-w-sm text-center"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-primary"><i className="fas fa-exclamation-triangle mr-2"></i> Izin Diperlukan</h3>
                    <button onClick={onClose} className="text-2xl text-gray-400 hover:text-white" aria-label="Tutup">&times;</button>
                </div>
                <div className="py-4">
                    <p className="text-gray-300">
                        Izin {permissionName} ditolak. Untuk menggunakan fitur {featureName}, Anda perlu mengaktifkan izin melalui halaman Pengaturan aplikasi atau browser Anda.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <button onClick={onClose} className="w-full bg-slate-600 hover:bg-slate-500 text-white font-semibold py-2 px-4 rounded-lg">
                        Tutup
                    </button>
                    <Link to="/pengaturan" onClick={onClose} className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center">
                        <i className="fas fa-cog mr-2"></i> Buka Pengaturan
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default PermissionModal;
