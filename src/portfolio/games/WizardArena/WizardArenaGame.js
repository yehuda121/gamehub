// import React from "react";
// import "./WizardArenaGame.css";

// function WizardArenaGame() {
//   return (
//     <div className="wizard-game-container">
//         <h1 className="wizard-game-title">Wizard Arena 3D</h1>
//         <p className="wizard-game-note">
//             This game was built in Unity and exported using WebGL.  
//             Loading may take a few seconds depending on your browser.
//         </p>
//         <div className="wizard-game-frame-wrapper">
//             <iframe
//             src={`${process.env.PUBLIC_URL}/unity/wizard-arena/index.html`}
//             title="Wizard Arena 3D"
//             className="wizard-game-frame"
//             loading="lazy"
//             />
//         </div>
//     </div>
//   );
// }

// export default WizardArenaGame;
import React from "react";
import "./WizardArenaGame.css";

function WizardArenaGame() {
  return (
    <div className="wizardarena-page">
      <div className="wizardarena-header">
        <h1 className="wizardarena-title">Wizard Arena 3D</h1>
        <p className="wizardarena-subtitle">
          A 3D action prototype built in Unity. This WebGL version may take a moment to load.
        </p>
      </div>

      <div className="wizardarena-frame-wrapper">
        <iframe
          src={`${process.env.PUBLIC_URL}/unity/wizard-arena/index.html`}
          title="Wizard Arena 3D"
          className="wizardarena-frame"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default WizardArenaGame;
