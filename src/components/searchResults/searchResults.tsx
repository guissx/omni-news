// app/searchPage/SearchResults.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { NewsItem } from "./searchresultsInterface";

const newsData: NewsItem[] = [
  {
    id: 1,
    title:
      "Ethereum Enfrenta 'Crise de Meia-Idade' com Concorrência Aumentando",
    category: "Cripto",
    content:
      "Em 25 de março de 2025, foi reportado que o Ethereum sofreu uma queda de 40% nos últimos três meses. A crescente concorrência de blockchains como Solana e Cardano, juntamente com atrasos em atualizações técnicas, têm desafiado a posição dominante do Ethereum no mercado.",
  },

  {
    id: 2,
    title:
      "Solana Supera Bitcoin e Ethereum em Valorização e Atração de Capital",
    category: "Cripto",
    content:
      "Em dezembro de 2024, a Solana liderou o mercado de criptomoedas, superando Bitcoin e Ethereum em termos de valorização e atração de capital. No entanto, analistas alertam que a realização de lucros por parte dos detentores de SOL pode ameaçar a continuidade dessa tendência..",
  },
  {
    id: 3,
    title: "Computação Quântica Avança com Novo Processador Revolucionário",
    category: "Tecnologia",
    content:
      "Pesquisadores da IBM anunciaram um novo processador quântico que promete superar os desafios atuais da tecnologia. Com mais de 1.000 qubits, o chip reduz significativamente os erros de processamento, aproximando a computação quântica de aplicações práticas. O avanço pode impulsionar áreas como criptografia, inteligência artificial e descoberta de novos materiais. Especialistas acreditam que, nos próximos anos, essa tecnologia poderá transformar setores inteiros, acelerando cálculos impossíveis para computadores convencionais.",
  },
  {
    id: 4,
    title:
      "Jornalistas criticam fala do jogador Raphinha após derrota da seleção",
    category: "Esportes",
    content:
      'Após a derrota da seleção brasileira para a Argentina, o jogador Raphinha fez uma declaração polêmica que gerou críticas entre jornalistas e torcedores. Ele afirmou que "não se importa com a opinião de quem não entende de futebol". A fala foi vista como desrespeitosa e gerou repercussão nas redes sociais.',
  },
  {
    id: 5,
    title: "Mercado Cripto em Queda: Bitcoin, Ethereum e Solana Desvalorizam",
    category: "Cripto",
    content:
      "As principais criptomoedas enfrentam um período de correção, com o Bitcoin (BTC) caindo para US$ 85.200, uma perda de 5% na semana. O Ethereum (ETH) recuou 7%, sendo negociado a US$ 4.250, enquanto a Solana (SOL) sofreu uma queda mais acentuada de 10%, chegando a US$ 165. O movimento de baixa é atribuído à política monetária rígida do Federal Reserve, realização de lucros por investidores e incertezas regulatórias. Apesar da queda, analistas seguem confiantes no potencial de recuperação do mercado no longo prazo.",
  },
  {
    id: 6,
    title:
      "Preço do ovo sobe quase 20% em março, segundo IPCA-15; entenda quando pode baixar",
    category: "Geral",
    content:
      "O preço do ovo subiu **19,44%** em março em relação a fevereiro, segundo o **IPCA-15** do IBGE. No ano, a alta já é de **25,88%**. O aumento é impulsionado pelo custo do milho, calor intenso e maior demanda na Quaresma, quando muitos católicos reduzem o consumo de carne vermelha.",
  },
  {
    id: 7,
    title: "Ronaldo Nazário Planeja Candidatura à Presidência da CBF",
    category: "Esportes",
    content:
      "Ronaldo Nazário, ex-jogador e atual presidente do Real Valladolid, manifestou interesse em candidatar-se à presidência da Confederação Brasileira de Futebol (CBF). Seu objetivo é suceder Ednaldo Rodrigues, cujo mandato termina em março de 2026, com eleições previstas entre março de 2025 e março de 2026. Para oficializar sua candidatura, Ronaldo necessita do apoio de quatro federações estaduais e quatro clubes brasileiros. Ele pretende melhorar a imagem do futebol brasileiro e aproximar a seleção nacional dos torcedores, além de resolver problemas estruturais, como conflitos no calendário de competições. ",
  },
  {
    id: 8,
    title: "TV Bahia Celebra 40 Anos com Lançamento de Novas Marcas",
    category: "Geral",
    content:
      "A TV Bahia comemorou quatro décadas de atuação com o lançamento de novas marcas do grupo em um evento especial realizado nesta quinta-feira (27), na sede da emissora, localizada no bairro da Federação, em Salvador. A celebração reuniu profissionais que fazem parte da trajetória da líder em audiência no estado",
  },
];

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";

  const filteredNews = newsData.filter(
    (news) =>
      news.title.toLowerCase().includes(query) ||
      news.category.toLowerCase().includes(query)
  );

  return (
    <div className="px-8 py-28 bg-gray-50 relative z-30 mt-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-gray-800 text-center">
          Resultados para: {query}
        </h1>
      </div>
      {filteredNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((news) => (
            <div
              key={news.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {news.title}
              </h2>
              <p className="text-sm text-blue-600 mb-4">{news.category}</p>
              <p className="text-gray-600">{news.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-red-500 text-lg mb-64">
            Nenhum resultado encontrado para {query}
          </p>
        </div>
      )}
    </div>
  );
}
