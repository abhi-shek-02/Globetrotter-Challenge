import { getRandomCities } from "./destinations";

export const getRandomClues = (destination, count = 1) => {
  if (destination.clues.length <= count) {
    return [...destination.clues];
  }
  const shuffledClues = [...destination.clues];
  return shuffledClues;
};

export const getRandomFunFact = (destination) => {
  const index = Math.floor(Math.random() * destination.fun_fact.length);
  return destination.fun_fact[index];
};

export const getRandomTrivia = (destination) => {
  const index = Math.floor(Math.random() * destination.trivia.length);
  return destination.trivia[index];
};

// Function to get multiple choice options
export const getMultipleChoiceOptions = (correctCity, optionCount = 4) => {
  // Get random incorrect cities
  const incorrectOptions = getRandomCities(correctCity, optionCount - 1);

  // Combine with correct city
  const allOptions = [...incorrectOptions, correctCity];

  // Shuffle to randomize position of correct answer
  return allOptions.sort(() => 0.5 - Math.random());
};

export const generateShareUrl = (username, score) => {
  const baseUrl = window.location.origin;
  return `${baseUrl}?challenge=true&username=${encodeURIComponent(
    username
  )}&score=${score}`;
};

export const generateWhatsAppLink = (username, score) => {
  const shareUrl = generateShareUrl(username, score);
  const shareText = `🌍 I scored ${score} points in The Globetrotter Challenge! Can you beat my score? Join me at: ${shareUrl}`;
  return `https://wa.me/?text=${encodeURIComponent(shareText)}`;
};

export const getUrlParams = () => {
  const params = new URLSearchParams(window.location.search);

  return {
    username: params.get("username") || undefined,
    score: params.get("score") ? parseInt(params.get("score")) : undefined,
    challenge: params.get("challenge") === "true",
  };
};
