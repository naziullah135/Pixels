import React, { useContext } from "react";

import Drawer from "react-modern-drawer";
import { MdAddShoppingCart } from "react-icons/md";

import "react-modern-drawer/dist/index.css";
import CartProductItems from "./CartProductItems";
import LoadingComponets from "../LoadingComponets";
import Link from "next/link";
import CreateContext from "../../Components/CreateContex";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { products } from "../../../lib/helper";
import { useState } from "react";
import SelectProductItem from "./SelectProductItem";
import { MdOutlineUnfoldMore } from "react-icons/md";
import { Icon } from "@iconify/react/dist/iconify.js";

const ProductDrawer = ({ isOpen, toggleDrawer, dir, setGetProductId, getProductId }) => {
  const router = useRouter();
  const [queryFilterPrice, setQueryFilterPrice] = useState("");
  const { user, setQueryFromCategory } = useContext(CreateContext);
  const [visible, setVisible] = useState(15);
  const handleCheckout = () => {
    // if (products?.items?.length > 0) {
    //   router.push("/checkout");
    //   toggleDrawer();
    // } else if (products?.items?.length < 1) {
    //   router.push("/shop");
    //   setQueryFromCategory("");
    //   toggleDrawer();
    // } else {
    //   toggleDrawer();
    // }
  };

  const { data, isLoading, refetch } = useQuery(
    ["products", queryFilterPrice],
    () => products(queryFilterPrice)
  );

  const handleSelectProduct = (product) => {
    const isSelected = Boolean(getProductId.find((grpStud) => grpStud._id === product._id))
    if (isSelected) {
      setGetProductId(getProductId.filter((item) => item._id !== product._id))
    } else {
      const items = {
        price: product?.productPrice,
        salePrice: product?.salePrice,
        originalPrice: product?.price,
        discount: 0,
        _id: product?._id,
        createdAt: new Date().toString(),
        image: product.imageURLs[0],
        category: product?.category,
        quantity: 1,
        productTitle: product?.name,
        sku: "",
        userSize: product.size[0] || "",
        size: product.size,
        productColor: product.productColor,
        userColor: product.productColor[0] || "",
        itemTotal: product?.salePrice,
      };

      setGetProductId((pre) => [...pre, items]);
    }
  };

  const handelChange = (e) => {
    const searchValue = e.target.value;
    setQueryFilterPrice(`search=${searchValue}`);
  }

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 15);
  };


  return (
    <>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction={dir}
        className="cart-drawer "
        size="100px"
        style={{ width: "800px", maxWidth: "800px" }}
      >
        <div className="bg-primary max-w-[800px] p-3 md:py-4 md:px-7">
          <div className="flex items-center justify-between max-w-[800px]">
            <span className="flex items-center text-white gap-2">
              {/* <MdAddShoppingCart size={22} /> */}
              <span className="text-xl font-bold">All Product</span>
            </span>
            <span className=" p-3">
              <button
                onClick={toggleDrawer}
                className="text-white hover:text-red-500"
              >
                <span><Icon className="text-2xl" icon="charm:cross" /></span>
              </button>
            </span>
          </div>
        </div>

        <div className=" bg-white py-2 px-2 w-full">
          <input
            type="text"
            onChange={handelChange}
            placeholder="Search Product...."
            className="input input-bordered  block w-full h-10"
            style={{ outline: "none" }}
            name="search"
          />
        </div>
        {/* ------------------------items------------------- */}

        <div className=" overflow-y-scroll h-[80%]">
          {data?.data?.products.slice(0, visible).map((product) => (
            <SelectProductItem key={product?._id} product={product} handleSelectProduct={handleSelectProduct} getProductId={getProductId} />
          ))}
          <div className="w-full text-center">
            {
              data?.data?.products.length > visible && <button
                onClick={showMoreItems}
                className="bg-primary  px-3 py-2 font-bold mt-5 rounded-md mx-auto flex items-center gap-1 hover:bg-opacity-0 duration-150 text-white hover:text-primary border border-primary"
              >
                <MdOutlineUnfoldMore size={22} />
                Load More
              </button>
            }
          </div>
        </div>


        {/* <div
          onClick={() => handleCheckout()}
          className=" bg-primary py-4 px-3 flex w-[90%] mx-4 justify-between fixed bottom-6 md:bottom-3 items-center cursor-pointer hover:font-bold rounded-md duration-100"
        >
          <h1 className="text-white text-sm block">Proceed To Checkout</h1>
          <span className="btn btn-sm text-primary bg-white hover:bg-secondary font-warning ">
            ৳{products?.cartTotal}
          </span>
        </div> */}
      </Drawer>
    </>
  );
};

export default ProductDrawer;
