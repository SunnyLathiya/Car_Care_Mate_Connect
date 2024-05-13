// import React, { useState } from 'react';
// import { app } from './firebase';
// import { getFirestore, addDoc, collection, serverTimestamp } from 'firebase/firestore';

// const db = getFirestore(app);

// const submitHandler = async (e: any) => {
//     e.preventDefault();

//     try{

//         await addDoc(collection(db, "Messages"))
//          text: "Adsd"
//          uid: user.id;
//     }catch(error){

//     }
// }

// const chat = () => {
//     const [user, setUser] = useState(false)

//     const submitHandler = async (e: any) => {
//         e.preventDefault();

//         try{

//             await addDoc(collection(db, "Messages"), {
//              text: "Adsd",
//              uid: user.id,
//              uri: user.photoURL,
//              createdAt: serverTimestamp()
//             })

//         }catch(error){

//         }
//     }
//   return (
//     <div>

//     </div>
//   )
// }

// export default chat

"use client";
// import React, { useState } from 'react';
// import styles from '@/css/chat.module.css';

// interface Message {
//   text: string;
//   isUser: boolean;
// }

// const Chatbot: React.FC = () => {
//   const [messages, setMessages] = useState<Message[]>([]);

//   const handleUserMessage = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const userInput = e.currentTarget.message.value;
//     if (userInput.trim() === '') return;

//     const newUserMessage: Message = { text: userInput, isUser: true };
//     setMessages((prevMessages) => [...prevMessages, newUserMessage]);

//     // Simulate bot response after a short delay
//     setTimeout(() => {
//       const botResponse: Message = getBotResponse(userInput);
//       setMessages((prevMessages) => [...prevMessages, botResponse]);
//     }, 500);

//     e.currentTarget.reset();
//   };

//   const getBotResponse = (userInput: string): Message => {
//     const lowerCaseInput = userInput.toLowerCase().trim();

//     // Define predefined questions and corresponding answers
//     const responses: { question: string; answer: string }[] = [
//       { question: 'hello', answer: 'Hi there!' },
//       { question: 'how are you?', answer: 'I am just a chatbot.' },
//       { question: 'what is your name?', answer: 'I am Chatbot.' },
//       { question: 'goodbye', answer: 'See you later!' },
//     ];

//     // Check if user input matches any predefined question
//     const matchedResponse = responses.find((response) => lowerCaseInput.includes(response.question));

//     // Return corresponding answer or default response
//     if (matchedResponse) {
//       return { text: matchedResponse.answer, isUser: false };
//     } else {
//       return { text: 'Sorry, I did not understand that.', isUser: false };
//     }
//   };

//   return (
//     <div className={styles.chatContainer}>
//       <div className={styles.chatMessages}>
//         {messages.map((message, index) => (
//           <div key={index} className={message.isUser ? styles.userMessage : styles.botMessage}>
//             {message.text}
//           </div>
//         ))}
//       </div>
//       <form onSubmit={handleUserMessage} className={styles.inputForm}>
//         <input type="text" name="message" placeholder="Type your message..." />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default Chatbot;

// import { useState } from 'react';
// import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
// import {
//   MainContainer,
//   ChatContainer,
//   MessageList,
//   Message,
//   MessageInput,
//   TypingIndicator
// } from '@chatscope/chat-ui-kit-react';

// interface Message {
//   message: string;
//   sentTime: string;
//   sender: string;
// }

// interface MessageModel {
//     // direction: 'incoming' | 'outgoing';
//     // position: 'single' | 'top' | 'middle' | 'bottom';
//     message: string;
//     sentTime: string;
//     sender: string;
//     // Add other required properties based on the actual MessageModel structure
//   }

// const API_KEY = "sk-proj-AI99myQ877TlmXCG8hmUT3BlbkFJX3TALdDKHIE1fqMynHuW";

// const systemMessage = {
//   role: "system",
//   content: "Explain things like you're talking to a software professional with 2 years of experience."
// };

// const App: React.FC = () => {
//   const [messages, setMessages] = useState<MessageModel[]>([
//     {
//       message: "Hello, I'm ChatGPT! Ask me anything!",
//       sentTime: "just now",
//       sender: "ChatGPT",
//     //   direction: 'incoming', // Example value for 'direction'
//     //   position: 'single' // Example value for 'position'
//     }
//   ]);

//   const [isTyping, setIsTyping] = useState(false);

//   const handleSend = async (message: string) => {
//     const newMessage: Message = {
//       message,
//       sentTime: new Date().toLocaleTimeString(),
//       sender: "user"
//     };

//     const newMessages = [...messages, newMessage];
//     setMessages(newMessages);

//     setIsTyping(true);
//     await processMessageToChatGPT(newMessages);
//   };

//   const processMessageToChatGPT = async (chatMessages: Message[]) => {
//     let apiMessages = chatMessages.map((messageObject) => ({
//       role: messageObject.sender === "ChatGPT" ? "assistant" : "user",
//       content: messageObject.message
//     }));

//     const apiRequestBody = {
//       model: "gpt-3.5-turbo",
//       messages: [systemMessage, ...apiMessages]
//     };

//     console.log("hello")

//     const response = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${API_KEY}`,
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(apiRequestBody)
//     });

//     console.log("response", response)

//     const data = await response.json();

//     console.log("data", data)

//     setMessages([
//       ...chatMessages,
//       {
//         message: data.choices[0].message.content,
//         sentTime: new Date().toLocaleTimeString(),
//         sender: "ChatGPT"
//       }
//     ]);

//     setIsTyping(false);
//   };

//   return (
//     <div className="App">
//       <div style={{ position: "relative", height: "800px", width: "700px" }}>
//         <MainContainer>
//           <ChatContainer>
//             <MessageList scrollBehavior="smooth" typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}>
//               {messages.map((message, i) => (
//                 <Message key={i} model={message} />
//               ))}
//             </MessageList>
//             <MessageInput placeholder="Type message here" onSend={handleSend} />
//           </ChatContainer>
//         </MainContainer>
//       </div>
//     </div>
//   );
// };

// export default App;




// "use client"
// import React, { useState } from 'react';
// import dynamic from 'next/dynamic';

// const ChatBot = dynamic(() => import('react-simple-chatbot'), { ssr: false });

// const ChatBotComponent = () => {
//   const [chatBotSteps, setChatBotSteps] = useState([
//     {
//       id: '1',
//       message: 'What is your name?',
//       trigger: '2',
//     },
//     {
//       id: '2',
//       user: true,
//       trigger: '3',
//     },
//     {
//       id: '3',
//       message: ({ previousValue }) => `Welcome, ${previousValue}! What is your role?`,
//       trigger: '4',
//     },
//     {
//       id: '4',
//       options: [
//         { value: 'customer', label: 'Customer', trigger: 'customerOptions' },
//         { value: 'mechanic', label: 'Mechanic', trigger: 'mechanicOptions' },
//       ],
//     },
//     {
//       id: 'customerOptions',
//       message: 'What issue are you facing?',
//       trigger: 'customerIssue',
//     },
//     {
//       id: 'customerIssue',
//       options: [
//         { value: 'query', label: 'Website usage query', trigger: 'queryResponse' },
//         { value: 'orderProblem', label: 'Problem in creating/ordering', trigger: 'orderProblemResponse' },
//         { value: 'trackingProblem', label: 'Problem in tracking order', trigger: 'trackingProblemResponse' },
//         { value: 'carBrandService', label: 'Unavailable car brand service', trigger: 'carBrandServiceResponse' },
//         { value: 'otherProblem', label: 'Other problem', trigger: 'otherProblemResponse' },
//       ],
//     },
//     {
//       id: 'queryResponse',
//       message: 'Sorry, we will solve this issue shortly.',
//       end: true,
//     },
//     {
//       id: 'orderProblemResponse',
//       message: 'Currently, the website is undergoing maintenance. It will be operational by 12:00 AM.',
//       end: true,
//     },
//     {
//       id: 'trackingProblemResponse',
//       message: 'Please update your website or try logging in again.',
//       end: true,
//     },
//     {
//       id: 'carBrandServiceResponse',
//       message: 'We will add your car brand service shortly.',
//       end: true,
//     },
//     {
//       id: 'otherProblemResponse',
//       message: 'You can directly contact the admin at 9484497949 or sunnylathiya701@gmail.com.',
//       end: true,
//     },
//     {
//       id: 'mechanicOptions',
//       message: 'What issue are you facing?',
//       trigger: 'mechanicIssue',
//     },
//     {
//       id: 'mechanicIssue',
//       options: [
//         { value: 'query', label: 'Website usage query', trigger: 'queryResponseMechanic' },
//         { value: 'orderUpdateProblem', label: 'Problem in updating order', trigger: 'orderUpdateProblemResponse' },
//         { value: 'profileUpdateProblem', label: 'Problem in updating profile', trigger: 'profileUpdateProblemResponse' },
//         { value: 'deleteAccount', label: 'I want to delete my account', trigger: 'deleteAccountResponse' },
//         { value: 'otherProblem', label: 'Other problem', trigger: 'otherProblemResponse' },
//       ],
//     },
//     {
//       id: 'queryResponseMechanic',
//       message: 'Sorry, we will solve this issue shortly.',
//       end: true,
//     },
//     {
//       id: 'orderUpdateProblemResponse',
//       message: 'Currently, the website is undergoing maintenance. It will be operational by 12:00 AM.',
//       end: true,
//     },
//     {
//       id: 'profileUpdateProblemResponse',
//       message: 'Please update your website or try logging in again.',
//       end: true,
//     },
//     {
//       id: 'deleteAccountResponse',
//       message: 'You can delete your account from the profile page. Look for the option at the bottom right.',
//       end: true,
//     },
//     {
//       id: 'otherProblemResponse',
//       message: 'You can directly contact the admin at 9484497949 or sunnylathiya701@gmail.com.',
//       end: true,
//     },
//   ]);

//   return (
//     <ChatBot
//       steps={chatBotSteps}
//       floating={true}
//       handleEnd={() => {
//         // Reset chatbot steps when chat ends (optional)
//         setChatBotSteps([
//           {
//             id: '1',
//             message: 'What is your name?',
//             trigger: '2',
//           },
//           {
//             id: '2',
//             user: true,
//             trigger: '3',
//           },
//           {
//             id: '3',
//             message: ({ previousValue }) => `Welcome, ${previousValue}! What is your role?`,
//             trigger: '4',
//           },
//           {
//             id: '4',
//             options: [
//               { value: 'customer', label: 'Customer', trigger: 'customerOptions' },
//               { value: 'mechanic', label: 'Mechanic', trigger: 'mechanicOptions' },
//             ],
//           },
//         ]);
//       }}
//     />
//   );
// };

// export default ChatBotComponent;



"use client"
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const ChatBot = dynamic(() => import('react-simple-chatbot'), { ssr: false });

const ChatBotComponent = () => {
  const initialSteps = [
    {
      id: '1',
      message: 'What is your name?',
      trigger: 'name',
    },
    {
      id: 'name',
      user: true,
      trigger: 'role',
    },
    {
      id: 'role',
      message: 'Welcome, {previousValue}! What is your role?',
      trigger: 'customerOptions',
    },
    {
      id: 'roleOptions',
      options: [
        { value: 'customer', label: 'Customer', trigger: 'askCustomerIssue' },
        { value: 'mechanic', label: 'Mechanic', trigger: 'askMechanicIssue' },
      ],
    }, 
    {
      id: 'customerOptions',
      message: 'What issue are you facing?',
      trigger: 'customerIssue',
    },
    {
      id: 'customerIssue',
      options: [
        { value: 'query', label: 'Website usage query', trigger: 'queryResponse' },
        { value: 'orderProblem', label: 'Problem in creating/ordering', trigger: 'orderProblemResponse' },
        { value: 'trackingProblem', label: 'Problem in tracking order', trigger: 'trackingProblemResponse' },
        { value: 'carBrandService', label: 'Unavailable car brand service', trigger: 'carBrandServiceResponse' },
        { value: 'otherProblem', label: 'Other problem', trigger: 'otherProblemResponse' },
      ],
    },
    {
      id: 'queryResponse',
      message: 'Sorry, we will solve this issue shortly.',
      end: true,
    },
    {
      id: 'orderProblemResponse',
      message: 'Currently, the website is undergoing maintenance. It will be operational by 12:00 AM.',
      end: true,
    },
    
        {
      id: 'trackingProblemResponse',
      message: 'Please update your website or try logging in again.',
      end: true,
    },
    {
      id: 'carBrandServiceResponse',
      message: 'We will add your car brand service shortly.',
      end: true,
    },
    {
      id: 'otherProblemResponse',
      message: 'You can directly contact the admin at 9484497949 or sunnylathiya701@gmail.com.',
      end: true,
    },
    {
      id: 'mechanicOptions',
      message: 'What issue are you facing?',
      trigger: 'mechanicIssue',
    },
    {
      id: 'mechanicIssue',
      options: [
        { value: 'query', label: 'Website usage query', trigger: 'queryResponseMechanic' },
        { value: 'orderUpdateProblem', label: 'Problem in updating order', trigger: 'orderUpdateProblemResponse' },
        { value: 'profileUpdateProblem', label: 'Problem in updating profile', trigger: 'profileUpdateProblemResponse' },
        { value: 'deleteAccount', label: 'I want to delete my account', trigger: 'deleteAccountResponse' },
        { value: 'otherProblem', label: 'Other problem', trigger: 'otherProblemResponse' },
      ],
    },
    {
      id: 'queryResponseMechanic',
      message: 'Sorry, we will solve this issue shortly.',
      end: true,
    },
    {
      id: 'orderUpdateProblemResponse',
      message: 'Currently, the website is undergoing maintenance. It will be operational by 12:00 AM.',
      end: true,
    },
    {
      id: 'profileUpdateProblemResponse',
      message: 'Please update your website or try logging in again.',
      end: true,
    },
    {
      id: 'deleteAccountResponse',
      message: 'You can delete your account from the profile page. Look for the option at the bottom right.',
      end: true,
    },
    {
      id: 'otherProblemResponse',
      message: 'You can directly contact the admin at 9484497949 or sunnylathiya701@gmail.com.',
      end: true,
    }
  ];

  const [steps, setSteps] = useState(initialSteps);

  const handleEnd = () => {
    // Reset chatbot steps when chat ends
    setSteps(initialSteps);
  };

  return (
    <ChatBot
      steps={steps}
      floating={true}
      handleEnd={handleEnd}
    />
  );
};

export default ChatBotComponent;
