import { useState } from 'react';

import AddGroup from './AddGroup';
import AddStudent from './AddStudent';


const Add = (props) => {
  const [selection, setSelection] = useState(props.selection ?? null);

  let body = null;
  if (selection === 'student')
    body = (<AddStudent onNewStudent={props.onNewStudent} />);
  else if (selection === 'group')
    body = (<AddGroup onNewGroup={g => { alert(JSON.stringify(g)); props.onNewGroup(g); } } students={props.students} />);
  

  return (
    <div>
      {/* Mothafucka is two-way bound. */}
      <label htmlFor='radio_student'>Student</label>
      <input id='radio_student' name='studentOrGroup' type='radio' checked={selection === 'student'} onChange={() => setSelection('student')}  />

      <label htmlFor='radio_group'>Group</label>
      <input id='radio_group' name='studentOrGroup' type='radio' checked={selection === 'group'} onChange={() => setSelection('group')} />

      {body}
    </div>
  );
};

export default Add;
