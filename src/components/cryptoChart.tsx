"use client";

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registra os componentes necessários do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type DataPoint = {
  time: string;
  price: number;
};

const CryptoCharts: React.FC = () => {
  const [bitcoinData, setBitcoinData] = useState<DataPoint[]>([]);
  const [ethereumData, setEthereumData] = useState<DataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Busca o preço do Bitcoin
  const fetchBitcoinPrice = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
      );
      const data = await res.json();
      const price = data.bitcoin.usd;
      const now = new Date().toLocaleTimeString();
      setBitcoinData((prev) => [...prev, { time: now, price }]);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao buscar dados do Bitcoin:", error);
    }
  };

  // Busca o preço do Ethereum
  const fetchEthereumPrice = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      );
      const data = await res.json();
      const price = data.ethereum.usd;
      const now = new Date().toLocaleTimeString();
      setEthereumData((prev) => [...prev, { time: now, price }]);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao buscar dados do Ethereum:", error);
    }
  };

  // Busca inicial e atualização a cada 1 minuto
  useEffect(() => {
    fetchBitcoinPrice();
    fetchEthereumPrice();
    const interval = setInterval(() => {
      fetchBitcoinPrice();
      fetchEthereumPrice();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Dados para o gráfico do Bitcoin
  const bitcoinChartData: ChartData<"line"> = {
    labels: bitcoinData.map((point) => point.time),
    datasets: [
      {
        label: "Preço do Bitcoin (USD)",
        data: bitcoinData.map((point) => point.price),
        fill: false,
        borderColor: "rgba(34, 211, 238, 1)",
        tension: 0.1,
      },
    ],
  };

  // Dados para o gráfico do Ethereum
  const ethereumChartData: ChartData<"line"> = {
    labels: ethereumData.map((point) => point.time),
    datasets: [
      {
        label: "Preço do Ethereum (USD)",
        data: ethereumData.map((point) => point.price),
        fill: false,
        borderColor: "rgba(235, 64, 52, 1)", // cor diferenciada para o Ethereum
        tension: 0.1,
      },
    ],
  };

  // Configuração do eixo Y para o gráfico do Bitcoin
  const bitcoinOptions: ChartOptions<"line"> = {
    scales: {
      y: {
        min: 85000,
        max: 87000,
        ticks: {
          stepSize: 500,
          callback: (value) => `$${value}`,
        },
      },
    },
  };

  // Configuração do eixo Y para o gráfico do Ethereum (ajuste os valores conforme o range esperado)
  const ethereumOptions: ChartOptions<"line"> = {
    scales: {
      y: {
        min: 1900,
        max: 2500,
        ticks: {
          stepSize: 100,
          callback: (value) => `$${value}`,
        },
      },
    },
  };

  return (
    <div className="w-full flex flex-col items-center relative z-10 mb-10">
      <h2 className="text-2xl font-bold mb-8 text-center">
        Criptomoedas em Tempo Real
      </h2>
      {isLoading ? (
        <p className="text-center">Carregando dados...</p>
      ) : (
        <div className="flex flex-col lg:flex-row flex-wrap justify-center gap-8">
          {/* Gráfico do Bitcoin */}
          <div className="w-[90vw] h-[30vh] lg:w-[40vw] lg:h-[40vh] flex flex-col px-4 py-12 bg-gray-50 rounded-lg shadow-2xl justify-center items-center">
            <h3 className="text-xl font-bold mb-4 text-center">
              Preço do Bitcoin (USD)
            </h3>
            <Line data={bitcoinChartData} options={bitcoinOptions} />
          </div>
          {/* Gráfico do Ethereum */}
          <div className="w-[90vw] h-[30vh] lg:w-[40vw] lg:h-[40vh] flex flex-col px-4 py-12 bg-gray-50 rounded-lg shadow-2xl justify-center items-center">
            <h3 className="text-xl font-bold mb-4 text-center">
              Preço do Ethereum (USD)
            </h3>
            <Line data={ethereumChartData} options={ethereumOptions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoCharts;
