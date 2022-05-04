import GroupMember from './GroupMember';
import Card from '../UI/Card/Card';

import classes from './Group.module.css';

const Group = (props) => {
  const g = props.group;
  return (
    <Card className={classes['group-card']}>
      <h1>Group: {g.name}</h1>
      <Card>
        <p>{g.description}</p>
      </Card>
      <Card>
        <h2>Members</h2>
        {g.members.map((sr, si) => (
          <GroupMember
            role={sr.role}
            student={sr.student}
            key={`group-${props.i}-student-${si}`}
          />
        ))}
      </Card>
      <p>{g.subject}</p>
    </Card>
  );
};

export default Group;
