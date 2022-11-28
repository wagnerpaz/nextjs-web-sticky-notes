import React, { useContext, useEffect, useState } from "react";

import StickyNote from "components/StickyNote";

import styles from "./StickyNotesBoard.module.scss";
import usePutStickyNote from "hooks/usePutStickyNote";
import StickiesContext from "context/StickiesContext";

const StickyNotesBoard: React.FC<Props> = ({ onStickyNoteSelectionChange }) => {
  const { stickies, setStickies } = useContext(StickiesContext);
  const putStickyNote = usePutStickyNote();

  return (
    <div
      className={styles.container}
      onMouseDown={() => {
        setStickies(stickies.map((s) => ({ ...s, selected: false })));
        if (onStickyNoteSelectionChange) {
          onStickyNoteSelectionChange();
        }
      }}
    >
      {stickies.map((sticky) => (
        <StickyNote
          key={`${sticky.id}`}
          {...sticky}
          onSelectedChange={(selected) => {
            setStickies(
              stickies.map((s) =>
                s.id === sticky.id
                  ? { ...sticky, selected }
                  : { ...s, selected: false }
              )
            );
            if (onStickyNoteSelectionChange) {
              onStickyNoteSelectionChange(sticky);
            }
          }}
          onTextChange={(text) => {
            setStickies(
              stickies.map((s) =>
                s.id === sticky.id ? { ...sticky, text } : s
              )
            );
            putStickyNote({ ...sticky, text });
          }}
          onPositionChange={(newPosition) => {
            setStickies(
              stickies.map((s) =>
                s.id === sticky.id
                  ? {
                      ...sticky,
                      position: newPosition,
                    }
                  : s
              )
            );

            putStickyNote({ ...sticky, position: newPosition });
          }}
        />
      ))}
    </div>
  );
};

interface Props {
  onStickyNoteSelectionChange?: (sn?: StickyNote) => void;
}

export interface StickyNote {
  id?: number;
  selected?: boolean;
  position: [number, number];
  size: [number, number];
  text?: string;
}

export default StickyNotesBoard;
