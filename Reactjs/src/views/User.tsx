import { useEffect, useState, type ReactElement } from "react"
import { useParams } from "react-router-dom"

import type { UserModel, AddressModel, CompanyModel } from "../types/appTypes"

function User(): ReactElement {
    const { id } = useParams()
    const [error, setError] = useState<null | string>(null)
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const [user, setUser] = useState<UserModel | null>(null)
    const [address, setAddress] = useState<AddressModel | null>(null)
    const [company, setCompany] = useState<CompanyModel | null>(null)

    useEffect(() => {
        (async function () {
            setIsLoaded(false)
            await fetch(`https://jsonplaceholder.typicode.com/users/${id}/`)
                .then(response => response.json())
                .then(data => {
                    setUser(data)
                    setAddress(data.address)
                    setCompany(data.company)
                }).catch(e => {
                    setError(e)
                })
            setIsLoaded(true)
        })()
    }, [id])

    return (
        <div>
            <h1>{!isLoaded ?
                "Loading User..." :
                error !== null ?
                    error :
                    "User Details"
            }
            </h1>
            {user !== null ?
                (<ul>
                    <li>Email {user.email}</li>
                    <li>Phone: {user.phone}</li>
                    <li>Website: {user.website}</li>
                    {company === null ? null :
                        (<li>Company: {company.name}</li>)
                    }
                    {address === null ? null :
                        (<li>Address: {address.street} {address.suite} {address.city} {address.zipcode}</li>)
                    }
                </ul>) :
                null
            }
        </div>
    )
}

export default User