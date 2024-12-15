import React, { useEffect } from 'react';
import { Typography } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/main'); // Redirect to main page after 3 seconds
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);
  

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#E5F9F6',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <CheckCircleFilled 
        style={{
          fontSize: '80px',
          color: '#2F7164',
          marginBottom: '20px'
        }}
      />
      <Title
        level={1}
        style={{
          color: '#2F7164',
          margin: 0,
          fontSize: '28px',
          fontWeight: 'normal',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
      >
        All set!
      </Title>
    </div>
  );
}

export default SuccessPage;

