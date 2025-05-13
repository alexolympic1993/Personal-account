import { FormField } from "../FormField";
import { Button } from "../Button";
import "./RegisterForm.css";
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "../../api/queryClient"
import { registerUser } from "../../api/User"
import { FormEventHandler, useState } from "react";

export const RegisterForm = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

 const registerMutation = useMutation(
  {
    mutationFn: () => registerUser(username, email, password)
  },
    queryClient
  )

  const handleSubmit: FormEventHandler<HTMLFormElement> =(event) => {
    event.preventDefault()
    registerMutation.mutate()
  }

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <FormField label="Имя">
        <input
          type="username"
          name="username"
          onChange={(event) => setUsername(event.target.value)}
          value={username}
          required
          minLength={5}
        />
      </FormField>
      <FormField label="Email">
        <input
          type="email"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          required
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

      {registerMutation.error && <span>{registerMutation.error.message}</span>}

      <Button isLoading ={registerMutation.isPending}>Зарегистрироваться</Button>
    </form>
  );
};
