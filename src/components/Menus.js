import { css } from "@emotion/css";
import { useContext, useState } from "react";
import { GAME } from "../constants";
import { helpers } from "../utils";
import Backdrop from "./Backdrop";
import GameContext from "./Game/Game.context";
import MgButton from "./MgButton";
import MgSelect from "./MgSelect";
import Rating from "./Rating";
import Text from "./Text";

const menuCss = css`
  background-color: khaki;
  border: 2px solid darkkhaki;
  border-radius: 16px;
  padding: 22px 32px 32px;
  width: 380px;
  box-shadow: 0 0 30px 5px rgba(0, 0, 0, 0.1);
  user-select: none;
  z-index: 1;
`;

const titleCss = css`
  margin-bottom: 4px;
  text-align: center;
  color: white;
  font-size: 3em;
  letter-spacing: -2px;
  text-shadow: 2px 2px #444;
  -webkit-text-stroke: 1px #666;
`;

const selectCss = css`
  margin-bottom: 8px;
`;

const btnCss = css`
  margin-top: 16px;
`;

export function MainMenu({ visible }) {
  const { startGame } = useContext(GameContext);
  const [state, setState] = useState({
    mode: GAME.modes.letters.value,
    difficulty: GAME.difficulties.easy.value,
  });
  const handleChange = key => (e, o) => {
    setState(s => helpers.merge(s, { [key]: o.value }));
  };

  return (
    <Backdrop visible={visible}>
      <div className={menuCss}>
        <Text className={titleCss}>memory game</Text>
        <MgSelect
          name="difficulty"
          label="Difficulty"
          options={Object.values(GAME.difficulties)}
          className={selectCss}
          onChange={handleChange("difficulty")}
          value={state.difficulty}
        />
        <MgSelect
          name="mode"
          label="Mode"
          options={Object.values(GAME.modes)}
          className={selectCss}
          onChange={handleChange("mode")}
          value={state.mode}
        />
        <MgButton className={btnCss} onClick={() => startGame(state)}>
          START
        </MgButton>
      </div>
    </Backdrop>
  );
}

export function EndMenu({ visible }) {
  const { state, resetGame, playAgain } = useContext(GameContext);
  const { rating } = state;

  return (
    <Backdrop visible={visible}>
      <div className={menuCss}>
        <Rating rating={rating} />
        <MgButton className={btnCss} onClick={playAgain}>
          PLAY AGAIN
        </MgButton>
        <MgButton className={btnCss} onClick={resetGame} type="secondary">
          MAIN MENU
        </MgButton>
      </div>
    </Backdrop>
  );
}

export function PauseMenu({ visible }) {
  const { resetGame, playAgain, resumeGame } = useContext(GameContext);

  return (
    <Backdrop visible={visible}>
      <div className={menuCss}>
        <MgButton className={btnCss} onClick={resumeGame}>
          RESUME
        </MgButton>
        <MgButton className={btnCss} onClick={playAgain}>
          RESTART
        </MgButton>
        <MgButton className={btnCss} onClick={resetGame} type="secondary">
          MAIN MENU
        </MgButton>
      </div>
    </Backdrop>
  );
}
