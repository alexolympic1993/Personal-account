import "./NotesListView.css";
import { NoteView } from "../NoteView";
import { FC } from "react";
import { NoteList } from "../../api/Note";

interface NoteListViewProps {
  postList: NoteList
}

export const NotesListView: FC<NoteListViewProps> = ( {postList} ) => {
  return (
    <ul className="note-list-view">
      {postList.map((post) => (
        <li key={post.id}>
          <NoteView post= {post} />
        </li>
      ))}
    </ul>
  );
};
