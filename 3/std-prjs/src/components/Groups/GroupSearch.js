import makeSearchable from '../Searchable/Searchable/Searchable';
import SendMessageButton from '../SendMessage/SendMessageButton';
import { studentAttributes } from '../Students/StudentSearch';
import Group from './Group';

const groupAttributes = (g) => [
  g.name,
  g.description,
  g.subject,
  ...g.members.flatMap((sr) => [sr.role, ...studentAttributes(sr.student)]),
];

const GroupSearch = makeSearchable('Find groups:', groupAttributes, (g, i) => (
  <div key={'group-' + i}>
    <Group group={g} i={i} />
    <SendMessageButton type='group' to={i} />
  </div>
));

export default GroupSearch;
