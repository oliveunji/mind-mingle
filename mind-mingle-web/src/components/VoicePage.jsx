import React from "react";
import { Col, Row, Button, Image } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
const VoicePage = () => {
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
                    fontSize: "24px", // 아이콘 크기
                    color: "black", // 아이콘 색상
                    cursor: "pointer", // 클릭 가능한 커서 표시
                    }}
                >
                    <LeftOutlined />
                </div>
                <div
                    style={{
                    marginTop: "5px", // 아이콘과 문구 사이 간격
                    fontSize: "20px", // 텍스트 크기
                    color: "#303636", // 텍스트 색상
                    fontWeight: "bold"
                    }}
                >
                    Dec 12, 2024
                </div>
            </div>  
            <div >
                <Row style={{ margin: "10px", marginBottom: "20px"}}>
                    <Image
                        width="100%"
                        height="auto"
                        src="/images/alloy.png"
                    />
                </Row>
                <Row style={{ margin: "10px"}}>
                    <Image
                        width="100%"
                        height="auto"
                        src="/images/user.png"
                    />
                </Row>
            </div>
            <Row className="bottom-buttons" style={{ marginBottom: "20px", padding: "20px", alignItems: "center"}}>
                <Col style={{ marginRight: "20px"}}>
                <Button className="button-half-width" style={{ height: '56px', width: '162px' }}>End of Session</Button>
                </Col>
                <Col >
                <Button type="primary" className="button-half-width" style={{ height: '56px', width: '162px' }}>Speaking</Button>
                </Col>
            </Row>
        </>
    )
}

export default VoicePage;