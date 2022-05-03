import shortid from 'short-id';


const Search = (props) => {
  const id = shortid.generate();

  return (<div className="search">
    <label htmlFor={id}>{props.text}</label>
    <input id={id} onChange={e => props.onFilterUpdate(e.target.value.trim())}></input>
  </div>);
};

export default Search;