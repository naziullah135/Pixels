import { useContext, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import CreateContext from "../Components/CreateContex";
import setCartInLocalStorage from "../../lib/setCartInLocalStorage";
import AlreadyProductHave from "../Components/Home/PopularProducts/AlreadyProductHave";
import { AiOutlineHeart } from "react-icons/ai";
import setWishlistInLocalStorage from "../../lib/setWishlistInLocalStorage";
import Link from "next/link";
import { useRouter } from "next/router";
// import Image from "next/image";;
import RatingReview from "./RatingReview";
import { Icon } from "@iconify/react";
const ProductCard = ({ product }) => {
  // use for toast
  const [isAlreadyAvailable, setIsAlreadyAvailable] = useState(false);
  const [active, setActive] = useState(0);

  const navigate = useRouter();

  const handelActive = () => {
    if (active === product?.imageURLs?.length - 1) {
      setActive(0);
    } else {
      setActive(active + 1);
    }
  };

  const handelActiveRe = () => {
    if (active === 0) {
      setActive(product?.imageURLs?.length - 1);
    } else {
      setActive(active - 1);
    }
  };

  const handleBuyNowButtonClick = () => {
    navigate.push(`/checkout/direct-buy/${product?._id}`);
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
  };

  const {
    addToCartRefresher,
    setAddToCartRefresher,
    setWishlistRefresher,
    wishlistRefresher,
    setBuyNowProduct,
  } = useContext(CreateContext);

  const handleSetLocalStorage = () => {
    setAddToCartRefresher(!addToCartRefresher);
    const localStorageMessage = setCartInLocalStorage(product);

    setIsAlreadyAvailable(false);

    if (localStorageMessage) {
      setIsAlreadyAvailable("Already Added In Cart");
    }
  };

  const handleSetLocalStorageWishlist = () => {
    setWishlistRefresher(!wishlistRefresher);
    const localStorageMessageWishlist = setWishlistInLocalStorage(product);

    setIsAlreadyAvailable(false);

    if (localStorageMessageWishlist) {
      setIsAlreadyAvailable("Already Added In Wishlist");
    }
  };

  const productView = () => {
    navigate.push(`/product/${product?._id}`);
    // window.gtag("event", "view_item", {
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
  };

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
  };

  return (
    <div className="bg-white overflow-hidden group ">
      <div className="mb-auto overflow-hidden group relative">
        <Link
          href={`/product/${product?._id}`}
          className="w-full h-[300px] overflow-hidden relative cursor-pointer bg-gray-200"
          onClick={() => {
            productView();
          }}
        >
          <img
            src={product?.imageURLs[active]}
            alt="product image"
            width={300}
            height={307}
            className="h-[200px] lg:h-[280px] duration-500 overflow-hidden object-cover w-full"
          />
        </Link>
        {product?.imageURLs.length > 1 && <>
          <button
            onClick={() => handelActiveRe()}
            className=" bg-white/80 py-2 opacity-0 group-hover:opacity-100 px-2 absolute top-[50%] translate-y-[-50%] shadow-lg left-0"
          >
            <Icon
              icon="icon-park-outline:left"
              className=" text-primary text-[25px]"
            />
          </button>
          <button
            onClick={() => handelActive()}
            className=" bg-white/80 py-2 px-2 absolute top-[50%] opacity-0 group-hover:opacity-100 translate-y-[-50%] right-0"
          >
            <Icon
              icon="icon-park-outline:right"
              className=" text-primary text-[25px]"
            />
          </button></>}


        {/* <label
          onClick={() => { handleSetLocalStorageWishlist(); }}
          disabled={product?.quantity < 1}
          tabIndex={0}
          className="btn btn-sm btn-ghost btn-circle absolute top-0 right-0 bg-[#4c274533]"
        >


          <AiOutlineHeart
            className="text-secondary hover:text-primary"
            size={22}
          />

        </label> */}
        {/* {product?.quantity > 0 && (
          <Link
            href={`/checkout/direct-buy/${product?._id}`}
            tabIndex={0}
            className=" absolute top-0 left-0 "
          >
            <div onClick={() => handleBuyNowButtonClick(product?.name?.slice(0, 50))} className="flex items-center gap-1 text-xs  p-1 rounded-md cursor-pointer bg-primary bg-opacity-80 duration-150 hover:bg-opacity-70 text-white hover:text-black font-bold  border-2 border-primary ">
              <AiOutlineHeart className="" size={15} />
              <span className="text-[9px]">Buy Now</span>
            </div>
          </Link>
        )} */}
        {/* {product?.discount > 0 && <span className=" absolute top-3 left-0 ">
          <div className="  px-1 rounded-sm cursor-pointer bg-red-600 bg-opacity-80  text-white  font-bold   ">
            <span className="text-sm">{product?.discount}% off</span>
          </div>
        </span>} */}
      </div>

      <div className="py-3 px-2 flex flex-col justify-between h-[170px] xl:h-[160px]">
        <div className=" mt-2 w-full invisible group-hover:visible duration-500">
          {product?.quantity < 1 ? (
            <>
              <p className="text-center text-red-600 font-bold text-[14px] avenir2">
                Out of Stock
              </p>
            </>
          ) : (
            <button
              onClick={handleBuyNowButtonClick}
              className=" border border-gray-300  py-1.5 w-full text-[14px] avenir2"
            >
              QUICK BUY
            </button>
          )}
        </div>

        <div>
          <div className="md:px-10 mt-2">
            <h1
              className="text-[13px] text-center hover:text-primary cursor-pointer duration-150 avenir2"
              onClick={() => {
                productView();
              }}
            >
              {product?.name?.length > 40
                ? product?.name.slice(0, 39) + "..."
                : product?.name}
            </h1>
          </div>
          <div className="my-2 flex items-center gap-1 text-[15px]  justify-center">
            <Icon className="text-[#D4A14C] " icon="subway:star-1" />
            <Icon className="text-[#D4A14C] " icon="subway:star-1" />
            <Icon className="text-[#D4A14C] " icon="subway:star-1" />
            <Icon className="text-[#D4A14C] " icon="subway:star-1" />
            <Icon className="text-[#D4A14C] " icon="subway:star-1" />
            <span className="text-xs text-gray-500">{`(5 Reviews)`}</span>
          </div>
          <div className=" ">
            <p className="text-[15px] text-black text-center avenir2">
              ৳ {product?.salePrice}
            </p>
            {/* {product?.quantity < 1 ? (
            <span className="text-xs text-red-600 font-extrabold">
              Out Of Stock
            </span>
          ) : (
            <div className="flex items-center">
              <button
                disabled={product?.quantity < 1}
                onClick={() => { handleSetLocalStorage(); handleAddCartButtonClick(); }}
                // onClick={handleSetLocalStorage}
                className="text-primary p-2 bg-transparent hover:bg-gray-200 duration-300 rounded-full"
              >
                <MdAddShoppingCart size={16} />
              </button>
            </div>
          )} */}
          </div>
        </div>
      </div>

      <>
        {isAlreadyAvailable && (
          <AlreadyProductHave
            setIsAlreadyAvailable={setIsAlreadyAvailable}
            isAlreadyAvailable={isAlreadyAvailable}
          />
        )}
      </>
    </div>
  );
};

export default ProductCard;
