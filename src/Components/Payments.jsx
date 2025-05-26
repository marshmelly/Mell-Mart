import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Payment = () => {
  const [phone, setPhone] = useState("");
  const { product } = useLocation().state || {};
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("amount", product.product_cost);
      formData.append("phone", phone);

      //Post data
      const response = await axios.post(
        "https://mellymarsh.pythonanywhere.com/api/mpesa_payment",
        formData
      );
    } catch (error) {}
  };

  return (
    <div className="row justify-content-center mt-2">
      <h1 className="m-2">Make Payment-LIPA NA MPESA</h1>
      <div className="shadow card col-md-6 p-2">
        <h1 className="text-success">LIPA NA MPESA</h1>
        <h3 className="text-secondary">{product.product_name}</h3>
        <p className="text-dark">Ksh{product.product_cost}</p>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="tel"
            placeholder="Enter 254*********"
            className="form-control"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <br />
          <button className="button w-75" type="submit">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
