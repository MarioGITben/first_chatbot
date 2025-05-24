import React, { useState } from "react";
import UsernameForm from "../controller/UsernameForm";
import { motion, AnimatePresence} from "framer-motion";
import { fadeAway } from "../animations/fadeaway";
import { Typewriter, useTypewriter } from "react-simple-typewriter";

function Maincontent({ onUserSubmit }) {

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Morning"; 
    if (hour < 18) return "Afternoon";
    return "Evening"; 
  };

  const currentGreeting = getTimeBasedGreeting();
  const [text] = useTypewriter({
    words: [
      `Helloo, Greet ${currentGreeting}!`,
      "I am Mario's digital twin",
      "Welcome :>>",
    ],
    loop: {},
    typeSpeed: 120,
    deleteSpeed: 80,
  });

  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUsernameSubmit = (username) => {
    setIsSubmitting(true);

    setTimeout(() => {
      setUsername(username);
      onUserSubmit(username);
    }, 500);
  };

  console.log(username);

  return (
    <>
      <div className="min-h-screen main flex items-center justify-center">
        <div className="flex flex-col">
          <AnimatePresence mode="wait">
            {!isSubmitting && (
              <motion.div key="username-form" className="flex flex-col">
                <motion.div
                  variants={fadeAway("down", 0.2)}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="text-3xl text-center greet my-3"
                >
                  <span className="font-bold">{text}</span>{" "}
                  <span className="poppins-regular" style={{ color: "red" }}>
                    ...
                  </span>
                </motion.div>
                <motion.div
                  variants={fadeAway("down", 0.2)}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="px-4 py-3 my-3 usernameBox flex"
                >
                  <UsernameForm onUserSubmit={handleUsernameSubmit} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export default Maincontent;
