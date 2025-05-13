import { FC, FormEventHandler, useState } from "react";
import { FormField } from "../FormField";
import { Button } from "../Button";
import "./NoteForm.css";
import { useMutation } from "@tanstack/react-query";
import { createNote } from "../../api/Note";
import { queryClient } from "../../api/queryClient";
import { FetchNoteListView } from "../NotesListView/FetchNoteListView";


export interface IPostFormProps{}

export const NoteForm: FC<IPostFormProps> = () => {
  const [text, setText] = useState("")
  const [title, setTitle] = useState("")

  const createNoteMutation = useMutation(
    {
    mutationFn: () => createNote(title, text),
    onSuccess(){
      queryClient.invalidateQueries({queryKey: ["notes"]}),
      setText('')
      setTitle('')
    }
    },
    queryClient
  )

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    createNoteMutation.mutate()
  }

    return (
      <div>
      <form className="note-form" onSubmit={handleSubmit}>
        <FormField label="Заголовок">
          <input type="text"
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
          required
          minLength={5}
          />
        </FormField>
        <FormField label="Текст">
          <textarea
            value={text}
            onChange={(event) => setText(event.currentTarget.value)}
            required
            minLength={10}
            maxLength={300}
          />
        </FormField>
        <Button type="submit" isLoading={createNoteMutation.isPending}>Сохранить</Button>
      </form>
      <FetchNoteListView />
      </div>
     
    );
  };





