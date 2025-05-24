import React, { useRef } from "react";

const Chatform = ({chatHistory, setChatHistory, generateBotResponse}) => {
  const inputMsg = useRef()
  const handleMsgSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputMsg.current.value.trim();
    if(!userMessage){
        return;
    }
    inputMsg.current.value ="";
    setChatHistory((history) => [...history, {role: "user", text: userMessage}])
    setTimeout(() => {
        setChatHistory((history) => [...history, {role: "model", text: "Typing..."}])
        generateBotResponse([...chatHistory, {role: "user", text: `${userMessage}`}])
    }, 600);
    
    console.log(userMessage)
  };
  return (
    <form action="#" class="chat-form" onSubmit={handleMsgSubmit}>
      <input ref={inputMsg} type="text" class="poppins-light" placeholder="Message" required />
      <button>
        <i class="fa-solid fa-arrow-right "></i>
      </button>
    </form>
  );
};

export default Chatform;
