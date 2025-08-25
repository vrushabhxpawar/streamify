import { useState } from "react";
import useAuthuser from "../../hooks/useAuthuser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast, { LoaderIcon } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
  CameraIcon,
  MapPinIcon,
  ShipWheelIcon,
  ShuffleIcon,
} from "lucide-react";
import { completeOnBoarding } from "../lib/api.js";
import { LANGUAGES } from "../../constants/index.js";

const UpdatePage = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthuser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullname: authUser?.fullname || "",
    bio: authUser?.bio || "",
    profilePic: authUser?.profilePic || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnBoarding,
    onSuccess: () => {
      toast.success("User updated successfully!"),
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Updation failed!");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
    navigate("/")
  };

  const handleRandomAvatar = async () => {
    const idx = Math.floor(Math.random() * 100) +1;
    const randomAvatar = (`https://api.dicebear.com/8.x/avataaars/svg?seed=${idx}`);
    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random avatar generated successfully!");
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card max-w-3xl shadow-lg bg-base-200 w-full">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl  sm:text-3xl font-bold text-center mb-6">
            Update Your profile
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* profilePic */}
            <div className="size-32 rounded-full bg-base-300 overflow-hidden flex items-center justify-center mx-auto mb-6">
              {formState.profilePic ? (
                <img
                  src={formState.profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex item-center justify-center h-full">
                  <CameraIcon className="size-12 text-base-content opacity-40" />
                </div>
              )}
            </div>

            {/* generate random avatar */}
            <div className="flex items-center justify-center gap-2">
              <button
                className="btn btn-accent"
                type="button"
                onClick={handleRandomAvatar}
              >
                <ShuffleIcon className="size-4 mr-2" />
                Generate Random Avatar
              </button>
            </div>

            {/* Full Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formState.fullname}
                placeholder="Your full name"
                className="input input-bordered w-full"
                onChange={(e) =>
                  setFormState({ ...formState, fullname: e.target.value })
                }
              />
            </div>

            {/* Bio */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                name="bio"
                placeholder="Tell us about yourself"
                className="textarea textarea-bordered w-full"
                value={formState.bio}
                onChange={(e) =>
                  setFormState({ ...formState, bio: e.target.value })
                }></textarea>
            </div>

            {/*  Languages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Native Language */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Native Language</span>
                </label>
                <select
                  name="nativeLanguage"
                  className="select select-bordered w-full"
                  value={formState.nativeLanguage}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      nativeLanguage: e.target.value,
                    })
                  }
                >
                  <option value="">Select your native language</option>
                  {LANGUAGES.map((language) => (
                    <option
                      key={`native-${language}`}
                      value={language.toLowerCase()}
                    >
                      {language}
                    </option>
                  ))}
                </select>
              </div>
              {/* Learning Language */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Learning Language</span>
                </label>
                <select
                  name="learningLanguage"
                  className="select select-bordered w-full"
                  value={formState.learningLanguage}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      learningLanguage: e.target.value,
                    })
                  }
                >
                  <option value="">Select your learning language</option>
                  {LANGUAGES.map((language) => (
                    <option
                      key={`native-${language}`}
                      value={language.toLowerCase()}
                    >
                      {language}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute left-3 top-9 transform -translate-y-1/2 text-base-content opacity-70 size-5" />
                <input
                  type="text"
                  name="location"
                  placeholder="City, Country"
                  className="input input-bordered w-full pl-10"
                  value={formState.location}
                  onChange={(e) =>
                    setFormState({ ...formState, location: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full "
              disabled={isPending}
            >
              {!isPending ? (
                <>
                  <ShipWheelIcon className="size-5 mr-2" />
                  Update Profile
                </>
              ) : (
                <LoaderIcon className="size-5 mr-2 animate-spin" />
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePage;
