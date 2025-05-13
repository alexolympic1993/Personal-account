import "./LoginForm.css";
import { FormField } from "../FormField";
import { Button } from "../Button";
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "../../api/queryClient"
import { loginUser } from "../../api/User"
import { FC, FormEventHandler, useState } from "react";

export const LoginForm: FC = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

 const loginMutation = useMutation(
  {
    mutationFn: () => loginUser(email, password),
    onSuccess() {
      queryClient.invalidateQueries({queryKey: ["users", "me"]})
    },
  },
    queryClient
  )

  const handleSubmit: FormEventHandler<HTMLFormElement> =(event) => {
    event.preventDefault()

    loginMutation.mutate()
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <FormField label="Email">
        <input
          type="email"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          required
          minLength={5}
        />
      </FormField>
      <FormField label="Пароль">
        <input
          type="password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          required
          minLength={8}
        />
      </FormField>

      {loginMutation.error && <span>{loginMutation.error.message}</span>}

      <Button type="submit" isLoading ={loginMutation.isPending}>Войти</Button>
    </form>
  );
};
