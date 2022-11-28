import React, { useState } from "react";
import classNames from "classnames";

import { StickyNote } from "./StickyNotesBoard";

import styles from "./AddStickyNoteModal.module.scss";

const AddStickyNoteModal: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [stickyNote, setStickyNote] = useState<StickyNote>({
    position: [50, 60],
    size: [200, 200],
    text: "",
  });

  return (
    <>
      <div className={styles.backdrop} />
      <form
        className={styles.container}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(stickyNote);
        }}
      >
        <h2 className={styles.title}>Add Sticky Note</h2>
        <div className={styles.fieldGroup}>
          <div className={styles.fieldGroupItem}>
            <label htmlFor="x">X:</label>
            <input
              className={classNames(styles.input, styles.groupedInput)}
              type="number"
              name="x"
              value={stickyNote.position[0]}
              onChange={(e) =>
                setStickyNote({
                  ...stickyNote,
                  position: [
                    Number.parseInt(e.target.value),
                    stickyNote.position[1],
                  ],
                })
              }
            />
          </div>
          <div className={styles.fieldGroupItem}>
            <label htmlFor="y">Y:</label>
            <input
              className={classNames(styles.input, styles.groupedInput)}
              type="number"
              name="y"
              value={stickyNote.position[1]}
              onChange={(e) =>
                setStickyNote({
                  ...stickyNote,
                  position: [
                    stickyNote.position[0],
                    Number.parseInt(e.target.value),
                  ],
                })
              }
            />
          </div>
        </div>
        <div className={styles.fieldGroup}>
          <div className={styles.fieldGroupItem}>
            <label htmlFor="width">Width:</label>
            <input
              className={classNames(styles.input, styles.groupedInput)}
              type="number"
              name="width"
              value={stickyNote.size[0]}
              onChange={(e) =>
                setStickyNote({
                  ...stickyNote,
                  size: [Number.parseInt(e.target.value), stickyNote.size[1]],
                })
              }
            />
          </div>
          <div className={styles.fieldGroupItem}>
            <label htmlFor="height">Height:</label>
            <input
              className={classNames(styles.input, styles.groupedInput)}
              type="number"
              name="height"
              value={stickyNote.size[1]}
              onChange={(e) =>
                setStickyNote({
                  ...stickyNote,
                  size: [stickyNote.size[0], Number.parseInt(e.target.value)],
                })
              }
            />
          </div>
        </div>
        <div>
          <label htmlFor="text">Text:</label>
          <textarea
            rows={3}
            className={classNames(styles.input, styles.groupedInput)}
            name="text"
            draggable={false}
            value={stickyNote.text}
            onChange={(e) =>
              setStickyNote({ ...stickyNote, text: e.target.value })
            }
          />
        </div>
        <div className={styles.footer}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button className={styles.submitButton} type="submit">
            Add
          </button>
        </div>
      </form>
    </>
  );
};

interface Props {
  onSubmit: (stickyNote: StickyNote) => void;
  onCancel: () => void;
}

export default AddStickyNoteModal;
