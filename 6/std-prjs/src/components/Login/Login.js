import { useContext, useRef, useState } from 'react';

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import User from '../../Context';
import { logInWithGoogle, logout } from '../../firebase/users';
import { useAuthState, useUpdateProfile } from 'react-firebase-hooks/auth';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, reload } from 'firebase/auth';
import { auth } from '../../firebase/init';


// Named "Login", but actually Login + Register.
const Login = () => {
    const [user, loading, error] = useAuthState(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    const refresh = useContext(User).refresh;

    const [loginError, setLoginError] = useState(null);

    const usernameRef = useRef();
    const passwordRef = useRef();

    const onLogin = (event) => {
        event.preventDefault();

        // Magick.
        const submitType = event.nativeEvent.submitter.value;
        const email = usernameRef.current.value;
        const password = passwordRef.current.value;

        console.log(submitType);

        // Very, and I mean *VERY* simple login.
        switch (submitType) {
            case 'login': {
                signInWithEmailAndPassword(auth, email, password).catch(error => {
                    setLoginError(error);
                });
                break;
            }

            case 'register': {
                createUserWithEmailAndPassword(auth, email, password).then(userData => {
                    // update profile does not seem to refresh user.
                    // A, gówno, tu my idziemy znów.
                    // I'll fix it later. 
                    updateProfile({
                        displayName: userData.user.email
                    }).then(() => {

                        // I hate myself, but it works. It should be done automatically.
                        // I guess a new contrib. idea. Cool.
                        refresh();
                    });
                }).catch(error => {
                    setLoginError(error);
                });
                break;
            }

            case 'google': {
                logInWithGoogle();
                break;
            }

            default:
        }
    }

    if (loading || updating)
        return
            <Card>
                <p>Loadin'</p>
            </Card> 
        ;
    
    if (error || updateError)
        return
            <Card>
                <p>Error: {error || updateError}</p>
            </Card>
        ;

    let page = user
        ? <Card>
            <p>Logged in as {user.email}.</p>
            <Button onClick={logout}>Logout</Button>
          </Card>
        : <Card>
            <form onSubmit={onLogin}>
                <input ref={usernameRef} type='text'></input>
                <br />
                <input ref={passwordRef} id='login-password' type='password'></input>
                <br />
                <Button type='submit' name='action' value='login' >Login</Button>
                <Button type='submit' name='action' value='register' >Register</Button>
                <Button type='submit' name='action' value='google'>Login with G00ble</Button>

                {loginError && <p>WTF: {loginError.message}</p>}
            </form>
        </Card>

    return page;
};

export default Login;