import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [selectedColor, setSelectedColor] = useState("");

  const handleColorSelect = (e) => {
    let value = e.target.value;
    setSelectedColor(value);
    handleClick();
  };

  const handleClick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: changeBackgroundColor,
        args: [selectedColor],
      });
    });
  };

  const changeBackgroundColor = (color) => {
    document.body.style.backgroundColor = color;
  };

  const handleCustomColor = (color) => {
    setSelectedColor(color);
    handleClick();
  };

  useEffect(() => {
    console.log(selectedColor);
  }, [selectedColor]);

  const customColor = [
    "#FFFFFF",
    "#F1F3F4",
    "#E3E4E8",
    "#C5CAD5",
    "#9AA2B4",
    "#6E7894",
    "#59637C",
    "#3F4655",
    "#353C47",
    "#2B303C",
    "#21242C",
  ];

  return (
    <div className="container">
      <div>
        <span className="title">Change Page Background</span>
        <input
          type="color"
          className="color"
          value={selectedColor}
          onChange={handleColorSelect}
        />
      </div>
      <div className="custom_section">
        <span className="custom_text">Some custom colors you might like</span>
        <div className="custom_colors">
          {customColor.map((color, index) => (
            <span
              className="custom_color"
              style={{ backgroundColor: color }}
              key={index}
              onClick={() => handleCustomColor(color)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
