"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("api/users/login", user);
      console.log("Login Sucess", response.data);
      toast.success("Login Success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login Error", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1> Login</h1>
      <hr />
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
        className="p-2 bg-blue-700 text-white rounded-sm mt-4 px-9"
        onClick={onLogin}
      >
        Login
      </button>
      <span aria-hidden="true">New User? Go to </span>
      <Link href="/signup" aria-label="New User go to Signup Page">
        Signup Page
      </Link>
    </div>
  );
}
