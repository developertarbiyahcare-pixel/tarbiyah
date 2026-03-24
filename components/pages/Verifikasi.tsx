import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';

interface VerifikasiProps {
    onLogin: () => void;
}

type ModalStage = 'enter-number' | 'enter-code';

const Verifikasi: React.FC<VerifikasiProps> = ({ onLogin }) => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    const [modalStage, setModalStage] = useState<ModalStage>('enter-number');
    const [waNumber, setWaNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');
    const [error, setError] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);

    const DEVELOPER_WA_NUMBER_FULL = '6281329466856';

    const handleNumberSubmit = () => {
        let trimmedWaNumber = waNumber.trim().replace(/\D/g, '');
        if (trimmedWaNumber.startsWith('0')) {
            trimmedWaNumber = '62' + trimmedWaNumber.substring(1);
        }
        
        if (!/^\d{10,15}$/.test(trimmedWaNumber)) {
            setError('Masukkan nomor WhatsApp yang valid (10-15 digit).');
            return;
        }
        setError('');

        sessionStorage.setItem('numberToVerify', trimmedWaNumber);
        
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedCode(code);
        sessionStorage.setItem('generatedCode', code);

        setModalStage('enter-code');
        setIsCodeSent(false);
    };

    const handleVerificationSubmit = () => {
        const validatedNumber = sessionStorage.getItem('numberToVerify');
        const storedCode = sessionStorage.getItem('generatedCode');

        if (!validatedNumber || !storedCode) {
            setError('Sesi verifikasi telah kedaluwarsa. Silakan mulai lagi dari awal.');
            setModalStage('enter-number');
            setGeneratedCode('');
            return;
        }

        if (verificationCode.trim() !== storedCode) {
            setError('Kode verifikasi salah. Mohon pastikan kode yang dimasukkan sama dengan kode yang Anda kirim.');
            return;
        }
        
        setError('');
        
        const authData = { loggedIn: true, waNumber: validatedNumber };
        localStorage.setItem('tarbiyahAuth', JSON.stringify(authData));

        const usersRaw = localStorage.getItem('tarbiyahUsers');
        const users = usersRaw ? JSON.parse(usersRaw) : [];
        if (!users.includes(validatedNumber)) {
            users.push(validatedNumber);
            localStorage.setItem('tarbiyahUsers', JSON.stringify(users));
        }

        sessionStorage.removeItem('numberToVerify');
        sessionStorage.removeItem('generatedCode');
        
        onLogin();
    };
    
    const requestMessage = `Assalamualaikum. Mohon verifikasi login Tarbiyah Care Premium dengan kode: *${generatedCode}*`;
    const whatsappUrl = `https://wa.me/${DEVELOPER_WA_NUMBER_FULL}?text=${encodeURIComponent(requestMessage)}`;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-slate-900 p-4">
            <Card className="w-full max-w-sm mb-6 border-2 border-yellow-500 bg-yellow-900/30">
                 <div className="flex flex-col items-center text-center">
                    <i className="fas fa-exclamation-triangle text-3xl text-yellow-400 mb-3"></i>
                    <h4 className="font-bold text-yellow-300">PERINGATAN</h4>
                    <p className="text-sm text-yellow-200 mt-2">
                        Untuk mengakses seluruh fitur premium, aplikasi ini memerlukan verifikasi menggunakan nomor WhatsApp yang aktif dan terdaftar.
                    </p>
                </div>
            </Card>
            <Card className="w-full max-w-sm">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-primary">
                        {modalStage === 'enter-number' ? 'Verifikasi Account' : 'Verifikasi'}
                    </h3>
                </div>
                {modalStage === 'enter-number' ? (
                    <div className="space-y-4">
                        <p className="text-sm text-gray-300">Masukkan nomor WhatsApp aktif Anda untuk memulai.</p>
                        <div>
                            <label className="block text-sm font-medium mb-1">Nomor WhatsApp</label>
                            <input type="tel" value={waNumber} onChange={e => setWaNumber(e.target.value)} className="w-full p-2 bg-slate-700 rounded-lg border border-slate-600" placeholder="081234567890" />
                        </div>
                        {error && <p className="text-xs text-red-400 text-center">{error}</p>}
                        <button onClick={handleNumberSubmit} className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-lg">
                            Lanjutkan
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                         <p className="text-sm text-gray-300">
                            1. Kirim kode di bawah ini ke Developer via WhatsApp sebagai syarat verifikasi.
                        </p>
                         <div className="text-center p-3 bg-slate-900 rounded-lg">
                            <p className="text-xs text-gray-400">Kode Unik Anda</p>
                            <p className="text-2xl font-bold tracking-widest text-primary">{generatedCode}</p>
                        </div>
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setIsCodeSent(true)}
                            className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg"
                        >
                            <i className="fab fa-whatsapp mr-2"></i> Kirim Kode via WhatsApp
                        </a>
                         <p className="text-sm text-gray-300">
                            2. Setelah terkirim, masukkan kembali kode yang sama di bawah ini untuk masuk.
                        </p>
                        <div>
                            <label className="block text-sm font-medium mb-1">Masukkan Kode</label>
                            <input 
                                type="tel" 
                                value={verificationCode} 
                                onChange={e => setVerificationCode(e.target.value)} 
                                className="w-full p-2 bg-slate-700 rounded-lg border border-slate-600 text-center text-lg tracking-widest" 
                                placeholder="_ _ _ _ _ _" 
                                maxLength={6}
                            />
                        </div>
                        {error && <p className="text-xs text-red-400 text-center">{error}</p>}
                        <button 
                            onClick={handleVerificationSubmit} 
                            className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!isCodeSent}
                        >
                            Verifikasi & Masuk
                        </button>
                    </div>
                )}
                 <button onClick={() => navigate('/')} className="w-full bg-slate-600 hover:bg-slate-500 text-white font-semibold py-3 rounded-lg mt-4">
                    <i className="fas fa-arrow-left mr-2"></i>Kembali
                </button>
            </Card>
        </div>
    );
};

export default Verifikasi;