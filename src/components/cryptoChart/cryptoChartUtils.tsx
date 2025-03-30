// Define the DataPoint type
type DataPoint = {
  time: string;
  price: number;
};

export const fetchBitcoinPrice = async (): Promise<DataPoint[]> => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=2"
  );
  const data = await res.json();

  // Agrupa os dados por data
  const groupedData: { [date: string]: DataPoint[] } = {};
  data.prices.forEach(([timestamp, price]: [number, number]) => {
    const date = new Date(timestamp).toLocaleDateString("en-US"); // Converte o timestamp para uma data legível
    if (!groupedData[date]) {
      groupedData[date] = [];
    }
    groupedData[date].push({
      time: date, // Apenas a data será usada no eixo X
      price,
    });
  });

  // Seleciona dois pontos por dia (primeiro e último)
  const twoPointsPerDay: DataPoint[] = [];
  Object.values(groupedData).forEach((points) => {
    if (points.length > 1) {
      twoPointsPerDay.push(points[0]); // Primeiro ponto do dia
      twoPointsPerDay.push(points[points.length - 1]); // Último ponto do dia
    } else {
      twoPointsPerDay.push(points[0]); // Caso só haja um ponto, adiciona apenas ele
    }
  });

  return twoPointsPerDay;
};

export const fetchEthereumPrice = async (): Promise<DataPoint[]> => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=2"
  );
  const data = await res.json();

  // Agrupa os dados por data
  const groupedData: { [date: string]: DataPoint[] } = {};
  data.prices.forEach(([timestamp, price]: [number, number]) => {
    const date = new Date(timestamp).toLocaleDateString("en-US"); // Converte o timestamp para uma data legível
    if (!groupedData[date]) {
      groupedData[date] = [];
    }
    groupedData[date].push({
      time: date, // Apenas a data será usada no eixo X
      price,
    });
  });

  // Seleciona dois pontos por dia (primeiro e último)
  const twoPointsPerDay: DataPoint[] = [];
  Object.values(groupedData).forEach((points) => {
    if (points.length > 1) {
      twoPointsPerDay.push(points[0]); // Primeiro ponto do dia
      twoPointsPerDay.push(points[points.length - 1]); // Último ponto do dia
    } else {
      twoPointsPerDay.push(points[0]); // Caso só haja um ponto, adiciona apenas ele
    }
  });

  return twoPointsPerDay;
};
// Configuração do eixo Y para o gráfico do Bitcoin
export const bitcoinOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: false,
      ticks: {
        callback: (value: number) => `$${value}`,
      },
    },
  },
};

// Configuração do eixo Y para o gráfico do Ethereum
export const ethereumOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: false,
      ticks: {
        callback: (value: number) => `$${value}`,
      },
    },
  },
};
