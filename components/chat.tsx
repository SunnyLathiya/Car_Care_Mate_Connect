"use client";
import React, { useState } from "react";
import axios from "axios";
import styles from "@/css/chat.module.css";
import { TiMessage as TbMessageChatbot } from "react-icons/ti";
import Draggable from "react-draggable";
import { MdAutoDelete } from "react-icons/md";
import { FiSend } from "react-icons/fi";

const Chatbot = () => {
  const [question, setQuestion] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const generateAnswer = async (e: any) => {
    e.preventDefault();
    setGeneratingAnswer(true);

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBntEDV8kNuxD7UM8geZdKGbrRgcbpKgco",
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
      setQuestion("");

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

  const clearChatHistory = () => {
    setChatHistory([]);
  };

  return (
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
                <div id="chatMessagesContainer" className={styles.chatMessages}>
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
                  <form onSubmit={generateAnswer} style={{ display: "flex" }}>
                    <input
                      type="text"
                      placeholder="Type your question here..."
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      required
                      style={{ flex: "1", marginRight: "8px" }}
                    />
                    <button
                      type="submit"
                      disabled={generatingAnswer}
                      style={{ marginRight: "8px" }}
                    >
                      <FiSend />
                      {generatingAnswer ? "Generating" : "Submit"}
                    </button>
                    <MdAutoDelete
                      onClick={clearChatHistory}
                      style={{
                        fontSize: "24px",
                        color: "red",
                        marginLeft: "7px",
                        marginTop: "10px",
                      }}
                    />
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
