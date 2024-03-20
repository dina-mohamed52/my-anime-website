import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";
import { getAnimeCarousel } from "../../services/fetchApi";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Spinner from "../../ui/Spinner";

function Carousel({data,isLoading,error}) {
  // const { data, error, isLoading } = useQuery(
  //   "animeCarousel",
  //   getAnimeCarousel
  // );
  // console.log(data);

  if (isLoading) {
    return null;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    appendDots: (dots) => (
      <ul
        style={{
          margin: "0",
          padding: "0",
          position: "absolute",
          bottom: "20px",
          textAlign: "center",
          width: "100%",
          zIndex: "1",
        }}
      >
        {dots}
      </ul>
    ),
    customPaging: (i, isActive) => (
      <button
        style={{
          width: "10px",
          height: "10px",
          margin: "0 5px",
          borderRadius: "50%",
          //   background: "#fff",
          background: isActive ? "#3182ce" : "#fff",
          opacity: "0.5",
          display: "inline-block",
          transition: "background 0.5s",
        }}
      ></button>
    ),
  };

  return (
    <Slider
      {...settings}
      className="  mt-[6rem] w-[84.5rem] ml-[-1.5rem] overflow-hidden "
    >
      {data.data.map((anime) => (
        <div key={anime.mal_id} className=" mt-[0rem]  relative">
          <img
            className=" w-full h-[25rem] object-cover"
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 opacity-0 hover:opacity-100">
            <h1 className="text-white text-4xl font-bold">{anime.title}</h1>
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default Carousel;
