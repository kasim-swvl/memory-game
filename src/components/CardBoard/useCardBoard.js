import { useContext, useEffect, useState } from "react";
import { helpers as _ } from "../../utils";
import GameContext from "../Game/Game.context";

export default function useCardBoard() {
  const {
    state: { cards },
    addMove,
    addScore,
    endGame,
    updateCards,
  } = useContext(GameContext);
  const [last, setLast] = useState(null);
  const allPaired = cards.filter(c => c.paired).length === cards.length;

  const idxFilter = idx => (c, i) => {
    return i !== idx && c.visible && c.value === cards[idx].value;
  };

  const showCard = idx => {
    if (cards[idx].visible) return;
    cards[idx].visible = true;
    updateCards([...cards]);
    setLast(idx);
    addMove();
  };

  const pairCard = (idx, cards) => {
    const pairIdx = cards.findIndex(idxFilter(idx));
    cards[idx].paired = true;
    cards[pairIdx].paired = true;
    updateCards([...cards]);
    addScore();
  };

  const hideUnpairedCards = cards => {
    updateCards(cards.map(c => (c.paired ? c : { ...c, visible: false })));
  };

  useEffect(() => {
    // If only one card is shown.
    if (cards.filter(c => c.visible).length === 1) return;

    // If only one unpiared card is shown.
    if (cards.filter(c => c.visible && !c.paired).length === 1) return;

    // If a match is found for the last clicked card.
    if (cards.find(idxFilter(last))) {
      pairCard(last, cards);
      return;
    }

    // Hide all unpaired cards.
    let timeoutId = setTimeout(() => {
      hideUnpairedCards(cards);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [last]);

  useEffect(() => {
    if (allPaired) setTimeout(endGame, 200);
  }, [allPaired]);

  return { cards, showCard };
}
