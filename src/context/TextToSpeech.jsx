import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { useLocation } from "react-router-dom";

const SpeechContext = createContext();

export const useSpeech = () => useContext(SpeechContext);

export const SpeechProvider = ({ children }) => {
  const textRef = useRef(null);
  const [speaking, setSpeaking] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const location = useLocation();

  const handleSpeak = () => {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    } else if (textRef.current) {
      const fullText = textRef.current.textContent;
      const remainingText = fullText.slice(currentIndex);
      const utterance = new SpeechSynthesisUtterance(remainingText);

      utterance.onboundary = (event) => {
        if (event.name === "word") {
          setCurrentIndex(event.charIndex);
        }
      };

      utterance.onend = () => {
        setSpeaking(false);
        setCurrentIndex(0);
      };

      window.speechSynthesis.speak(utterance);
      setSpeaking(true);
    }
  };

  useEffect(() => {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }

    return () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, [location]);

  return (
    <SpeechContext.Provider
      value={{ handleSpeak, textRef, speaking, setSpeaking }}
    >
      {children}
    </SpeechContext.Provider>
  );
};

export default SpeechProvider;
