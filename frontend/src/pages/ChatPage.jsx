import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api.js";
import useAuthUser  from "../../hooks/useAuthuser.js";
import { toast } from "react-hot-toast";
import { 
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import ChatLoader from "../components/ChatLoader.jsx";
import CallButton from "../components/CallButton.jsx";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {

  const { id : targetUserId } = useParams();

  const [ chatClient, setChatClient] = useState(null);
  const [ channel , setChannel ] = useState(null);
  const [ loading , setLoading ] = useState(true);
  
  const { authUser } = useAuthUser();

  const { data : tokenData } = useQuery({
    queryKey : "getStreamToken",
    queryFn : getStreamToken,
    enabled : !!authUser,
  })


  useEffect(() => {
    const initChat = async() => {
      if(!tokenData?.token || !authUser ) return;

      try {

        console.log("Intializing stream chat client...");

        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser({
          id : authUser._id,
          name : authUser.fullname,
          image : authUser.profilePic,
        }, tokenData.token)

        const channelId = [authUser._id, targetUserId].sort().join("-");

        const currChannel = client.channel("messaging", channelId, {
          members : [authUser._id, targetUserId]
        })

        await currChannel.watch();
        setChatClient(client);
        setChannel(currChannel);

      } catch (error) {
        
        console.log("Error initializing chat : " , error);
        toast.error("Could not connect to chat. Please try again")

      } finally {

        setLoading(false);

      }
    }

    initChat()
  },[tokenData, authUser, targetUserId]);

  const handleVideoCall = async () => {

    if(channel){
      const url = `${window.location.origin}/call/${channel.id}`

      channel.sendMessage({
        text : `I've started a video call. Join me here : ${url}`
      })
    }
  }

    if( loading || !chatClient || !channel) return <ChatLoader />
  return (
    <div className="h-[93vh]">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <CallButton handleVideoCall={handleVideoCall}/>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput  focus/>
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  )
}

export default ChatPage;