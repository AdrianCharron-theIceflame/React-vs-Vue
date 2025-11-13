import './css/Home.css'

import { useEffect, type ReactElement, useState } from "react"
import { Link } from 'react-router-dom'

import type { UserModel } from "../types/appTypes"

function Home(): ReactElement {
    const [error, setError] = useState<null | string>(null)
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const [users, setUsers] = useState<UserModel[] | null>(null)
    useEffect(() => {
        (async function () {
            setIsLoaded(false)
            await fetch("https://jsonplaceholder.typicode.com/users/")
                .then(response => response.json())
                .then(data => {
                    setUsers(data)
                }).catch((e: string) => {
                    setError(e)
                })
            setIsLoaded(true)
        })()
    }, [])
    return (
        <div>
            <h1>
                {!isLoaded ?
                    "Loading User..." :
                    error !== null ?
                        error :
                        "User List"
                }
            </h1>
            {users === null ?
                null :
                (<ul>
                    {users.map(user => (
                        <li key={user.id}>
                            <Link to={`users/${user.id}`}>{user.name}</Link>
                        </li>
                    ))}
                </ul>)
            }
        </div>
    )
}

export default Home