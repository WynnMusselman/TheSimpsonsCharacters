import {useEffect, useState} from "react";

export default function Simpsons(){
    // each page has 20 characters, set by original API
    const [pageNum, setPageNum] = useState(1);
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        async function getCharacters(){
            const res = await fetch(
                `https://thesimpsonsapi.com/api/characters?page=${pageNum}`
            );
            const jsonRes = await res.json();

            // results is the array, so the json is just storing that instead of everything
            setCharacters(jsonRes.results);
        }

       getCharacters().catch((e) => console.error(e));
    }, [pageNum]);

    return (
        <>
            <h1>THE SIMPSONS CHARACTERS</h1>
            <input
                type = "number"
                placeholder = "Enter a page number"
                value = {pageNum}
                min = {1}
                max = {60}
                onChange = {(e) => setPageNum(Number(e.target.value))}
            />

            <p>Current Page: {pageNum}</p>
            <div>
                {
                    characters.map((character: any) =>
                        <div key = {character.id}>
                            <h2>{character.name}</h2>
                            <img src = {`https://cdn.thesimpsonsapi.com/500${character.portrait_path}`} alt = {character.name} />
                            {character.occupation !== "" ? <p>Job: {character.occupation}</p> : <p>Job: Unknown</p>}
                            {character.age !== null ? <p>Age: {character.age}</p> : <p>Age: Unknown</p>}
                            {character.status !== "" ? <p>Status: {character.status}</p> : <p>Status: Unknown</p>}

                            {character.phrases.length > 0 && (
                                <>
                                    <h3>Phrases: </h3>
                                    <ul>

                                        {character.phrases.map((phrase: string, index: number) => (
                                            <li key = {index}>{phrase}</li>
                                            )
                                        )}
                                    </ul>
                                </>
                            )}

                        </div>
                    )
                }
            </div>
        </>
    )
}