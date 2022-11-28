import { StickyNote } from "components/StickyNotesBoard";

export default function useDeleteStickyNote() {
  return (stickyNote: StickyNote) =>
    new Promise<StickyNote>((resolve, reject) => {
      fetch(`/api/sticky-notes/${stickyNote.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stickyNote),
      })
        .then((resp) => resp.json())
        .then((data) => resolve(data));
    });
}
