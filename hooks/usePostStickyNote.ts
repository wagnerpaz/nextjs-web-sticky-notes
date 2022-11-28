import { StickyNote } from "components/StickyNotesBoard";

export default function usePostStickyNote() {
  return (stickyNote: StickyNote) =>
    new Promise<StickyNote>((resolve, reject) => {
      fetch("/api/sticky-notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stickyNote),
      })
        .then((resp) => resp.json())
        .then((data) => resolve(data));
    });
}
