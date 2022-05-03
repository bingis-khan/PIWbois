import GroupMember from './GroupMember';

const Group = (props) => {
  const g = props.group;
  return (
    <div className='profile'>
      <p>{g.name}</p>
      <p>{g.description}</p>
      <div>
        {g.members.map((sr, si) => (
          <GroupMember
            role={sr.role}
            student={sr.student}
            key={`group-${props.i}-student-${si}`}
          />
        ))}
      </div>
      <p>{g.subject}</p>
    </div>
  );
};

export default Group;
