'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import axios from 'axios';
import Link from 'next/link';
import {Copy, CopyPlusIcon} from 'lucide-react'

const loadingMessages = [
  "Brainseek is thinking...",
  "Crunching data...",
  "Analyzing your request...",
  "Generating insights...",
  "Formulating a response...",
  "Just a moment, please...",
  "Processing information...",
  "Gathering resources...",
  "Almost there...",
  "Preparing your answer..."
];

export default function ChatPage() {

  const getLoadingMessage = () => (
    setInterval(()=>{
      const index = Math.floor(Math.random() * loadingMessages.length())
      return loadingMessages[index]
    }, 1000)
  )


let color = "white"
  const copyText = (text) => {
    navigator.clipboard.writeText(text)
    color = "green"
    
  }

  const [messages, setMessages] = useState([
    { role: 'assistant', content: '👋 Hi, I’m **Brainseek**, your academic research assistant. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
     const res = await axios.post('http://172.18.113.249:5000/', 
      { prompt: input, thread_id: 14 }).then(res => res.data);
     

      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: res|| '⚠️ Something went wrong.' },
        
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: '❌ Aghhh, sorry thats an internal server error.' },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0f] text-gray-100">
      {/* Header */}
      <header className="fixed w-full border-b border-gray-800 p-4 text-center text-lg font-semibold tracking-wide text-indigo-400">
        🧠 Brainseek Research Assistant

        <Link href={'/welcome'}>welcome</Link>
      </header>

      {/* Chat Body */}
      <main className="mt-13 mb-25 flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-800">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-4 rounded-2xl max-w-3xl mx-auto ${
              msg.role === 'assistant'
                ? 'bg-gray-900 border border-gray-800'
                : 'bg-indigo-700 text-white self-end'
            }`}
          >
           <div className="prose prose-invert max-w-none leading-relaxed">
  <ReactMarkdown remarkPlugins={[remarkGfm]}>
    {msg.content}
  </ReactMarkdown>
  {msg.role === 'assistant' ? <button 
  onClick={()=> copyText(msg.content)}
  className='relative bottom-0 right-0 mt-5  ml-[95%] flex items-start bottom-0'>
    <Copy size={16} color={color} />
  </button>: ""}
</div>

          </motion.div>
        ))}

        {loading && (
          <div className="text-center text-gray-500 animate-pulse">
            {getLoadingMessage()}
          </div>
        )}
      </main>

      {/* Input */}
      <footer className=" fixed w-full bottom-0 border-t border-gray-800 p-4 flex items-center gap-3 bg-[#0d0d14]">
        <textarea
          className="flex-1 resize-none rounded-xl bg-gray-900 text-gray-100 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-800"
          rows={2}
          placeholder="Ask Brainseek anything about your academic research..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-600 rounded-xl font-medium transition"
        >
          {loading ? '...' : 'Send'}
        </button>
      </footer>
    </div>
  );
}
