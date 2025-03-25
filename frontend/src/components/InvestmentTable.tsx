import { useState } from "react";
import { useInvestments } from "../context/InvestmentContext";
import InvestmentRow from "./InvestmentRow";
import InvestmentForm from "./InvestmentForm"; 

export default function InvestmentTable() {
  const { investments} = useInvestments();
  const [investmentToEdit, setInvestmentToEdit] = useState<any>(null); 

  const handleEdit = (investment: any) => {
    setInvestmentToEdit(investment); 
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-5xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Lista de Investimentos</h2>

      {investmentToEdit && (
        <InvestmentForm
          investmentToEdit={investmentToEdit}
          onClear={() => setInvestmentToEdit(null)} 
        />
      )}

      <table className="w-full table-auto rounded-lg shadow-md border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-4 text-left text-gray-700">Nome</th>
            <th className="p-4 text-left text-gray-700">Tipo</th>
            <th className="p-4 text-left text-gray-700">Valor</th>
            <th className="p-4 text-left text-gray-700">Data</th>
            <th className="p-4 text-left text-gray-700">Ações</th>
          </tr>
        </thead>
        <tbody>
          {investments.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-500">
                Nenhum investimento encontrado.
              </td>
            </tr>
          ) : (
            investments.map((investment) => (
              <InvestmentRow
                key={investment.id}
                investment={investment}
                onEdit={handleEdit} 
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
