"use client";
import Carousel from "../components/carousel/carousel";
import NewsCarousel from "../components/card/card";
import Forms from "../components/forms/forms";
import BitcoinChart from "../components/cryptoChart/cryptoChart";
import Title from "../components/title/title";
import axios from "axios";
import { useState, useEffect } from "react";


export default function Home() {
  const [carouselItems, setCarouselItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newsItems, setNewsItems] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);


  useEffect(() => {
    //carosel
    axios
      .get("https://news-letter-backend.vercel.app/carouselAdm/") 
      .then((res) => {
        setCarouselItems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar dados do carousel:", err);
        setLoading(false);
      });

      //card
    axios
      .get("https://news-letter-backend.vercel.app/CardAdm/") 
      .then((res) => {
        setNewsItems(res.data);
        setLoadingNews(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar notícias:", err);
        setLoadingNews(false);
      });
  }, []);



  return (
    <div className="py-28 flex justify-center flex-col items-center ">
      {loading ? (
        <p>Carregando carousel...</p>
      ) : (
        <Carousel items={carouselItems} />
      )}
      
      <section className="flex flex-col items-center justify-center w-full">
        <Title title={"Recent News"} />
        {loadingNews ?(
          <p>Carregando notícia...</p>
        ) : (
            <NewsCarousel items={newsItems} />
        )}
      </section>

      <BitcoinChart />

      <section className="flex flex-col items-center justify-center w-full">
        <Title title={"Contact Forms"} />
        <Forms />
      </section>
    </div>
  );
}
