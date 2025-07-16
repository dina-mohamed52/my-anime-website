import React from "react";
import { Carousel as AntdCarousel } from "antd";
import "antd/dist/reset.css";
import Spinner from "../../ui/Spinner";

function Carousel({ data, isLoading, error }) {
  if (isLoading) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="mt-24 w-full max-w-[90rem] mx-auto px-4">
      <AntdCarousel autoplay dots className="rounded-lg overflow-hidden">
        {data.data.map((anime) => (
          <div key={anime.mal_id} className="relative h-[300px] md:h-[400px] lg:h-[500px]">
            <img
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <h1 className="text-white text-xl md:text-3xl font-bold text-center">
                {anime.title}
              </h1>
            </div>
          </div>
        ))}
      </AntdCarousel>
    </div>
  );
}

export default Carousel;
