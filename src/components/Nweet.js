import React, { useState } from "react"
import { dbService } from "myBase";

const Nweet = ({ nweet, isOwner }) => {
    const [editMode, setEditMode] = useState(false);
    const [newNweet, setNewNweet] = useState(nweet.text);


    const onDeleteClick = async () => {
        const confirm = window.confirm("are you sure?");
        if (confirm) {
            await dbService.doc(`nweet/${nweet.id}`).delete();
        }
    }

    const onUpdateClick = async () => {

    }

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`nweet/${nweet.id}`).update({
            text: newNweet
        })
        setEditMode(false);
    }

    const onChangeEdit = (event) => {
        const { target: { value } } = event;
        setNewNweet(value);
    }

    const toggleEdit = () => {
        setEditMode(prev => !prev)
    }

    return (
        <div>
            {editMode ?
                <>
                    <form onSubmit={onSubmit}>
                        <input type="text" value={newNweet} onChange={onChangeEdit} required />
                        <input type="submit" value="update" />
                        <button onClick={toggleEdit}>cancel</button>
                    </form>
                </>
                :
                <>
                    <h4> {nweet.text} </h4>
                </>
            }
            {isOwner && (
                <>
                    <button onClick={toggleEdit}>edit</button>
                    <button onClick={onDeleteClick}>delete</button>
                </>
            )
            }

        </div>
    )
}

export default Nweet;