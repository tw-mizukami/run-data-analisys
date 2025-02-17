
import { CSSProperties } from "react";

export const overlayStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) rotate(-20deg)",
    backgroundColor: "rgba(0, 255, 234, 0.4)",
    color: "white",
    padding: "20px 100px",
    fontSize: "40px",
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: "8px",
    pointerEvents: "none",
  };