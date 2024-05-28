import React, { useState } from "react";
import Link from "next/link";
import { AiFillPrinter } from "react-icons/ai";
import dynamic from "next/dynamic";
// // import Image from "next/image";;

const CustomModal = dynamic(() => import("../../../Shared/CustomModal"), {
  loading: () => <p>Loading...</p>,
});

const InoviceOrderForUser = dynamic(
  () => import("../../../Shared/Invoice/InoviceOrderForUser"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const UserProfileOfOrder = ({ user, order }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [orderModalData, setOrderModalData] = useState({});

  const handleInvoiceModal = (order) => {
    setIsOpen(true);
    setOrderModalData(order);
  };
  return (
    <>
      <div className="flex flex-col justify-center w-full p-6 relative sm:px-12  text-gray-800">
        <button
          onClick={() => handleInvoiceModal(order)}
          className="cursor-pointer font-medium flex items-center px-2 rounded-md bg-primary text-white absolute right-1 top-1"
        >
          <AiFillPrinter size={18} className="mr-1" />Print
        </button>
        <img
          width={200}
          height={200}
          src={user?.imageURL}
          alt=""
          className="w-32 h-32 mx-auto rounded-full bg-gray-500 aspect-square"
        />
        <div className="space-y-4 text-center divide-y divide-gray-300">
          <div className="my-2 space-y-1">
            <h2 className="text-xl font-semibold sm:text-2xl uppercase">
              {user?.fullName}
            </h2>
            <p className="px-5 text-xs sm:text-base text-gray-600">
              {user?.email}
            </p>
            <p className="px-5 text-xs sm:text-base text-gray-600">
              {user?.phone}
            </p>
          </div>
          <div className=" pt-1 space-x-4 ">
            <p>{user?.address}</p>
          </div>
        </div>
        <Link
          href={`/admin/customers/user-details/${user._id}`}
          className="cursor-pointer bg-primary text-center py-1 rounded-md font-bold btn-xs text-white mt-3 uppercase"
        >
          view All Orders
        </Link>
      </div>
      <CustomModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
        {/* -----------this modal for when user placed order then open modal for payment and there have 4 type payment system */}
        {modalIsOpen && (
          <InoviceOrderForUser dataRight="admin" order={orderModalData} />
        )}
      </CustomModal>
    </>
  );
};

export default UserProfileOfOrder;
