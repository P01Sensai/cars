"use client";

import { useState, useRef, useEffect } from "react";
import { Download, FileText, Send, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BROCHURES = [
  { id: "sierra", brand: "Tata", model: "Sierra Concept", img: "/tata-sierra-hero.jpg", size: "4.2 MB", desc: "Full electric SUV specifications and design details." },
  { id: "7xo", brand: "Mahindra", model: "XUV 7XO", img: "/xuv-hero.jpg", size: "3.8 MB", desc: "Premium 7-seater tech specs and variant breakdowns." },
  { id: "safari", brand: "Tata", model: "Safari Dark", img: "/safari-dark-hero.jpg", size: "5.1 MB", desc: "Exclusive dark edition features and interior highlights." },
  { id: "scorpio", brand: "Mahindra", model: "Scorpio N", img: "/scorpio-hero.jpg", size: "4.5 MB", desc: "4x4 capabilities and mechanical specifications." },
];

type Message = {
  role: "user" | "model";
  content: string;
};

export default function BrochureLibraryClient() {
  const [selectedCar, setSelectedCar] = useState(BROCHURES[0]);
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", content: `Hello. I am your automotive AI assistant. I have loaded the specifications for the **${selectedCar.brand} ${selectedCar.model}**. What would you like to know?` }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Reset chat when selecting a new car
  useEffect(() => {
    setMessages([
      { role: "model", content: `Hello. I am your automotive AI assistant. I have loaded the specifications for the **${selectedCar.brand} ${selectedCar.model}**. What would you like to know?` }
    ]);
    setError(null);
  }, [selectedCar]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setError(null);
    
    // Add user message to UI
    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          carModel: `${selectedCar.brand} ${selectedCar.model}`
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      setMessages(prev => [...prev, { role: "model", content: data.reply }]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred communicating with the AI.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="site-max mx-auto px-4 md:px-8 w-full h-[calc(100vh-8rem)] min-h-[700px] flex flex-col lg:flex-row gap-8">
      
      {/* Left Pane: Brochure Library */}
      <div className="w-full lg:w-1/2 flex flex-col h-full overflow-hidden">
        <div className="mb-8 shrink-0">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4 text-black dark:text-white">Brochure Desk</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Browse official OEM spec sheets or ask our AI assistant for instant insights.
          </p>
        </div>

        <div className="overflow-y-auto pr-4 pb-12 flex-1 hide-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {BROCHURES.map((brochure) => (
              <div 
                key={brochure.id}
                onClick={() => setSelectedCar(brochure)}
                className={`group cursor-pointer rounded-3xl overflow-hidden border transition-all duration-300 relative ${
                  selectedCar.id === brochure.id 
                    ? "border-black dark:border-white ring-2 ring-black/10 dark:ring-white/20 scale-[1.02] shadow-xl" 
                    : "border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 hover:scale-[1.01]"
                }`}
              >
                <div className="h-48 bg-gray-200 dark:bg-[#111] relative overflow-hidden">
                  <img 
                    src={brochure.img} 
                    alt={brochure.model} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                  />
                  {selectedCar.id === brochure.id && (
                    <div className="absolute top-4 right-4 bg-black text-white dark:bg-white dark:text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <Sparkles size={12} />
                      Active
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div>
                      <p className="text-xs font-bold text-white/70 uppercase tracking-wider">{brochure.brand}</p>
                      <h3 className="text-xl font-bold text-white leading-tight">{brochure.model}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-5 bg-white/50 dark:bg-black/50 backdrop-blur-md">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{brochure.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                      <FileText size={14} />
                      {brochure.size} PDF
                    </div>
                    <button className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-black dark:text-white group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-colors" title="Download Brochure">
                      <Download size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Pane: AI Chatbot */}
      <div className="w-full lg:w-1/2 h-full flex flex-col bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-black/10 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
        
        {/* Chat Header */}
        <div className="p-6 border-b border-black/5 dark:border-white/5 flex items-center gap-4 shrink-0 bg-white/20 dark:bg-black/20">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg text-white">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="font-bold text-lg text-black dark:text-white">Gemini Intelligence</h3>
            <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Connected • {selectedCar.model}
            </p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar relative">
          <AnimatePresence>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl p-4 ${
                    msg.role === "user" 
                      ? "bg-black text-white dark:bg-white dark:text-black rounded-tr-sm" 
                      : "bg-gray-100 dark:bg-[#111] text-black dark:text-gray-100 border border-black/5 dark:border-white/5 rounded-tl-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {/* Very basic markdown rendering for bold text **text** */}
                    {msg.content.split(/(\*\*.*?\*\*)/g).map((part, i) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={i} className="font-bold">{part.slice(2, -2)}</strong>;
                      }
                      return <span key={i}>{part}</span>;
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-gray-100 dark:bg-[#111] border border-black/5 dark:border-white/5 rounded-2xl rounded-tl-sm p-4 flex items-center gap-3 text-gray-500">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-xs font-semibold uppercase tracking-widest">Analyzing Data...</span>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center my-4"
              >
                <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-xl p-3 flex items-center gap-2 text-sm max-w-md">
                  <AlertCircle size={16} className="shrink-0" />
                  <p>{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts */}
        {messages.length === 1 && !isLoading && (
          <div className="px-6 pb-2 flex flex-wrap gap-2 shrink-0">
            {[
              `What is the boot space?`,
              `List the safety features.`,
              `Engine specs vs Competition?`
            ].map((suggestion, i) => (
              <button
                key={i}
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-xs font-medium text-gray-600 dark:text-gray-400 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 px-3 py-1.5 rounded-full border border-black/5 dark:border-white/5 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {/* Input Area */}
        <div className="p-6 pt-4 shrink-0 bg-white/20 dark:bg-black/20 border-t border-black/5 dark:border-white/5">
          <form onSubmit={handleSendMessage} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about the specifications..."
              disabled={isLoading}
              className="w-full bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 focus:border-indigo-500 dark:focus:border-indigo-500 rounded-2xl py-4 pl-5 pr-14 outline-none text-black dark:text-white placeholder-gray-400 disabled:opacity-50 transition-colors shadow-sm"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 w-10 h-10 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center disabled:opacity-30 disabled:hover:bg-black dark:disabled:hover:bg-white hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-colors"
            >
              <Send size={16} className={input.trim() && !isLoading ? "ml-0.5" : ""} />
            </button>
          </form>
          <div className="text-center mt-3">
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
              AI generated content may contain errors. Verify specifications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
