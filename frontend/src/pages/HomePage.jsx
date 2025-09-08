import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getUserFriends,
  getRecommendedUsers,
  getOutgoingFriendReqs,
  sendFriendRequest,
} from "../lib/api.js";
import { Link } from "react-router-dom"; // ✅ FIXED: Corrected from "react-router"
import {
  CheckCircleIcon,
  MapPinIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";
import FriendCard from "../components/FriendCard.jsx";
import NoFriendFound from "../components/NoFriendFound.jsx";
import { getLanguageFlag } from "../components/FriendCard.jsx";
import Sidebar from "../components/Sidebar.jsx";
const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs = [] } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient?._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
      <div className="p-4 sm:p-6 lg:p-8 bg-base-300 h-fit">
        <div className="container mx-auto space-y-10">
          {/* FRIEND LIST */}

          {/* RECOMMENDED USERS */}
          <div>
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    Meet new learner
                  </h2>
                  <p className="opacity-70 text-base">
                    Discover perfect language exchange partner based on your
                    profile.
                  </p>
                </div>
              </div>
            </div>

            {loadingUsers ? (
              <div className="flex justify-center py-12">
                <span className="loading loading-spinner loading-lg" />
              </div>
            ) : recommendedUsers.length === 0 ? (
              <div className="card bg-base-200 p-6 text-center">
                <h3 className="font-semibold text-lg mb-2">
                  No recommendation available
                </h3>
                <p className="text-base-content opacity-70 text-base">
                  Check back later for new language partner
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {recommendedUsers.map((user) => {
                  const hasRequestBeenSent = outgoingRequestsIds.has(user._id);
                  return (
                    <div
                      key={user._id}
                      className="card bg-base-200 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="card-body p-5 space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="avatar size-9 rounded-full">
                            <img src={user.profilePic} alt={user.fullname} />
                          </div>
                          <span className="font-semibold font-mono text-sm">
                            {user.fullname}
                          </span>
                        </div>
                        {user.location && (
                          <div className="flex items-center text-sm opacity-70 mt-1">
                            <MapPinIcon className="mr-1 size-3" />
                            {user.location}
                          </div>
                        )}

                        <div className="flex flex-wrap gap-1.5">
                          <span className="badge badge-secondary">
                            {getLanguageFlag(user.nativeLanguage)} Native:{" "}
                            {capitalize(user.nativeLanguage)}
                          </span>
                          <span className="badge badge-outline">
                            {getLanguageFlag(user.learningLanguage)} Learning:{" "}
                            {capitalize(user.learningLanguage)}
                          </span>
                        </div>

                        {user.bio && (
                          <p className="text-sm opacity-70">{user.bio}</p>
                        )}

                        <button
                          className={`btn w-full mt-2 ${
                            hasRequestBeenSent ? "btn-disabled" : "btn-primary"
                          }`}
                          onClick={() => {
                            sendRequestMutation(user._id);
                          }}
                          disabled={hasRequestBeenSent}
                        >
                          {hasRequestBeenSent ? (
                            <>
                              <CheckCircleIcon className="size-4 mr-2" />
                              Request Sent
                            </>
                          ) : (
                            <>
                              <UserPlusIcon className="size-4 mr-2" />
                              Send Friend Request
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>  
  );
};

export default HomePage;

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
