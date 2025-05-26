import axios from "axios";
import React, { useState } from "react";

const Addproduct = () => {
  const [product_name, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState("");

  //feedback system
  const [loading, setLoading] = useState("");
  const [message, setSuccess] = useState("");
  const [error, setError] = useState("");

  //Posting Data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("Connecting...");

    try {
      const formData = new FormData();
      formData.append("product_name", product_name);
      formData.append("description", description);
      formData.append("product_cost", product_cost);
      formData.append("product_photo", product_photo);

      const response = await axios.post(
        "https://mellymarsh.pythonanywhere.com/api/add_product",
        formData
      );
      if (response.data.message) {
        setLoading("");
        setSuccess(response.data.message);
        setProductName("");
        setDescription("");
        setProductCost("");
        setProductPhoto("");
      }
    } catch (error) {
      setLoading("");
      setSuccess(error.message);
      setError(error.message);
    }
  };
  return (
    <div className="row justify-content-center mt-4 ">
      <div className="col-md-6 card shadow p-2 dola">
        <h1 className="yo">Add Produts</h1>
        {loading}
        {message}
        {error}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder=" Enter Product name"
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
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
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

export default Addproduct;
