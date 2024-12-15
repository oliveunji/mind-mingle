import React from "react";
import { Image } from 'antd';
import { useNavigate } from 'react-router-dom';

const Onboarding1Page = () => {
    const navigate = useNavigate();

    const goToNextStep = () => {
        navigate('/onboard2');
    };
  return (
    <>
      <div
        style={{
        top: "10px", // 화면 위쪽에서 10px
        left: "10px", // 화면 왼쪽에서 10px
        textAlign: "left", // 아이콘과 텍스트를 가운데 정렬
        marginBottom: "10px",
        padding: "20px"
        }}
        >
            <div
                style={{
                marginTop: "60px", // 아이콘과 문구 사이 간격
                fontSize: "28px", // 텍스트 크기
                color: "#303636", // 텍스트 색상
                fontWeight: "bold"
                }}
            >
                Your Thoughts,<br />Freely Shared
            </div>
            <div
                style={{
                marginTop: "15px", // 아이콘과 문구 사이 간격
                fontSize: "16px", // 텍스트 크기
                color: "#303636", // 텍스트 색상
                }}
            >
                Speak your mind in a safe, non-judgmental
                space, where your feelings truly matter.
            </div>
            
        </div>
        <div style={{ marginTop: "50px" }}>
                <Image
                    width="100%"
                    height="auto"
                    src="/images/onboard1.png"
                />
            </div>
        <div className="bottom-button-container">
            <button className="rounded-button" 
            onClick={goToNextStep}
            >Next</button>
        </div>
    </>
  );
};

export default Onboarding1Page;
