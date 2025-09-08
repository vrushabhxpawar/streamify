import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { verifyEmail, resendOtp } from "../lib/api"; // ✅ you'll create these API functions
import { ShipWheelIcon } from "lucide-react";

const VerifyEmailPage = () => {
  const [otp, setOtp] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: verifyMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: verifyEmail,
    onSuccess: (data) => {
      queryClient.setQueryData(["authUser"], { user: data.user });
      navigate("/onboarding"); // ✅ verified → onboarding
    },
  });

  const {
    mutate: resendOtpMutation,
    isPending: isResending,
  } = useMutation({
    mutationFn: resendOtp,
    onSuccess: () => {
      alert("A new OTP has been sent to your email.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyMutation({ verificationCode: otp });
  };

  return (
    <div className="h-screen flex items-center justify-center p-4" data-theme="forest">
      <div className="border border-primary/25 w-full max-w-md bg-base-100 rounded-xl shadow-lg p-6">
        {/* logo */}
        <div className="mb-6 flex items-center justify-center gap-2">
          <ShipWheelIcon className="size-9 text-primary" />
          <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
            Streamify
          </span>
        </div>

        <h2 className="text-xl font-semibold mb-2 text-center">Verify Your Email</h2>
        <p className="text-sm opacity-70 text-center mb-4">
          Enter the 6-digit code we sent to your email.
        </p>

        {error && (
          <div className="alert alert-error mb-4">
            <span className="text-sm">{error.response?.data?.message || "Invalid OTP"}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            maxLength="6"
            className="input input-bordered w-full text-center text-lg tracking-widest"
            placeholder="••••••"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isPending}
          >
            {isPending ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Verify Email"
            )}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            className="btn btn-link text-sm"
            onClick={() => resendOtpMutation()}
            disabled={isResending}
          >
            {isResending ? "Resending..." : "Resend OTP"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
