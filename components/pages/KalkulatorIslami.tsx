import React, { useState, useMemo } from 'react';
import Card from '../ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';
import Dropdown from '../ui/Dropdown';

type CalculatorMode = 'zakat' | 'waris';

// --- Zakat Types & Logic ---
interface ZakatMalResult {
    nisabMonetaryInRupiah: number;
    isGoldWajib: boolean;
    goldZakatAmount: number;
    isSilverWajib: boolean;
    silverZakatAmount: number;
    netMonetaryAssets: number;
    isMonetaryWajib: boolean;
    monetaryZakatAmount: number;
    totalZakat: number;
}

// --- Waris Types & Logic ---
interface AhliWaris {
    suami: boolean;
    istri: number;
    anakLaki: number;
    anakPerempuan: number;
    ayah: boolean;
    ibu: boolean;
}

interface HasilBagian {
    nama: string;
    bagian: string;
    jumlah: number;
}


const KalkulatorIslami: React.FC = () => {
    const [mode, setMode] = useState<CalculatorMode>('zakat');
    const [openAccordion, setOpenAccordion] = useState<string | null>('harta-uang');

    const handleAccordionToggle = (id: string) => {
        setOpenAccordion(prev => (prev === id ? null : id));
    };

    return (
        <section id="kalkulator-islami" className="animate-fade-in">
            <div className="mb-6 text-center">
                <h2 className="text-3xl font-bold text-white">Asisten Keuangan Islami</h2>
            </div>

            <div className="mb-6 border-b border-slate-700">
                <div className="flex -mb-px flex-wrap">
                    <button onClick={() => setMode('zakat')} className={`inline-block p-3 border-b-2 font-semibold ${mode === 'zakat' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-gray-200'}`}>
                        <i className="fas fa-calculator mr-2"></i>Kalkulator Zakat
                    </button>
                    <button onClick={() => setMode('waris')} className={`inline-block p-3 border-b-2 font-semibold ${mode === 'waris' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-gray-200'}`}>
                        <i className="fas fa-file-invoice-dollar mr-2"></i>Kalkulator Waris
                    </button>
                </div>
            </div>

            {mode === 'zakat' && <ZakatCalculator openAccordion={openAccordion} onAccordionToggle={handleAccordionToggle} />}
            {mode === 'waris' && <WarisCalculator />}
        </section>
    );
};


// =======================================================
// ZAKAT CALCULATOR COMPONENT
// =======================================================
const ZakatCalculator: React.FC<{ openAccordion: string | null; onAccordionToggle: (id: string) => void; }> = ({ openAccordion, onAccordionToggle }) => {
    const [fitrahType, setFitrahType] = useState('uang');
    const [fitrahPeople, setFitrahPeople] = useState(1);
    const [goldPrice, setGoldPrice] = useState('0');
    const [malSavings, setMalSavings] = useState('');
    const [malReceivables, setMalReceivables] = useState('');
    const [malDebt, setMalDebt] = useState('');
    
    const handleNumericInput = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) { setter(value); }
    };

    const fitrahItems = [
        { value: 'uang', label: 'Uang (Rp 45.000)' },
        { value: 'beras', label: 'Beras (2.5 kg)' },
    ];

    const fitrahResult = useMemo(() => {
        const people = fitrahPeople > 0 ? fitrahPeople : 0;
        if (fitrahType === 'uang') {
            return `Rp ${(people * 45000).toLocaleString('id-ID')}`;
        } else {
            return `${(people * 2.5).toFixed(1)} kg Beras`;
        }
    }, [fitrahPeople, fitrahType]);

    const zakatMalResult: ZakatMalResult = useMemo(() => {
        const priceOfGold = Number(goldPrice) || 0;
        const nisabMonetaryInRupiah = 85 * priceOfGold;
        const totalMonetaryAssets = (Number(malSavings) || 0) + (Number(malReceivables) || 0);
        const netMonetaryAssets = totalMonetaryAssets - (Number(malDebt) || 0);
        const isMonetaryWajib = netMonetaryAssets >= nisabMonetaryInRupiah;
        const monetaryZakatAmount = isMonetaryWajib ? netMonetaryAssets * 0.025 : 0;
        
        return {
            nisabMonetaryInRupiah,
            netMonetaryAssets,
            isMonetaryWajib,
            monetaryZakatAmount,
            isGoldWajib: false, goldZakatAmount: 0, isSilverWajib: false, silverZakatAmount: 0, totalZakat: monetaryZakatAmount,
        };
    }, [goldPrice, malSavings, malReceivables, malDebt]);
    
    return (
        <div className="animate-fade-in space-y-8">
            <Card>
                <h3 className="text-2xl font-bold mb-4 text-primary">Zakat Fitrah</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Dropdown
                            label="Jenis Pembayaran"
                            items={fitrahItems}
                            selectedValue={fitrahType}
                            onSelect={setFitrahType}
                        />
                    </div>
                    <div>
                        <label htmlFor="fitrah-people" className="block text-sm font-medium text-gray-200 mb-1">Jumlah Orang</label>
                        <input type="text" inputMode="numeric" pattern="[0-9]*" id="fitrah-people" value={fitrahPeople || ''} onChange={e => /^\d*$/.test(e.target.value) && setFitrahPeople(Number(e.target.value))} className="w-full p-2.5 bg-slate-700 text-gray-100 border border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-150"/>
                    </div>
                </div>
                <div className="mt-6 p-4 bg-slate-900 rounded-lg text-center">
                    <p className="text-gray-300">Total Zakat Fitrah Anda:</p>
                    <p className="text-2xl font-bold text-primary">{fitrahResult}</p>
                </div>
            </Card>

            <Card>
                <h3 className="text-2xl font-bold mb-4 text-primary">Zakat Mal</h3>
                <p className="text-xs text-gray-400 mb-4">Nisab (batas minimum) diasumsikan 85 gram emas. Harga emas per gram (dapat disesuaikan):</p>
                <div className="flex items-center mb-4">
                    <span className="mr-2 p-2.5 text-gray-200">Rp</span>
                    <input type="text" inputMode="numeric" pattern="[0-9]*" value={goldPrice} onChange={handleNumericInput(setGoldPrice)} className="w-full p-2.5 bg-slate-700 text-gray-100 border border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-150" placeholder="Masukkan harga emas saat ini"/>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="mb-2">
                            <label className="block text-sm font-medium text-gray-200">Pendapatan/Tabungan (per tahun)</label>
                            <input type="text" inputMode="numeric" pattern="[0-9]*" placeholder="0" value={malSavings} onChange={handleNumericInput(setMalSavings)} className="w-full p-2.5 bg-slate-700 text-gray-100 border border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-150"/>
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-medium text-gray-200">Piutang (yang diharapkan kembali)</label>
                            <input type="text" inputMode="numeric" pattern="[0-9]*" placeholder="0" value={malReceivables} onChange={handleNumericInput(setMalReceivables)} className="w-full p-2.5 bg-slate-700 text-gray-100 border border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-150"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-200">Utang (yang jatuh tempo tahun ini)</label>
                            <input type="text" inputMode="numeric" pattern="[0-9]*" placeholder="0" value={malDebt} onChange={handleNumericInput(setMalDebt)} className="w-full p-2.5 bg-slate-700 text-gray-100 border border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-150"/>
                        </div>
                    </div>
                    <div className="p-4 bg-slate-900 rounded-lg space-y-3 flex flex-col justify-center">
                        <div className="flex justify-between text-sm"><span className="text-gray-400">Nisab Harta (85gr Emas):</span> <span className="font-semibold">Rp {zakatMalResult.nisabMonetaryInRupiah.toLocaleString('id-ID')}</span></div>
                         <hr className="border-slate-700"/>
                        <div className="flex justify-between font-bold"><span className="text-gray-300">Total Harta Wajib Zakat (Neto):</span> <span>Rp {zakatMalResult.netMonetaryAssets.toLocaleString('id-ID')}</span></div>
                        <div className={`mt-3 p-3 rounded-md text-center font-bold ${zakatMalResult.isMonetaryWajib ? 'bg-green-800/50' : 'bg-red-800/50'}`}>
                           {zakatMalResult.isMonetaryWajib ? 'Anda Wajib Membayar Zakat Mal' : 'Anda Belum Wajib Membayar Zakat Mal'}
                        </div>
                        <div className="pt-3 border-t border-slate-700 mt-3">
                             <div className="flex justify-between items-center text-lg">
                                <span className="font-bold">TOTAL ZAKAT MAL ANDA (2.5%):</span>
                                <span className="font-bold text-2xl text-primary">Rp {zakatMalResult.monetaryZakatAmount.toLocaleString('id-ID')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};


// =======================================================
// WARIS CALCULATOR COMPONENT
// =======================================================
const WarisCalculator: React.FC = () => {
    const [harta, setHarta] = useState('');
    const [hutang, setHutang] = useState('');
    const [ahliWaris, setAhliWaris] = useState<AhliWaris>({ suami: false, istri: 0, anakLaki: 0, anakPerempuan: 0, ayah: false, ibu: false });
    const [hasil, setHasil] = useState<HasilBagian[] | null>(null);

    const handleNumericInput = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) { setter(value); }
    };
    
    const handleWarisInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setAhliWaris(prev => {
            const newState = { ...prev };
            if (type === 'checkbox') {
                (newState[name as keyof AhliWaris] as boolean) = checked;
                if (name === 'suami' && checked) newState.istri = 0; 
            } else {
                const numValue = parseInt(value, 10);
                let finalValue = !isNaN(numValue) && numValue >= 0 ? numValue : 0;
                
                if (name === 'istri' && finalValue > 4) {
                    finalValue = 4;
                }

                (newState[name as keyof AhliWaris] as number) = finalValue;
                if (name === 'istri' && finalValue > 0) newState.suami = false; 
            }
            return newState;
        });
    };
    
    const handleHitungWaris = () => {
        let totalHarta = parseFloat(harta) || 0;
        let totalHutang = parseFloat(hutang) || 0;
        if (totalHarta <= totalHutang) {
            setHasil([{ nama: "Harta tidak mencukupi untuk menutupi hutang.", bagian: "", jumlah: 0 }]);
            return;
        }
        let hartaBersih = totalHarta - totalHutang;
        let sisaHarta = hartaBersih;
        const bagian: HasilBagian[] = [];
        const adaAnak = ahliWaris.anakLaki > 0 || ahliWaris.anakPerempuan > 0;

        if (ahliWaris.suami) {
            const bagianSuami = adaAnak ? 1/4 : 1/2;
            const jumlah = hartaBersih * bagianSuami;
            sisaHarta -= jumlah;
            bagian.push({ nama: 'Suami', bagian: adaAnak ? '1/4' : '1/2', jumlah });
        }
        if (ahliWaris.istri > 0) {
             const bagianIstri = adaAnak ? 1/8 : 1/4;
             const jumlah = hartaBersih * bagianIstri;
             sisaHarta -= jumlah;
             bagian.push({ nama: `Istri (${ahliWaris.istri})`, bagian: adaAnak ? '1/8' : '1/4', jumlah });
        }
        if (ahliWaris.ayah) {
            const bagianAyah = adaAnak ? 1/6 : (ahliWaris.ibu ? (hartaBersih-sisaHarta > 0 ? (hartaBersih-sisaHarta)*(2/3) : 1/3) : 1/3); // Complex logic simplified
            const jumlah = adaAnak ? hartaBersih * bagianAyah : sisaHarta * bagianAyah;
            sisaHarta -= jumlah;
            bagian.push({ nama: 'Ayah', bagian: '1/6 + Sisa', jumlah });
        }
        if (ahliWaris.ibu) {
             const bagianIbu = adaAnak ? 1/6 : 1/3;
             const jumlah = adaAnak ? hartaBersih * bagianIbu : sisaHarta * bagianIbu;
             sisaHarta -= jumlah;
             bagian.push({ nama: 'Ibu', bagian: adaAnak ? '1/6' : '1/3 Sisa', jumlah });
        }
        if (adaAnak) {
            const totalBagianAnak = ahliWaris.anakLaki * 2 + ahliWaris.anakPerempuan;
            if (totalBagianAnak > 0) {
                const perBagian = sisaHarta / totalBagianAnak;
                if (ahliWaris.anakLaki > 0) bagian.push({ nama: `Anak Laki-laki (${ahliWaris.anakLaki})`, bagian: 'Sisa (2 bagian)', jumlah: perBagian * 2 * ahliWaris.anakLaki });
                if (ahliWaris.anakPerempuan > 0) bagian.push({ nama: `Anak Perempuan (${ahliWaris.anakPerempuan})`, bagian: 'Sisa (1 bagian)', jumlah: perBagian * ahliWaris.anakPerempuan });
            }
        }
        setHasil(bagian);
    };

    return (
        <div className="animate-fade-in space-y-8">
            <Card>
                <h3 className="text-2xl font-bold mb-4 text-primary">Data Harta & Ahli Waris</h3>
                {/* Inputs for harta, hutang, ahli waris */}
                <div className="space-y-4">
                    <div><label className="block text-sm font-medium">Total Harta Ditinggalkan (Rp)</label><input type="text" inputMode="numeric" value={harta} onChange={handleNumericInput(setHarta)} className="w-full p-2 border border-gray-500 rounded-lg bg-gray-700" placeholder="Contoh: 100000000" /></div>
                    <div><label className="block text-sm font-medium">Hutang/Wasiat (Rp)</label><input type="text" inputMode="numeric" value={hutang} onChange={handleNumericInput(setHutang)} className="w-full p-2 border border-gray-500 rounded-lg bg-gray-700" placeholder="0" /></div>
                    <hr className="border-gray-500" />
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center"><input type="checkbox" id="ayah" name="ayah" checked={ahliWaris.ayah} onChange={handleWarisInputChange} className="h-4 w-4 rounded" /><label htmlFor="ayah" className="ml-2">Ayah</label></div>
                        <div className="flex items-center"><input type="checkbox" id="ibu" name="ibu" checked={ahliWaris.ibu} onChange={handleWarisInputChange} className="h-4 w-4 rounded" /><label htmlFor="ibu" className="ml-2">Ibu</label></div>
                    </div>
                    <div className="flex items-center"><input type="checkbox" id="suami" name="suami" checked={ahliWaris.suami} onChange={handleWarisInputChange} className="h-4 w-4 rounded" /><label htmlFor="suami" className="ml-2">Suami</label></div>
                    <div><label className="block text-sm font-medium">Jumlah Istri</label><input type="text" inputMode="numeric" name="istri" value={ahliWaris.istri || ''} onChange={handleWarisInputChange} placeholder="0" className="w-full p-2 border border-gray-500 rounded-lg bg-gray-700" disabled={ahliWaris.suami} /></div>
                    <div><label className="block text-sm font-medium">Jumlah Anak Laki-laki</label><input type="text" inputMode="numeric" name="anakLaki" value={ahliWaris.anakLaki || ''} onChange={handleWarisInputChange} placeholder="0" className="w-full p-2 border border-gray-500 rounded-lg bg-gray-700" /></div>
                    <div><label className="block text-sm font-medium">Jumlah Anak Perempuan</label><input type="text" inputMode="numeric" name="anakPerempuan" value={ahliWaris.anakPerempuan || ''} onChange={handleWarisInputChange} placeholder="0" className="w-full p-2 border border-gray-500 rounded-lg bg-gray-700" /></div>
                </div>
                <button onClick={handleHitungWaris} className="mt-6 w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-lg">Hitung Pembagian Waris</button>
            </Card>
            <Card>
                <h3 className="text-2xl font-bold mb-4 text-primary">Hasil Perhitungan</h3>
                {hasil ? (
                    <div className="space-y-3">
                        {hasil.map((b, i) => (<div key={i} className="p-3 bg-gray-700 rounded-lg flex justify-between items-center"><div><p className="font-semibold">{b.nama}</p><p className="text-sm text-gray-400">Bagian: {b.bagian}</p></div><p className="font-bold text-lg">Rp {b.jumlah.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</p></div>))}
                    </div>
                ) : (
                    <div className="text-center text-gray-400 py-10"><i className="fas fa-calculator text-4xl mb-4"></i><p>Hasil perhitungan akan ditampilkan di sini.</p></div>
                )}
            </Card>
        </div>
    );
};


export default KalkulatorIslami;