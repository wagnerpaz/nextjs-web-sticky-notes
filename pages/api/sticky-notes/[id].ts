import { StickyNote } from "components/StickyNotesBoard";
import type { NextApiRequest, NextApiResponse } from "next";

import { removeUnwantedPropsBody, validateBody } from ".";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<StickyNote | string | {}>
) {
  if (req.method === "PUT") {
    if (validateBody(req.body)) {
      const stickyNote = removeUnwantedPropsBody(req.body);
      const stickyNotes = globalThis.api.stickies;
      const index = stickyNotes.findIndex((sn) => sn.id == req.query.id);
      if (index >= 0) {
        stickyNotes[index] = stickyNote as StickyNote;
        res.status(200).send(stickyNote as StickyNote);
      } else {
        res.status(404).json({});
      }
    } else {
      res.status(400).send("Invalid body");
    }
  } else if (req.method === "DELETE") {
    const stickyNotes = globalThis.api.stickies;
    const index = stickyNotes.findIndex((sn) => sn.id == req.query.id);
    const stickyNote = stickyNotes[index];
    stickyNotes.splice(index, 1);
    res.status(200).json(stickyNote);
  } else {
    res.status(404).json({});
  }
}
