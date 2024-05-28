import { useRouter } from "next/router";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

import Descriptions from "../../src/Components/ProductsDetails/Descriptions/Descriptions";
import AppAds from "../../src/Components/Home/AppAds/AppAds";
import AlreadyProductHave from "../../src/Components/Home/PopularProducts/AlreadyProductHave";
import CreateContext from "../../src/Components/CreateContex";
import StarRating from "../../src/Shared/StarRating";
import ProductSection from "../../src/Components/ProductSection/ProductSection";
import setCartInLocalStorageFromPorductDetails from "../../lib/setCartInLocalStorageFromPorductDetails";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { TiInputChecked } from "react-icons/ti";
import ProductColorPicker from "../../src/Components/ProductSection/ProductColorPicker";
import ProductSizePicker from "../../src/Components/ProductSection/ProductSizePicker";
import WhatsAppButton from "../../src/Shared/WhatsAppButton";
import CustomMetaSetting from "../../src/Shared/CustomMetaSetting";
import CustomProductDetailsSkeleton from "../../src/Components/CustomSkeleton/CustomProductDetailsSkeleton";

import { BsBagPlus, BsCart4, BsTelephoneFill } from "react-icons/bs";
import Head from "next/head";
// // import Image from "next/image";;
import { useQuery } from "react-query";
import ReletedSection from "../../src/Components/ProductSection/ReletedSection";
import { Icon } from "@iconify/react";
/**
 * TODO: have to upload two image
 * 1 - Thumbnail image size 150px * 150px
 * 2 - Upload original image size 900w 600h
 */

const ProductDetails = () => {
  const [sizeIndex, setSizeIndex] = useState(0);
  const [inputSize, setInputSize] = useState("");
  const [userProductColor, setUserProductColor] = useState("");
  const router = useRouter();
  const { id } = router.query;

  const [isAlreadyAvailable, setIsAlreadyAvailable] = useState(false);

  const { addToCartRefresher, setAddToCartRefresher, setQueryFromCategory } =
    useContext(CreateContext);
  const handleSetLocalStorage = () => {
    setAddToCartRefresher(!addToCartRefresher);
    const localStorageMessage = setCartInLocalStorageFromPorductDetails(
      product,
      inputSize,
      userProductColor
    );
    setIsAlreadyAvailable(false);
    if (localStorageMessage) {
      setIsAlreadyAvailable("Added In Cart");
    }
  };


  const { data, refetch, isSuccess, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () =>
      fetch(
        `https://server-journalshop.vercel.app/api/v1/product/${id}`
      ).then((res) => res.json()),
  });

  const product = data?.data;

  useEffect(() => {
    if (isSuccess) {
      setInputSize(data?.data?.size[0]);
      setUserProductColor(data?.data?.productColor[0]);
    }
  }, [isSuccess]);

  const handleSize = (index, size) => {
    setSizeIndex(index);
    setInputSize(size);
  };
  const { asPath } = useRouter();
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';

  const productUrl = `${origin}${asPath}`;

  const handleBuyNowButtonClick = () => {
    // window.gtag("event", "begin_checkout", {
    //   currency: "BDT",
    //   value: product?.salePrice,
    //   items: [
    //     {
    //       item_id: product?._id,
    //       item_name: product?.name,
    //       price: product?.salePrice,
    //       quantity: 1
    //     }
    //   ]
    // });
  }
  const handleAddCartButtonClick = () => {
    // window.gtag('event', 'add_to_cart', {
    //   currency: 'BDT',
    //   value: product?.salePrice,
    //   items: [
    //     {
    //       item_id: product?._id,
    //       item_name: product?.name,
    //       price: product?.salePrice,
    //       quantity: 1
    //     }
    //   ]
    // });
  }



  const handelCategoryParams = (cat) => {
    const params = new URLSearchParams();
    params.append("category", cat);
    const url = `${params.toString()}`;
    return url
  }






  return (
    <>
      <Head>
        <meta property="og:url" content={encodeURIComponent(productUrl)} />
        <meta property="og:title" content={product?.name || "We Are Best E-commerce in Bangladesh"} />
        <CustomMetaSetting
          productTitle={product?.name}
          productUrl={productUrl}
          description={product?.name}
          imageUrl={product?.imageURLs && product?.imageURLs[0]}
        />
      </Head>

      {isLoading && <CustomProductDetailsSkeleton />}
      {isLoading === false &&
        <div className="px-2 lg:px-10">
          <div className="">
            <div className="hidden text-sm md:flex items-center gap-1 flex-wrap text-gray-700 avenir2 py-5">
              <Link href={"/"}>{`Home >`}</Link>
              <span>{product?.name}</span>
            </div>
            <div className=" bg-white  overflow-hidden">
              <div className="grid grid-cols-12">
                <div className="md:col-span-7 col-span-12   md:overflow-hidden ">
                  <Carousel
                    showArrows={true}
                    showStatus={false}
                    showIndicators={true}
                    autoPlay={true}
                    stopOnHover={true}
                    axis="horizontal"
                    preventMovementUntilSwipeScrollTolerance={true}
                    swipeScrollTolerance={50}
                    className=""
                    emulateTouch={false}
                    showThumbs={true}
                    renderThumbs={() =>
                      product?.imageURLs.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt="product details thumbs image"
                          width={100}
                          height={100}
                          className="w-10"
                        />
                      ))
                    }
                  >
                    {product?.imageURLs?.map((url, index) => (
                      <div key={index}>
                        <img
                          src={url}
                          width={300}
                          height={300}
                          className="w-full "
                          alt={"product details page image"}
                        />
                      </div>
                    ))}
                  </Carousel>
                </div>
                {product === null ? <><CustomProductDetailsSkeleton /></> : <>

                  <div className="md:col-span-5 col-span-12 mx-4 lg:mx-16">
                    {/* <Link
                      href={"/shop"}
                      onClick={() =>
                        setQueryFromCategory(handelCategoryParams(product.category))
                      }
                    >
                      <span className=" text-[#9234D2] hover:text-black duration-150 mb-2">
                        <TiInputChecked className="text-xl  font-bold inline-block" />
                        <span className="text-sm  font-extrabold">
                          {product?.category}
                        </span>
                      </span>
                    </Link> */}
                    <h1 className="text-2xl lg:text-[34px] avenir2 leading-10">
                      {product?.name}
                    </h1>
                    <div className="my-3 text-normal md:text-lg flex items-center gap-1 text-[15px]">
                      <Icon className="text-[#D4A14C] " icon="subway:star-1" />
                      <Icon className="text-[#D4A14C] " icon="subway:star-1" />
                      <Icon className="text-[#D4A14C] " icon="subway:star-1" />
                      <Icon className="text-[#D4A14C] " icon="subway:star-1" />
                      <Icon className="text-[#D4A14C] " icon="subway:star-1" />
                      <span className="text-xs md:text-sm mt-0 md:mt-1 text-gray-500">{`(5 Reviews)`}</span>
                    </div>
                    <Link
                      href={"/shop"}
                      onClick={() =>
                        setQueryFromCategory(handelCategoryParams(product.category))
                      }
                    >
                      <span className="font-medium avenir2">
                        {product?.category}
                      </span>
                    </Link>
                    {/* <p className="text-sm">SKU <span className='text-[17px]'>:</span> {product?.sku}</p> */}

                    <p className="text-lg md:text-2xl text-[gray-300] mt-3 md:mt-5 avenir2">
                      ৳ {product?.salePrice}
                    </p>

                    {/* product size */}

                    <ProductSizePicker
                      size={product?.size}
                      sizeIndex={sizeIndex}
                      handleSize={handleSize}
                    />
                    <ProductColorPicker
                      productColor={product?.productColor}
                      setUserProductColor={setUserProductColor}
                      userProductColor={userProductColor}
                    />

                    {/* <SocialShare /> */}


                    <div className="mt-10">
                      {product?.quantity < 1 && <p className="text-red-600 font-bold mt-1 col-span-2">
                        Out Of Stock
                      </p>}

                      <button
                        onClick={() => { handleSetLocalStorage(); handleAddCartButtonClick() }}
                        className="border border-primary px-6 py-3 md:py-4 w-full hover:bg-primary hover:text-white duration-300 mb-3 md:mb-4"
                        disabled={product?.quantity < 1}
                        title={
                          product?.quantity < 1 ? "Out of Stock" : "ADD TO BASKET"
                        }
                      >
                        {/* <BsCart4 size={22} /> */}
                        <p className="text-sm md:text-[16px] avenir2">ADD TO BASKET</p>
                      </button>
                      <Link
                        href={product?.quantity < 1 ? "#" : `/checkout/direct-buy/${id}`}


                      >
                        <button disabled={product?.quantity < 1} title={
                          product?.quantity < 1 ? "Out of Stock" : "ORDER NOW"
                        }
                          onClick={handleBuyNowButtonClick}
                          className="border border-primary px-6 py-3 md:py-4 w-full bg-primary text-white">
                          <p className="text-sm md:text-[16px] avenir2">ORDER NOW</p></button>
                      </Link>
                      {/* <div >
                        <WhatsAppButton
                          productUrl={productUrl}
                          productQuantity={product?.quantity}
                          productName={product?.name}
                          productPrice={product?.salePrice}
                        />
                      </div> */}

                      {/* direct call button */}
                      {/* <a
                        href="tel:+88"
                        disabled={product?.quantity < 1}
                        title={
                          product?.quantity < 1 ? "Out of Stock" : "Direct Call"
                        }
                        className="btn bg-red-600 hover:bg-red-800 border-none w-full  flex items-center gap-1 rounded font-bold  text-base-100 "

                      >
                        <BsTelephoneFill className="text-sm md:text-xl" />
                        <h1></h1>
                        <h1></h1>
                      </a> */}

                    </div>

                  </div>
                </>}

              </div>
              <div className=" bg-white  mb-10 p-1 md:p-5 rounded-xl">
                <div className="">
                  <Descriptions
                    description={product?.description}
                    youtube={product?.youtube}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="my-8">
            <ReletedSection
              query={`&${handelCategoryParams(product?.category)}`}
              heading={"You May Also Like"}
              viewQuery={`&${handelCategoryParams(product?.category)}`}
              sliceItem={5}
            />
          </div>
          {/* <div className="my-10">
            <AppAds />
          </div> */}
        </div>
      }

      <>
        {isAlreadyAvailable && (
          <AlreadyProductHave
            setIsAlreadyAvailable={setIsAlreadyAvailable}
            isAlreadyAvailable={isAlreadyAvailable}
          />
        )}
      </>
    </>
  );
};

export default ProductDetails;