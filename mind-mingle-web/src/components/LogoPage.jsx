import React, { useEffect } from "react";
import { Typography } from 'antd'
import { useNavigate } from "react-router-dom";

const { Title } = Typography

const LogoPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboard1'); // Redirect to main page after 3 seconds
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2F7164'
      }}>
        <Title 
          style={{
            color: 'white',
            margin: 0,
            fontWeight: 'bold',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        >
          Mind Mingle
        </Title>
      </div>
  )

};

export default LogoPage;
