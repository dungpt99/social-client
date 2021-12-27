import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import "./messenger.css";
import { io } from "socket.io-client";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUser, setOnlineUser] = useState(null);
  const [socket, setSocket] = useState(
    io("ws://socialsocketio122021.herokuapp.com")
  );

  const { user } = useContext(AuthContext);
  const scrollRef = useRef();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    socket.on("getMessage", (data) => {
      setArrivalMessage({
        user: { id: data.senderId },
        content: data.content,
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.emit("addUser", user.id);
    socket.on("getUser", (users) => {
      setOnlineUser(users);
    });
  }, []);

  useEffect(() => {
    const getConversation = async () => {
      const res = await axios.get(`${PF}/conversation`);
      setConversations(res.data);
      console.log(res.data);
    };
    getConversation();
  }, []);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const res = await axios.get(`${PF}/messages/` + currentChat.id);
        setMessages(res.data);
      } catch (error) {}
    };
    getMessage();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const getUser = await axios.get(
        `${PF}/conversation/user/` + currentChat.id
      );
      const friend = getUser.data[0].users.find((m) => m.id !== user.id);

      socket.emit("sendMessage", {
        senderId: user.id,
        receiverId: friend.id,
        content: newMessage,
      });

      const newContent = {
        content: newMessage,
        receiverId: friend.id,
      };

      const res = await axios.post(`${PF}/messages`, newContent);

      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {}
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="messenger__left">
          <div className="messengerMenuWrapper">
            <input
              type="text"
              placeholder="Search for friend"
              className="chatMenuInput"
            />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)} key={c.id}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="messenger__box">
          <div className="messengerBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages !== null ? (
                    messages.map((m) => (
                      <div ref={scrollRef} key={m.id}>
                        <Message message={m} own={m.user.id === user.id} />
                      </div>
                    ))
                  ) : (
                    <Message />
                  )}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversation">
                Open conversation to start a chat
              </span>
            )}
          </div>
        </div>
        <div className="messenger__right">
          <div className="messengerOnlineWrapper">
            Online
            {onlineUser?.map((o) =>
              o.userId !== user.id ? (
                <ChatOnline
                  key={o.userId}
                  userId={o.userId}
                  setCurrentChat={setCurrentChat}
                />
              ) : null
            )}
          </div>
        </div>
      </div>
    </>
  );
}
