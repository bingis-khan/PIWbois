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

  const elems = props.elems.filter(e => filterElem(e).some(s => s.includes(filter))).map(toComponent);

  return (
    <Card className={classes.searchable}>
      <Search text={prompt} onFilterUpdate={setFilter} />
      <Display elems={elems} />
    </Card>
  );
}

export default makeSearchable;