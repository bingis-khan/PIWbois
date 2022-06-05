
import { Link } from 'react-router-dom';
import classes from './Navigation.module.css';
import Card from '../UI/Card/Card';
import User from '../../Context';
import { auth } from '../../firebase/init';
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from '../Login/Login';


const Navigation = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <nav className={classes.nav}>
      <Card>
        <ul>
          <li>
            <Link to='/add'>
              <button>Add Student/Group</button>
            </Link>
          </li>
          <li>
            <Link to='/students'>
              <button>Students</button>
            </Link>
          </li>
          <li>
            <Link to='/groups'>
              <button>Groups</button>
            </Link>
          </li>
          <li>
            {(() => {
              if (loading)
                return <p>????</p>;
              if (error)
                return <p>Error gettin' auth state: {error}</p>;

              return <Link to='/login'><button>{user ? user.displayName : 'Login'}</button></Link>
            })()}
          </li>
          <li>
            <Link to='/following'>
              <button>Following</button>
            </Link>
          </li>
        </ul>
      </Card>
    </nav>
  );
};

export default Navigation;