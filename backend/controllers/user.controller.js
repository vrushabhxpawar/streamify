import User from "../model/User.js";
import FriendRequest from "../model/FriendRequest.js";

// ✅ 1. GET RECOMMENDED USERS
export const getRecommendedUsers = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    if (!currentUser) return res.status(404).json({ message: "User not found" });

    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUser._id } }, // Exclude self
        { _id: { $nin: currentUser.friends } }, // Exclude friends
        { isOnboarded: true }, // Must be onboarded
      ],
    });

    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.error("Error in getRecommendedUsers:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

// ✅ 2. GET MY FRIENDS
export const getMyFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate("friends", "fullname bio nativeLanguage learningLanguage profilePic");

    res.status(200).json(user.friends);
  } catch (error) {
    console.error("Error in getMyFriends:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

// ✅ 3. SEND FRIEND REQUEST
export const sendFriendRequest = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { id: recipientId } = req.params;

    if (senderId === recipientId) {
      return res.status(400).json({ message: "You can't send a request to yourself" });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) return res.status(404).json({ message: "Recipient not found" });

    if (recipient.friends.includes(senderId)) {
      return res.status(400).json({ message: "You are already friends!" });
    }

    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: senderId, recipient: recipientId },
        { sender: recipientId, recipient: senderId },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Friend request already exists!" });
    }

    const friendRequest = await FriendRequest.create({
      sender: senderId,
      recipient: recipientId,
    });

    res.status(200).json(friendRequest);
  } catch (error) {
    console.error("Error in sendFriendRequest:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

// ✅ 4. ACCEPT FRIEND REQUEST
export const acceptFriendRequest = async (req, res) => {
  try {
    const { id: requestId } = req.params;

    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    if (friendRequest.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to accept this request" });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });

    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });

    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    console.error("Error in acceptFriendRequest:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ 5. GET INCOMING & ACCEPTED FRIEND REQUESTS
export const getFriendRequests = async (req, res) => {
  try {
    const incomingRequests = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending",
    }).populate("sender", "fullname profilePic nativeLanguage learningLanguage");

    const acceptedRequests = await FriendRequest.find({
      sender: req.user.id,
      status: "accepted",
    }).populate("recipient", "fullname profilePic");

    res.status(200).json({
      incomingRequests,
      acceptedRequests,
    });
  } catch (error) {
    console.error("Error in getFriendRequests:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

// ✅ 6. GET OUTGOING FRIEND REQUESTS
export const getOutgoingFriendReqs = async (req, res) => {
  try {
    const outgoingRequests = await FriendRequest.find({
      sender: req.user.id,
      status: "pending",
    }).populate("recipient", "fullname profilePic nativeLanguage learningLanguage");

    res.status(200).json(outgoingRequests);
  } catch (error) {
    console.error("Error in getOutgoingFriendReqs:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
};
