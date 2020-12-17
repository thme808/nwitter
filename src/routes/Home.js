import { authService } from "myBase";
import React, { useState, useEffect } from "react";
import { dbService } from "myBase";

const Home = () => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    const onChange = (e) => {
        const { target: { value } } = e;
        setNweet(value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const newDocument = await dbService.collection("nweet").add(
            {
                nweet: nweet,
                createdAt: new Date()
            }
        )

        const result = await newDocument.get();
        const nweetObject = {
            ...result.data(),
            id: result.id
        }
        setNweets(prev => [nweetObject, ...prev])
        setNweet("");

    };

    const getNweets = async () => {
        const dbsnap = await dbService.collection("nweet").get();
        dbsnap.forEach(
            (document) => {
                const nweetObject = {
                    ...document.data(),
                    id: document.id
                }
                setNweets(prev => [nweetObject, ...prev])
            }
        );
    }

    // const onSnapShot = () => {
    //     dbService.collection("nweet").onSnapshot((snapshot) => {
    //         snapshot.forEach(document => console.log(document.data()))
    //     })
    // }

    useEffect(() => {
        getNweets();
    }, []);

    return (
        <div>
            <h1>home</h1>
            <form onSubmit={onSubmit}>
                <input value={nweet}
                    onChange={onChange}
                    placeholder="what's on your mind?"
                    maxLength={120}
                />
                <button type="submit">Nweet</button>
            </form>
            <div>
                {nweets.map((nweet) => (
                    <div key={nweet.id}>
                        <h4> {nweet.nweet} </h4>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Home;