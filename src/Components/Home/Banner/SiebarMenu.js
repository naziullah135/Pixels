
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useQuery } from "react-query";
import { getCategories } from "../../../../lib/helper";
import CreateContext from "../../CreateContex";
import CustomCategorySkeleton from "../../CustomSkeleton/CustomCategorySkeleton";
// import Image from "next/image";;
import { Icon } from "@iconify/react/dist/iconify.js";

const SiebarMenu = ({ catagories }) => {
  const { setQueryFromCategory } = useContext(CreateContext);
  const [activeParentCategory, setActiveParentCategory] = useState(null);

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (catagories) {
      setIsLoading(false)
    }
  }, [catagories])

  // const {
  //   data: categories,
  //   isLoading,
  //   refetch,
  // } = useQuery(["categories"], getCategories);

  const handleParentCategoryMouseEnter = (parentCategory) => {
    setActiveParentCategory(parentCategory);
  };

  const handleParentCategoryMouseLeave = () => {
    setActiveParentCategory(null);
  };

  const handelCategoryParams = (cat) => {
    const params = new URLSearchParams();
    params.append("category", cat);
    const url = `${params.toString()}`;
    setQueryFromCategory(url)
  }

  const handelChildeCategoryParams = (cat) => {
    const params = new URLSearchParams();
    params.append("subCategory", cat);
    const url = `${params.toString()}`;
    setQueryFromCategory(url)
  }

  return (
    <div className="">
      <ul id="catagory-menu" className="">
        <>
          {
            isLoading ? <CustomCategorySkeleton /> : <>{catagories?.data?.result?.slice(0, 8).map((category) => {
              const isParentCategoryActive =
                activeParentCategory === category?.parentCategory;
              const hasChildCategories = category?.childCategory?.length > 0;
              return (
                <li
                  key={category._id}
                  id="parent-category"
                  className=" avenir2"
                  onMouseEnter={() =>
                    handleParentCategoryMouseEnter(category.parentCategory)
                  }
                  onMouseLeave={handleParentCategoryMouseLeave}
                >
                  <Link
                    onClick={() =>
                      // setQueryFromCategory(`category=${category.parentCategory}`)
                      handelCategoryParams(category.parentCategory)
                    }
                    href={`/shop`}
                    className=" px-4 py-2 "
                  >
                    <span className="flex items-center justify-between text-sm font-medium">
                      {category.parentCategory}
                      {hasChildCategories && <Icon className='text-lg text-black' icon="iconamoon:arrow-right-2-light" />}
                    </span>
                  </Link>
                  {/* dropdown */}
                  {hasChildCategories && (
                    <ul
                      // id="child-category"
                      className={`${isParentCategoryActive ? "visible" : "hidden"
                        } absolute mt-10 shadow-md py-2 ml-1 min-h-[200px]`}
                    >
                      {category.childCategory.map((child, index) => (
                        <li key={index}>
                          <Link
                            onClick={() =>
                              // setQueryFromCategory(`subCategory=${child}`)
                              handelChildeCategoryParams(child)
                            }
                            href="/shop"
                            className="text-sm cursor-pointer"
                          >
                            {child}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}</>
          }
        </>
      </ul>
    </div>
  );
};

export default SiebarMenu;
