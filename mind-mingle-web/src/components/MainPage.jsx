import React, { useState } from 'react'
import { Avatar, Button, Layout, Typography, Card, Image } from 'antd'
import { HomeOutlined, AppstoreOutlined, MessageFilled, EditOutlined, UserOutlined } from '@ant-design/icons'

const { Header, Content, Footer } = Layout
const { Title, Text } = Typography
import styles from './page.module.css'
import ConsultationModal from './ConsultationModal'

const MainPage = () => {
    const name = "Emily Kim" // This would come from your user context/state

    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleConsultation = (type) => {
      setIsModalOpen(false)
      // Handle consultation type selection
      console.log('Selected consultation type:', type)
    }

  return (
    <Layout className={styles.layout}>
      {/* Top Section */}
      <div className={styles.topSection}>

        {/* Profile Section */}
        <div className={styles.profileSection}>
          <Avatar
            size={48}
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
          <div>
            <Title level={4} className={styles.greeting}>Hi, {name}</Title>
            <Text className={styles.subGreeting}>How are you today?</Text>
          </div>
        </div>

        {/* Mood Selection */}
        <div className={styles.moodSelection}>
          {[
            { emoji: "😢", text: "Bad" },
            { emoji: "😐", text: "So so" },
            { emoji: "👍", text: "Good" },
            { emoji: "😊", text: "Great" }
          ].map((mood) => (
            <Button 
              key={mood.text}
              className={styles.moodButton}
            >
              <span>{mood.emoji}</span>
              <span>{mood.text}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Scrollable Content */}
      <Content className={styles.scrollableContent}>
        {/* Last Session Section */}
        <div className={styles.sessionSection}>
          <Title level={4}>Last session</Title>
          <div className={styles.sessionList}>
            <SessionCard 
              number={3}
              title="Relationship Advice"
              date="Yesterday"
              type="Video consultation"
            />
            {/* <SessionCard 
              number={5}
              title="Anxiety Coping Strategies"
              date="Nov 13, 2024"
              type="Video consultation"
            /> */}
          </div>
        </div>

        {/* Ended Session Section */}
        <div className={styles.sessionSection}>
          <Title level={4}>Ended session</Title>
          <div className={styles.sessionList}>
            <SessionCard 
              number={1}
              title="Stress Management"
              date="Yesterday"
              type="Video consultation"
            />
          </div>
        </div>
      </Content>

      {/* Navigation Bar */}
      <div className={styles.navBar}>
        <div className={styles.navBarContent}>
          <NavItem icon={<HomeOutlined />} text="Home" />
          <NavItem icon={<AppstoreOutlined />} text="Community" />
          <NavItem 
            icon={<MessageFilled />} 
            text="Chat"
            active
            onClick={() => setIsModalOpen(true)}
          />
          <NavItem icon={<EditOutlined />} text="Journal" />
          <NavItem icon={<UserOutlined />} text="Profile" />
        </div>
      </div>
      <ConsultationModal 
        open={isModalOpen} 
        onClose={handleConsultation}
      />
    </Layout>
  )
}

function SessionCard({ number, title, date, type }) {
    return (
      <Card className={styles.sessionCard}>
        <div className={styles.sessionCardContent}>
          <Text className={styles.sessionNumber}>{number} Session</Text>
          <Title level={5} className={styles.sessionTitle}>{title}</Title>
          <Text className={styles.sessionInfo}>{date} • {type}</Text>
        </div>
      </Card>
    )
  }
  
  function NavItem({ icon, text, active = false, onClick }) {
    return (
      <div className={styles.navItem} onClick={onClick}>
        <div className={`${styles.navIcon} ${active ? styles.navIconActive : ''}`}>
          {icon}
        </div>
        <Text className={`${styles.navText} ${active ? styles.navTextActive : ''}`}>
          {text}
        </Text>
      </div>
    )
  }
  
export default MainPage;