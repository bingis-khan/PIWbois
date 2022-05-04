
import makeSearchable from '../Searchable/Searchable/Searchable';
import Student from './Student';
import SendMessageButton from '../SendMessage/SendMessageButton';
import Card from '../UI/Card/Card';

const studentAttributes = s => [s.description, ...s.tags, ...s.subjects];

const StudentSearch = makeSearchable('Find students', studentAttributes, 
  (s, i) => 
    <Card key={'student-' + i}>
      <Student student={s} />
      <SendMessageButton type='student' to={i} />
    </Card>);


export { studentAttributes };  // Also used in group search -> saves some time.
export default StudentSearch;