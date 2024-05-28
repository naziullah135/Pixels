import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import styles from "./Sidebar.module.css";
import "swiper/css/autoplay";

// import required modules
import { Pagination, Autoplay, EffectFade } from "swiper";

import { useCustomQuery } from "../../../hooks/useMyShopData";
import CustomBannerSkeleton from "../../CustomSkeleton/CustomBannerSkeleton";
// import Image from "next/image";;

const SliderInHeader = ({ data }) => {
  // const { data, isLoading } = useCustomQuery(
  //   "banner",
  //   "banner?status=active&sort=position"
  // );
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    if (data) {
      setIsLoading(false)
    }
  }, [data])

  return (
    <div className="">
      {
        isLoading ? <CustomBannerSkeleton /> :
          <Swiper
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Autoplay, EffectFade]}
            className={styles}
            autoplay={{ delay: 2000 }}
            effect="fade"
          >
            {data?.status === "success" &&
              data.data.result.map((banner) => (
                <SwiperSlide>
                  <img
                    width={700}
                    height={562}
                    alt="banner"
                    className="md:h-[700px] h-full  md:object-fill w-full"
                    src={banner.image}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
      }

    </div>
  );
};

export default SliderInHeader;
