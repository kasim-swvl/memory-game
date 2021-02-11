import { useEffect, useRef, useState } from "react";
import { helpers as _ } from "../../utils";
import { GAME } from "../../constants";
import { randomText } from "../../utils/helpers";

const defaultState = {
  mode: GAME.modes.letters.value,
  difficulty: GAME.difficulties.easy.value,
  idealTime: GAME.difficulties.easy.time,
  elapsedTime: GAME.difficulties.easy.time,
  score: 0,
  moves: 0,
  status: -1,
  rating: null,
  cards: [],
};

function dataProcessor(d, m) {
  return _.pipe(
    _.repeat(2),
    _.flatten,
    _.shuffle,
    _.fnMap(i => ({
      value: i,
      paired: false,
      visible: false,
      type: m.slice(0, -1),
    }))
  )(d);
}

export default function useGame() {
  const [state, setState] = useState(defaultState);
  const countdown = useRef(null);

  const startTimer = () => {
    countdown.current = setInterval(() => {
      setState(s => _.merge(s, { elapsedTime: s.elapsedTime + 1 }));
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(countdown.current);
  };

  const getCards = (m, d) => {
    const list = GAME.modes[m].list;
    const count = GAME.difficulties[d].count;
    const data = _.pickRandomX(count / 2, list);
    return dataProcessor(data, m);
  };

  const addMove = () => {
    setState(s => _.merge(s, { moves: s.moves + 1 }));
  };

  const addScore = () => {
    setState(s => _.merge(s, { score: s.score + 20 }));
  };

  const updateCards = cards => {
    setState(s => _.merge(s, { cards }));
  };

  const getRating = () => {
    const {
      cards: { length: cards },
      moves,
      score,
      idealTime,
      elapsedTime,
    } = state;
    const idealMoves = cards * 2;
    const movesRatio = moves === 0 ? 0 : idealMoves / moves;

    const idealScore = (cards / 2) * 20;
    const scoreRatio = score / idealScore;

    const timeRatio = elapsedTime ? idealTime / elapsedTime : 1;

    const rating = Math.floor(scoreRatio + movesRatio * timeRatio);
    return Math.max(0, Math.min(rating, 3));
  };

  const startGame = ({ mode, difficulty }) => {
    return new Promise(resolve => {
      setTimeout(() => {
        setState({
          sessionId: randomText(),
          mode,
          difficulty,
          cards: getCards(mode, difficulty),
          idealTime: GAME.difficulties[difficulty].time,
          elapsedTime: 0,
          score: 0,
          moves: 0,
          status: 0,
          rating: null,
        });
        startTimer();
        resolve();
      }, Math.round(Math.random() * 1500));
    });
  };

  const pauseGame = () => {
    stopTimer();
    setState(s => _.merge(s, { status: 1 }));
  };

  const resumeGame = () => {
    startTimer();
    setState(s => _.merge(s, { status: 0 }));
  };

  const endGame = () => {
    clearInterval(countdown.current);
    setState(s => _.merge(s, { status: 2, rating: getRating() }));
  };

  const playAgain = () => {
    setState(s =>
      _.merge(s, {
        sessionId: randomText(),
        cards: getCards(s.mode, s.difficulty),
        idealTime: GAME.difficulties[s.difficulty].time,
        elapsedTime: 0,
        score: 0,
        moves: 0,
        status: 0,
        rating: null,
      })
    );
    startTimer();
  };

  const resetGame = () => {
    setState(defaultState);
  };

  useEffect(() => {
    return stopTimer;
  }, []);

  return {
    state,
    startGame,
    endGame,
    resetGame,
    pauseGame,
    resumeGame,
    playAgain,
    addMove,
    addScore,
    updateCards,
    getRating,
  };
}
