import React from "react";
import { GlobeIcon, Share } from "lucide-react";
import { Button } from "./ui/button";

const GameHeader = ({ onChallenge }) => {
  return (
    <header
      style={{
        marginBottom: "2rem",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          marginBottom: "0.75rem",
        }}
      >
        <GlobeIcon
          size={36}
          style={{
            color: "#0077cc",
          }}
        />
        <h1
          style={{
            fontSize: "2.25rem",
            fontWeight: "bold",
            color: "#0077cc",
          }}
        >
          Globetrotter
        </h1>
      </div>
      <p
        style={{
          fontSize: "1.125rem",
          color: "#4b5563",
          marginBottom: "1.5rem",
          fontWeight: "300",
        }}
      >
        The Ultimate Travel Guessing Game
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={onChallenge}
          style={{
            backgroundColor: "#ff8a00",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 1.5rem",
            borderRadius: "9999px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "all 0.2s ease",
            transform: "scale(1)",
          }}
        >
          <Share size={18} />
          Challenge a Friend
        </Button>
      </div>
    </header>
  );
};

export default GameHeader;
