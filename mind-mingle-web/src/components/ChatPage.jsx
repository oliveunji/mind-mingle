import React, { useState, useEffect } from 'react'
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
    const handleBackNavigation = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });


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
            const result = await model.generateContent(userMessage);
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

      <Content className={styles.messageList}>
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

