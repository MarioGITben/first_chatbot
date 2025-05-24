import React from "react";
import ProfileImg from "../assets/images/whaha.jpg"
const Chatmsg = ({ chat }) => {
  return (
    !chat.hideInChat && (
    <div className={`message ${chat.role === 'model' ? 'bot' : 'user'}-message flex`}>
      {chat.role === "model" && <div className="chat-icon mr-2">
                                    <img src={ProfileImg} valt="hehe" />
                                </div>}
      <p class="message-text">{chat.text}</p>
    </div>
    )
  );
};

export default Chatmsg;
