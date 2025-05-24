import axios from "axios";
import React, { useState } from "react";

const Addhaircut = () => {
  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState("");

  //feedback system
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  //Posting Data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("Connecting...");

    try {
      const formData = new FormData();
      formData.append("product_name", product_name);
      formData.append("product_description", product_description);
      formData.append("product_cost", product_cost);
      formData.append("product_photo", product_photo);

      const response = await axios.post(
        "https://marshmelly.pythonanywhere.com/api/add_product",
        formData
      );
      if (response.data.success) {
        setLoading("");
        setSuccess(response.data.success);
        setProductName("");
        setProductDescription("");
        setProductCost("");
        setProductPhoto("");
      }
    } catch (error) {
      setLoading("");
      setSuccess("");
      setError(error.message);
    }
  };
  return (
    <div className="row justify-content-center mt-4 ">
      <div className="col-md-6 card shadow p-2 dola">
        <h1 className="yo">Add Haircuts</h1>
        {loading}
        {success}
        {error}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder=" Enter Haircut name"
            className="form-control"
            value={product_name}
            onChange={(e) => {
              setProductName(e.target.value);
            }}
          />{" "}
          <br />
          <textarea
            placeholder=" Enter  description"
            id="text"
            className="form-control"
            value={product_description}
            onChange={(e) => {
              setProductDescription(e.target.value);
            }}
          ></textarea>
          <br />
          <input
            type="number"
            placeholder="Enter cost"
            className="form-control"
            value={product_cost}
            onChange={(e) => {
              setProductCost(e.target.value);
            }}
          />{" "}
          <br />
          <input
            type="file"
            placeholder="Choose image"
            className="form-control"
            onChange={(e) => {
              setProductPhoto(e.target.files[0]);
            }}
          />  
          <br />
          <button
            className="btn btn-outline-success bg-dark text-white"
            type="submit"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addhaircut;
