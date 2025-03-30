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
    category: "Poleica",
    title: "Novas Medidas Econômicas",
    excerpt: "Governo anuncia pacote de estímulos para setor tecnológico...",
    image: "/assets/images/new-york-1867569.jpg",
    timestamp: "10 minutos atrás",
  },
  {
    id: 3,
    category: "Poleica",
    title: "Novas Medidas Econômicas",
    excerpt: "Governo anuncia pacote de estímulos para setor tecnológico...",
    image: "/assets/images/new-york-1867569.jpg",
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
            image: "/assets/images/new-york-1867569.jpg",
            title: "Primeiro Slide",
            description: "Descrição detalhada do primeiro slide do carrossel.",
            buttonText: "Saiba Mais",
          },
          {
            image: "/assets/images/new-york-1867569.jpg",
            title: "Segundo Slide",
            description: "Descrição detalhada do segundo slide do carrossel.",
            buttonText: "Ver Detalhes",
          },
          {
            image: "/assets/images/new-york-1867569.jpg",
            title: "Segundo Slide",
            description: "Descrição detalhada do segundo slide do carrossel.",
            buttonText: "Ver Detalhes",
          },
          {
            image: "/assets/images/new-york-1867569.jpg",
            title: "Segundo Slide",
            description: "Descrição detalhada do segundo slide do carrossel.",
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
