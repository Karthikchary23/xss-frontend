"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useSearchParams, useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";

const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [accountnumber, setAccountnumber] = useState("");
  const [balance, setBalance] = useState("");
  const [message, setMessage] = useState("");
  const [rawMessage, setRawMessage] = useState("");

  const [showDetails, setShowDetails] = useState(false);
  const [recipientAccount, setRecipientAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [transferMsg, setTransferMsg] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  // Script injection testing (XSS)
  useEffect(() => {
    const msg = searchParams.get("message");
    if (msg) {
      setRawMessage(msg);
      try {
        if (msg.includes("<script>") && typeof window !== "undefined") {
          const code = msg.replace("<script>", "").replace("</script>", "");
          const script = document.createElement("script");
          script.innerHTML = code;
  
          // Ensure document.body exists before appending
          if (document.body) {
            setTimeout(() => {
              document.body.appendChild(script);
            }, 0); // Delay to ensure DOM is ready
          } else {
            console.warn("document.body is not available.");
          }
        }
      } catch (e) {
        console.error("Failed to execute script:", e);
      }
    }
  }, [searchParams]);
  

  // Verify token and get user details
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
      return;
    }

    axios
      .post("http://localhost:5000/verifytoken", { token })
      .then((response) => {
        const user = response.data.user;
        setName(user.firstName);
        setEmail(user.email);
        setId(user.id);
        setAccountnumber(user.accountnumber);

        const urlMessage = searchParams.get("message");
        if (urlMessage) {
          setMessage(urlMessage);
        }
      })
      .catch((err) => {
        console.log(err);
        router.push("/login");
      });
  }, [searchParams, router]);

  // Fetch balance
  useEffect(() => {
    if (id) {
      axios
        .get("http://localhost:5000/balance", { params: { id } })
        .then((response) => {
          if (response.status === 200) {
            setBalance(response.data.balance);
          } else {
            console.error("Failed to fetch balance:", response.statusText);
          }
        })
        .catch((error) => {
          console.error("Error fetching balance:", error);
        });
    }
  }, [id]);

  // Transfer money
  const handleTransfer = () => {
    const amt = parseFloat(amount);
    if (!recipientAccount || isNaN(amt) || amt <= 0) {
      setTransferMsg("Please enter valid details.");
      return;
    }
    if (balance < 1000 || amt > balance - 1000) {
      setTransferMsg("Minimum Rs. 1000 should remain in your account.");
      return;
    }

    axios
      .post("http://localhost:5000/transfer", {
        senderId: id,
        receiverAccountNumber: recipientAccount,
        amount: amt,
      })
      .then((res) => {
        if (res.status === 200) {
          setTransferMsg("✅ Transaction successful!");
          setBalance((prev) => prev - amt);
          setAmount("");
          setRecipientAccount("");
        } else {
          setTransferMsg("❌ " + res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        setTransferMsg("Transaction failed.");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded shadow">
        <h1 className="text-xl font-bold text-blue-700">Welcome, {name}</h1>
        <div className="relative">
          <button
            className="text-3xl text-blue-600 hover:text-blue-800"
            onClick={() => setShowDetails(!showDetails)}
          >
            <FaUserCircle />
          </button>
          {showDetails && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded p-4 z-10 border">
              <p><strong>Email:</strong> {email}</p>
              <p><strong>ID:</strong> {id}</p>
              <p><strong>Account No:</strong> {accountnumber}</p>
              <p><strong>Balance:</strong> ₹{balance}</p>
              <button
                className="mt-3 bg-red-500 text-white px-4 py-2 rounded w-full"
                onClick={() => {
                  Cookies.remove("token");
                  router.push("/login");
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* XSS Message Test */}
      {message && (
        <div className="mt-4 p-2 bg-yellow-100 border rounded">
          <div dangerouslySetInnerHTML={{ __html: message }} />
          <p className="text-xs text-gray-600">Raw message: {rawMessage}</p>
        </div>
      )}

      {/* Transaction Section */}
      <div className="mt-8 bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Transfer Money</h2>
        <input
          type="text"
          placeholder="Recipient Account Number"
          className="w-full mb-3 p-2 border rounded"
          value={recipientAccount}
          onChange={(e) => setRecipientAccount(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          className="w-full mb-3 p-2 border rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full"
          onClick={handleTransfer}
        >
          Send Money
        </button>
        {transferMsg && (
          <p className="mt-3 text-sm text-center text-red-600">{transferMsg}</p>
        )}
      </div>
    </div>
  );
};

export default Page;
