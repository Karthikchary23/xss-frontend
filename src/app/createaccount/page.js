"use client";
import { useState } from "react";
import axios from "axios";

export default function CreateAccount() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    accountnumber: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    axios
      .post("https://xss-backend.onrender.com", form)
      .then((response) => {
        alert("Account created successfully!");
        console.log(response.data);
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          phoneNumber: "",
          accountnumber: "",
          confirmPassword: "",
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          // Handle account already exists error
          alert(error.response.data.message);
        } else {
          alert("Error creating account. Please try again.");
        }        console.error(error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left Form Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 py-10">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">
          Create New Account
        </h2>
        <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1">First Name*</label>
            <input
              name="firstName"
              type="text"
              required
              className="w-full border px-3 py-2 rounded"
              value={form.firstName} // Bind to state
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1">Last Name*</label>
            <input
              name="lastName"
              type="text"
              required
              className="w-full border px-3 py-2 rounded"
              value={form.lastName} // Bind to state
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1">Email*</label>
            <input
              name="email"
              type="email"
              required
              className="w-full border px-3 py-2 rounded"
              value={form.email} // Bind to state
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1">Phone Number*</label>
            <input
              name="phoneNumber"
              type="tel"
              required
              minLength={10}
              maxLength={10}
              className="w-full border px-3 py-2 rounded"
              value={form.phoneNumber} // Bind to state
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1">Account Number*</label>
            <input
              name="accountnumber"
              type="text"
              required
              minLength={15}
              maxLength={15}
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter your 15-digit account number"
              value={form.accountnumber} // Bind to state
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1">Password*</label>
            <input
              name="password"
              type="password"
              required
              className="w-full border px-3 py-2 rounded"
              value={form.password} // Bind to state
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1">Confirm Password*</label>
            <input
              name="confirmPassword"
              type="password"
              required
              className="w-full border px-3 py-2 rounded"
              value={form.confirmPassword} // Bind to state
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
          >
            Create Account
          </button>
        </form>
      </div>

      {/* Right Info Section */}
      <div className="hidden md:block w-1/2 bg-blue-50 p-10">
        <h3 className="text-xl font-semibold text-blue-700 mb-4">
          Be Vigilant. Be Safe.
        </h3>
        <ul className="text-gray-700 space-y-2 list-disc ml-5">
          <li>Never share your password or OTP with anyone.</li>
          <li>Use strong passwords and change them periodically.</li>
          <li>Verify the website URL starts with "https://"</li>
          <li>Report suspicious activity immediately.</li>
        </ul>
        <img
          src="/shield-image.png"
          alt="Security Shield"
          className="mt-6 w-80"
        />
      </div>
    </div>
  );
}
