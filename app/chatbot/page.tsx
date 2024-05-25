import Head from "next/head";
import Chatbot from "@/components/chatbotadmin";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Chatbot Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ marginLeft: "250px" }}>
        <h1>Welcome to My Chatbot</h1>
        <Chatbot />
      </main>

      <footer>
        <p>Powered by Next.js</p>
      </footer>
    </div>
  );
}
