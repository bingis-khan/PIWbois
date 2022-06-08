import makeSearchable from '../Searchable/Searchable/Searchable';
import SendMessageButton from '../SendMessage/SendMessageButton';
import { studentAttributes } from '../Students/StudentSearch';
import Group from './Group';
import Card from '../UI/Card/Card';
import classes from './Group.module.css';
import FollowButton from '../Follow/FollowButton';
import LinkButton from '../UI/Button/LinkButton';


const groupAttributes = (g) => [
  g.name,
  g.description,
  g.subject,
  ...g.members.flatMap((sr) => [sr.role, ...studentAttributes(sr.student)]),
];

const extendedGroupCard = (g, i) =>
  <Card key={'group-' + i} className={classes['group-entry']}>
    <Group group={g} i={i} />
    <SendMessageButton className={classes['send-message-button']} type='group' to={i} />
    <FollowButton type='group' who={g.name} />
    <LinkButton to={`/edit/group/${i}`} text='Edit' />
  </Card>

const GroupSearch = makeSearchable('Find groups:', groupAttributes, extendedGroupCard);


export { extendedGroupCard };
export default GroupSearch;
