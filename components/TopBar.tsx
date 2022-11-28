import Image from "next/image";
import React from "react";

import { StickyNote } from "./StickyNotesBoard";

import styles from "./TopBar.module.scss";

const TopBar: React.FC<Props> = ({
  selectedStickyNote,
  onAddClick,
  onRemoveClick,
}) => {
  return (
    <div className={styles.container}>
      <Image src="/favicon.ico" alt="Logo Image" width={16} height={16} />
      <h1 className={styles.title}>e-core Sticky Notes Challenge</h1>
      <div className={styles.separator} />
      <span className={styles.button} onClick={onAddClick}>
        Add
      </span>
      <>
        <div className={styles.separator} />
        <span
          className={styles.button}
          onClick={() => {
            onRemoveClick(selectedStickyNote);
          }}
        >
          Remove
        </span>
      </>
    </div>
  );
};

interface Props {
  selectedStickyNote?: StickyNote;
  onAddClick: () => void;
  onRemoveClick: (stickyNote?: StickyNote) => void;
}

export default TopBar;
