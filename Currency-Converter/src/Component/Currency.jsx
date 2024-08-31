import React, { useEffect, useState } from "react";
import DropDown from "./DropDown";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

const Currency = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setfromCurrency] = useState("USD");
  const [toCurrency, settoCurrency] = useState("INR");
  const [convertedAmount, setconvertedAmount] = useState(null);
  const [converting, setconverting] = useState(false);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || ["INR", "EUR"]
  );

  // currencies ->  https://api.frankfurter.app/currencies

  const fetchCurrencies = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();

      setCurrencies(Object.keys(data));
    } catch (error) {
      console.log("fetching error", error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  console.log(currencies);

  // currencies ->  https://api.frankfurter.app/latest?amount=1&from=USD&to=INR
  const convertCurrency = async () => {
    if (!amount) return;

    setconverting(true);
    try {
      const res = await fetch(
        ` https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();

      setconvertedAmount(data.rates[toCurrency] + " " + toCurrency);
    } catch (error) {
      console.log("fetching error", error);
    }
  };

  const handleFavorites = (currency) => {
    let updatedFavorite = [...favorites];

    if (favorites.includes(currency)) {
      updatedFavorite = updatedFavorite.filter((fav) => fav !== currency);
    } else {
      updatedFavorite.push(currency);
    }

    setFavorites(updatedFavorite);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorite));
  };

  const swapCurrencies = () => {
    setfromCurrency(toCurrency);
    settoCurrency(fromCurrency);
  };

  return (
    <>
      <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
        <h2 className="mb-5 text-2xl font-semibold text-gray-700">
          Currnecy Converter
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <DropDown
            favorites={favorites}
            currencies={currencies}
            tittle="From;"
            currency={fromCurrency}
            setCurrency={setfromCurrency}
            handleFavorites={handleFavorites}
          />

          {/* swap currency button */}
          <div className="flex justify-center mb-5 sm:mb-0">
            <button
              onClick={swapCurrencies}
              className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
            >
              <FaArrowRightArrowLeft className="texy-xl text-gray-700" />
            </button>
          </div>

          <DropDown
            favorites={favorites}
            currencies={currencies}
            tittle="To;"
            currency={toCurrency}
            setCurrency={settoCurrency}
            handleFavorites={handleFavorites}
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="amout"
            className="block text-sm font-medium text-gray-700"
          >
            Amounts :
          </label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2  focus:ring-indigo-500 mt-1 "
          />
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={convertCurrency}
            className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
              converting ? "animate-pulse" : ""
            } `}
          >
            Convert
          </button>
        </div>

        {convertedAmount && (
          <div className="mt-4 text-lg font-medium text-right text-green-600">
            Converted Amount : {convertedAmount}
          </div>
        )}
      </div>
    </>
  );
};

export default Currency;
