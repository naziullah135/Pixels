import React from "react";
import { GrFormView } from "react-icons/gr";
import server_url from "../../../lib/config";
import { convertTimestamp } from "../../../lib/convertTimestampDateAndTime";
import { postMethodHook, updateMethodHook } from "../../../lib/usePostHooks";
import Link from "next/link";
import { Tooltip } from "react-tooltip";
const OrdersTableItem = ({ order, handleInvoiceModal, refetch }) => {
  const { date, time } = convertTimestamp(order.date);
  const handleUpdateStatus = (e) => {
    let value = e.target.value;
    if (value === "cancelled") {
      // here api call for stock minus & SaleCount Minus using orderItems, post method
      const data = order.orderItem;
      const url = `${server_url}/order/cancel-order`;
      postMethodHook(url, data, refetch);
    }
    const url = `${server_url}/order/${order._id}`;
    const body = { status: value };
    updateMethodHook(url, body, refetch);
  };

  return (
    <tr className="py-10 text-center">
      <td className="font-bold">{order.invoiceNumber}</td>
      <td>
        <p>{date}</p> <p>{time}</p>
      </td>
      <td>{order.shippingAddress.address.length <= 20 ? order.shippingAddress.address.slice(0, 20) : order.shippingAddress.address.slice(0, 20) + "..."}</td>
      <td>{order.shippingAddress.phone}</td>
      <td>{order.paymentDetails.method}</td>
      <td>{order.totalAmount}TK.</td>
      <td>
        <Link
          href={`orders/order-details/${order._id}`}
          className="btn btn-xs rounded-lg text-white bg-primary"
        >
          Details
        </Link>
      </td>
      <td>
        <div className=" uppercase text-[13px]">
          {
            order.courierName === "not found" && <span className=" text-red-500 font-bold">{order.courierName}</span>
          }
          {order.courierName === "patho" && <span className="px-2 py-1 rounded-md font-bold text-white bg-[#e83330] uppercase">{order.courierName}</span>}
          {order.courierName === "steadfast" && <span className="px-2 py-1  rounded-md font-bold text-white bg-[#1dc68c] uppercase">{order.courierName}</span>}
          {order.courierName === "redx" && <span className="px-2 py-1 rounded-md text- font-bold bg-yellow-500 uppercase">{order.courierName}</span>}
        </div>
      </td>
      <td>
        <select
          onChange={handleUpdateStatus}
          className={`select select-bordered w-[150px] max-w-xs ${order.status === "cancelled" && "text-red-800 font-bold"
            }`}
          disabled={order.status === "cancelled"}
        >
          <option disabled selected hidden>
            Status
          </option>
          <option value={"pending"} selected={order.status === "pending"}>
            Pending
          </option>
          <option value={"processing"} selected={order.status === "processing"}>
            Processing
          </option>
          <option value={"delivered"} selected={order.status === "delivered"}>
            Delivered
          </option>
          <option value={"cancelled"} selected={order.status === "cancelled"}>
            Cancelled
          </option>
        </select>
      </td>
      <td>
        <Tooltip anchorSelect="#edit"> View Invoice</Tooltip>
        <GrFormView
          id="edit"
          onClick={() => handleInvoiceModal(order)}
          size={25}
          className="text-black block mx-auto cursor-pointer"
        />
      </td>
    </tr>
  );
};

export default OrdersTableItem;
