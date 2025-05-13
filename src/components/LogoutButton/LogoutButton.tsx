import { Button } from "../Button";
import "./LogoutButton.css";
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "../../api/queryClient"
import { MouseEventHandler } from "react";
import { endAuthUser } from "../../api/User";


export const LogoutButton = () => {

  const EndAuthMutation = useMutation(
    {
      mutationFn: () => endAuthUser(),
      onSuccess() {
        queryClient.invalidateQueries({queryKey: ["users", "me"]})
      },
    },
      queryClient
    )

      const handleSubmit: MouseEventHandler<HTMLButtonElement> =() => {
        EndAuthMutation.mutate()
      }

  return (
    <div className="logout-button">
      <Button
      isLoading ={EndAuthMutation.isPending}
      onClick={handleSubmit}
      type="button"
      kind="secondary">Выйти</Button>
    </div>
  );
};
