import React, { useRef, useState } from "react";
import Button from "../view/Button.jsx";
 
const UsernameForm = ({onUserSubmit}) => {
  const inputUsername = useRef();
  const [className, setClassName] = useState("")
  const [inputValue, setInputValue] = useState("")
  const [showButton, setShowbutton] = useState(false)
  const handleInputChange = (e) => {
    const value = e.target.value
    setInputValue(value)
    if(value.length > 0){
      setClassName('')
      setShowbutton(true)
    }else {
      setShowbutton(false)
    }
  }
  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    
    const username = inputUsername.current.value.trim();
    if (!username) {
      setClassName("error-message")
      setShowbutton(false)
      return;
    }
    onUserSubmit(username)
    inputUsername.current.value = "";
    setShowbutton(false)
    console.log(username);
  };
  return (
    <form
      action="#"
      class={`flex ${className}
                     w-140`}
       onSubmit={handleUsernameSubmit}
    >
      <input
        ref={inputUsername}
        value={inputValue}
        type="text"
        class={` username poppins-light`}
        placeholder="Enter Username here" 
        onChange={handleInputChange}
      />
      {showButton && <Button />}
    </form>
  );
};

export default UsernameForm;
