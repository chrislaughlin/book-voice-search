import { useState, useEffect } from "react";

import "./styles.css";
import Mic from "./microphone-black-shape.svg";

let speech;
if (window.webkitSpeechRecognition) {
  // eslint-disable-next-line
  const SpeechRecognition = webkitSpeechRecognition;
  speech = new SpeechRecognition();
  speech.continuous = true;
} else {
  speech = null;
}

export default function App() {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState("");

  const listen = () => {
    setIsListening(!isListening);
    if (isListening) {
      speech.stop();
    } else {
      speech.start();
    }
  };

  useEffect(() => {
    speech.onresult = (event) => {
      setText(event.results[event.results.length - 1][0].transcript);
    };
  }, []);

  return (
    <>
      <div className="app">
        <h2>Book Voice Search</h2>
        <h3>Click the Mic and say an autors name</h3>
        <div>
          <img
            className={`microphone ${isListening && "isListening"}`}
            src={Mic}
            alt="microphone"
            onClick={listen}
          />
        </div>
        <p>{text}</p>
      </div>
      <div className="icon-reg">
        Icons made by{" "}
        <a
          href="https://www.flaticon.com/authors/dave-gandy"
          title="Dave Gandy"
        >
          Dave Gandy
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </>
  );
}
