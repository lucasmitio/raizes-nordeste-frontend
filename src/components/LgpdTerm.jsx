import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck } from 'lucide-react';

export default function LgpdTerm() {
  const { lgpdConsent, setLgpdConsent } = useApp();
  if (lgpdConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-gray-100 p-6 shadow-2xl border-t-4 border-amber-500 z-50">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <ShieldCheck className="text-amber-500 shrink-0" size={32} />
          <p className="text-sm leading-relaxed text-gray-300">
            A <span className="font-semibold text-white">Raízes do Nordeste</span> valoriza a sua privacidade. Utilizamos os seus dados apenas para processar pedidos em conformidade com a <span className="text-amber-400 font-semibold">LGPD</span>.
          </p>
        </div>
        <button onClick={() => setLgpdConsent(true)} className="bg-amber-50 hover:bg-amber-600 text-gray-900 font-bold px-6 py-2.5 rounded-lg text-sm transition-colors shrink-0">
          Aceitar e Continuar
        </button>
      </div>
    </div>
  );
}