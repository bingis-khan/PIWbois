import { useState } from 'react';

import Display from './../Display/Display';
import Search from './../Search/Search';
import Card from '../../UI/Card/Card';
import classes from './Searchable.module.css';


// props.elems : [elem]
// props.filter : elem -> [String]
// props.toComponent : elem -> Component
// Ooh, nice higher-order component.
const makeSearchable = (prompt, filterElem, toComponent) => (props) => {
  const [filter, setFilter] = useState('');

  // Fixed: during search, indexes would not match the given list and sending a message would redirect to another list.
  // Extremely bad fix for not having IDs in a datatype.
  let display = <p>Loading...</p>

  if (props.elems) {
    const elems = props.elems.map((e, i) => [e, i]).filter(([e]) => filterElem(e).some(s => s.includes(filter))).map(([e, i]) => toComponent(e, i));
    display = <Display elems={elems} />
  }

  return (
    <Card className={classes.searchable}>
      <Search text={prompt} onFilterUpdate={setFilter} />
      {display}
    </Card>
  );
}

export default makeSearchable;