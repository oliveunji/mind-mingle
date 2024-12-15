import React, { useState } from 'react'
import { Layout, Input, Button, Avatar, Typography, Image } from 'antd'
import { LeftOutlined, SendOutlined, SmileOutlined, AudioOutlined } from '@ant-design/icons'
import { useNavigate } from "react-router-dom";
import styles from './chat.module.css'

const { Header, Content, Footer } = Layout
const { Text } = Typography

const ChatPage = () => {
    const navigate = useNavigate();

    const handleBackNavigation = () => {
        navigate(-1); // 이전 페이지로 이동
    };

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Alloy',
      text: 'Hi, Emily Kim. How can I help you today during our consultation?',
      timestamp: '5:28 PM',
      isUser: false
    },
    {
      id: 2,
      text: "Hi. I've been really stressed at school lately, and it's been hard. I think talking to someone might help.",
      timestamp: '5:29 PM',
      isUser: true
    },
    {
      id: 3,
      sender: 'Alloy',
      text: 'I understand. You mentioned feeling stressed at school. What do you think is causing it?',
      timestamp: '5:29 PM',
      isUser: false
    },
    {
      id: 4,
      text: "There's just so much studying, and my exam scores aren't great. My friendships have changed too.",
      timestamp: '5:31 PM',
      isUser: true
    },
    {
      id: 5,
      sender: 'Alloy',
      text: "It sounds like you're having a tough time with your studies, grades, and friendships. How are you feeling about all this day to day?",
      timestamp: '5:32 PM',
      isUser: false
    }
  ])
  const [inputText, setInputText] = useState('')

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputText,
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        }),
        isUser: true
      }
      setMessages([...messages, newMessage])
      setInputText('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

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
            {/* {!message.isUser && (
              <Avatar
                className={styles.avatar}
                icon={
                  <div className={styles.avatarIcon}>
                    <img 
                      src="/images/alloy_icon.png"
                      alt="Alloy"
                      className={styles.avatarImage}
                    />
                  </div>
                }
              />
            )} */}
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
      </Content>

      <Footer className={styles.footer}>
        <div className={styles.inputContainer}>
          <Input
            placeholder="Text Input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            className={styles.input}
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

