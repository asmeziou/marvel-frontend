import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState } from "react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./Swiperhome.css";
import swiper1 from "../../assets/swiper1.jpg";
import swiper2 from "../../assets/swiper2.webp";
import swiper3 from "../../assets/swiper3.jpg";

import { FaCirclePlay } from "react-icons/fa6";
import { VscDebugPause } from "react-icons/vsc";

const Swiperhome = () => {
  const swiperRef = useRef(null);
  const [playing, setPlaying] = useState(true);

  const toggleAutoplay = () => {
    if (!swiperRef.current) return;

    if (playing) {
      swiperRef.current.autoplay.stop();
    } else {
      swiperRef.current.autoplay.start();
    }

    setPlaying(!playing);
  };

  return (
    <div className="swiper-carrousel-site">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        loop
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        <SwiperSlide>
          <img src={swiper1} alt="" />
        </SwiperSlide>

        <SwiperSlide>
          <img src={swiper2} alt="" />
        </SwiperSlide>

        <SwiperSlide>
          <img src={swiper2} alt="" />
        </SwiperSlide>
      </Swiper>
      <div onClick={toggleAutoplay} className="play-stop">
        {playing ? <VscDebugPause /> : <FaCirclePlay />}
      </div>
    </div>
  );
};

export default Swiperhome;
