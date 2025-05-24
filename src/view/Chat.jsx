import React, { useEffect, useRef, useState } from "react";
import ProfileImg from "../assets/images/newProf.jpg";
import Chatform from "../controller/chatform";
import Chatmsg from "../controller/Chatmsg";
import { aboutMe } from "../controller/Aboutme.js";
import { motion, AnimatePresence } from "framer-motion";
import { fadeAway } from "../animations/fadeaway.js";
function Chat({ username }) {
  const fbLink = "https://www.facebook.com/mariooo.23";
  const instaLink = "https://www.instagram.com/bellen.mariorer/";
  const discordLink = "https://discord.com/users/okay_lang_ako";

  const [chatHistory, setChatHistory] = useState([
    {
      hideInChat: true,
      role: "model",
      text: aboutMe,
    },
    {
      role: "model",
      text: `Hi, ${username}!`,
    },
  ]);
  const chatBodyAutoScroll = useRef();
  const generateBotResponse = async (history) => {

    const context = [
      {
        role: "model",
        parts: [{ text: `I'll remember that your username is ${username}. How can I assist you?` }],
      },
      ...history.map(({ role, text }) => ({ role, parts: [{ text }] })),
    ];

    const updateHistory = (text) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Typing..."),
        { role: "model", text: text },
      ]);
    };
 
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: context }),
    };
    console.log("Sending to:", import.meta.env.VITE_API_URL);
    console.log(history);
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL,
        requestOptions
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error.message || "Something went wrong!");
      console.log(data);
      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();
      updateHistory(apiResponseText);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    chatBodyAutoScroll.current.scrollTo({
      top: chatBodyAutoScroll.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);
  return (
    <>
      <div class="flex items-center chat justify-center">
        <div class="min-vh-100 flex w-100 justify-between">
          <motion.div
            variants={fadeAway("right", 0.5)}
            initial="hidden"
            animate="show"
            class="left-box flex "
          >
            <div className="box-content flex m-auto ">
              <div className="button-box mb-5 flex flex-col justify-end items-center">
                <button onClick={() => (window.location.href = instaLink)}>
                  Instagram
                </button>
                <button onClick={() => (window.location.href = discordLink)}>
                  Discord
                </button>
              </div>
            </div>
          </motion.div>
          <div class="right-box flex">
            <div className="chatbox pt-12 flex flex-col m-auto">
              {/* CHAT BODY */}
              <motion.div
                variants={fadeAway("down", 0.5)}
                initial="hidden"
                animate="show"
                ref={chatBodyAutoScroll}
                className="chat-body"
              >
                <div className="profile-section mb-5 flex flex-col ">
                  <div className="profile-icon m-auto">
                    <img src={ProfileImg} valt="hehe" />
                  </div>
                  <div className="profile-info mt-3 m-auto poppins-regular">
                    <h3>Mark Benson Bellen</h3>
                    <p>Lives in Imus, Cavite</p>
                    <button
                      onClick={() => (window.location.href = fbLink)}
                      class="poppins-medium"
                    >
                      View profile
                    </button>
                  </div>
                </div>
                <div className="message items-center flex bot-message">
                </div>
                {chatHistory.map((chat, index) => (
                  <Chatmsg key={index} chat={chat} />
                ))}
              </motion.div>

              {/* CHAT FOOTER */}
              <motion.div
                variants={fadeAway("up", 0.5)}
                initial="hidden"
                animate="show"
                className="chat-footer"
              >
                <Chatform
                  chatHistory={chatHistory}
                  setChatHistory={setChatHistory}
                  generateBotResponse={generateBotResponse}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
