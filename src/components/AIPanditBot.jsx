import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./AIPanditBot.css";

const PANDIT_AVATAR = "/assets/pandit-bot.png"; // Ensure this path is correct

const INITIAL_MESSAGES = [
  {
    id: 1,
    text: "Namaste! 🙏 I am your personal Matchmaking Pandit.",
    sender: "bot",
  },
  {
    id: 2,
    text: "How can I help you find your perfect jeevansathi today?",
    sender: "bot",
  },
];

const SUGGESTIONS = [
  "Our Services",
  "Daily Horoscope",
  "What is Kundali Matching?",
  "Why Shubh Vivah?",
  "Contact Us",
];

export default function AIPanditBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    // Add user message
    const newUserMsg = { id: Date.now(), text: text, sender: "user" };
    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(text);
      const newBotMsg = {
        id: Date.now() + 1,
        text: botResponse,
        sender: "bot",
      };
      setMessages((prev) => [...prev, newBotMsg]);
      setIsTyping(false);

      // Handle Redirects/Scrolling based on the question
      handleNavigation(text);
    }, 1500);
  };

  const handleNavigation = (text) => {
    const lowerText = text.toLowerCase();
    let targetId = null;

    if (lowerText.includes("services")) targetId = "services";
    else if (lowerText.includes("horoscope")) targetId = "horoscope";
    else if (lowerText.includes("kundali") || lowerText.includes("why shubh")) targetId = "why-us";
    else if (lowerText.includes("contact")) targetId = "contact-us";


    if (targetId) {
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500); // Small delay to let the user read the message first
    }
  };

  const getBotResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes("services")) {
        return "We offer premium matchmaking services including Kundali matching, verified profiles, and wedding planning assistance. Taking you to our services section...";
    } else if (lowerInput.includes("horoscope")) {
        return "Your stars align for greatness! You can check your daily horoscope and lucky numbers right here. Let me show you.";
    } else if (lowerInput.includes("kundali")) {
        return "Kundali matching helps ensure compatibility and happiness. At Shubh Vivah, we provide detailed Vedic compatibility reports. Redirecting you to learn more...";
    } else if (lowerInput.includes("why shubh") || lowerInput.includes("why us")) {
        return "Shubh Vivah is trusted by thousands for its transparency, security, and dedicated support. Here is why we are the best choice for you.";
    } else if (lowerInput.includes("contact")) {
        return "You can reach us at +91 80696 40559 or email support@thynktech.ltd. Taking you to our contact details below...";
    } else if (lowerInput.includes("match") || lowerInput.includes("find")) {
      return "I can certainly help with that! Based on your profile, I see some great matches in your community. Would you like to see them?";
    } else if (
      lowerInput.includes("plan") ||
      lowerInput.includes("membership")
    ) {
      return "Our Gold Plan is very popular! It offers 3x more visibility and direct contact numbers. Shall I show you the details?";
    } else {
      return "That is an interesting question. Let me guide you to the right section for that. Is there anything specific you are looking for?";
    }
  };

  return (
    <div className="pandit-bot-container">
      {/* CHAT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="pandit-chat-window"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* HEADER */}
            <div className="chat-header">
              <div className="header-info">
                <img
                  src={PANDIT_AVATAR}
                  alt="Pandit Ji"
                  className="header-avatar"
                />
                <div className="header-text">
                  <h3>Pandit Ji</h3>
                  <span>AI Matchmaker</span>
                </div>
              </div>
              <button
                className="close-chat-btn"
                onClick={() => setIsOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            {/* BODY */}
            <div className="chat-body">
              {messages.map((msg) => (
                <div key={msg.id} className={`message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}

              {isTyping && (
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              )}
              <div ref={messagesEndRef} />

              {/* Suggestions (only show if last message was from bot) */}
              {!isTyping && messages[messages.length - 1].sender === "bot" && (
                <div className="chat-suggestions">
                  {SUGGESTIONS.map((sugg, idx) => (
                    <button
                      key={idx}
                      className="suggestion-chip"
                      onClick={() => handleSendMessage(sugg)}
                    >
                      <Sparkles size={12} style={{ marginRight: 4 }} /> {sugg}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* FOOTER */}
            <div className="chat-footer">
              <input
                type="text"
                className="chat-input"
                placeholder="Ask Pandit Ji..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && handleSendMessage(inputValue)
                }
              />
              <button
                className="send-btn"
                onClick={() => handleSendMessage(inputValue)}
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING BUTTON */}
      <motion.button
        className="pandit-avatar-btn"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <img
          src={PANDIT_AVATAR}
          alt="Chat with Pandit Ji"
          className="pandit-avatar-img"
        />
        <div className="online-indicator"></div>
      </motion.button>

      <div className="pandit-tooltip">Namaste! Need help?</div>
    </div>
  );
}
