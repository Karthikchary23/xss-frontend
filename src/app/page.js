import React from "react";
import Link from "next/link";

export default function SBIHomePage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <header className="bg-[#005bac] text-white">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center space-x-4">
            <img src="/sbi-logo.png" alt="SBI Logo" className="h-10" />
            <h1 className="text-xl font-bold">SBI ONLINE</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">Products & Services</a>
            <a href="#" className="hover:underline">How Do I (Help)</a>
            <a href="#" className="hover:underline">Manage Debit Card E-Mandate</a>
            <a href="#" className="hover:underline">Contact Us</a>
          </nav>
          <div className="flex items-center space-x-3">
            <Link href="#" className="text-sm underline">SBI Home Loan</Link>
            <button className="bg-green-600 px-3 py-1 text-sm font-medium rounded">Language</button>
          </div>
        </div>
      </header>

      <main className="p-6">
        <section className="bg-blue-100 p-6 rounded-md text-center">
          <h2 className="text-2xl font-bold mb-4">Personal Banking</h2>
          <Link href="/login" className="text-blue-700 underline text-lg">
          <button className="bg-blue-700 text-white font-semibold px-5 py-2 rounded cursor-pointer">
            CONTINUE TO LOGIN
          </button></Link>
         
          <p className="text-sm mt-2 text-gray-700">
            Dear Customer, OTP based login is introduced for added security
          </p>
        </section>

        <p className="text-center text-xs text-gray-600 mt-4">
          By clicking on "Continue to Login" button, you agree to the Terms of Service (Terms & Conditions) of usage of Internet Banking of SBI.
        </p>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-gray-100 p-4 rounded text-center border">
            <p className="text-green-600 font-bold">ALWAYS</p>
            <p>keep your computer free of malware</p>
          </div>
          <div className="bg-gray-100 p-4 rounded text-center border">
            <p className="text-green-600 font-bold">ALWAYS</p>
            <p>change your passwords periodically</p>
          </div>
          <div className="bg-gray-100 p-4 rounded text-center border">
            <p className="text-red-600 font-bold">NEVER</p>
            <p>respond to any communication seeking your passwords</p>
          </div>
          <div className="bg-gray-100 p-4 rounded text-center border">
            <p className="text-red-600 font-bold">NEVER</p>
            <p>reveal your passwords or card details to anyone</p>
          </div>
        </section>

        <section className="mt-8">
          <h3 className="text-center font-bold text-lg mb-4">FOR YOUR OWN SECURITY</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 p-4 border rounded">
              <h4 className="font-semibold mb-2">Please ensure the following before logging into OnlineSBI</h4>
              <ul className="list-disc ml-5 space-y-1">
                <li>The URL in your browser address bar begins with "https".</li>
                <li>The address or status bar displays the padlock symbol.</li>
                <li>Click the padlock to view and verify the security certificate.</li>
                <li>SSL is compatible for IE 7.0+, Firefox 3.1+, Opera 9.5+, Safari 3.5+, Chrome</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 border rounded">
              <h4 className="font-semibold mb-2">Beware of Phishing attacks</h4>
              <p className="mb-2">Phishing is a fraudulent attempt, usually through email, phone calls, SMS etc seeking your personal and confidential information.</p>
              <p>State Bank or any of its representatives never sends you email/SMS or calls you over phone to get your personal information/password.</p>
              <p className="mt-2">Please report phishing@... if you get any such communication.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="text-center py-4 text-xs text-gray-500 mt-6">
        © {new Date().getFullYear()} SBI Online. All rights reserved.
      </footer>
    </div>
  );
}
