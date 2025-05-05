import React from "react";
import { Badge } from "./ui/badge";
import { CheckIcon, XIcon } from "lucide-react";

const ScoreTracker = ({ score, totalAnswered }) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "0.5rem",
        padding: "1rem",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        marginBottom: "1.5rem",
      }}
    >
      <h3
        style={{
          fontSize: "1.125rem",
          fontWeight: "600",
          marginBottom: "0.5rem",
          textAlign: "center",
        }}
      >
        Your Score
      </h3>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.5rem",
        }}
      >
        <Badge
          variant="outline"
          style={{
            fontSize: "0.875rem",
            padding: "0.25rem 0.75rem",
            backgroundColor: "#ecfdf5",
            color: "#047857",
            borderColor: "#a7f3d0",
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
        >
          <CheckIcon size={14} /> {score} Correct
        </Badge>
        <span
          style={{
            fontWeight: "700",
            fontSize: "1.25rem",
          }}
        >
          {score} / {totalAnswered}
        </span>
        <Badge
          variant="outline"
          style={{
            fontSize: "0.875rem",
            padding: "0.25rem 0.75rem",
            backgroundColor: "#fef2f2",
            color: "#b91c1c",
            borderColor: "#fecdd3",
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
        >
          <XIcon size={14} /> {totalAnswered - score} Incorrect
        </Badge>
      </div>
    </div>
  );
};

export default ScoreTracker;
