import React from "react";
import Carousel from "../features/home/Carousel";
import RecommendationSec from "../features/home/RecommendationSec";
import PinnedAnime from "../features/home/PinnedAnime";
import Footer from "../ui/Footer";
import { useQuery } from "react-query";
import {
  getAnimeCarousel,
  getAnimeTop,
  getRecommendations,
} from "../services/fetchApi";
import Spinner from "../ui/Spinner";

function Home() {
  const { data: pinnedData, isLoading: Isloading1 } = useQuery(
    "pinnedanime",
    getRecommendations
  );
  const { data: recomData, isLoading: Isloading2 } = useQuery(
    "animeRecommendations",
    getAnimeTop
  );
  const {
    data: CroData,
    error,
    isLoading: Isloading3,
  } = useQuery("animeCarousel", getAnimeCarousel);
  if (Isloading1 || Isloading2 || Isloading3) {
    return <Spinner />;
  }
  return (
    <div className="mt-[-8rem] flex flex-col min-h-screen">
    
      <div className="flex-grow">
        <Carousel data={CroData} isLoading={Isloading3} error={error} />
        <div className="shadow-xl mb-8">
          <PinnedAnime data={pinnedData} isLoading={Isloading1} />
        </div>
        <div className="shadow-xl">
          <RecommendationSec data={recomData} isLoading={Isloading2} />
        </div>
      </div>
      {/* {!Isloading1 && !Isloading2 && !Isloading3 && (
        <div className="ml-[-4.9rem] mb-[-1.5rem] ">
          <Footer className="absolute w-full bottom-0" />
        </div>
      )} */}
    </div>
  );
}

export default Home;
