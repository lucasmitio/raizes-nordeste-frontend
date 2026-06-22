import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [unidade, setUnidade] = useState('Recife - Centro');
  const [carrinho, setCarrinho] = useState([]);
  const [lgpdConsent, setLgpdConsent] = useState(false);
  const [clienteFidelidade, setClienteFidelidade] = useState(null);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prev) => {
      const existe = prev.find((item) => item.id === produto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === produto.id ? { ...item, qtd: item.qtd + 1 } : item
        );
      }
      return [...prev, { ...produto, qtd: 1 }];
    });
  };

  const removerDoCarrinho = (id) => {
    setCarrinho((prev) => prev.filter((item) => item.id !== id));
  };

  const limparCarrinho = () => setCarrinho([]);

  return (
    <AppContext.Provider value={{
      unidade, setUnidade,
      carrinho, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho,
      lgpdConsent, setLgpdConsent,
      clienteFidelidade, setClienteFidelidade
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);