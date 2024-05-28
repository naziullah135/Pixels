import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import LoadingComponets from "../../Shared/LoadingComponets";
import ProductCard from "../../Shared/ProductCard";
import { AiFillEye } from "react-icons/ai";
import CreateContext from "../CreateContex";
import { products } from "../../../lib/helper";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';
import CustomProductSectionSkeleton from "../CustomSkeleton/CustomProductSectionSkeleton"
const ProductSection = ({
  heading,
  subtitle = "",
  data,
}) => {
  // const [queryFilter, setQuery] = useState(query);
  // const { queryFromCategory, setQueryFromCategory } = useContext(CreateContext);
  // const { data, isLoading, refetch } = useQuery(["products", queryFilter], () =>
  //   products(queryFilter)
  // );

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (data) {
      setIsLoading(false)
    }
  }, [data])



  return (
    <>
      <div className="mb-5 md:mb-10">
        <div className=" pb-3 md:pb-5 lg:pb-14">
          <div className="text-center mb-1">
            <h1 className="text-text-xl md:text-[28px] capitalize avenir mb-1">
              {heading}
            </h1>
            <div className="text-center">
              <Link
                onClick={() => setQueryFromCategory(viewQuery)}
                href={"/shop"}
                className="inline-block py-1 text-[10px] md:text-normal bg-white  border-b border-primary text-primary duration-150  avenir2"
              >
                VIEW ALL
              </Link>
            </div>
            {/* <p className=" text-neutral">{subtitle}</p> */}
          </div>
        </div>
        {!isLoading ? (
          // <div className="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 md:gap-5 mt-3">
          //   {data.slice(0, 10)?.map((item) => (
          //     <ProductCard key={item._id} product={item}></ProductCard>
          //   ))}
          // </div>
          <Swiper
            slidesPerView={4}
            spaceBetween={20}
            // centeredSlides={true}
            // grabCursor={true}
            breakpoints={{
              '@.25': {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              '@.50': {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              '@1.00': {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              '@1.50': {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              '@1.75': {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              '@2.25': {
                slidesPerView: 4,
                spaceBetween: 20,
              }
            }}
            // navigation={true}
            // autoplay={{ delay: 2000 }}
            modules={[Navigation]}
            className=" mySwiper_2"
          >
            {data?.slice(0, 10)?.map((item, index) => {
              return (
                <SwiperSlide key={index} className="">
                  <ProductCard product={item}></ProductCard>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <CustomProductSectionSkeleton />
        )}
      </div>

    </>
  );
};

export default ProductSection;
