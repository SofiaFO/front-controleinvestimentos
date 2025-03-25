import { InvestmentProvider } from "./context/InvestmentContext";
import AddInvestment from "./pages/AddInvestment";
import Investments from "./pages/Investments";

export default function App() {
  return (
    <InvestmentProvider>
      <div className="min-h-screen bg-gray-100 p-6">
        <AddInvestment />
        <Investments />
      </div>
    </InvestmentProvider>
  );
}
