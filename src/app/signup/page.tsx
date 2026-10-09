"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisbaled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup Success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed:", error);
      console.log("Server error:", error.response?.data);

      toast.error(error.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {loading ? (
        <p role="alert">Loading</p>
      ) : (
        <>
          <h1> Signup</h1>
          <hr />
          <div className="mt-4 flex flex-col">
            <label htmlFor="UserName">Username</label>
            <input
              id="UserName"
              placeholder="Username"
              className="border rounded-sm p-0.5"
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>
          <div className="mt-4 flex flex-col">
            <label htmlFor="Email">Email</label>
            <input
              id="Email"
              placeholder="Email"
              className="border rounded-sm p-0.5"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="mt-4 flex flex-col">
            <label htmlFor="Password">Password</label>
            <input
              id="Password"
              placeholder="Password"
              className="border rounded-sm p-0.5"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <button
            className="p-2 bg-blue-700 text-white rounded-sm mt-4 px-9 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onSignup}
            disabled={buttonDisbaled}
          >
            Signup
          </button>
          <Link href="/login">Login Page</Link>
        </>
      )}
    </div>
  );
}
