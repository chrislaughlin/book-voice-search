import React from 'react';
import { useVoice } from './useVoice';

const HookedSpeech = () => {
    const {
        text,
        isListening,
        listen,
    } = useVoice();

    return (
        <>
            <button
                onClick={listen}
            >
                { isListening ? 'Stop' : 'Start' }
            </button>
            <div>
                {text}
            </div>
        </>
    )
}

export default HookedSpeech;