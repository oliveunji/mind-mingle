import React, { useState } from "react";

const MainPage = () => {
    const [isBottomSheetOpen, setBottomSheetOpen] = useState(true);
    const menuItems = [
        { name: "Home", img: "/images/home_icon.png", active: false },
        { name: "Community", img: "/images/community_icon.png", active: false },
        { name: "Bot", img: "/images/bot_icon.png", active: true },
        { name: "Journal", img: "/images/journal_icon.png", active: false },
        { name: "Profile", img: "/images/profile_icon.png", active: false },
      ];

    const toggleBottomSheet = () => {
        setBottomSheetOpen(!isBottomSheetOpen);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4">
          {/* Header */}
          <header className="text-center">
            <div className="flex items-center justify-center">
              <span className="text-3xl">😊</span>
              <h1 className="text-2xl font-semibold ml-2">Hi, {"{name}"}</h1>
            </div>
            <p className="text-gray-500 mt-1">How are you today?</p>
            <div className="flex justify-center mt-2 space-x-2">
              <button className="px-4 py-2 bg-red-100 text-red-500 rounded-md">😢 Bad</button>
              <button className="px-4 py-2 bg-yellow-100 text-yellow-500 rounded-md">😐 So so</button>
              <button className="px-4 py-2 bg-green-100 text-green-500 rounded-md">👍 Good</button>
              <button className="px-4 py-2 bg-blue-100 text-blue-500 rounded-md">😄 Great</button>
            </div>
          </header>
    
          {/* Last session */}
          <section className="mt-6">
            <h2 className="text-xl font-semibold">Last session</h2>
            <div className="mt-2 space-y-4">
              <div className="p-4 bg-white rounded-md shadow-md">
                <p className="text-sm text-gray-500">3 Session</p>
                <h3 className="text-lg font-semibold">Relationship Advice</h3>
                <p className="text-sm text-gray-500">Yesterday • Video consultation</p>
              </div>
              <div className="p-4 bg-white rounded-md shadow-md">
                <p className="text-sm text-gray-500">5 Session</p>
                <h3 className="text-lg font-semibold">Anxiety Coping Strategies</h3>
                <p className="text-sm text-gray-500">Nov 13, 2024 • Video consultation</p>
              </div>
            </div>
          </section>
    
          {/* Ended session */}
          <section className="mt-6">
            <h2 className="text-xl font-semibold">Ended session</h2>
            <div className="mt-2 space-y-4">
              <div className="p-4 bg-white rounded-md shadow-md">
                <p className="text-sm text-gray-500">1 Session</p>
                <h3 className="text-lg font-semibold">Stress Management</h3>
                <p className="text-sm text-gray-500">Yesterday • Video consultation</p>
              </div>
              <div className="p-4 bg-white rounded-md shadow-md">
                <p className="text-sm text-gray-500">7 Session</p>
                <h3 className="text-lg font-semibold">Another Session Title</h3>
                <p className="text-sm text-gray-500">Some date • Video consultation</p>
              </div>
            </div>
          </section>
    

          <footer className="footer">
            <div className="footer-menu">
            {menuItems.map((item, index) => (
                <div
                    key={index}
                    className={`footer-button ${
                    item.active ? "footer-button-active" : ""
                    }`}
                >
                    <img src={item.img} alt={item.name} />
                    <span>{item.name}</span>
                </div>
                ))}
            </div>
          </footer>



    {isBottomSheetOpen && (
        <>
          {/* Overlay */}
          <div className="overlay" onClick={() => setBottomSheetOpen(false)}></div>

          {/* 팝업 */}
          <div className="popup">
            <p style={{ fontSize: "16px", color: "gray", marginLeft: "20px" }}>Select Consultation Type</p>
            <div className="option">Video</div>
            <hr className="divider" />
            <div className="option">Text</div>
            <hr className="divider" />
            <div className="option">Voice</div>
          </div>
        </>
      )}
      
        </div>
      );
}

export default MainPage;