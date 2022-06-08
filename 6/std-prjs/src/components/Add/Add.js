import { useState } from 'react';

import AddGroup from './AddGroup';
import AddStudent from './AddStudent';
import Card from '../UI/Card/Card';
import classes from './Add.module.css';


const Add = (props) => {
  const [selection, setSelection] = useState(props.selection ?? null);

  let body = null;
  if (selection === 'student')
    body = (<AddStudent prototype={props.prototype} onNewStudent={props.onNewStudent} />);
  else if (selection === 'group')
    body = (<AddGroup prototype={props.prototype} onNewGroup={props.onNewGroup} students={props.students} />);
  
  return (
    <Card>
      {/* Mothafucka is two-way bound. */}
      <center className={classes.choice}>
        <label htmlFor='radio_student'>Student</label>
        <input id='radio_student' name='studentOrGroup' type='radio' checked={selection === 'student'} onChange={() => setSelection('student')}  />
        
        <label htmlFor='radio_group'>Group</label>
        <input id='radio_group' name='studentOrGroup' type='radio' checked={selection === 'group'} onChange={() => setSelection('group')} />
      </center>
      {body}
    </Card>
  );
};

export default Add;
