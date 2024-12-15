import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Col, Row, Button, Image } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { startRealtime, stopRealtime } from "../main";
import { useNavigate } from "react-router-dom";

const VoicePage = () => {
    const [activeSpeaker, setActiveSpeaker] = useState("");
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isInitiated, setIsInitiated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        window.updateActiveSpeaker = setActiveSpeaker;
    }, []);

    const handleClick = () => {
        setIsSpeaking((prevState) => !prevState); 
        if(isSpeaking) {
            startRealtime()
            setIsInitiated(true)
        }
        if(!isSpeaking && isInitiated) {
            stopRealtime()
        }
    }
    const handleBackNavigation = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    const getBorderStyle = (speaker) => ({
        border: activeSpeaker === speaker ? "4px solid #007970" : "4px solid transparent",
        borderRadius: "10px", // 테두리 둥글게
        display: "inline-block", // 이미지 크기에 맞춤
        padding: "2px", // 테두리와 이미지 사이 여백 조정
        transition: "border 0.3s ease", // 부드럽게 테두리 변화
      });

    return (
        <>
            <div
                style={{
                top: "10px", // 화면 위쪽에서 10px
                left: "10px", // 화면 왼쪽에서 10px
                textAlign: "left", // 아이콘과 텍스트를 가운데 정렬
                marginBottom: "10px",
                padding: "10px",
                marginTop: "10px",
                marginLeft: "10px"
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
                <div
                    style={{
                    marginTop: "25px", // 아이콘과 문구 사이 간격
                    fontSize: "20px", // 텍스트 크기
                    color: "#303636", // 텍스트 색상
                    fontWeight: "bold"
                    }}
                >
                    Dec 12, 2024
                </div>
            </div>  
            <div >
                <Row style={{ margin: "10px", marginTop: "40px", marginBottom: "30px", marginLeft: "20px" }}>
                    <div style={getBorderStyle("alloy")}>
                        <Image
                            width="100%"
                            height="auto"
                            src="/images/alloy.png"
                        />
                    </div>
                </Row>
                <Row style={{ margin: "10px", marginLeft: "20px"}}>
                    <div style={getBorderStyle("user")}>
                        <Image
                            width="100%"
                            height="auto"
                            src="/images/user.png"
                        />
                    </div>
                </Row>

            </div>
            <Row className="bottom-buttons" style={{ marginBottom: "20px", padding: "20px", alignItems: "center"}}>
                <Col style={{ marginRight: "20px"}}>
                <Button className="button-half-width" style={{ height: '56px', width: '162px' }}>End of Session</Button>
                </Col>
                <Col >
                    <Button type="primary" className="button-half-width" style={{ height: '56px', width: '162px' }} onClick={handleClick}>
                        {isSpeaking ? "Stop" : "Speaking"}
                    </Button>
                </Col>
            </Row>
        </>
    )
}


// const CustomButton = styled(Button)`
//   background-color: #007970;
// `;

export default VoicePage;