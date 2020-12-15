import { authService } from "myBase";
import React from "react";

const Home = () => {
    const signOut = () => {
        authService.signOut();
    }
    return (
        <div>
            <h1>home</h1>
    
            <div>
                <button onClick={signOut} >Sign out</button>
            </div>
        </div>
        );    
}    
export default Home;