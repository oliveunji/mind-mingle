import React from "react";
import { LeftOutlined } from '@ant-design/icons';
import { Progress, Radio, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const Step3Page = () => {
    const navigate = useNavigate();

    const goToNextStep = () => {
        navigate('/survey/step4');
    };
    const handleBackNavigation = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    return (
        <>
            <div
                style={{
                top: "10px", // 화면 위쪽에서 10px
                left: "10px", // 화면 왼쪽에서 10px
                textAlign: "left", // 아이콘과 텍스트를 가운데 정렬
                marginBottom: "10px",
                padding: "10px",
                marginTop: "10px"
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
                    <Progress percent={60} showInfo={false} style={{ flex: 1, marginLeft: "20px", marginRight: "40px" }} />
                </div>
                <div
                    style={{
                    marginTop: "20px", // 아이콘과 문구 사이 간격
                    fontSize: "20px", // 텍스트 크기
                    color: "#303636", // 텍스트 색상
                    fontWeight: "bold",
                    padding: "20px"
                    }}
                >
                    Over the past two weeks, 
                    I've been energetic and lively.
                </div>
            </div>
            <div style={{ marginLeft: "30px", marginTop: "120px" }}>
                <Radio.Group defaultValue={3}>
                    <Space direction="vertical" style={{ textAlign: "left" }}>
                        <Radio value={1} style={{ fontSize: "18px" }}>Never</Radio>
                        <Radio value={2} style={{ fontSize: "18px" }}>Rarely</Radio>
                        <Radio value={3} style={{ fontSize: "18px" }}>Occasionally</Radio>
                        <Radio value={4} style={{ fontSize: "18px" }}>Often</Radio>
                        <Radio value={5} style={{ fontSize: "18px" }}>Usually</Radio>
                        <Radio value={6} style={{ fontSize: "18px" }}>Always</Radio>
                    </Space>
                </Radio.Group>
            </div>
            <div className="bottom-button-container">
                <button className="rounded-button" onClick={goToNextStep}>Next</button>
            </div>
        </>
    )
}

export default Step3Page;