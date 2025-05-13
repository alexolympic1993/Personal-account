import { useQuery } from "@tanstack/react-query";
import { fetchNoteList } from "../../api/Note";
import { Loader } from "../Loader";
import { NotesListView } from "./NotesListView";
import { queryClient } from "../../api/queryClient";

export const FetchNoteListView = () => {
    const postListQuery = useQuery(
        {
            queryFn: () => fetchNoteList(),
            queryKey: ["notes"]
        },
        queryClient
    )

    switch (postListQuery.status) {
        case "pending":
            return <Loader />

        case "success":
            return <NotesListView postList = { postListQuery.data.list} />

        case "error":
            return (
                <div>
                    <span>Произошла ошибка :(</span>

                    <button onClick={() => postListQuery.refetch()}>
                        Повторить запрос
                    </button>
                </div>
            )
    }
}