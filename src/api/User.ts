import { z } from 'zod'
import { validateResponse } from './validateResponse'

export const UserSchema = z.object({
    id: z.string(), 
    email: z.string(),
    username: z.string()
})

export type User = z.infer<typeof UserSchema>

export function fetchUser(id: string): Promise<User> {
    return fetch(`api/users/${id}`)
    .then((response) => response.json())
    .then((data) => UserSchema.parse(data))
}

//регистрация нового пользователя
export function registerUser(
    username: string,
    email: string,
    password: string
): Promise<void> {
    return fetch("api/register", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password}),
    }).then(() => undefined)
}

//авторизация пользователя
export function loginUser(
    email: string,
    password: string
): Promise<void> {
    return fetch("api/login", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password}),
    })
        .then(validateResponse)
        .then(() => undefined)
}

//получение данных о текущем пользователе
export function dataUser(): Promise<User> {
    return fetch("api/users/me")
    .then(validateResponse)
    .then  ((response) => response.json())
    .then((data) => UserSchema.parse(data))

}

//прекращение авторизации пользователя
export function endAuthUser(): Promise<void> {
    return fetch("api/logout ", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
    }).then(() => undefined)
}