import Carousel from "../components/carousel/carousel";
import NewsCarousel from "../components/card/card";
import Forms from "../components/forms/forms";
import BitcoinChart from "../components/cryptoChart/cryptoChart";
import Title from "../components/title/title";

const newsItems = [
  {
    id: 1,
    category: "Política",
    title: "Novas Medidas Econômicas",
    excerpt: "Governo anuncia pacote de estímulos para setor tecnológico...",
    image: "/assets/images/new-york-1867569.jpg",
    timestamp: "10 minutos atrás",
  },
  {
    id: 2,
    category: "Fofoca",
    title: "Amigas da Liz Macedo brigam",
    excerpt: "Liz Macedo",
    image: "/assets/images/liz-1-.avif",
    timestamp: "10 minutos atrás",
  },
  {
    id: 3,
    category: "Esportes",
    title: "O mundo vence novamente",
    excerpt: "O gigantesco Bahia ganha novamente em cima da Galinha...",
    image: "/assets/images/bavi.jpeg",
    timestamp: "10 minutos atrás",
  },

  // Adicione mais itens...
];

export default function Home() {
  return (
    <div className="py-28 flex justify-center flex-col items-center ">
      <Carousel
        items={[
          {
            image: "/assets/images/trump.png",
            title: "Trump Anuncia 2 de Abril como 'Dia da Libertação'",
            description:
              "O presidente Donald Trump anunciou que 2 de abril será um dia extraordinário e inesquecível para os EUA, prometendo uma surpresa agradável. Entre as medidas já confirmadas, ele assinou um decreto impondo uma tarifa de 25% sobre automóveis e peças importadas. Além disso, esse anúncio está gerando especulações sobre possíveis anúncios relacionados ao mercado financeiro e criptomoedas.",
            buttonText: "Saiba Mais",
          },
          {
            image: "/assets/images/musk.png",
            title:
              "Elon Musk anuncia venda da plataforma X para a xAI, sua empresa de inteligência artificial",
            description:
              "“Os futuros da xAI e da X estão entrelaçados”, disse Musk em um post sobre a venda da X. ”Hoje, damos oficialmente o passo para combinar os dados, modelos, computação, distribuição e talento. Essa combinação é a chave para o sucesso da xAI e da X. A xAI é a única empresa que pode fazer isso.”",
            buttonText: "Ver Detalhes",
          },
          {
            image: "/assets/images/drogas.png",
            title:
              "Polícia italiana prende fã de 'Breaking Bad' por produção de metanfetamina",
            description:
              "Um jovem de 22 anos da cidade de Novara, no norte da Itália, foi acusado de produção ilegal de drogas, segundo um comunicado da polícia. O jovem foi preso em flagrante e, segundo a polícia, ele estava produzindo metanfetamina em um laboratório improvisado em sua casa. A polícia encontrou 1,5 quilo da droga, além de produtos químicos e equipamentos para a produção.",
            buttonText: "Ver Detalhes",
          },
          {
            image: "/assets/images/china.png",
            title:
              "China constrói versão de 'estação espacial' tripulada no fundo do mar",
            description:
              "Considerado uma das instalações subaquáticas mais profundas e tecnologicamente complexas já tentadas até hoje, o laboratório está programado para iniciar suas operações por volta de 2030, com espaço para seis cientistas. As missões das equipes irão durar até um mês. Os participantes já apelidaram o local de “estação espacial de águas profundas”.",
            buttonText: "Ver Detalhes",
          },
        ]}
      ></Carousel>
      <section className="flex flex-col items-center justify-center w-full">
        <Title title={"Recent News"}></Title>
        <NewsCarousel items={newsItems}></NewsCarousel>
      </section>
      <BitcoinChart></BitcoinChart>
      <section className="flex flex-col items-center justify-center w-full">
        <Title title={"Contact Forms"}></Title>
        <Forms></Forms>
      </section>
    </div>
  );
}
