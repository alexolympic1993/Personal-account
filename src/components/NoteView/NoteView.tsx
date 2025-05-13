import "./NoteView.css";
import { FC } from "react";
import { Note } from "../../api/Note";


const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

interface NoteViewProps {
  post: Note
}

export const NoteView: FC<NoteViewProps> = ({ post }) => {
  return (
    <div className="note-view">
      <div className="note-view__head">
        <p className="note-view__datetime">{formatDate(post.createdAt)}</p>
        <p className="note-view__title">{post.title}</p>
      </div>

      <p className="note-view__text">
        {post.text}
      </p>
    </div>
  );
};
