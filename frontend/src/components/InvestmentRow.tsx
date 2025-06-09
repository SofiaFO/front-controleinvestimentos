import { Investment } from "../types/Investment";
import { useInvestments } from "../context/InvestmentContext";

type Props = {
  investment: Investment;
  onEdit: (investment: Investment) => void; 
};

export default function InvestmentRow({ investment, onEdit }: Props) {
  const { deleteInvestment } = useInvestments();

  return (
    <tr className="hover:bg-gray-50 transition duration-300">
      <td className="p-4 text-gray-700">{investment.name}</td>
      <td className="p-4 text-gray-700">{investment.type}</td>
      <td className="p-4 text-gray-700">R$ {investment.amount.toFixed(2)}</td>
      <td className="p-4">{new Date(investment.date).toLocaleDateString('pt-BR')}</td>
      <td className="p-4 flex gap-2">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
          onClick={() => onEdit(investment)} 
        >
          Editar
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
          onClick={() => deleteInvestment(investment.id)}
        >
          Excluir
        </button>
      </td>
    </tr>
  );
}
