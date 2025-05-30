import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const [phone, setPhone] = useState("");
  const { cartItems, total } = useLocation().state || {};
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    // Validate phone number (Kenyan format)
    if (!phone.match(/^254[17]\d{8}$/)) {
      setError("Please enter a valid Kenyan phone number (format: 254XXXXXXXXX)");
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("amount", total);
      formData.append("phone", phone);

      const response = await axios.post(
        "https://mellymarsh.pythonanywhere.com/api/mpesa_payment",
        formData
      );

      if (response.data.success) {
        setSuccess("Payment request sent successfully! Check your phone to complete the payment.");
        // Clear cart after successful payment
        localStorage.removeItem('cartItems');
        // Redirect to home after 5 seconds
        setTimeout(() => navigate("/"), 5000);
      } else {
        setError(response.data.message || "Payment request failed");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred while processing your payment");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h1 className="payment-header">Make Payment - LIPA NA MPESA</h1>
      
     <div className="row justify-content-center mt-2">
      <div className="shadow-card col-md-6 p-2">
       <div className="payment-card">
        <h1 className="payment-title">LIPA NA MPESA</h1>
        
        {cartItems?.length > 0 ? (
          <div className="payment-items">
            <h3>Order Summary ({cartItems.length} items)</h3>
            <ul className="item-list">
              {cartItems.map((item, index) => (
                <li key={index} className="item-row">
                  <span>{item.product_name}</span>
                  <span>Ksh{item.product_cost.toFixed(2)} x {item.quantity}</span>
                </li>
              ))}
            </ul>
            <div className="total-row">
              <strong>Total Amount:</strong>
              <strong>Ksh{total?.toFixed(2)}</strong>
            </div>
          </div>
        ) : (
          <p className="no-items">No items in cart</p>
        )}

        <form onSubmit={handleSubmit} className="payment-form">
          <div className="form-group">
            <label htmlFor="phone">M-Pesa Phone Number</label>
            <input
              type="tel"
              id="phone"
              placeholder="Enter 254XXXXXXXXX"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <small className="form-text">Format: 254XXXXXXXXX</small>
          </div>

          {error && <div className="alert alert-success">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <button 
            type="submit" 
            className="payment-button"
            disabled={isLoading || !cartItems?.length}
          >
            {isLoading ? "Processing..." : "Place Order"}
          </button>
        </form>
      </div>
     </div>
     </div>
    </div>
  );
};

export default Payment;