import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Investment } from "../types/Investment";
import { api } from "../services/api";

type InvestmentContextType = {
  investments: Investment[];
  addInvestment: (investment: Investment) => void;
  editInvestment: (id: number, updatedInvestment: Investment) => void;
  deleteInvestment: (id: number) => void;
};

const InvestmentContext = createContext<InvestmentContextType | undefined>(undefined);

export function InvestmentProvider({ children }: { children: ReactNode }) {
  const [investments, setInvestments] = useState<Investment[]>([]);

  // Carrega os investimentos do backend ao iniciar
  useEffect(() => {
    api.get("/")
      .then(response => {
        // Converte cada investimento para o formato esperado pelo frontend
        const converted = (response.data.investments || []).map((inv: any) => ({
          id: inv.id,
          name: inv.nome,
          type: inv.tipo,
          amount: inv.valor,
          date: inv.data,
        }));
        setInvestments(converted);
      })
      .catch(error => console.error(error));
  }, []);

  const addInvestment = async (investment: Investment) => {
    const payload = {
      nome: investment.name,
      tipo: investment.type,
      valor: investment.amount,
      data: investment.date,
    };
    const response = await api.post("/", payload);
    const novo = response.data.data;
    // Converte o novo investimento para o formato esperado pelo frontend
    const converted = {
      id: novo.id,
      name: novo.nome,
      type: novo.tipo,
      amount: novo.valor,
      date: novo.data,
    };
    setInvestments((prev) => [...prev, converted]);
  };

  const editInvestment = async (id: number, investment: Investment) => {
    const payload = {
      nome: investment.name,
      tipo: investment.type,
      valor: investment.amount,
      data: investment.date,
    };
    const response = await api.put(`/${id}`, payload);
    const atualizado = response.data.data;
    const converted = {
      id: atualizado.id,
      name: atualizado.nome,
      type: atualizado.tipo,
      amount: atualizado.valor,
      date: atualizado.data,
    };
    setInvestments((prev) =>
      prev.map((inv) => (inv.id === id ? converted : inv))
    );
  };

  const deleteInvestment = async (id: number) => {
    await api.delete(`/${id}`);
    setInvestments((prev) => prev.filter((inv) => inv.id !== id));
  };

  return (
    <InvestmentContext.Provider value={{ investments, addInvestment, editInvestment, deleteInvestment }}>
      {children}
    </InvestmentContext.Provider>
  );
}

export function useInvestments() {
  const context = useContext(InvestmentContext);
  if (!context) throw new Error("useInvestments deve ser usado dentro de um InvestmentProvider");
  return context;
}
