import { useState } from "react";
import "./index.css";
import useCurrencyInfo from "./hooks/UseCurrencyInfo";
import InputBox from "./components/InputBox";
function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("inr");
  const [to, setTo] = useState("usd");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);

  const options = Object.keys(currencyInfo);

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  }

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount * currencyInfo[from]);
  }

  return (
    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
        }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
        <form>
          <InputBox
            label="From"
            amount={amount}
            onAmountChange={(amount) => setAmount(amount)}
            oncurrencyChange={(amount) => setAmount(amount)}
            currencyOptions={options}
            selectCurrency={from}
            ></InputBox>
            
        </form>
        </div>
      </div>
    </div>
  );
}

export default App;
