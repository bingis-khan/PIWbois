import { useRef } from 'react';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import classes from './Add.module.css';

const AddStudent = (props) => {
  const submitHandler = (event) => {
    event.preventDefault();

    const student = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      description: descriptionRef.current.value,
      tags: tagsRef.current.value.split(),
      subjects: subjectsRef.current.value.split(),
    };

    console.log(student);

    props.onNewStudent(student);
  };

  // Just **ref** it up. I forgot JS has "limited" options when it comes to list creation. Basically: traverse (const useRef) [1..5]
  // We're not going to use state and this single source of truth thingy, becuase we don't need it - HTML validation is enough.
  const [nameRef, emailRef, descriptionRef, tagsRef, subjectsRef] = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];

  // I would have abstracted the label-input pair to a different element called Input,
  // but I'm *really* short on time.
  return (
    <form className={classes['add-student']} onSubmit={submitHandler}>
      <Card>
        <label htmlFor='student-name'>Name:</label>
        <input id='student-name' type='text' ref={nameRef} required />
      </Card>

      <Card>
        <label htmlFor='student-email'>Email:</label>
        <input id='student-email' type='email' ref={emailRef} required />
      </Card>

      <Card>
        <label htmlFor='student-description'>Description:</label>
        <br />
        <textarea
          id='student-description'
          rows='5'
          ref={descriptionRef}
          required
        />
      </Card>

      <Card>
        <label htmlFor='student-tags'>Tags:</label>
        <input id='student-tags' type='text' ref={tagsRef} required />
      </Card>

      <Card>
        <label htmlFor='student-subjects'>Subjects:</label>
        <input id='student-subjects' type='text' ref={subjectsRef} required />
      </Card>

      <center>
        <Button type='submit'>Add student</Button>
      </center>
    </form>
  );
};

export default AddStudent;
