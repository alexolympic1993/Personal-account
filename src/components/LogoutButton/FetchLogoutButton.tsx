import { useQuery } from "@tanstack/react-query"
import { endAuthUser } from "../../api/User"
import { queryClient } from "../../api/queryClient"
import { Loader } from "../Loader"
import { LoginForm } from "../LoginForm"

export const FetchLogoutUser = () => {
    const userQuery = useQuery(
        {
        queryFn: () => endAuthUser(),
        queryKey: ['users'],
        },
    queryClient
)

    switch (userQuery.status) {
        case "pending":
            return <Loader/>
        
        case "success":
            return <LoginForm />

        case "error":
            return <div>
                <span>Произошла ошибка :(</span>
                <span onClick={() => userQuery.refetch()}>Попробовать еще раз</span>
            </div>
    }
   

        

}