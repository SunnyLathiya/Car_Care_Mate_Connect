
"use client";
import React, { useState } from "react";
import axios from "axios";
import styles from "@/css/chat.module.css";
import { TiMessage as TbMessageChatbot } from "react-icons/ti";
import Draggable from "react-draggable";

const Chatbot = () => {
  const [question, setQuestion] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);

  const generateAnswer = async (e: any) => {
    e.preventDefault();
    setGeneratingAnswer(true);

    try {
      const response = await axios.post(
        
        {
          contents: [{ parts: [{ text: question }] }],
        }
      );

      const answer = response.data.candidates[0].content.parts[0].text;
      const updatedChatHistory: any = [
        ...chatHistory,
        { type: "user", content: question },
        { type: "bot", content: answer },
      ];
      setChatHistory(updatedChatHistory);
      setQuestion(""); // Reset question after submitting

      // Scroll to the bottom of the chat messages
      const chatMessagesContainer = document.getElementById(
        "chatMessagesContainer"
      );
      if (chatMessagesContainer) {
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
      }
    } catch (error) {
      console.error(error);
    }

    setGeneratingAnswer(false);
  };

  const toggleChatbot = () => {
    setIsChatbotOpen((prevOpen) => !prevOpen);
  };

  return (
    // <div
    //   style={{
    //     marginTop: "50px",
    //     marginLeft: "250px",
    //     height: "400px",
    //     width: "280px",
    //     position: "relative",
    //   }}
    // >
    //   <div style={{ position: "fixed", top: "85%", right: "160px" }}>
    //     <span
    //       style={{
    //         display: "inline-block",
    //         backgroundColor: "#007bff",
    //         padding: "8px",
    //         borderRadius: "50%",
    //       }}
    //       onClick={toggleChatbot}
    //     >
    //       <TbMessageChatbot
    //         style={{ fontSize: "24px", color: "red", cursor: "pointer" }}
    //       />
    //     </span>
    //   </div>

    //   {isChatbotOpen && (
    //     <div
    //       className={`${styles.chatbotContainer} ${
    //         isChatbotOpen ? styles.open : ""
    //       }`}
    //     >
    //       <div className={styles.chatbot}>
    //         <div className={styles.chatbotContent}>
    //           <div
    //             id="chatMessagesContainer"
    //             className={styles.chatMessages}
    //             style={{ maxHeight: "300px", overflowY: "auto" }}
    //           >
    //             {chatHistory.map((message, index) => (
    //               <div
    //                 key={index}
    //                 className={`${styles.message} ${styles[message.type]}`}
    //               >
    //                 <p>{message.content}</p>
    //               </div>
    //             ))}
    //           </div>

    //           <div className={styles.userInput}>
    //             <form onSubmit={generateAnswer}>
    //               <input
    //                 type="text"
    //                 placeholder="Type your question here..."
    //                 value={question}
    //                 onChange={(e) => setQuestion(e.target.value)}
    //                 required
    //               />
    //               <button type="submit" disabled={generatingAnswer}>
    //                 {generatingAnswer ? "Generating..." : "Submit"}
    //               </button>
    //             </form>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </div>


    <div className={styles.container}>
      <div className={styles.chatbotButton}>
        <span
          onClick={toggleChatbot}
          style={{
            display: "inline-block",
            backgroundColor: "#007bff",
            padding: "8px",
            borderRadius: "50%",
            cursor: "pointer",
            position: "fixed",
            bottom: "40px", 
            right: "40px", 
            zIndex: 1000,
          }}
        >
          <TbMessageChatbot style={{ fontSize: "24px", color: "red" }} />
        </span>
      </div>

      {isChatbotOpen && (
        <Draggable>
          <div
            className={`${styles.chatbotContainer} ${styles.open}`}
            style={{
              maxHeight: "500px", 
              width: "380px", 
              overflowY: "auto",
            }}
          >
            <div className={styles.chatbot}>
              <div className={styles.chatbotContent}>
                <div
                  id="chatMessagesContainer"
                  className={styles.chatMessages}
                >
                  {chatHistory.map((message: any, index) => (
                    <div
                      key={index}
                      className={`${styles.message} ${styles[message.type]}`}
                    >
                      <p>{message.content}</p>
                    </div>
                  ))}
                </div>

                <div className={styles.userInput}>
                  <form onSubmit={generateAnswer}>
                    <input
                      type="text"
                      placeholder="Type your question here..."
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      required
                    />
                    <button type="submit" disabled={generatingAnswer}>
                      {generatingAnswer ? "Generating..." : "Submit"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Draggable>
      )}
    </div>
    
  );
};

export default Chatbot;
