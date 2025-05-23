import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Signin.css'


const Signin = () => {
    const [password, setPassword] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("");
    const navigate = useNavigate();

      const evaluatePasswordStrength = (newPassword) => {
    let strength = 0;
    if (newPassword.length >= 8) strength++;
    if (/[A-Z]/.test(newPassword)) strength++;
    if (/[a-z]/.test(newPassword)) strength++;
    if (/[0-9]/.test(newPassword)) strength++;
    if (/[^A-Za-z0-9]/.test(newPassword)) strength++;

    switch (strength) {
      case 0:
      case 1:
      case 2:
        return "Weak";
      case 3:
      case 4:
        return "Moderate";
      case 5:
        return "Strong";
      default:
        return "";
    }
  };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordStrength(evaluatePasswordStrength(newPassword));
    };

    const isPasswordValid = passwordStrength === "Strong";
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isPasswordValid) {
            alert("Please enter a strong password");
            return;
        }

        navigate("/", {state: {message: "Successfully Signed In!"}});
    };
  return (
    <div className='sign-component'>
        <div className="shadow card col-md-6">
            <div className="card-body">
                <h2 className='card-title'>Sign In</h2>
                <form action="" onClick={handleSubmit}>
                    <input type="text" placeholder='Enter Username' className='form-control' /><br />
                    <input type="password" placeholder='Enter Password' className='form-control' value={password} onChange={handlePasswordChange} /><br />
                    <button>Sign In</button>
                    <p> Already have an acount? <Link to='/signup'>Create Account</Link></p>
                </form>
            </div>
        </div>
      
    </div>
  )
}

export default Signin
