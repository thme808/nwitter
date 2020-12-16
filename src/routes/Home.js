import { authService } from "myBase";
import React, { useState } from "react";
import { dbService } from "myBase";

const Home = () => {
    const [nweet, setNweet] = useState("");
    const onChange = (e) => {
        const { target: { value } } = e;
        setNweet(value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        await dbService.collection("nweet").add(
            {
                nweet: nweet,
                createdAt: new Date()
            }
        )

        setNweet("");

    };

    return (
        <div>
            <h1>home</h1>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} placeholder="what's on your mind?"></input>
                <button type="submit">Nweet</button>
            </form>
        </div>
    );
}
export default Home;