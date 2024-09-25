import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [things, setThings] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        axios.get('http://10.0.2.2:8000/api/things')
            .then(response => {
                setThings(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    const addThing = (e) => {
        e.preventDefault();
        axios.post('http://10.0.2.2:8000/api/things', { name })
            .then(response => {
                setThings([...things, response.data]);
                setName('');
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>Things List</h1>
            <form onSubmit={addThing}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Add a new thing"
                />
                <button type="submit">Add</button>
            </form>
            <ul>
                {things.map(thing => (
                    <li key={thing.id}>{thing.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
