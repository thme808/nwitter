import React, { useState } from "react";
import { firebaseInstance, authService } from "../myBase";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAcount] = useState(false);
    const [error, setError] = useState("");

    const onChange = (e) => {
        const {target : {name, value}} = e;
        if(name === "email") {
            setEmail(value);
        }else if(name === "password"){
            setPassword(value);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            let data;
            if(newAccount){
                //create account
                data = await authService.createUserWithEmailAndPassword(
                    email, password
                );
            }else{
                //log in
                data = await authService.signInWithEmailAndPassword(
                    email, password
                );
            }
            console.log(data);
        }catch(error){
            setError(error.message);
        }
    };

    const toggleSignInBtn = () => {
        //setNewAcount(!newAccount);
        setNewAcount(prev => !prev);
    }

    //social login
    const onSocialClick = async (e) => {
        const {target :{name}} = e;
        let provider;
        if(name === "google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }else if(name === "github"){
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }

        const authData = await authService.signInWithPopup(provider)
        .catch(error => setError(error.message));
    }

    return (
        <div>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} type="text" placeholder="Email" name="email" required value={email} />
            <input onChange={onChange} type="password" placeholder="Password" name="password" required value={password} />
            <input type="submit" value={newAccount ? "create account" : "sign in"} />  
            {error}
        </form>
        <span onClick={toggleSignInBtn} >{newAccount ? "sign in" : "create account"}</span>
        <div>
            <button name="google" onClick={onSocialClick}>Continue with Google</button>
            <button name="github" onClick={onSocialClick}>Continue with Github</button>
        </div>
        </div>
    )
}
 
export default Auth;
