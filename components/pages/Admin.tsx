
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';
import type { LenteraEntry, CustomArticle } from '../../types';
import { islamicQuotes } from '../../data/quotes';
import Dropdown from '../ui/Dropdown';

interface AdminProps {
    isDeveloper: boolean;
}

const Admin: React.FC<AdminProps> = ({ isDeveloper }) => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<'users' | 'content'>('users');

    // User Management State
    const [allUsers, setAllUsers] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [admins, setAdmins] = useState<string[]>([]);
    const [newAdminNumber, setNewAdminNumber] = useState('');
    const [feedback, setFeedback] = useState({ type: '', message: '' });

    // Content Management State
    const [contentMode, setContentMode] = useState<'lentera' | 'quotes' | 'artikel'>('lentera');
    
    // Lentera State
    const [lenteraTitle, setLenteraTitle] = useState('');
    const [lenteraContent, setLenteraContent] = useState('');
    const [lenteraLocation, setLenteraLocation] = useState('');
    const [isGiveaway, setIsGiveaway] = useState(false);
    const [winner, setWinner] = useState('');
    
    // Quote State
    const [quoteText, setQuoteText] = useState('');
    const [quoteAuthor, setQuoteAuthor] = useState('');

    // Article State
    const [articleTitle, setArticleTitle] = useState('');
    const [articleCategory, setArticleCategory] = useState('Umum');
    const [articleContent, setArticleContent] = useState('');

    const categoryItems = [
        { value: 'Aqidah', label: 'Aqidah' },
        { value: 'Fiqih', label: 'Fiqih' },
        { value: 'Akhlak', label: 'Akhlak' },
        { value: 'Sejarah', label: 'Sejarah' },
        { value: 'Umum', label: 'Umum' },
    ];

    useEffect(() => {
        if (!isDeveloper) return;
        try {
            const usersRaw = localStorage.getItem('tarbiyahUsers');
            const users = usersRaw ? JSON.parse(usersRaw) : [];
            setAllUsers(users.sort());

            const adminsRaw = localStorage.getItem('tarbiyahAdmins');
            const adminList = adminsRaw ? JSON.parse(adminsRaw) : [];
            setAdmins(adminList.sort());

        } catch (error) {
            console.error("Failed to load user/admin list:", error);
            setAllUsers([]);
            setAdmins([]);
        }
    }, [isDeveloper]);

    const showFeedback = (message: string, type: 'success' | 'error') => {
        setFeedback({ message, type });
        setTimeout(() => setFeedback({ type: '', message: '' }), 3000);
    };

    // --- User Management Handlers ---
    const handleAddAdmin = () => {
        let trimmedNumber = newAdminNumber.trim().replace(/\D/g, '');
         if (trimmedNumber.startsWith('0')) {
            trimmedNumber = '62' + trimmedNumber.substring(1);
        }

        if (!allUsers.includes(trimmedNumber)) {
            showFeedback('Pengguna dengan nomor ini belum terverifikasi.', 'error');
            return;
        }

        if (admins.includes(trimmedNumber)) {
            showFeedback('Pengguna ini sudah menjadi admin.', 'error');
            return;
        }
        
        const updatedAdmins = [...admins, trimmedNumber].sort();
        setAdmins(updatedAdmins);
        localStorage.setItem('tarbiyahAdmins', JSON.stringify(updatedAdmins));
        setNewAdminNumber('');
        showFeedback('Admin baru berhasil ditambahkan.', 'success');
    };

    const handleRemoveAdmin = (adminNumber: string) => {
        if (window.confirm(`Apakah Anda yakin ingin menghapus hak admin dari ${adminNumber}?`)) {
            const updatedAdmins = admins.filter(admin => admin !== adminNumber);
            setAdmins(updatedAdmins);
            localStorage.setItem('tarbiyahAdmins', JSON.stringify(updatedAdmins));
            showFeedback('Hak admin berhasil dihapus.', 'success');
        }
    };

    // --- Content Management Handlers ---

    const handleSelectWinner = () => {
        if (allUsers.length === 0) {
            setWinner('Tidak ada pengguna terverifikasi.');
            return;
        }
        const randomIndex = Math.floor(Math.random() * allUsers.length);
        setWinner(allUsers[randomIndex]);
    };

    const handleCopyWinner = () => {
        if (winner && winner !== 'Tidak ada pengguna terverifikasi.') {
            navigator.clipboard.writeText(winner);
            showFeedback('Nomor pemenang berhasil disalin!', 'success');
        }
    };

    const handlePublishLentera = () => {
        if (!lenteraTitle || !lenteraContent) {
            showFeedback('Judul dan konten harus diisi.', 'error');
            return;
        }

        const newEntry: LenteraEntry = {
            id: Date.now(),
            date: new Date().toISOString(),
            title: lenteraTitle,
            content: lenteraContent,
            location: lenteraLocation || 'Cibinong',
            likes: 0,
            dislikes: 0,
            isGiveaway: isGiveaway
        };

        const existingRaw = localStorage.getItem('tarbiyahLenteraHatiUserEntries');
        const existingEntries = existingRaw ? JSON.parse(existingRaw) : [];
        localStorage.setItem('tarbiyahLenteraHatiUserEntries', JSON.stringify([newEntry, ...existingEntries]));
        
        setLenteraTitle('');
        setLenteraContent('');
        setLenteraLocation('');
        setIsGiveaway(false);
        setWinner('');
        showFeedback('Lentera Hati berhasil diterbitkan!', 'success');
    };

    const handleAddQuote = () => {
        if (!quoteText || !quoteAuthor) {
            showFeedback('Teks kutipan dan tokoh harus diisi.', 'error');
            return;
        }

        const newQuote = { 
            text: { id: quoteText, en: quoteText }, 
            author: quoteAuthor 
        };

        const existingRaw = localStorage.getItem('tarbiyahCustomQuotes');
        const existingQuotes = existingRaw ? JSON.parse(existingRaw) : [];
        localStorage.setItem('tarbiyahCustomQuotes', JSON.stringify([...existingQuotes, newQuote]));

        setQuoteText('');
        setQuoteAuthor('');
        showFeedback('Kutipan baru berhasil ditambahkan!', 'success');
    };

    const handlePublishArticle = () => {
        if (!articleTitle || !articleContent) {
             showFeedback('Judul dan konten artikel harus diisi.', 'error');
             return;
        }

        const newArticle: CustomArticle = {
            id: `art-${Date.now()}`,
            title: articleTitle,
            category: articleCategory,
            content: articleContent,
            date: new Date().toISOString(),
            author: 'Rojudin'
        };

        const existingRaw = localStorage.getItem('tarbiyahCustomArticles');
        const existingArticles = existingRaw ? JSON.parse(existingRaw) : [];
        localStorage.setItem('tarbiyahCustomArticles', JSON.stringify([newArticle, ...existingArticles]));

        setArticleTitle('');
        setArticleContent('');
        showFeedback('Artikel berhasil diterbitkan ke Pustaka Ilmu!', 'success');
    };


    if (!isDeveloper) {
        return (
            <section id="admin-page" className="animate-fade-in">
                <Card className="text-center p-8">
                    <i className="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
                    <h3 className="text-2xl font-bold">Akses Ditolak</h3>
                    <p className="text-gray-400">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
                </Card>
            </section>
        );
    }
    
    const filteredUsers = allUsers.filter(user => user.includes(searchTerm));

    return (
        <section id="admin-page" className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-white">Panel Developer & CMS</h2>
            
            {feedback.message && (
                <div className={`p-3 rounded-lg mb-4 text-center text-sm font-semibold ${feedback.type === 'success' ? 'bg-green-800 text-green-200' : 'bg-red-800 text-red-200'}`}>
                    {feedback.message}
                </div>
            )}

            <div className="mb-6 border-b border-slate-700">
                <div className="flex -mb-px">
                    <button onClick={() => setActiveTab('users')} className={`inline-block p-3 border-b-2 font-semibold ${activeTab === 'users' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-gray-200'}`}>
                        <i className="fas fa-users-cog mr-2"></i>User Management
                    </button>
                    <button onClick={() => setActiveTab('content')} className={`inline-block p-3 border-b-2 font-semibold ${activeTab === 'content' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-gray-200'}`}>
                        <i className="fas fa-edit mr-2"></i>Content Management System
                    </button>
                </div>
            </div>
            
            {activeTab === 'users' ? (
                <>
                    <Card className="mb-8">
                        <h3 className="text-xl font-bold mb-4 text-primary">Management Admin</h3>
                        <div className="space-y-4">
                             <div>
                                <label htmlFor="new-admin" className="block text-sm font-medium text-gray-300 mb-1">Tambah Admin Baru (Nomor WA)</label>
                                <div className="flex gap-2">
                                     <input
                                        id="new-admin"
                                        type="tel"
                                        value={newAdminNumber}
                                        onChange={(e) => setNewAdminNumber(e.target.value)}
                                        placeholder="Contoh: 6281234567890"
                                        className="w-full p-2 bg-slate-700 rounded-lg border border-slate-600"
                                    />
                                    <button onClick={handleAddAdmin} className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-lg">
                                        Jadikan Admin
                                    </button>
                                </div>
                                 <p className="text-xs text-gray-500 mt-1">Pastikan pengguna sudah terdaftar di aplikasi.</p>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-gray-200 mb-2">Daftar Admin Saat Ini ({admins.length})</h4>
                                 {admins.length > 0 ? (
                                    <ul className="divide-y divide-slate-700">
                                        {admins.map((admin, index) => (
                                            <li key={index} className="p-2 flex items-center justify-between">
                                                <span className="font-semibold text-gray-300">{admin}</span>
                                                <button onClick={() => handleRemoveAdmin(admin)} className="text-sm text-red-400 hover:text-red-300">
                                                    <i className="fas fa-trash-alt mr-1"></i> Hapus
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-center text-gray-400 py-4">Belum ada admin yang ditambahkan.</p>
                                )}
                            </div>
                        </div>
                    </Card>

                    <Card className="mb-6">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Cari nomor pengguna..."
                            className="w-full p-3 bg-slate-700 text-white border border-slate-600 rounded-lg focus:ring-2 focus:ring-primary"
                        />
                    </Card>

                    <Card>
                        <h3 className="text-xl font-bold mb-4 text-primary">Daftar Pengguna Terverifikasi ({filteredUsers.length})</h3>
                        {filteredUsers.length > 0 ? (
                            <div className="max-h-[60vh] overflow-y-auto no-scrollbar">
                                <ul className="divide-y divide-slate-700">
                                    {filteredUsers.map((user, index) => (
                                        <li key={index} className="p-3 flex items-center justify-between hover:bg-slate-700/50 rounded-md">
                                            <div className="flex items-center">
                                                <i className="fas fa-user-check text-green-400 mr-4"></i>
                                                <span className="font-semibold text-gray-300 tracking-wider">{user}</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <a href={`https://wa.me/${user}`} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-primary transition-colors">
                                                    <i className="fab fa-whatsapp mr-2"></i> Kirim Pesan
                                                </a>
                                                {isDeveloper && (
                                                    <Link to={`/profil/${user}`} className="text-sm text-gray-400 hover:text-sky-400 transition-colors">
                                                        <i className="fas fa-user-circle mr-2"></i> Lihat Profil
                                                    </Link>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p className="text-center text-gray-400 py-8">Tidak ada pengguna yang cocok dengan pencarian atau tidak ada pengguna terdaftar.</p>
                        )}
                    </Card>
                </>
            ) : (
                <div className="space-y-6">
                    <div className="flex gap-2 overflow-x-auto no-scrollbar">
                        <button onClick={() => setContentMode('lentera')} className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap ${contentMode === 'lentera' ? 'bg-primary text-white' : 'bg-slate-700 text-gray-300'}`}>Lentera Hati</button>
                        <button onClick={() => setContentMode('quotes')} className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap ${contentMode === 'quotes' ? 'bg-primary text-white' : 'bg-slate-700 text-gray-300'}`}>Kutipan Islami</button>
                        <button onClick={() => setContentMode('artikel')} className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap ${contentMode === 'artikel' ? 'bg-primary text-white' : 'bg-slate-700 text-gray-300'}`}>Artikel Pustaka</button>
                    </div>

                    {contentMode === 'lentera' && (
                        <Card>
                            <h3 className="text-xl font-bold mb-4 text-primary">Buat Postingan Lentera Hati</h3>
                            <div className="space-y-4">
                                <input type="text" value={lenteraTitle} onChange={(e) => setLenteraTitle(e.target.value)} placeholder="Judul Renungan / Pengumuman" className="w-full p-2 bg-slate-700 rounded-lg border border-slate-600" />
                                <input type="text" value={lenteraLocation} onChange={(e) => setLenteraLocation(e.target.value)} placeholder="Lokasi (Opsional, Default: Cibinong)" className="w-full p-2 bg-slate-700 rounded-lg border border-slate-600" />
                                <textarea value={lenteraContent} onChange={(e) => setLenteraContent(e.target.value)} placeholder="Isi Renungan..." rows={5} className="w-full p-2 bg-slate-700 rounded-lg border border-slate-600" />
                                
                                <div className="flex items-center gap-4 p-3 bg-slate-800 rounded-lg border border-slate-700">
                                    <label className="font-semibold text-white">Aktifkan Mode Giveaway:</label>
                                    <button onClick={() => setIsGiveaway(!isGiveaway)} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 ${isGiveaway ? 'bg-primary' : 'bg-slate-600'}`}>
                                      <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${isGiveaway ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>

                                {isGiveaway && (
                                    <div className="mt-4 p-3 border border-yellow-600 bg-yellow-900/30 rounded-lg animate-fade-in">
                                        <h4 className="text-sm font-semibold text-yellow-300 mb-2">Pilih Pemenang Giveaway (Acak dari Pengguna)</h4>
                                        <div className="flex gap-2">
                                            <input type="text" readOnly value={winner} placeholder="Nomor pemenang akan muncul di sini" className="flex-grow p-2 bg-slate-800 text-gray-400 rounded-lg border border-slate-700"/>
                                            <button 
                                                type="button" 
                                                onClick={handleCopyWinner} 
                                                className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-3 rounded-lg disabled:opacity-50"
                                                disabled={!winner || winner === 'Tidak ada pengguna terverifikasi.'}
                                                title="Salin Nomor"
                                            >
                                                <i className="fas fa-copy"></i>
                                            </button>
                                            <button type="button" onClick={handleSelectWinner} className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg"><i className="fas fa-random mr-2"></i>Pilih Acak</button>
                                        </div>
                                    </div>
                                )}

                                <button onClick={handlePublishLentera} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg">Terbitkan</button>
                            </div>
                        </Card>
                    )}

                    {contentMode === 'quotes' && (
                        <Card>
                            <h3 className="text-xl font-bold mb-4 text-primary">Tambah Kutipan Baru</h3>
                            <div className="space-y-4">
                                <textarea value={quoteText} onChange={(e) => setQuoteText(e.target.value)} placeholder="Isi Kutipan (Bahasa Indonesia)..." rows={3} className="w-full p-2 bg-slate-700 rounded-lg border border-slate-600" />
                                <input type="text" value={quoteAuthor} onChange={(e) => setQuoteAuthor(e.target.value)} placeholder="Tokoh / Sumber" className="w-full p-2 bg-slate-700 rounded-lg border border-slate-600" />
                                <button onClick={handleAddQuote} className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 rounded-lg">Simpan Kutipan</button>
                            </div>
                        </Card>
                    )}

                    {contentMode === 'artikel' && (
                         <Card>
                            <h3 className="text-xl font-bold mb-4 text-primary">Tulis Artikel Pustaka Ilmu</h3>
                            <div className="space-y-4">
                                <input type="text" value={articleTitle} onChange={(e) => setArticleTitle(e.target.value)} placeholder="Judul Artikel" className="w-full p-2 bg-slate-700 rounded-lg border border-slate-600" />
                                <Dropdown
                                    items={categoryItems}
                                    selectedValue={articleCategory}
                                    onSelect={setArticleCategory}
                                    placeholder="Pilih Kategori"
                                />
                                <textarea value={articleContent} onChange={(e) => setArticleContent(e.target.value)} placeholder="Isi Artikel (Gunakan paragraf)..." rows={10} className="w-full p-2 bg-slate-700 rounded-lg border border-slate-600" />
                                <button onClick={handlePublishArticle} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg">Terbitkan Artikel</button>
                            </div>
                        </Card>
                    )}
                </div>
            )}
        </section>
    );
};

export default Admin;
