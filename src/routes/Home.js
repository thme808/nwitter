import { authService } from "myBase";
import React, { useState, useEffect } from "react";
import { dbService } from "myBase";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
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
                text: nweet,
                createdAt: new Date(),
                createtorID: userObj.uid
            }
        )
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

    const onSnapShot = () => {
        dbService.collection("nweet").onSnapshot((snapshot) => {
            /* 
            TODO: update array with changes only instead of replacing the array with new array
            */
            const nweetArray = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }))
            setNweets(nweetArray);
        })
    }

    useEffect(() => {
        onSnapShot();
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
                    <Nweet key={nweet.id} nweet={nweet} isOwner={userObj.uid === nweet.createtorID} />
                ))}
            </div>
        </div>
    );
}
export default Home;