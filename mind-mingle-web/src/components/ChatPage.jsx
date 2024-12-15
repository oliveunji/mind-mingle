import React, { useState, useEffect, useRef } from 'react'
import { Layout, Input, Button, Avatar, Typography, Image } from 'antd'
import { LeftOutlined, SendOutlined, SmileOutlined, AudioOutlined } from '@ant-design/icons'
import { useNavigate } from "react-router-dom";
import styles from './chat.module.css'
import { GoogleGenerativeAI } from "@google/generative-ai";

const { Header, Content, Footer } = Layout
const { Text } = Typography

const ChatPage = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);
    const messageListRef = useRef(null);

    const handleBackNavigation = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages]);

useEffect(() => {
        // 초기 메시지 설정
        setMessages([
            {
                id: 1,
                sender: 'Alloy',
                text: 'Hi, Emily Kim. How can I help you today during our consultation?',
                timestamp: new Date().toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                }),
                isUser: false
            }
        ]);
    }, []);

    const generateResponse = async (userMessage) => {
        setIsLoading(true);
        try {
            const systemPrompt = `
You are an empathetic and supportive psychological counseling chatbot designed for teenagers. Your role is to provide advice and support to adolescents aged 13-19 on topics such as friendships, family relationships, and academic challenges. Please follow these guidelines in your responses: 

1. Respond in a conversational tone, using language that feels natural and relatable to teenagers.  
2. Keep your responses concise, like a text message conversation, with 3 to 5 sentences per reply.  
3. Always maintain a kind and non-judgmental attitude.
4. Acknowledge the teenager's emotions and express empathy.
5. Use simple and clear language while maintaining a respectful tone.
6. Instead of giving direct advice, guide the teenager to find solutions themselves.
7. Encourage seeking help from professionals if necessary.
8. If dangerous situations like suicide, self-harm, or violence are mentioned, strongly recommend contacting a professional or a trusted adult immediately.
9. Do not ask for specific personal information to protect their privacy.
`;
            const historyString = chatHistory.map(msg => 
                `${msg.isUser ? 'User' : 'AI'}: ${msg.text}`
            ).join('\n');

            const fullPrompt = `${systemPrompt}\n\nChat History:\n${historyString}\n\nUser: ${userMessage}\nAI:`;

            const result = await model.generateContent(fullPrompt);
            const response = result.response;
            const newMessage = {
                id: messages.length + 2,
                sender: 'Alloy',
                text: response.text(),
                timestamp: new Date().toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                }),
                isUser: false
            };
            setMessages(prevMessages => [...prevMessages, newMessage]);
            setChatHistory(prevHistory => [...prevHistory, 
                { text: userMessage, isUser: true },
                { text: response.text(), isUser: false }
            ]);
        } catch (error) {
            console.error('Error generating response:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSend = async () => {
        if (inputText.trim()) {
            const userMessage = {
                id: messages.length + 1,
                text: inputText,
                timestamp: new Date().toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                }),
                isUser: true
            };
            setMessages(prevMessages => [...prevMessages, userMessage]);
            setChatHistory(prevHistory => [...prevHistory, { text: inputText, isUser: true }]);
            setInputText('');
            await generateResponse(inputText);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

  return (
    <Layout className={styles.chatLayout}>
      <Header className={styles.header}>
        <div className={styles.headerContent}>
          <Button 
            type="text" 
            icon={<LeftOutlined />} 
            className={styles.backButton}
            onClick={handleBackNavigation}
          />
          <Text className={styles.date}>Dec 12, 2024</Text>
        </div>
      </Header>

      <Content className={styles.messageList} ref={messageListRef}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.messageContainer} ${
              message.isUser ? styles.userMessage : styles.botMessage
            }`}
          >
            <div className={styles.messageContent}>
              {!message.isUser && (
                <Text className={styles.sender}>{message.sender}</Text>
              )}
              <div className={styles.messageBubble}>
                <Text>{message.text}</Text>
              </div>
              <Text className={styles.timestamp}>{message.timestamp}</Text>
            </div>
          </div>
        ))}
        {isLoading && <div className={styles.loading}>Alloy is typing...</div>}
      </Content>

      <Footer className={styles.footer}>
        <div className={styles.inputContainer}>
          <Input
            placeholder="Text Input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            className={styles.input}
            disabled={isLoading}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSend}
            className={styles.sendButton}
          />
        </div>
      </Footer>
    </Layout>
  )
}

export default ChatPage

