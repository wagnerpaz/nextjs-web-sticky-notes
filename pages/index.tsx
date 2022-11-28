import { useContext, useState } from "react";
import Head from "next/head";

import StickyNotesBoard, { StickyNote } from "components/StickyNotesBoard";
import TopBar from "components/TopBar";
import AddStickyNoteModal from "components/AddStickyNoteModal";
import usePostStickyNote from "hooks/usePostStickyNote";
import StickiesContext, { StickiesProvider } from "context/StickiesContext";

import styles from "../styles/StickyNotesApp.module.css";
import useDeleteStickyNote from "hooks/useDeleteStickyNote";

const App = () => {
  return (
    <StickiesProvider>
      <StickyNotesApp />
    </StickiesProvider>
  );
};

const StickyNotesApp = () => {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [selectedStickyNote, setSelectedStickyNote] = useState<StickyNote>();

  const { stickies, setStickies } = useContext(StickiesContext);
  const postStickyNote = usePostStickyNote();
  const deleteStickyNote = useDeleteStickyNote();

  const handleAddClick = () => {
    setAddModalVisible(true);
  };

  const handleRemoveClick = (selectedStickyNote: StickyNote) => {
    if (selectedStickyNote) {
      deleteStickyNote(selectedStickyNote).then(() => {
        setStickies(stickies.filter((s) => s.id !== selectedStickyNote.id));
      });
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Stick Notes Challenge (e-core)</title>
        <meta
          name="description"
          content="A basic sticky notes app created for a challenge given by the e-core company as part of the vetting process."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <StickyNotesBoard
        onStickyNoteSelectionChange={(selected) =>
          setSelectedStickyNote(selected)
        }
      />
      <TopBar
        selectedStickyNote={selectedStickyNote}
        onAddClick={handleAddClick}
        onRemoveClick={handleRemoveClick}
      />
      {addModalVisible && (
        <AddStickyNoteModal
          onCancel={() => setAddModalVisible(false)}
          onSubmit={(stickyNote) => {
            postStickyNote(stickyNote).then((stickyNote) => {
              setStickies([...stickies, stickyNote]);
            });
            setAddModalVisible(false);
          }}
        />
      )}
    </div>
  );
};

export default App;
