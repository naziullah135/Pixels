import { getCategories, products } from "../../../../lib/helper";
import { useQuery } from "react-query";
import LoadingComponets from "../../../Shared/LoadingComponets";
import Link from "next/link";

import { useContext, useEffect, useState } from "react";
import CreateContext from "../../CreateContex";
import CustomFeaturedCategoriesSkeleton from "../../CustomSkeleton/CustomFeaturedCategoriesSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import { Navigation, Autoplay } from "swiper";
// import Image from "next/image";;

const Category = ({ catagories }) => {
  const { setQueryFromCategory } = useContext(CreateContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (catagories) {
      setIsLoading(false);
    }
  }, [catagories]);

  // const {
  //   data: catagories,
  //   isLoading,
  //   refetch,
  // } = useQuery(["categories"], getCategories);

  const handelCategoryParams = (cat) => {
    const params = new URLSearchParams();
    params.append("category", cat);
    const url = `${params.toString()}`;
    setQueryFromCategory(url);
  };

  return (
    <>
      <div className="pb-5 px-2 md:px-3">
        <div className="">
          <h1 className="text-xl md:text-[28px]  text-center py-2 md:py-5  text-light-text avenir">
            Categories
          </h1>
          {isLoading ? (
            <CustomFeaturedCategoriesSkeleton />
          ) : (
            <>
              <div className="md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 hidden">
                {catagories?.data?.result?.map((category, index) => (
                  <Link
                    key={index}
                    href={"/shop"}
                    onClick={() =>
                      // setQueryFromCategory(
                      //   `category=${category.parentCategory}`
                      // )
                      handelCategoryParams(category.parentCategory)
                    }
                  >
                    <div className="w-full relative">
                      <img
                        alt="category icon"
                        src={category?.imageURLs?.[0]}
                        width={300}
                        height={300}
                        className=" object-cover w-full h-[320px]"
                      />
                      <div className="bg-black/10 absolute top-0 left-0 w-full h-full"></div>
                      <h1 className="text-white font-[300] text-xl absolute left-5 md:text-[34px] bottom-5 avenir2">
                        {category.parentCategory}
                      </h1>
                    </div>
                  </Link>
                ))}
              </div>
              <div className=" md:hidden block">
                <Swiper
                  slidesPerView={4}
                  spaceBetween={20}
                  // centeredSlides={true}
                  // grabCursor={true}
                  breakpoints={{
                    "@.25": {
                      slidesPerView: 2,
                      spaceBetween: 10,
                    },
                    "@.50": {
                      slidesPerView: 3,
                      spaceBetween: 10,
                    },

                    "@1.00": {
                      slidesPerView: 3,
                      spaceBetween: 10,
                    },
                    "@1.50": {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                    "@1.75": {
                      slidesPerView: 4,
                      spaceBetween: 20,
                    },
                    "@2.25": {
                      slidesPerView: 4,
                      spaceBetween: 20,
                    },
                  }}
                  // navigation={true}
                  // autoplay={{ delay: 2000 }}
                  modules={[Navigation]}
                  className=" mySwiper_2"
                >
                  {catagories?.data?.result?.map((category, index) => (
                    <SwiperSlide key={index} className="">
                      <Link
                        href={"/shop"}
                        onClick={() =>
                          // setQueryFromCategory(
                          //   `category=${category.parentCategory}`
                          // )
                          handelCategoryParams(category.parentCategory)
                        }
                      >
                        <div className="w-full relative">
                          <img
                            alt="category icon"
                            src={category?.imageURLs?.[0]}
                            width={300}
                            height={300}
                            className=" object-cover w-full h-[150px]"
                          />
                          <div className="bg-black/10 absolute top-0 left-0 w-full h-full"></div>
                          <h1 className="text-white font-[300] text-lg absolute left-2 md:left-5 md:text-[34px] bottom-2 md:bottom-5 avenir2">
                            {category.parentCategory}
                          </h1>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Category;
