// Once we logged in we will be redirected to this page
// It'll also add a new button to the navbar for My Account where we can edit our profile + change password
import React from 'react';
import supabase from '../client'
import { useParams } from 'react-router-dom';

function AccountPage() {
    const { uid } = useParams(); // Extract the UID from the URL

    const signOut = async () => {
        const {error} = await supabase.auth.signOut();
        if (error) {
            console.error("Error signing out:", error.message);
            // Handle error (e.g., show a message to the user)
        } else {
            console.log("Sign out successful");
            // Redirect or perform any other action after successful sign out
            window.location = "/login"; // Redirect to login page after sign out
        }
    }

    return(
        <div>
            <p>Hi you're logged in!</p>
            <button onClick = {signOut}>Signout</button>
        </div>
    );
}

export default AccountPage;