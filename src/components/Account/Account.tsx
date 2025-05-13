import { useQuery } from "@tanstack/react-query"
import { dataUser } from "../../api/User"
import { Loader } from "../Loader";
import { AuthForm } from "../AuthForm";
import { NoteForm } from "../NoteForm";
import { queryClient } from "../../api/queryClient";
import { LogoutButton } from "../LogoutButton";
import { UserView } from "../UserView";
import "./Account.css"


export const Account = () => {
    const meQuery = useQuery(
    {
        queryFn: () => dataUser(),
        queryKey: ["users", "me"]
    },
    queryClient
)

    switch (meQuery.status) {
        case "pending":
            return <Loader />
        case "error":
            return <AuthForm />
        case "success":
            return (
                <div className="account">
                <UserView user = {meQuery.data} />
                <NoteForm />
                <LogoutButton />
     
                </div>
            )
    }
}
