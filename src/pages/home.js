import {useEffect, useState} from "react";

//todo: check logged status and change login options
export default function Home() {
    const [users, setUsers] = useState()

    useEffect(() => {
        fetch('http://localhost:8000/api/user', {
            method: 'GET',
            credentials: 'include',
        }).then(data => data.json())
        .then(res => {
            console.log(res);
            setUsers(res.data);
        })
        .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        console.log(users);
    }, [users])

    if (!users) {
        return (
            <div>
                <h1>Welcome to Developer Match</h1>
                <p>loading</p>
            </div>
        )
    }

    return (
        <div>
            <h1>Welcome to Developer Match</h1>
            {users.map(user => {
                return (
                    <p>
                        {user.name}
                    </p>
                );
            })}
        </div>
    )
}
