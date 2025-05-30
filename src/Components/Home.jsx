import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Carousel from './Carousel';
import './Home.css'

const Home = () => {
  const [products, setProducts] = useState([]);
  const img_url = "https://marshmelly.pythonanywhere.com/static/images/";
  const navigate = useNavigate();
  const location = useLocation();

  const getProducts = async () => {
    
    try {
       const response = await axios.get("https://marshmelly.pythonanywhere.com/api/get_product");
        setProducts(response.data.products);
      } catch (error) {}
  };
  useEffect(() => {
    getProducts();
  },[])
  return (
    <div className='home'>
      <Carousel />
      <div className="container-fluid row">
        <div className="home_row">
          {location.state && location.state.successMessage && (
          <div className="text" role="alert" style={{width: '20%', textAlign: 'center'}}>
            {location.state.successMessage}
          </div>
        )} 
          {products?.map((product, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div className="home_product_info card shadow p-2">
                <img src={img_url + product.product_photo} alt={product.product_photo} className='product' />
                <div className="card-body">
                  <h4 className='mt-2'>{product.product_name}</h4>
                  <p className='text-muted'>{product.description}</p>
                  <b className='text-warning'>{product.product_cost}</b> <br />
                  <button className='button' onClick={() => {navigate("/cart", {state:{product}});}}>Add to Cart</button>


                </div>
              </div>

            </div>
          ))}unaju
        </div>
      </div>
      <p className='text'>Want to get the full experience? Signup to get complete updates <Link to='/signup'>Sign Up</Link></p>
    </div>
  )
}

export default Home
