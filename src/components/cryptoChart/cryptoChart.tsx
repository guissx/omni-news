"use client";

import React, { useEffect, useState } from "react";
import TitleX from "../title/title";
import { Line } from "react-chartjs-2";
import type { ChartData } from "chart.js";
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
import { fetchBitcoinPrice, fetchEthereumPrice } from "./cryptoChartUtils";

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

  // Busca inicial e atualização a cada 1 minuto
  useEffect(() => {
    const fetchData = async () => {
      try {
        const bitcoin = await fetchBitcoinPrice();
        const ethereum = await fetchEthereumPrice();
        setBitcoinData(bitcoin);
        setEthereumData(ethereum);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Atualiza a cada 12 horas
    return () => clearInterval(interval);
  }, []);

  // Função para calcular os limites dinâmicos do eixo Y
  const getDynamicYAxisOptions = (data: DataPoint[]) => {
    const prices = data.map((point) => point.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,
          suggestedMin: minPrice * 0.99, // Define o mínimo como 95% do menor valor
          suggestedMax: maxPrice * 1.02, // Define o máximo como 105% do maior valor
          ticks: {
            maxTicksLimit: 5, // Limita o número de ticks no eixo Y
            callback: function (tickValue: string | number) {
              if (typeof tickValue === "number") {
                return `$${tickValue.toFixed(0)}`; // Formata os valores do eixo Y
              }
              return tickValue;
            },
          },
        },
      },
    };
  };

  const formatXAxisLabels = (time: string) => {
    const date = new Date(time);
    // Exibe apenas o dia e o mês para telas pequenas
    return window.innerWidth < 768
      ? new Intl.DateTimeFormat("en-US", {
          day: "2-digit",
          month: "short",
          year: undefined,
        }).format(date)
      : new Intl.DateTimeFormat("en-US", {
          day: "2-digit",
          month: "short",
        }).format(date);
  };

  // Dados para o gráfico do Bitcoin
  const bitcoinChartData: ChartData<"line"> = {
    labels: bitcoinData.map((point) => formatXAxisLabels(point.time)),
    datasets: [
      {
        label: "Bitcoin Price (USD)",
        data: bitcoinData.map((point) => point.price),
        fill: false,
        borderColor: "rgba(255, 215, 0, 1)",
        tension: 0.1,
      },
    ],
  };

  // Dados para o gráfico do Ethereum
  const ethereumChartData: ChartData<"line"> = {
    labels: ethereumData.map((point) => formatXAxisLabels(point.time)),
    datasets: [
      {
        label: "Ethereum Price (USD)",
        data: ethereumData.map((point) => point.price),
        fill: false,
        borderColor: "rgba(0, 0, 0, 1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="w-full flex flex-col items-center relative z-10 mb-10">
      <TitleX title={"Crypto quotation in real time"}></TitleX>
      {isLoading ? (
        <p className="text-center">Loading data...</p>
      ) : (
        <div className="flex flex-col lg:flex-row flex-wrap justify-center gap-8">
          {/* Gráfico do Bitcoin */}
          <div className="w-[90vw] h-[30vh] lg:w-[45vw] lg:h-[50vh] flex flex-col px-3.5 pb-6 pt-6 lg:py-12 bg-gray-50 rounded-lg shadow-2xl justify-center items-center relative overflow-hidden border-1 border-red-900">
            <h3 className="text-sm lg:text-xl font-bold text-center">
              Bitcoin Price (USD)
            </h3>
            <p className="text-sm lg:text-lg font-semibold text-emerald-600">
              Current: ${bitcoinData[bitcoinData.length - 1]?.price.toFixed(2)}
            </p>
            <Line
              data={bitcoinChartData}
              options={getDynamicYAxisOptions(bitcoinData)}
              className="w-full h-full"
            />
          </div>
          {/* Gráfico do Ethereum */}
          <div className="w-[90vw] h-[30vh] lg:w-[45vw] lg:h-[50vh] flex flex-col px-3.5 pb-6 pt-6 lg:py-12 bg-gray-50 rounded-lg shadow-2xl justify-center items-center relative overflow-hidden border-1 border-red-900">
            <h3 className="text-sm lg:text-xl font-bold text-center">
              Ethereum Price (USD)
            </h3>
            <p className="text-sm lg:text-lg font-semibold text-emerald-600">
              Current: $
              {ethereumData[ethereumData.length - 1]?.price.toFixed(2)}
            </p>
            <Line
              data={ethereumChartData}
              options={getDynamicYAxisOptions(ethereumData)}
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoCharts;
