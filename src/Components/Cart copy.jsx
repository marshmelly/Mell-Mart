import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Cart2.css';


const Cart = () => {
  const [products, setProducts] = useState([]);
  const img_url = "https://mellymarsh.pythonanywhere.com/static/images/";
  const location = useLocation();
  const { product } = location.state || {};
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const getProducts = async () => {
    try {
      const response = await axios.get("https://mellymarsh.pythonanywhere.com/api/cart/");
      setProducts(response.data); // Changed from response.data.product to response.data
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addToCart = (productToAdd) => {
    // Check if product already exists in cart
    const existingItemIndex = cartItems.findIndex(item => item.id === productToAdd.id);
    
    if (existingItemIndex >= 0) {
      // If it exists, update quantity
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1;
      setCartItems(updatedCart);
    } else {
      // If it is new, add with quantity 1
      setCartItems([...cartItems, { 
        ...productToAdd, 
        quantity: 1 
      }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCartItems(cartItems.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.product_cost * item.quantity), 0);
  };

  const proceedToCheckout = () => {
    if (cartItems.length > 0) {
      navigate("/payment", { state: { cartItems, total: getTotalPrice() } });
    }
  };

  useEffect(() => {
    getProducts();
    
    // If a product was passed via navigation state, add it to cart
    if (product) {
      addToCart(product);
    }
  }, []);


  return (
    <div className='cart-page'>
      <div className='cart-section'>
        <div className="cart-component">
          <h2>Shopping Cart ({getTotalItems()})</h2>
          <div className="cart-content">
            {cartItems.length === 0 ? (
              <p className="empty-cart-message">Your cart is empty</p>
            ) : (
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img 
                      src={img_url + item.product_photo} 
                      alt={item.product_name} 
                      className="cart-item-image"
                    />
                    <div className="cart-item-details">
                      <h4>{item.product_name}</h4>
                      <p>${item.product_cost.toFixed(2)}</p>
                      <div className="quantity-controls">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="quantity-button"
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="quantity-button"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="remove-button"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <div className="cart-summary">
                  <h4>Total: ${getTotalPrice().toFixed(2)}</h4>
                  <button 
                    onClick={proceedToCheckout}
                    className="checkout-button"
                    disabled={cartItems.length === 0}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="product-section">
        <h2>Available Products</h2>
        {location.state?.successMessage && (
          <div className="alert-message">
            {location.state.successMessage}
          </div>
        )}
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img 
                src={img_url + product.product_photo} 
                alt={product.product_name} 
                className="product-image"
              />
              <div className="product-details">
                <h3>{product.product_name}</h3>
                <p className="description">{product.description}</p>
                <p className="price">${product.product_cost.toFixed(2)}</p>
                <div className="product-actions">
                  <button 
                    onClick={() => addToCart(product)}
                    className="add-to-cart-button"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;