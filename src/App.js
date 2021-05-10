import React, { useEffect } from 'react';
import { useVoice } from './useVoice';
import Mic from './microphone-black-shape.svg'
import { useBookFetch } from './useBookFetch';

const App = () => {
  const {
    text,
    isListening,
    listen,
  } = useVoice();
  const {
    authorBooks,
    isFetchingBooks,
    fetchBooksByAuthor,
  } = useBookFetch();

  useEffect(() => {
    if (text !== '') {
      fetchBooksByAuthor(text);
    }
  }, [text])

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
        {
          isFetchingBooks ?
            'fetching books....' :
            <ul>
              {
                authorBooks.map((book, index) => {
                  return (
                    <li key={index}>
                      <span>
                        {book.title}
                      </span>
                    </li>
                  )
                })
              }
            </ul>

        }

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
  )
}

export default App;