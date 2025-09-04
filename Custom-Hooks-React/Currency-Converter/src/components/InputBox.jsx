import React from "react";

export default function InputBox({
  label,
  amount,
  onAmountChange,
  oncurrencyChange,
  currencyOptions = [],
  selectCurrency = "inr",
  amountDisabled = false,
  currencyDisabled = false,
}) {
  return (
    <div className="bg-white p-3 rounded-lg text-sm flex">
      <div className="w-1/2">
        <label className="text-black/40 mb-2 inline-block">{label}</label>
        <input
          type="number"
          value={amount}
          className="w-full p-2 border border-gray-300 rounded"
          disabled={amountDisabled}
          onChange={(e) =>
            onAmountChange && onAmountChange(Number(e.target.value))
          }
        />
      </div>
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-black/40 mb-2 w-full">Currency Type</p>
        <select
          className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
          value={selectCurrency}
          disabled={currencyDisabled}
          onChange={(e) => oncurrencyChange && oncurrencyChange(e.target.value)}
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
                {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
