import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, DollarSign, ShoppingBag, ShieldAlert, MapPin } from 'lucide-react';

const DADOS_VENDAS_REGIAO = [
  { name: 'Recife', total: 45000, pedidos: 1200 },
  { name: 'Caruaru', total: 28000, pedidos: 850 },
  { name: 'Fortaleza', total: 39000, pedidos: 1050 },
  { name: 'Salvador', total: 31000, pedidos: 790 },
];

const PRODUTOS_MAIS_VENDIDOS = [
  { name: 'Cuscuz Completo', qtd: 2450 },
  { name: 'Tapioca Carne de Sol', qtd: 1980 },
  { name: 'Bolo de Macaxeira', qtd: 1420 },
  { name: 'Canjica Nordestina', qtd: 1100 },
];

const LOGS_AUDITORIA_SEN_SIVEIS = [
  { id: 'LOG-8832', usuario: 'gerente_recife1', acao: 'Desconto aplicado (15%)', detalhe: 'Pedido #4992 - Cliente Fidelidade', data: 'Hoje, 14:32', status: 'Sucesso' },
  { id: 'LOG-8831', usuario: 'caixa_caruaru2', acao: 'Cancelamento de Pedido', detalhe: 'Pedido #4981 - Erro de digitação', data: 'Hoje, 13:15', status: 'Pendente' },
  { id: 'LOG-8830', usuario: 'sistema_central', acao: 'Acesso a Dados Pessoais', detalhe: 'Exportação de relatório anonimizado', data: 'Hoje, 11:00', status: 'Auditado (LGPD)' },
];

export default function DashboardMatriz() {
  const [regiaoFiltro, setRegiaoFiltro] = useState('Todas');
  const faturamentoTotal = DADOS_VENDAS_REGIAO.reduce((acc, item) => acc + item.total, 0);
  const totalPedidos = DADOS_VENDAS_REGIAO.reduce((acc, item) => acc + item.pedidos, 0);
  const ticketMedioGeral = (faturamentoTotal / totalPedidos).toFixed(2);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-5 border-gray-200">
        <div>
          <h1 className="text-3xl font-black text-amber-900 font-serif">Painel de Controle da Matriz</h1>
          <p className="text-sm text-gray-500">Monitoramento estratégico e auditoria de conformidade.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">Faturamento Consolidado</p>
            <h3 className="text-3xl font-black text-gray-800 mt-1">R$ {faturamentoTotal.toLocaleString('pt-BR')}</h3>
          </div>
          <div className="p-4 bg-green-50 text-green-600 rounded-2xl"><DollarSign size={24} /></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">Volume de Pedidos</p>
            <h3 className="text-3xl font-black text-gray-800 mt-1">{totalPedidos.toLocaleString('pt-BR')}</h3>
          </div>
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl"><ShoppingBag size={24} /></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">Ticket Médio da Rede</p>
            <h3 className="text-3xl font-black text-gray-800 mt-1">R$ {ticketMedioGeral}</h3>
          </div>
          <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl"><TrendingUp size={24} /></div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Faturamento Bruto por Unidade</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DADOS_VENDAS_REGIAO}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" name="Receita Total" fill="#b45309" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Produtos Mais Consumidos</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={PRODUTOS_MAIS_VENDIDOS}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="qtd" name="Unidades Vendidas" stroke="#ea580c" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <ShieldAlert className="text-red-600" size={22} />
          <h3 className="text-lg font-bold text-gray-800">Trilha de Auditoria Centralizada</h3>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase border-b border-gray-100">
              <th className="p-4">ID Log</th>
              <th className="p-4">Operador</th>
              <th className="p-4">Ação</th>
              <th className="p-4">Data/Hora</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
            {LOGS_AUDITORIA_SEN_SIVEIS.map((log) => (
              <tr key={log.id}>
                <td className="p-4 font-mono font-bold text-amber-700 text-xs">{log.id}</td>
                <td className="p-4 font-medium text-gray-900">{log.usuario}</td>
                <td className="p-4">{log.acao}</td>
                <td className="p-4 text-gray-400 text-xs">{log.data}</td>
                <td className="p-4"><span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">{log.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}