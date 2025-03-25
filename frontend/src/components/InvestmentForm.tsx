import { useState, useEffect } from "react";
import { useInvestments } from "../context/InvestmentContext";
import { Investment } from "../types/Investment";

type InvestmentFormProps = {
  investmentToEdit?: Investment | null;
  onClear?: () => void;
};

export default function InvestmentForm({ investmentToEdit, onClear }: InvestmentFormProps) {
  const { addInvestment, editInvestment } = useInvestments();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState(""); 

  useEffect(() => {
    if (investmentToEdit) {
      setName(investmentToEdit.name);
      setType(investmentToEdit.type);
      setAmount(investmentToEdit.amount.toString());
      setDate(investmentToEdit.date);
    }
  }, [investmentToEdit]);

  const validateForm = (): boolean => {
    const currentDate = new Date();
    const selectedDate = new Date(date);

    if (!name || !type || !amount || !date) {
      setError("Por favor, preencha todos os campos.");
      return false;
    }

    if (parseFloat(amount) <= 0) {
      setError("O valor investido deve ser maior que zero.");
      return false;
    }

    if (selectedDate > currentDate) {
      setError("A data do investimento não pode ser uma data futura.");
      return false;
    }

    setError(""); 
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return; 

    const updatedInvestment: Investment = {
      id: investmentToEdit ? investmentToEdit.id : Date.now(),
      name,
      type,
      amount: parseFloat(amount),
      date,
    };

    if (investmentToEdit) {
      editInvestment(updatedInvestment.id, updatedInvestment);
      if (onClear) onClear();
    } else {
      addInvestment(updatedInvestment);
    }

    setName("");
    setType("");
    setAmount("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        {investmentToEdit ? "Editar Investimento" : "Cadastrar Investimento"}
      </h2>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-4 border rounded-lg shadow-sm mb-4 focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        placeholder="Tipo"
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full p-4 border rounded-lg shadow-sm mb-4 focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="number"
        placeholder="Valor Investido"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-4 border rounded-lg shadow-sm mb-4 focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-4 border rounded-lg shadow-sm mb-4 focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        {investmentToEdit ? "Salvar Alterações" : "Cadastrar"}
      </button>
    </form>
  );
}
