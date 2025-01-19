import React from "react";

const MemoPad: React.FC = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <img
        src="/assets/misc/memopad.png"
        alt="Memo Pad"
        style={{
          maxWidth: "100%",
          height: "auto",
          display: "block",
          margin: "0 auto",
        }}
      />
    </div>
  );
};

export default MemoPad;
