import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './Cart.css'

const Cart = () => {

  const [product, setProduct] = useState([]);
  const img_url = "https://mellymarsh.pythonanywhere.com/static/images/";
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  
  // Function to add item to cart (for demonstration)
  const addToCart = () => {
    setCartItems([...cartItems, { id: Date.now() }]);
  };
  
  // Function to clear cart (for demonstration)
  const clearCart = () => {
    setCartItems([]);
  };
  const navigate = useNavigate();

  const getProduct = async() => {
    try {
      const response = await axios.get("https://mellymarsh.pythonaanywhere.com/api/product_listing/");
      setProduct(response.data.product);

    } catch (error) {

    };

    
  };

  useEffect(() => {
    getProduct();
  },[])
  return (
 <div>
     <div className='cart'>

        <div className="cart-component">
      <h2>Shopping Cart</h2>
      <div className="cart-content">
        {cartItems.length === 0 ? (
          <p className="empty-cart-message">Nothing here yet</p>
        ) : (
          <div className="cart-items">
            <p className="item-count">Items in cart: {cartItems.length}</p>
            {/* You would typically map through cartItems here to display them */}
          </div>
        )}
      </div>
      {/* Demo buttons - not part of actual component */}
      <div className="demo-controls">
        <button onClick={addToCart}>Add Item</button>
        <button onClick={clearCart}>Clear Cart</button>
      </div>
     
    </div>

      <div className="container container-fluid row">
        <div className="cart_row">
            {location.state && location.state.successMessage && (
          <div className="text" role="alert" style={{width: '20%', textAlign: 'center'}}>
            {location.state.successMessage}
          </div>
        )} 
          {product?.map((product,index) => (
            <div className="cart_product" key={index}>
              <div className="cart_product card shadow p-2">
                <img src={img_url + product.product_photo} alt={product.product} />
                <div className="cart_text card-body">
                  <h3 className="mt-4">
                    {product.product_name}
                  </h3>
                  <p className="text-muted">
                    {product.description}
                  </p>
                  <b className="text-info">
                    {product.product_cost}
                  </b>
                  <button className='button' onClick={() => {navigate("/payment", {state:{product}});}}>Order Now</button>
                </div>
              </div>
            </div>
          ))}
           </div>
      </div>
       
    </div>
 </div>
  )
}
          
      

export default Cart
