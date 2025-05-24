
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Disclaimer() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  useEffect(() => {
    const disclaimerShown = localStorage.getItem('disclaimerShown');

    if (!disclaimerShown) {
      setShow(true);
      localStorage.setItem('disclaimerShown', 'true');
    }
  }, []);

  return (
    <>
      <Modal show={show} onHide={handleClose} dialogClassName="bg-modal">
            <Modal.Header closeButton>
            <Modal.Title>Disclaimer</Modal.Title>
            </Modal.Header>
            <Modal.Body>This website hosts a digital version of myself created using AI technology. This chatbot is programmed to reflect my personal opinions, favorite expressions, and facts about me. The website design draws inspiration from AI web applications like messenger interfaces. This is an independent project I developed using AI models. All interactions are confidential—any personal information including usernames is securely hashed, meaning I cannot access or view your inputs. Your privacy comes first as you engage in genuine dialogue with my AI-powered digital self.</Modal.Body>
        </Modal>
    </>
  );
}

export default Disclaimer;

// import { useState, useEffect } from 'react';
// import Modal from 'react-bootstrap/Modal';

// function Disclaimer() {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);

//   // Show the modal when the component mounts
//   useEffect(() => {
//     setShow(true);
//   }, []);

//   return (
//     <>
//       <Modal show={show} onHide={handleClose} dialogClassName="bg-modal">
//         <Modal.Header closeButton>
//           <Modal.Title>Disclaimer</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>This website hosts a digital version of myself created using AI technology. This chatbot is programmed to reflect my personal opinions, favorite expressions, and facts about me. The website design draws inspiration from AI web applications like messenger interfaces. This is an independent project I developed using AI models. All interactions are confidential—any personal information including usernames is securely hashed, meaning I cannot access or view your inputs. Your privacy comes first as you engage in genuine dialogue with my AI-powered digital self.</Modal.Body>
//       </Modal>
//     </>
//   );
// }

// export default Disclaimer;