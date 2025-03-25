import { createContext, useContext, useState, ReactNode } from "react";
import { Investment } from "../types/Investment";

type InvestmentContextType = {
  investments: Investment[];
  addInvestment: (investment: Investment) => void;
  editInvestment: (id: number, updatedInvestment: Investment) => void;
  deleteInvestment: (id: number) => void;
};

const InvestmentContext = createContext<InvestmentContextType | undefined>(undefined);

export function InvestmentProvider({ children }: { children: ReactNode }) {
  const [investments, setInvestments] = useState<Investment[]>([]);

  const addInvestment = (investment: Investment) => {
    setInvestments([...investments, investment]);
  };

  const editInvestment = (id: number, updatedInvestment: Investment) => {
    setInvestments(investments.map(inv => (inv.id === id ? updatedInvestment : inv)));
  };

  const deleteInvestment = (id: number) => {
    setInvestments(investments.filter(inv => inv.id !== id));
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
