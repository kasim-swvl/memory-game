import { useGame } from "../../utils";
import CardBoard from "../CardBoard/CardBoard";
import Container from "../Container";
import IfThen from "../IfThen";
import { MainMenu, EndMenu, PauseMenu } from "../Menus";
import ScoreBar from "../ScoreBar";
import GameContext from "./Game.context";

function Game() {
  const game = useGame();
  return (
    <GameContext.Provider value={game}>
      <Container>
        <MainMenu visible={game.state.status === -1} />
        <PauseMenu visible={game.state.status === 1} />
        <EndMenu visible={game.state.status === 2} />
        <IfThen condition={game.state.status !== -1}>
          <ScoreBar />
          <CardBoard />
        </IfThen>
      </Container>
    </GameContext.Provider>
  );
}

export default Game;
