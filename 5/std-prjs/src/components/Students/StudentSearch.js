
import makeSearchable from '../Searchable/Searchable/Searchable';
import Student from './Student';
import SendMessageButton from '../SendMessage/SendMessageButton';
import Card from '../UI/Card/Card';
import classes from './Student.module.css';
import FollowButton from '../Follow/FollowButton';
import CheckProfileButton from '../Profile/CheckProfileButton';

const studentAttributes = s => [s.description, ...s.tags, ...s.subjects];

const extendedStudentCard = (s, i) =>
  <Card className={classes['student-entry']} key={'student-' + i}>
    <Student student={s} />
    <SendMessageButton type='student' to={i} />
    <FollowButton type='student' who={s.name} />
    <CheckProfileButton to={i} />
  </Card>;

const StudentSearch = makeSearchable('Find students', studentAttributes, extendedStudentCard);


export { studentAttributes, extendedStudentCard };  // Also used in group search -> saves some time.
export default StudentSearch;