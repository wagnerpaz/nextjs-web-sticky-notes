import { StickyNote } from "components/StickyNotesBoard";
import { useCallback } from "react";
import debounce from "lodash.debounce";

export default function usePutStickyNote() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounced = useCallback(
    debounce(
      (stickyNote: StickyNote) =>
        new Promise((resolve, reject) => {
          fetch(`/api/sticky-notes/${stickyNote.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(stickyNote),
          })
            .then((resp) => resp.json())
            .then((data) => resolve(data));
        }),
      200
    ),
    []
  );
  return debounced;
}
