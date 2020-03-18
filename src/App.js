import React from "react";
import logo from "./logo.svg";
import "./App.css";

import recognizeMic from "watson-speech/speech-to-text/recognize-microphone";

function App() {
  function onListenClick() {
    fetch("http://localhost:3002/api/speech-to-text/token")
      .then(function(response) {
        return response.json();
      })
      .then(function(token) {
        var stream = recognizeMic(
          Object.assign(token, {
            objectMode: true, // send objects instead of text
            format: false // optional - performs basic formatting on the results such as capitals an periods
          })
        );

        stream.on("data", function(data) {
          console.log(data);
        });

        stream.on("error", function(err) {
          console.log(err);
        });

        document.querySelector("#stop").onclick = stream.stop.bind(stream);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <button onClick={onListenClick}>Listen to microphone</button>
    </div>
  );
}

export default App;
