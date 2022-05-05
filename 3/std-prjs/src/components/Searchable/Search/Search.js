import shortid from 'short-id';
import classes from './Search.module.css';
import Card from '../../UI/Card/Card';

const Search = (props) => {
  const id = shortid.generate();

  return (
    <Card className={classes.searchbox}>
      <label htmlFor={id}>{props.text}</label>
      <input
        id={id}
        onChange={(e) => props.onFilterUpdate(e.target.value.trim())}
      ></input>
    </Card>
  );
};

export default Search;
