import { useState, useEffect } from 'react';

const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
const speech = new SpeechRecognition();
speech.continuous = true;

const useVoice = () => {
    const [text, setText] = useState('');
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
        speech.onresult = event => {
            setText(event.results[event.results.length - 1][0].transcript);
            setIsListening(false);
            speech.stop();
        };
    }, [])

    return {
        text, 
        isListening,
        listen,
    };
}

export {
    useVoice,
};
