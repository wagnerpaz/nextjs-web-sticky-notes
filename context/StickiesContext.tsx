import React, { Dispatch, SetStateAction } from "react";

import { StickyNote } from "components/StickyNotesBoard";
import useStickies from "hooks/useStickies";

const StickiesContext = React.createContext<Value>({
  stickies: [],
  setStickies: () => {},
});

export default StickiesContext;

export const StickiesProvider: React.FC<Props> = ({ children }) => {
  const { stickies, setStickies } = useStickies();

  return (
    <StickiesContext.Provider value={{ stickies, setStickies }}>
      {children}
    </StickiesContext.Provider>
  );
};

interface Value {
  stickies: StickyNote[];
  setStickies: Dispatch<SetStateAction<StickyNote[]>>;
}

interface Props {
  children: React.ReactElement;
}
