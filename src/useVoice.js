import { useState, useEffect } from "react";

let speech;
if (window.webkitSpeechRecognition) {
  // eslint-disable-next-line
  const SpeechRecognition = webkitSpeechRecognition;
  speech = new SpeechRecognition();
  speech.continuous = true;
} else {
  speech = null;
}

const useVoice = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);

  const listen = () => {
    setIsListening(!isListening);
    if (isListening) {
      speech.stop();
    } else {
      speech.start();
    }
  };

  useEffect(() => {
    if (!speech) {
      return;
    }
    speech.onresult = (event) => {
      setText(event.results[event.results.length - 1][0].transcript);
      setIsListening(false);
      speech.stop();
    };
  }, []);

  return {
    text,
    isListening,
    listen,
    voiceSupported: speech !== null
  };
};

export { useVoice };
