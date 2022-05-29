import { useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import User from '../../Context';


// Named "Login", but actually Login + Register.
const Login = () => {
    const ctx = useContext(User);

    const usernameRef = useRef();
    const passwordRef = useRef();

    const onLogin = (event) => {
        event.preventDefault();

        // Magick.
        const submitType = event.nativeEvent.submitter.value;
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        console.log(submitType);

        // Very, and I mean *VERY* simple login.
        switch (submitType) {
            case 'login': {
                const user = ctx.users.filter(us => us.username === username && us.password === password)[0];
                if (!user) {
                    alert('Invalid credentials.');
                    break;
                }

                // Heh, that's pretty bad.
                ctx.setUser(user);

                break;
            }

            case 'register': {
                const user = { username: username, password: password, follows: new Set() };
                ctx.addUser(user);
                ctx.setUser(user);
                break;
            }

            default:
        }
    }

    const user = ctx.currentUser;

    let page = user
        ? <Card>
            <p>Logged in as {user.username}.</p>
            <Button onClick={() => ctx.setUser(null)}>Logout</Button>
          </Card>
        : <Card>
            <form onSubmit={onLogin}>
                <input ref={usernameRef} type='text'></input>
                <br />
                <input ref={passwordRef} id='login-password' type='password'></input>
                <br />
                <Button type='submit' name='action' value='login' >Login</Button>
                <Button type='submit' name='action' value='register' >Register</Button>
            </form>
        </Card>

    return page;
};

export default Login;