"use client";
import React, { useState } from "react";
import axios from "axios";
import styles from "@/css/chat.module.css";
import { TiMessage as TbMessageChatbot } from "react-icons/ti";
import Draggable from "react-draggable";
import { MdAutoDelete } from "react-icons/md";
import { FiSend } from "react-icons/fi";

const ChatbotAdmin = () => {
  const [question, setQuestion] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const generateAnswer = async (e: any) => {
    e.preventDefault();
    setGeneratingAnswer(true);

    try {
      const chatBotUrl = process.env.NEXT_PUBLIC_CHATBOT_URL || "";

      const response = await axios.post(chatBotUrl, {
        contents: [{ parts: [{ text: question }] }],
      });

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
    } catch (error) {}

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
        <span onClick={toggleChatbot} className={styles.mainbuttoncontainer}>
          <TbMessageChatbot className={styles.mainbutton} />
        </span>
      </div>

      {isChatbotOpen && (
        <Draggable>
          <div className={`${styles.chatbotContainer} ${styles.open}`}>
            <div className={styles.chatbot}>
              <div className={styles.chatbotContent}>
                <div className={styles.chatMessages}>
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
                      className={styles.inputfield}
                    />
                    <button
                      type="submit"
                      disabled={generatingAnswer}
                      className={styles.submitbutton}
                    >
                      <FiSend />
                      {generatingAnswer ? "Generating" : "Submit"}
                    </button>
                    <MdAutoDelete
                      onClick={clearChatHistory}
                      className={styles.deletebutton}
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

export default ChatbotAdmin;
