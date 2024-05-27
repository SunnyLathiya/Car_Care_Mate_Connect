"use client";
import { useState } from 'react';
import { TbMessageChatbot } from 'react-icons/tb';
import { MdRefresh } from 'react-icons/md';
import Draggable from 'react-draggable';
import styles from "@/css/chat.module.css";

type QuestionKey = 
  "How many user's use this website?" |
  "which type Services?" |
  "what services you provide? " |
  "Oil Change" |
  "Tire Rotation" |
  "Brake Inspection" |
  "Every 3 months" |
  "Every 6 months" |
  "Annually" |
  "Every 5,000 miles" |
  "Every 10,000 miles" |
  "Every 15,000 miles" |
  "Within 6 months" |
  "Within a year" |
  "More than a year ago" |
  "Home" |
  "Service DoorStep" |
  "Free Pickup & Drop services";

type Response = {
  answer: string;
  options?: string[];
};

type Responses = {
  [key in QuestionKey]: Response;
};

type Message = {
  text: string;
  sender: 'user' | 'bot';
};

const initialQuestions = [
  {
    text: "What's your questions?",
    options: ["How many user's use this website?", "which type Services?", "what services you provide? "]
  },
];

const responses: Responses = {
    "How many user's use this website?": {
    answer: "Currently 7000 user's and 700 mechanics are use our website",
  },
  "which type Services?": {
    answer: "We provide almost all car related services. Some popular services are...",
    options: ["Oil Change", "Tire Rotation", "Brake Inspection"]
  },
  "what services you provide? ": {
    answer: "We provide services based on type: Home, Service DoorStep, Free Pickup & Drop services",
    options: ["Home", "Service DoorStep", "Free Pickup & Drop services"]
  },
  "Oil Change": {
    answer: "An oil change is a routine maintenance task. How frequently do you need it?",
    options: ["Every 3 months", "Every 6 months", "Annually"],
  },
  "Tire Rotation": {
    answer: "Tire rotation helps to extend the life of your tires. How often do you rotate your tires?",
    options: ["Every 5,000 miles", "Every 10,000 miles", "Every 15,000 miles"],
  },
  "Brake Inspection": {
    answer: "Brake inspections are crucial for safety. When was your last brake inspection?",
    options: ["Within 6 months", "Within a year", "More than a year ago"],
  },
  "Every 3 months": {
    answer: "It's great that you are keeping up with your oil changes. Thank you for using our service!",
  },
  "Every 6 months": {
    answer: "Regular oil changes help in maintaining engine health. Thank you for using our service!",
  },
  "Annually": {
    answer: "Consider more frequent oil changes for optimal performance. Thank you for using our service!",
  },
  "Every 5,000 miles": {
    answer: "Regular tire rotations ensure even wear. Thank you for using our service!",
  },
  "Every 10,000 miles": {
    answer: "Keeping track of tire rotations is important. Thank you for using our service!",
  },
  "Every 15,000 miles": {
    answer: "Consider rotating your tires more frequently. Thank you for using our service!",
  },
  "Within 6 months": {
    answer: "Regular brake inspections are important for safety. Thank you for using our service!",
  },
  "Within a year": {
    answer: "Brake inspections ensure your safety on the road. Thank you for using our service!",
  },
  "More than a year ago": {
    answer: "Consider scheduling a brake inspection soon. Thank you for using our service!",
  },
  "Home": {
    answer: "In this type of service, the mechanic comes to your location and completes the service there.",
  },
  "Service DoorStep": {
    answer: "In this type of service, the customer needs to go to the mechanic's garage as the service cannot be completed outside the garage.",
  },
  "Free Pickup & Drop services": {
    answer: "In this type of service, the mechanic picks up your car from your home and drops it off after completing the service.",
  },
};

const ChatbotCustomer = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [options, setOptions] = useState<string[]>(initialQuestions[0].options);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const handleOptionSelect = (option: string) => {
    const newMessages = [...messages, { text: option, sender: 'user' as const }];
    const response = responses[option as QuestionKey];

    if (response) {
      newMessages.push({ text: response.answer, sender: 'bot' as const });
      setOptions(response.options || []);
    }

    setMessages(newMessages);

    if (!response || !response.options) {
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Thank you!", sender: 'bot' as const },
        ]);
        setOptions([]);
      }, 1000);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setOptions(initialQuestions[0].options);
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
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`${styles.message} ${styles[message.sender]}`}
                    >
                      <p>{message.text}</p>
                    </div>
                  ))}
                </div>

                <div className={styles.chatbotOptions}>
                  {options.map((option, index) => (
                    <button key={index} onClick={() => handleOptionSelect(option)}>
                      {option}
                    </button>
                  ))}
                </div>

                <div className={styles.resetButtonContainer}>
                  <button className={styles.resetButton} onClick={resetChat}>
                    <MdRefresh className={styles.resetIcon} />
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Draggable>
      )}
    </div>
  );
};

export default ChatbotCustomer;
