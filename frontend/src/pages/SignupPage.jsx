import React, { useState } from "react";
import { ShipWheelIcon, EyeClosed, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { signup } from "../lib/api.js";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [signupData, setSignupData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [hidden, setHidden] = useState(true);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: signupMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token); // ✅ Store token
      queryClient.setQueryData(["authUser"], { user: data.user }); // ✅ Update cache
      navigate("/verify");
    },
  });

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div
        className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100
        rounded-xl shadow-lg overflow-hidden"
      >
        {/* signupPage for left side form */}

        <div className="w-full lg:w-1/2 p-6 flex flex-col">
          {/* logo */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <ShipWheelIcon className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Streamify
            </span>
          </div>

          {/* error message */}
          {error && (
            <div className="alert alert-error mb-4">
              <span className="text-sm">{error.response.data.message}</span>
            </div>
          )}
          {/* form */}
          <div className="w-full">
            <form onSubmit={handleSignup}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Create an Account</h2>
                  <p className="text-sm opacity-70">
                    Join Streamify and start your language learing adventure!
                  </p>
                </div>

                <div className="space-y-3">
                  {/* username input */}
                  <div className="form-control w-full">
                    <label htmlFor="" className="label">
                      <span className="label-text">Full Name</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      placeholder="John Doe"
                      value={signupData.fullname}
                      onChange={(e) => {
                        setSignupData({
                          ...signupData,
                          fullname: e.target.value,
                        });
                      }}
                      required
                    />
                  </div>
                  {/* email input */}
                  <div className="form-control w-full">
                    <label htmlFor="" className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      className="input input-bordered w-full"
                      placeholder="john@gmail.com"
                      value={signupData.email}
                      onChange={(e) => {
                        setSignupData({
                          ...signupData,
                          email: e.target.value,
                        });
                      }}
                      required
                    />
                  </div>
                  {/* password input */}
                  <div className="form-control w-full relative">
                    <label htmlFor="" className="label">
                      <span className="label-text">Password</span>
                    </label>
                    {hidden ? (
                      <EyeClosed
                        size={18}
                        className="absolute top-12 right-5 hover:cursor-pointer mt-1"
                        onClick={() => setHidden(!hidden)}
                      />
                    ) : (
                      <Eye
                        size={18}
                        className="absolute top-12 right-5 hover:cursor-pointer mt-1"
                        onClick={() => setHidden(!hidden)}
                      />
                    )}

                    <input
                      type={hidden ? "password" : "text"}
                      className="input input-bordered w-full"
                      placeholder="*********"
                      value={signupData.password}
                      onChange={(e) => {
                        setSignupData({
                          ...signupData,
                          password: e.target.value,
                        });
                      }}
                      required
                    />
                    <p className="text-xs opacity-70 mt-1">
                      Password must be at least 6 characters long
                    </p>
                  </div>
                  {/* terms and conditions */}
                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        required
                      />
                      <span className="text-xs leading-tight">
                        I agree to the{" "}
                        <span className="text-primary hover:underline">
                          terms of service
                        </span>{" "}
                        and{" "}
                        <span className="text-primary hover:underline">
                          Privacy Policy
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
                <button
                  className="btn btn-primary w-full text-sm"
                  type="submit"
                >
                  {isPending ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
                <div className="text-center mt-4">
                  <p className="text-sm">
                    Already have an account?{" "}
                    <span className="text-primary hover:underline">
                      <Link
                        to="/login"
                        className="text-primary hover:underline"
                      >
                        Sign in
                      </Link>
                    </span>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* right side image */}
        <div className="hidden lg:flex lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="/Videocall.svg" className="h-full w-full" />
            </div>

            <div className="text-center mt-6 space-y-3">
              <h2 className="text-xl font-semibold">
                Connect With language partners around the world
              </h2>
              <p className=" text-sm opacity-70">
                Practise speaking with native speakers, make new friends, and
                learn together in real-time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
