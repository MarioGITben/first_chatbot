// import { useState } from "react";
// import MainContent from "./view/mainContent.jsx";
// import Disclaimer from "./view/disclaimer.jsx";
// import Chat from "./view/chat.jsx";

// function App() {
//   const [username, setUsername] = useState("");
//   const [showChat, setShowChat] = useState(false);

//   const handleUsernameSubmit = (submittedUsername) => {
//     setUsername(submittedUsername);
//     setShowChat(true);
//   };

//   return (
//     <>
//       <Disclaimer/>
//       {!showChat && <MainContent onUserSubmit={handleUsernameSubmit} />}
//       {showChat && <Chat username={username} />}
//     </>
//   );
// }

// export default App;


import { useState, useEffect } from "react";
import MainContent from "./view/mainContent.jsx";
import Disclaimer from "./view/disclaimer.jsx";
import Chat from "./view/chat.jsx";

function App() {
  const [username, setUsername] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [hasSubmittedBefore, setHasSubmittedBefore] = useState(false);

  // Check if user has submitted username before on component mount
  useEffect(() => {
    const savedUsername = localStorage.getItem("chatUsername");
    const hasSubmitted = localStorage.getItem("hasSubmittedUsername");
    
    if (savedUsername && hasSubmitted === "true") {
      setUsername(savedUsername);
      setShowChat(true);
      setHasSubmittedBefore(true);
    }
  }, []);

  const handleUsernameSubmit = (submittedUsername) => {
    setUsername(submittedUsername);
    setShowChat(true);
    setHasSubmittedBefore(true);
    
    localStorage.setItem("chatUsername", submittedUsername);
    localStorage.setItem("hasSubmittedUsername", "true");
  };

  return (
    <>
      <Disclaimer/>
      {!hasSubmittedBefore && !showChat && <MainContent onUserSubmit={handleUsernameSubmit} />}
      {showChat && <Chat username={username} />}
    </>
  );
}

export default App;