import Header from "../components/header";

import Carousel from "../components/carousel";
import NewsCarousel from "../components/card";
import Forms from "../components/forms";
import BitcoinChart from "../components/cryptoChart";

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
      <Header></Header>
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
        ]}
      ></Carousel>

      <NewsCarousel items={newsItems}></NewsCarousel>
      <BitcoinChart></BitcoinChart>
      <Forms></Forms>
    </div>
  );
}
