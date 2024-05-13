// import Head from 'next/head';
// import styles from '@/css/chat.module.css';
// import Chat from '@/components/chat';


// export default function Home() {
//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>Chatbot Demo</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className={styles.main}>
//         <h1 className={styles.title}>Welcome to My Chatbot</h1>

//         <Chat />
//       </main>

//       <footer className={styles.footer}>
//         <p>Powered by Next.js</p>
//       </footer>
//     </div>
//   );
// }

// pages/chat.js



// Example usage in another component
import React from 'react';
import Chat from '../../components/chat'; // Adjust the import path based on your project structure

const SomeOtherComponent = () => {
  return (
    <div>
      <h1>Chat App</h1>
      <Chat /> {/* Render the Chat component */}
    </div>
  );
};

export default SomeOtherComponent;
