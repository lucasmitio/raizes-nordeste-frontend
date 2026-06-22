import React from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Star } from 'lucide-react';

const PRODUTOS_MOCK = [
  { 
    id: 1, 
    nome: 'Cuscuz Completo', 
    preco: 14.90, 
    categoria: 'Comidas', 
    regional: 'Recife', 
    sazonal: false, 
    img: 'https://images.unsplash.com/photo-1695240954002-3ef3e1c667a4?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    id: 2, 
    nome: 'Tapioca de Carne de Sol', 
    preco: 16.50, 
    categoria: 'Comidas', 
    regional: 'Todas', 
    sazonal: false, 
    img: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    id: 3, 
    nome: 'Bolo de Macaxeira', 
    preco: 8.00, 
    categoria: 'Sobremesas', 
    regional: 'Todas', 
    sazonal: false, 
    img: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    id: 4, 
    nome: 'Canjica Nordestina', 
    preco: 10.00, 
    categoria: 'Junina', 
    regional: 'Todas', 
    sazonal: true, 
    img: 'https://images.unsplash.com/photo-1633519817765-76fe80796cd4?q=80&w=600&auto=format&fit=crop' 
  }
];

export default function Cardapio() {
  const { unidade, adicionarAoCarrinho } = useApp();

  // Filtragem dinâmica baseada nas regras de negócio (Unidade/Sazonalidade)
  const produtosFiltrados = PRODUTOS_MOCK.filter(p => p.regional === 'Todas' || unidade.includes(p.regional));

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold text-amber-800 font-serif">Raízes do Nordeste</h1>
          <p className="text-gray-600">Cardápio da Unidade: <span className="font-semibold text-amber-600">{unidade}</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {produtosFiltrados.map((produto) => (
          <div key={produto.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-amber-100 hover:shadow-lg transition-shadow">
            <div className="h-48 overflow-hidden relative">
              <img src={produto.img} alt={produto.nome} className="w-full h-full object-cover" />
              {produto.sazonal && (
                <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Star size={12} fill="white" /> Especial de São João
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800">{produto.nome}</h3>
              <p className="text-sm text-gray-500 mb-4">{produto.categoria}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-amber-700">R$ {produto.preco.toFixed(2)}</span>
                <button 
                  onClick={() => adicionarAoCarrinho(produto)}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
                >
                  <ShoppingBag size={18} /> Adicionar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}