import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Cardapio from './components/Cardapio';
import Checkout from './components/Checkout';
import LgpdTerm from './components/LgpdTerm';
import DashboardMatriz from './components/DashboardMatriz';
import { LayoutDashboard, Store } from 'lucide-react';

export default function App() {
  const [abaAtiva, setAbaAtiva] = useState('cliente');

  return (
    <AppProvider>
      <div className="min-h-screen bg-amber-50/30 pb-24">
        <header className="bg-amber-800 text-white py-4 px-6 shadow-md mb-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-xl font-black tracking-wider">RAÍZES DO NORDESTE</span>
            <div className="flex bg-amber-900/50 p-1 rounded-xl border border-amber-700/50">
              <button onClick={() => setAbaAtiva('cliente')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${abaAtiva === 'cliente' ? 'bg-amber-600 text-white shadow' : 'text-amber-200 hover:text-white'}`}>
                <Store size={16} /> Visão Loja (App/Totem)
              </button>
              <button onClick={() => setAbaAtiva('matriz')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${abaAtiva === 'matriz' ? 'bg-amber-600 text-white shadow' : 'text-amber-200 hover:text-white'}`}>
                <LayoutDashboard size={16} /> Visão Matriz (Dashboard)
              </button>
            </div>
          </div>
        </header>

        {abaAtiva === 'cliente' ? (
          <main className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2"><Cardapio /></div>
            <div className="lg:col-span-1"><Checkout /></div>
          </main>
        ) : (
          <DashboardMatriz />
        )}
        <LgpdTerm />
      </div>
    </AppProvider>
  );
}