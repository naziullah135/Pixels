import React, { useState } from "react";
import DashboardLayout from "../../../src/Components/DashboardLayout";
import AdminDashboardBreadcrumb from "../../../src/Shared/AdminDashboardBreadcrumb";

import { BsCloudUploadFill } from "react-icons/bs";
import { TagsInput } from "react-tag-input-component";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
import CustomButtonLoading from "../../../src/Shared/CustomButtonLoading";
// // import Image from "next/image";;

const AddCategory = () => {
  const [selectedChildCategory, setSelectedChildCategory] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  // ------------------------------------handle category add-------------------------
  const handleCategoryAdd = (data) => {
    setLoading(true)
    const categories = {
      // productType: data.productType,
      parentCategory: data.parentCategory,
      childCategory: selectedChildCategory,
      imageURLs: imageUrl,
      status: data.status,
    };
    // ------------------------------------------------post method here
    fetch("https://server-journalshop.vercel.app/api/v1/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categories),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == "success") {
          setLoading(false)
          swal("Success", "Category Added", "success")
          reset();
          // toast.success("Category added Successfully.", {
          //   position: toast.POSITION.BOTTOM_LEFT,
          // });
        } else {
          setLoading(false)
          swal("Error", "Something Wrong", "error")
        }
      });

  };

  // --------------------------------------------handle image upload
  const imgUrl = `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`;
  const handleImageUpload = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    fetch(imgUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        setImageUrl(result.data?.url);
      });
  };

  return (
    <DashboardLayout>
      <div className="mid-container">
        <AdminDashboardBreadcrumb
          title={"Add Category"}
          subtitle={
            "Add your Product category and necessary information from here"
          }
        />
        <form onSubmit={handleSubmit(handleCategoryAdd)} className="mt-5 md:px-7">
          <div className="block md:flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold">
              <p>Category Icon</p>
            </div>
            <div className="w-full md:w-[70%]  ">
              <div className="relative border-4 border-dashed w-full h-[150px]  text-center">
                <BsCloudUploadFill
                  size={35}
                  className="text-primary mx-auto block  mt-8"
                />
                <p className="text-xl font-bold  text-slate-900">
                  Drag your image here
                </p>
                <span className="text-xs font-bold text-slate-900">
                  (Only *.jpeg and *.png images will be accepted)
                </span>
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="opacity-0 absolute top-0 left-0 bottom-0 right-0 w-full h-full cursor-pointer"
                />
              </div>
              {imageUrl && (
                <div className="  w-[100px] h-auto p-1 bg-white shadow-md rounded-md mt-3 ">
                  <img
                    src={imageUrl}
                    width="100"
                    height="2"
                    alt="category image"
                    className="w-full h-full object-contain "
                  />
                </div>
              )}
            </div>
          </div>
          {/* ----------------------end image------------------- */}
          {/* <div className="flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold">
              <p>Product Type</p>
            </div>
            <div className="w-full md:w-[70%]">
              <select
                className="select select-bordered w-full  focus:outline-none "
                placeholder="Type"
                {...register("productType", { required: true })}
              >
                <option disabled selected>
                  Product Type
                </option>
                <option>Grocary</option>
                <option>Foods</option>
                <option>Cloths</option>
                <option>Bags</option>
                <option>Electronics</option>
                <option>T-shirt</option>
                <option>Panjabi</option>
              </select>
            </div>
          </div> */}

          {/* end type----------------- */}
          <div className=" block md:flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold">
              <p>Parent Category</p>
            </div>
            <div className="w-full md:w-[70%]">
              <input
                type="text"
                {...register("parentCategory", { required: true })}
                className="w-full rounded input input-bordered focus:border-primary duration-300 ease-in-out focus:outline-none"
                placeholder="Type Parent Category "
              />
            </div>
          </div>

          <div className="md:flex block items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold">
              <p>Child Category</p>
            </div>
            <div className="w-full md:w-[70%]">
              <div>
                <TagsInput
                  value={selectedChildCategory}
                  onChange={setSelectedChildCategory}
                  placeHolder="Type Parent Category"
                />
                <em className="text-xs">
                  press enter or comma to add new child category
                </em>
              </div>
            </div>
          </div>

          <div className="block md:flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold mt-3">
              <p>Status</p>
            </div>
            <div className="w-full md:w-[70%]">
              <select
                className="select select-bordered w-full  focus:outline-none "
                {...register("status", { required: true })}
              >
                <option disabled selected>
                  Status
                </option>
                <option value={false}>Review</option>
                <option value={true}>Publish</option>
              </select>
            </div>
          </div>

          <div className="md:flex block items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold hidden md:block"></div>
            <div className="w-full md:w-[70%]">
              <button
                type={"submit"}
                className="btn btn-primary w-full text-white"
                value={"Add Category"}
                disabled={!imageUrl}
              >
                {(loading) ? <CustomButtonLoading /> : 'Add Category'}
              </button>
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>
    </DashboardLayout>
  );
};

export default AddCategory;
