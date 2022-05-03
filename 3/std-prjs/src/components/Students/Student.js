const Student = (props) => {
  const s = props.student;
  return (
    <div className='profile'>
      <p>{s.description}</p>
      <p>{s.tags}</p>
      <p>{s.subjects}</p>
    </div>
  );
};

export default Student;
