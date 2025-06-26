import axios from "axios";
import { axiosInstance } from "./axios.js";

export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const getAuthUser = async () => {
  try {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
  } catch (error) {
      console.log("Error in getAuthUser", error);
      return null;
  }
};

export const completeOnBoarding = async (userData) => {
  const response = await axiosInstance.post("/auth/onboarding", userData);
  return response.data;
};

export const getUserFriends = async() => {
  const response = await axiosInstance.get("/user/friends");
  return response.data;
};

export const getRecommendedUsers = async() => {
  const response = await axiosInstance.get("/user");
  return response.data;
};

export const  getOutgoingFriendReqs = async() => {
  const response = await axiosInstance.get("/user/outgoing-friend-request");
  return response.data;
}

export const sendFriendRequest = async (userId) => {
  try {
    const res = await axiosInstance.post(`/user/friend-request/${userId}`);
    return res.data;
  } catch (err) {
    console.error("Failed to send request", err);
    throw err;
  }
};


export const getFriendRequests = async() => {
  const response = await axiosInstance.get(`/user/friend-requests`);
  return response.data;
}


export const acceptFriendRequests = async(requestId) => {
  const response = await axiosInstance.put(`/user/friend-request/${requestId}/accept`);
  return response.data;
}

export const getStreamToken = async() => {
  const response = await axiosInstance.get(`/chat/token`);
  return response.data;
}