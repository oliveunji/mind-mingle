import React from "react";
import { Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';

const SelectConsultantPage = () => {
    const navigate = useNavigate();

    const goToNextStep = () => {
        navigate('/survey/step0');
    };
    const handleBackNavigation = () => {
        navigate(-1); // 이전 페이지로 이동
    };
  return (
    <>
      <div
        style={{
        position: "fixed", // 화면에서 고정 위치
        top: "10px", // 화면 위쪽에서 10px
        left: "10px", // 화면 왼쪽에서 10px
        textAlign: "left", // 아이콘과 텍스트를 가운데 정렬
        marginBottom: "10px",
        padding: "10px"
        }}
        >
            <div
                    style={{
                    display: "flex", // Flexbox 사용
                    alignItems: "center", // 수직 가운데 정렬
                    gap: "10px", // 아이콘과 Progress Bar 사이 간격
                    }}
                >
                    <div
                        style={{
                        fontSize: "24px", // 아이콘 크기
                        color: "black", // 아이콘 색상
                        cursor: "pointer", // 클릭 가능한 커서 표시
                        }}
                        onClick={handleBackNavigation}
                    >
                        <LeftOutlined />
                    </div>
                </div>
            <div
                style={{
                marginTop: "30px", // 아이콘과 문구 사이 간격
                fontSize: "28px", // 텍스트 크기
                color: "#303636", // 텍스트 색상
                fontWeight: "bold"
                }}
            >
                Select Your MindMingle!
            </div>
            <div
                style={{
                marginTop: "15px", // 아이콘과 문구 사이 간격
                fontSize: "16px", // 텍스트 크기
                color: "#303636", // 텍스트 색상
                }}
            >
                Listen to 3 voices and feel their tone.
                And pick the one that brings you comfort.
            </div>
            
        </div>
        <div style={{ marginTop: "120px" }}>
                <Image
                    width="100%"
                    height="auto"
                    src="/images/onboard2.png"
                />
            </div>
        <div className="bottom-button-container">
            <button className="rounded-button" 
            onClick={goToNextStep}
            >Select</button>
            <div style={{ marginTop: "20px", marginBottom: "30px"}}>Maybe Later</div>
        </div>
    </>
  );
};

export default SelectConsultantPage;
