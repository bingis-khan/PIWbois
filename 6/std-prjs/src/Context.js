import { createContext } from "react";

// User & context stuff.
const User = createContext({
    user: null,
    setUser: () => { },

    // Kinda bad (also misleading context name), but whatever.
    users: [],
    addUser: () => { },

    // Oh god, there's more.
    follows: {},
    dispatch: () => {},

    refresh: () => {}
});

export default User;