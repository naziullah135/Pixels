export const usePostOrder = (url, body, setFunction, router) => {
  fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        setFunction(data.data);
        swal("Thank you for ordering !", "Your parcel will be delivered within 3 to 5 working days ", "success");
        router.push("/checkout/success-order");
      }
      if (data.status === "fail") {
        swal("error", data.error, "error");
      }
    });
};


export const usePostCustomeOrder = (url, body, setFunction,router) => {
  fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        setFunction(data.data);
        swal("Thank you for ordering !", "Your parcel will be delivered within 3 to 5 working days ", "success");
        router.push("/admin/orders");
      }
      if (data.status === "fail") {
        swal("error", data.error, "error");
      }
    });
};
