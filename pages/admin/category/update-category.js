import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../src/Components/DashboardLayout";
import AdminDashboardBreadcrumb from "../../../src/Shared/AdminDashboardBreadcrumb";

import { BsCloudUploadFill } from "react-icons/bs";
import { TagsInput } from "react-tag-input-component";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import swal from "sweetalert";


const UpdateCategory = () => {
  const [selectedChildCategory, setSelectedChildCategory] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedProductTag, setSelectedProductTag] = useState([]);
  const [selectedProductSize, setselectedProductSize] = useState([]);
  const [richText, setValueOfRichText] = useState("");
  const [childCategories, setChildCategories] = useState([]);
  const [imageUploadErrorMessage, setImageUploadErrorMessage] = useState(null);
  const [category, setCategory] = useState({});

  const router = useRouter();
  const id = router.query.id;

  let url = `https://server-journalshop.vercel.app/api/v1/category/${id}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setCategory(data.data);
          setSelectedProductTag(data.data.tags);
          setselectedProductSize(data.data.size);
          setImageUrl(data.data.imageURLs[0]);
          setValueOfRichText(data.data.description);
          setSelectedChildCategory(data.data.childCategory);
        }
      });
  }, [id]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // ------------------------------------handle category add-------------------------
  const handleUpdateCategory = (data) => {
    const categories = {
      // productType: data.productType || category.productType,
      parentCategory: data.parentCategory || category.parentCategory,
      childCategory: selectedChildCategory,
      imageURLs: imageUrl,
      status: data.status || category.status,
    };
    // ------------------------------------------------post method here
    fetch(
      `https://server-journalshop.vercel.app/api/v1/category/${category._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categories),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.status == "success") {
          swal("Category updated successfully.", {
            icon: "success",
          });
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
  const handleRemoveImage = () => {
    setImageUrl(null);
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
        <div className="md:flex block items-center gap-5 mt-3 mb-4">
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
              <div className="  w-[100px] h-auto p-1 bg-white shadow-md rounded-md mt-3 relative">
                <img
                  src={imageUrl}
                  width="100"
                  height="2"
                  alt="category image"
                  className="w-full h-full object-contain "
                />
                <button
                  onClick={() => handleRemoveImage(0)}
                  className="btn btn-outline btn-warning rounded-full bg-red-700 absolute right-0 top-0 btn-xs"
                >
                  x
                </button>
              </div>
            )}
          </div>
        </div>
        <form
          onSubmit={handleSubmit(handleUpdateCategory)}
          className="mt-5 md:px-7"
        >
          {/* ----------------------end image------------------- */}
          {/*   <div className="flex items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold">
              <p>Product Type</p>
            </div>
            <div className="w-full md:w-[70%]">
              <select
                defaultValue={category?.productType}
                className="select select-bordered w-full  focus:outline-none "
                placeholder="Type"
                {...register("productType", { required: true })}
              >
                <option
                  value={"Grocary"}
                  selected={category.productType == "Grocary"}
                >
                  Grocary
                </option>
                <option
                  value={"Foods"}
                  selected={category.productType == "Foods"}
                >
                  Foods
                </option>
                <option
                  value={"Cloths"}
                  selected={category.productType == "Cloths"}
                >
                  Cloths
                </option>
                <option
                  value={"Bags"}
                  selected={category.productType == "Bags"}
                >
                  Bags
                </option>
                <option
                  value={"Electronics"}
                  selected={category.productType == "Electronics"}
                >
                  Electronics
                </option>
                <option
                  value={"T-shirt"}
                  selected={category.productType == "T-shirt"}
                >
                  T-shirt
                </option>
                <option
                  value={"Panjabi"}
                  selected={category.productType == "Panjabi"}
                >
                  Panjabi
                </option>
              </select>
            </div>
          </div> */}

          {/* end type----------------- */}
          <div className="md:flex block items-center gap-5 mb-4">
            <div className="w-full md:w-[30%] text-lg font-semibold">
              <p>Parent Category</p>
            </div>
            <div className="w-full md:w-[70%]">
              <input
                type="text"
                defaultValue={category?.parentCategory}
                {...register("parentCategory", { required: false })}
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
                  placeHolder="enter t-shirt"
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
                defaultValue={category.status}
                className="select select-bordered w-full  focus:outline-none "
                {...register("status", { required: false })}
              >
                <option value={false} selected={category.status == false}>
                  Review
                </option>
                <option value={true} selected={category.status == true}>
                  Publish
                </option>
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
                Add Category
              </button>
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>
    </DashboardLayout>
  );
};

export default UpdateCategory;
