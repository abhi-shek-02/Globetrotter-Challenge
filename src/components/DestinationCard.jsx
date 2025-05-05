import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { getRandomFunFact, getRandomTrivia } from "../lib/gameLogic";
import { CheckIcon, XIcon } from "lucide-react";

const DestinationCard = ({
  destination,
  clues,
  options,
  selectedOption,
  isCorrect,
  onSelectOption,
  onNextQuestion,
}) => {
  const funFact = selectedOption ? getRandomFunFact(destination) : "";

  return (
    <Card
      style={{
        width: "100%",
        maxWidth: "40rem",
        margin: "0 auto",
        background: "url('passport-texture.png')",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardHeader
        style={{
          paddingBottom: "1rem",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "0.5rem",
          }}
        >
          Where am I?
        </h2>
        <div>
          {clues.map((clue, index) => (
            <p
              key={index}
              style={{
                fontStyle: "italic",
                color: "#374151",
                textAlign: "center",
                marginBottom: "0.5rem",
              }}
            >
              &ldquo;{clue}&rdquo;
            </p>
          ))}
        </div>
      </CardHeader>

      <CardContent
        style={{
          paddingTop: "1.5rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "0.5rem",
          }}
        >
          {options.map((option, index) => (
            <Button
              key={index}
              onClick={() => onSelectOption(option)}
              disabled={!!selectedOption}
              style={{
                height: "auto",
                minHeight: "3rem",
                padding: "0.75rem 1rem",
                fontSize: "1.125rem",
                justifyContent: "center",
                transition: "all 0.2s ease",
                backgroundColor:
                  selectedOption === option && isCorrect
                    ? "#16a34a"
                    : selectedOption === option && !isCorrect
                    ? "#ef4444"
                    : selectedOption && option === destination.city
                    ? "#16a34a"
                    : "#3b82f6",
                color: "white",
                cursor: selectedOption ? "not-allowed" : "pointer",
                borderRadius: "9999px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              {selectedOption === option && isCorrect && (
                <CheckIcon style={{ marginRight: "0.5rem" }} size={20} />
              )}
              {selectedOption === option && !isCorrect && (
                <XIcon style={{ marginRight: "0.5rem" }} size={20} />
              )}
              {selectedOption &&
                option === destination.city &&
                selectedOption !== option && (
                  <CheckIcon style={{ marginRight: "0.5rem" }} size={20} />
                )}
              {option}
            </Button>
          ))}
        </div>

        {selectedOption && (
          <div
            style={{
              marginTop: "1.5rem",
              padding: "1rem",
              backgroundColor: "#fef2f2",
              border: "1px solid #fcd34d",
              borderRadius: "0.5rem",
            }}
          >
            <h3
              style={{
                fontWeight: "700",
                fontSize: "1.125rem",
                marginBottom: "0.5rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ color: "#f59e0b" }}>
                Fun Fact about {destination.city}, {destination.country}:
              </span>
            </h3>
            <p
              style={{
                color: "#4b5563",
              }}
            >
              {funFact}
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter
        style={{
          display: "flex",
          justifyContent: "center",
          borderTop: "1px solid #fde68a",
          paddingTop: "1rem",
        }}
      >
        {selectedOption && (
          <Button
            onClick={onNextQuestion}
            style={{
              backgroundColor: "#f59e0b",
              color: "white",
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              borderRadius: "9999px",
              transition: "all 0.2s ease",
              cursor: "pointer",
            }}
          >
            Next Destination
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default DestinationCard;
