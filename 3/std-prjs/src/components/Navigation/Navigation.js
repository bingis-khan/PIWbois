
import { Link } from 'react-router-dom';
import classes from './Navigation.module.css';
import Card from '../UI/Card/Card';

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
        </ul>
      </Card>
    </nav>
  );
};

export default Navigation;