"use client";
import axios from 'axios';
import { useState,useEffect } from 'react';
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    
  });
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const generateCaptcha = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      
      setCaptcha(result);

    };
    generateCaptcha();
  
   
  }, [])
  


  const handleSubmit = (e) => {
    e.preventDefault();
    if (captchaInput !== captcha) {
      alert('Captcha does not match! Please try again.');
        return;
    }
    axios.post('http://localhost:5000/login', formData)
        .then((response) => {
            alert(response.data.message);
            console.log(response.data.user);
            Cookies.set("token", response.data.token, { expires: 1 });
        
            Cookies.set("balance", response.data.user.balance, { expires: 1 });
            Cookies.set("firstName", response.data.user.firstName, { expires: 1 });
            
            router.push('/home');


            
            console.log(response.data);

        })
        .catch((error) => {
            alert('Login failed. Please check your credentials.');
            console.error(error);
        });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left - Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Login to OnlineSBI</h2>
          <div className="text-red-500 text-sm">(CARE: Username and password are case sensitive.)</div>

          <div>
            <label className="block font-medium">email</label>
            <input
              name="username"
              type="text"
              required
              className="w-full border border-gray-300 rounded p-2"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium">Password*</label>
            <input
              name="password"
              type="password"
              required
              className="w-full border border-gray-300 rounded p-2"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium">Enter Captcha*</label>
            <input
              name="captcha"
              type="text"
              required
                value={captchaInput}
              className="w-full border border-gray-300 rounded p-2"
              onChange={(e) => setCaptchaInput(e.target.value)}
            />
          </div>
          <div>
            <img src={`https://dummyimage.com/100x30/000/fff&text=${captcha}`} alt="Captcha" className="mb-2" />
            <div className="text-sm text-gray-500">Please enter the captcha above.</div>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Login
            </button>
            <button
              type="reset"
              className="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400"
            >
              Reset
            </button>
          </div>

          <div className="text-sm mt-2">
            <a href="/createaccount" className="text-blue-500 hover:underline">New User? Register here/Activate</a> | 
            <a href="#" className="text-blue-500 hover:underline ml-2">Forgot Username / Login Password</a>
          </div>
        </form>

        {/* Right - Image/Message */}
        <div className="flex flex-col justify-center items-center text-center">
          <img
            src="/vigilant-image.jpg"
            alt="Be Vigilant"
            className="w-60 mb-4"
          />
          <div className="bg-blue-900 text-white p-4 rounded-lg">
            <p>OTP based login & Mandatory login password change after 180 days.</p>
            <p>Do not share OTP/password/user info with anyone.</p>
            <p>Use Lock & Unlock User link to control your INB access.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
