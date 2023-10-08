import React from "react";
import Header from "./Header";
export default function Home() {
  return (
    <div>
      <Header />
      <div>
        <center style={{ color: "green", margin: "40px" }}>
          <h1>DashBoard</h1>
        </center>
        <iframe
          src="https://giphy.com/embed/3oKIPEqDGUULpEU0aQ"
          width="480"
          height="360"
          frameBorder="0"
          class="giphy-embed"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
