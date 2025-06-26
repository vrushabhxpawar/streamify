import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {  ShipWheelIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { login } from "../lib/api.js";

const LoginPage = () => {
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: () => {queryClient.invalidateQueries({ queryKey: ["authUser"]});
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(loginData)
  }
  return(
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8" data-theme="forest">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
      {/* Login Form */}
      <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col ">
      { /* Logo Section */}
      <div className="mb-4 flex items-center justify-start gap-2 ">
        <ShipWheelIcon className="size-9 text-primary" />
        <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
          Streamify
        </span>
      </div>
      {/* Error Message */}
     {error && (
            <div className="alert alert-error mb-4">
              <span className="text-sm">{error.response.data.message}</span>
              {console.log(error)}
            </div>
          )}

      <div className="w-full ">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold">Welcome Back</h2>
              <p className="text-sm opacity-70">
                Sign in to continue to Streamify
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">

            {/* Email Input */}
            <div className="form-control w-full space-y-2">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email"
                      name="email"
                      value={loginData.email}
                      placeholder="john@gmail.com"
                      onChange={(e) => setLoginData({...loginData, email : e.target.value})}
                      className="input input-bordered w-full"
                      required />
            </div>
            {/* Password Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password"
                      name="password"
                      value={loginData.password}
                      placeholder="********"
                      onChange={(e) => setLoginData({...loginData, password : e.target.value})}
                      className="input input-bordered w-full"
                      required />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-full" disabled={isPending}> 
            {
              isPending ? (
                <>
                <span className="loading loading-spinner animate-spin loading-xs"></span>
                </>
              ) : (
                "Sign In"
              )
            }
            </button>
            {/* Redirect to Sign Up  */}
            <div className="text-center mt-4">
              <p className="text-sm">
                Don't have an account?{" "}
                <Link className="text-primary hover:underline" to="/signup">
                  Create One
                </Link>
              </p>
            </div>
          </div>
        </form>

      </div>
      </div>

      {/* Image Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="/Videocall.svg" className="h-full w-full"/>
            </div>

            <div className="text-center mt-6 space-y-3">
              <h2 className="text-xl font-semibold">
                Connect With language partners around the world
              </h2>
              <p className=" text-sm opacity-70">
                Practise speaking with native speakers, make new friends, and learn together in real-time.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
