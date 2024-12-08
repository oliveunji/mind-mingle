import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  console.log("isLoading", isLoading)
  useEffect(() => {
    // 2초 후에 '/register'로 이동
    console.log("hello")
    const timer = setTimeout(() => {
      setIsLoading(false);
    //   navigate("/register");
    }, 50000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [navigate]);

  if (isLoading) {
    return (
      <div style={styles.logoPage}>
        <h1 style={styles.logoText}>Mind Mingle</h1>
      </div>
    );
  }

  return null;
};

const styles = {
  logoPage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f8ff",
    fontFamily: "Arial, sans-serif",
  },
  logoText: {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#4a90e2",
  },
};

export default LogoPage;
