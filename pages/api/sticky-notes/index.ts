import type { NextApiRequest, NextApiResponse } from "next";

import { StickyNote } from "components/StickyNotesBoard";

export function validateBody(body: any, includeId?: boolean) {
  let validated = true;
  if (includeId) {
    validated &&= body.id !== undefined;
  }
  validated &&=
    body.position !== undefined &&
    Array.isArray(body.position) &&
    body.position.length === 2;
  validated &&=
    body.size !== undefined &&
    Array.isArray(body.size) &&
    body.size.length === 2;
  return validated;
}

export function removeUnwantedPropsBody(body: any) {
  return Object.keys(body).reduce(
    (res, curr) =>
      ["id", "selected", "position", "size", "text"].includes(curr)
        ? { ...res, [curr]: body[curr] }
        : res,
    {}
  );
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<StickyNote | StickyNote[] | string>
) {
  const stickyNotes = globalThis.api.stickies;
  if (req.method === "GET") {
    res.status(200).json(stickyNotes);
  } else if (req.method === "POST") {
    if (validateBody(req.body)) {
      const stickyNote = removeUnwantedPropsBody(req.body) as StickyNote;
      stickyNote.id =
        stickyNotes
          .map((sn) => sn.id || 0)
          .reduce((max, curr) => Math.max(max, curr), 0) + 1;
      stickyNotes.push(stickyNote);
      res.status(200).json(stickyNote);
    } else {
      res.status(400).send("Invalid body");
    }
  }
}
