import React from "react";
import "./App.css";

import recognizeMic from "watson-speech/speech-to-text/recognize-microphone";

function App() {
  function onListenClick() {
    fetch("https://localhost:3002/api/speech-to-text/token")
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
      <button onClick={onListenClick}>Listen to microphone</button>
    </div>
  );
}

export default App;
