import { useEffect, useState } from "react";

import { StickyNote } from "components/StickyNotesBoard";

export default function useStickies() {
  const [stickies, setStickies] = useState<StickyNote[]>([]);

  console.log("stickies");

  useEffect(() => {
    fetch("/api/sticky-notes")
      .then((response) => response.json())
      .then((data) => {
        setStickies(data as StickyNote[]);
      });
  }, []);

  return { stickies, setStickies };
}
