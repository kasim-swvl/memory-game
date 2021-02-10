/* eslint-disable array-callback-return */
import { createRef, useCallback, useEffect, useRef, useState } from "react";
import { clamp } from "./helpers";

export default function useKeyboard(length, columns) {
  const [focused, setFocused] = useState(0);
  const refs = useRef(Array.from({ length }).map(_ => createRef()));

  const focus = useCallback(
    idx => {
      const _idx = clamp(0, length - 1, focused + idx);
      refs.current[_idx].current.focus();
    },
    [focused, length]
  );

  const handleRefFocus = useCallback(idx => {
    setFocused(idx);
  }, []);

  const handleKeyUp = useCallback(
    e => {
      switch (e.code) {
        case "ArrowUp":
          focus(-columns);
          break;
        case "ArrowRight":
          focus(+1);
          break;
        case "ArrowDown":
          focus(+columns);
          break;
        case "ArrowLeft":
          focus(-1);
          break;
        case "Space":
        case "Enter":
          refs.current[focused].current.click();
          break;
        default:
          break;
      }
    },
    [columns, focus, focused]
  );

  useEffect(() => {
    const _refs = refs.current;
    _refs.map((ref, idx) => {
      ref.current.addEventListener("focus", () => handleRefFocus(idx));
    });

    // Set focus on the first card on mount
    focus(0);

    return () => {
      _refs.map((ref, idx) => {
        ref.current.removeEventListener("focus", () => handleRefFocus(idx));
      });
    };
  }, []);

  return { refs, focus, handleKeyUp };
}
