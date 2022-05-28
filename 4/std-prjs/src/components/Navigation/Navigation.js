
import { Link } from 'react-router-dom';
import classes from './Navigation.module.css';
import Card from '../UI/Card/Card';
import User from '../../Context';

const Navigation = () => {
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
            <Link to='/login'>
              <User.Consumer>
                {ctx => ctx.username ? <button>{ctx.username}</button> : <button>Login</button> }
              </User.Consumer>
            </Link>
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