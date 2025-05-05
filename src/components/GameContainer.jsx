import React, { useState, useEffect } from "react";
import {
  getRandomDestination,
  getDestinationByCity,
} from "../lib/destinations";
import {
  getMultipleChoiceOptions,
  getRandomClues,
  getUrlParams,
} from "../lib/gameLogic";
import GameHeader from "./GameHeader";
import DestinationCard from "./DestinationCard";
import ScoreTracker from "./ScoreTracker";

import { toast } from "sonner";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { WhatsApp } from "@mui/icons-material";
import { generateWhatsAppLink } from "../lib/gameLogic";
const GameContainer = () => {
  const [currentDestination, setCurrentDestination] = useState(null);
  const [clues, setClues] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [username, setUsername] = useState("Abhishek");

  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);

  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);

  useEffect(() => {
    const {
      username: challengerName,
      score: challengerScore,
      challenge,
    } = getUrlParams();

    if (challenge && challengerName && challengerScore !== undefined) {
      toast(
        `${challengerName} challenged you to beat their score of ${challengerScore}!`,
        {
          duration: 5000,
          icon: "🏆",
        }
      );
    }
  }, []);

  // Initialize game
  useEffect(() => {
    loadNewDestination();
  }, []);

  const loadNewDestination = () => {
    const destination = getRandomDestination();
    console.log("destination", destination);
    const newClues = getRandomClues(destination, 2);
    console.log("newClues", newClues);
    const newOptions = getMultipleChoiceOptions(destination.city);

    setCurrentDestination(destination);
    setClues(newClues);
    setOptions(newOptions);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const handleOptionSelect = (option) => {
    if (selectedOption) return;

    setSelectedOption(option);
    const correct = option === currentDestination.city;
    setIsCorrect(correct);

    if (correct) {
      setScore((prev) => prev + 1);

      toast.success("That's correct! Well done!");
    } else {
      toast.error(`Incorrect! The answer was ${currentDestination.city}.`);
    }

    setTotalAnswered((prev) => prev + 1);
  };

  const handleNextQuestion = () => {
    loadNewDestination();
  };

  const handleUsernameChange = (newUsername) => {
    setUsername(newUsername);
    localStorage.setItem("username", newUsername);
  };

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);
  //Methods related to Challenge Modal
  const handleChallenge = () => {
    setIsChallengeModalOpen(true);
  };
  const handleModalClose = () => {
    setIsChallengeModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <GameHeader onChallenge={handleChallenge} />

      <ScoreTracker score={score} totalAnswered={totalAnswered} />

      {currentDestination && (
        <DestinationCard
          destination={currentDestination}
          clues={clues}
          options={options}
          selectedOption={selectedOption}
          isCorrect={isCorrect}
          onSelectOption={handleOptionSelect}
          onNextQuestion={handleNextQuestion}
        />
      )}
      {/* Challenge Friend Modal */}
      <Dialog
        open={isChallengeModalOpen}
        onClose={handleModalClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: "bold", color: "#1e3a8a" }}>
          Challenge a Friend
        </DialogTitle>

        <DialogContent dividers>
          <Typography variant="body2" color="textSecondary" mb={2}>
            Share your score and challenge your friends to beat it!
          </Typography>

          <TextField
            label="Your Nickname"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter a fun nickname"
            margin="normal"
          />

          <Divider sx={{ my: 2 }} />

          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mb={2}
          >
            <Typography variant="h6" color="textSecondary" mr={1}>
              Your Score:
            </Typography>
            <Typography variant="h4" fontWeight="bold" color="primary">
              {score}
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleModalClose} variant="outlined" fullWidth>
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (!username.trim()) {
                toast.error("Please enter a username");
                return;
              }
              handleUsernameChange(username);
              const whatsAppUrl = generateWhatsAppLink(username, score);
              window.open(whatsAppUrl, "_blank");
              toast.success("Challenge link created! Sharing via WhatsApp");
            }}
            variant="contained"
            color="success"
            startIcon={<WhatsApp />}
            fullWidth
          >
            Share on WhatsApp
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GameContainer;
