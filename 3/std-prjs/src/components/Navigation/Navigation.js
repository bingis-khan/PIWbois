
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
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
    </nav>
  );
};

export default Navigation;