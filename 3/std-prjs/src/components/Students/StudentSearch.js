
import makeSearchable from '../Searchable/Searchable/Searchable';
import Student from './Student';
import SendMessageButton from '../SendMessage/SendMessageButton';

const studentAttributes = s => [s.description, ...s.tags, ...s.subjects];

const StudentSearch = makeSearchable('Find students', studentAttributes, 
  (s, i) => 
    <div key={'student-' + i}>
      <Student student={s} />
      <SendMessageButton type='student' to={i} />
    </div>);


export { studentAttributes };  // Also used in group search -> saves some time.
export default StudentSearch;