import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CreditCard, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function Checkout() {
  const { carrinho, limparCarrinho } = useApp();
  const [statusPagamento, setStatusPagamento] = useState('idle');

  const total = carrinho.reduce((acc, item) => acc + (item.preco * item.qtd), 0);

  const simularGatewayPagamento = () => {
    if (carrinho.length === 0) return;
    setStatusPagamento('enviando');
    setTimeout(() => {
      const sucesso = Math.random() > 0.15;
      if (sucesso) {
        setStatusPagamento('aprovado');
        limparCarrinho();
      } else {
        setStatusPagamento('erro');
      }
    }, 2500);
  };

  if (statusPagamento === 'aprovado') {
    return (
      <div className="p-8 text-center bg-white rounded-xl shadow-md max-w-md mx-auto mt-10 border border-green-100">
        <CheckCircle2 className="text-green-500 mx-auto mb-4" size={64} />
        <h2 className="text-2xl font-bold text-gray-800">Pedido Confirmado!</h2>
        <p className="text-gray-600 mt-2">Sua solicitação de pagamento foi aprovada pelo gateway externo.</p>
        <button onClick={() => setStatusPagamento('idle')} className="mt-6 bg-amber-600 text-white px-6 py-2 rounded-lg w-full font-medium">Fazer Novo Pedido</button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <CreditCard className="text-amber-600" /> Resumo do Pedido
      </h2>
      {carrinho.length === 0 ? (
        <p className="text-gray-500 text-center py-6">Seu carrinho está vazio.</p>
      ) : (
        <>
          <div className="space-y-4 max-h-60 overflow-y-auto mb-6 pr-2">
            {carrinho.map(item => (
              <div key={item.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-semibold text-gray-800">{item.nome}</p>
                  <p className="text-xs text-gray-500">Qtd: {item.qtd}x</p>
                </div>
                <span className="font-bold text-gray-700">R$ {(item.preco * item.qtd).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 mb-6 flex justify-between items-center">
            <span className="text-gray-600 font-medium">Total Geral:</span>
            <span className="text-3xl font-black text-amber-700">R$ {total.toFixed(2)}</span>
          </div>
          {statusPagamento === 'erro' && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg flex items-center gap-2 text-sm">
              <AlertTriangle size={20} className="shrink-0" />
              <span>Falha na operadora do cartão. Tente novamente.</span>
            </div>
          )}
          <button
            onClick={simularGatewayPagamento}
            disabled={statusPagamento === 'enviando'}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-3 disabled:bg-gray-400"
          >
            {statusPagamento === 'enviando' ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Processando no Gateway...
              </>
            ) : (
              `Pagar R$ ${total.toFixed(2)}`
            )}
          </button>
        </>
      )}
    </div>
  );
}