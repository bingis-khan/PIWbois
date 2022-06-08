import React from "react";
import GroupMember from "../Groups/GroupMember";
import AddStudent from "./AddStudent";
import Find from "../Find/Find";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import classes from './Add.module.css';


class AddGroup extends React.Component {
  constructor(props) {
    super(props);

    // Two-way binding for shits and giggles. I don't really need it. Refs are enough.
    this.state = {
      groupName: '',
      description: '',
      subject: '',

      members: [],

      role: '' 
    };

    if (props.prototype) {
      const p = props.prototype;
      this.state = {
        uid: p.uid,
        groupName: p.name,
        description: p.description,
        subject: p.subject,

        members: p.members,

        role: ''
      };
    }
  }

  submitHandler = (event) => {
    event.preventDefault();

    const { groupName, description, subject, members } = this.state;
    const group = {
      name: groupName,
      description: description,
      subject: subject,
      members: members
    };

    if (this.state.uid)
      group.uid = this.state.uid;

    if (members.length === 0) {
      alert('Groups with no members are not allowed.');
      return;
    }

    this.props.onNewGroup(group);
  }


  addMember = (student) => {
    if (this.state.members.length >= 5) {
      alert('Can\'t add another member.');
      return;
    }

    if (this.state.role.trim().length === 0) {
      alert('A group member must have a role.');
      return;
    }

    console.log(student);
    console.log(this.state.members);

    
    this.setState(st => ({ members: [...st.members, { role: st.role, student: student }], role: '' }));
  }

  render() {
    return (
      <>
        <form className={classes['add-group']} onSubmit={this.submitHandler}>
          <center>
            <Button type='submit'>{this.props.text ?? 'Create group'}</Button>
          </center>

          <Card>
            <label htmlFor='group-name'>Name:</label>
            <input id='group-name' type='text' value={this.state.groupName} onChange={(event) => this.setState({ groupName: event.target.value })} required />
          </Card>

          <Card>
            <label htmlFor='group-description'>Description:</label>
            <br />
            <textarea
              id='group-description'
              rows='5'
              value={this.state.description}
              onChange={(event) => this.setState({ description: event.target.value })}
              required
            />
          </Card>

          <Card>
            <label htmlFor='group-subject'>Subject:</label>
            <input id='group-subject' type='text' value={this.state.subject} onChange={(event) => this.setState({ subject: event.target.value })} required />
          </Card>

          <Card className={classes['current-members']}>
            <h2>Current students</h2>
            {this.state.members.length === 0 ? <p>None</p> : null}
            {this.state.members.map((sr, i) => <GroupMember student={sr.student} role={sr.role} key={'member-' + i} />)}
          </Card>
        </form>

        <Card>
          <h2>Add student to the group</h2>
          <Card className={classes['select-student-type']}>
            <label htmlFor='radio_existing'>Choose existing</label>
            <input id='radio_existing' name='existingOrNew' type='radio' checked={this.state.addExisting} onChange={() => this.setState(st => ({ addExisting: true }))}  />

            <label htmlFor='radio_new'>Create new</label>
            <input id='radio_new' name='existingOrNew' type='radio' checked={!this.state.addExisting} onChange={() => this.setState(st => ({ addExisting: false }))} />
          </Card>

          <Card className={classes['select-role']}>
            <label htmlFor='member-role'>Role:</label>
            <input id='member-role' type='text' value={this.state.role} onChange={(event) => this.setState({ role: event.target.value })} required />
          </Card>
          
          {
            !this.state.addExisting
            ? <AddStudent onNewStudent={this.addMember} />
            : <form className={classes['find-student']} onSubmit={event => { event.preventDefault(); 
            this.addMember(this.props.students[+event.target.elements.selectedStudents.value]); }}>
                <Find name='selectedStudents' options={this.props.students.filter(s => !this.state.members.map(sr => sr.student).includes(s)).map(s => `${s.name}: ${s.subjects}`)} />
                <Button type='submit'>Add student</Button>
              </form>
          }
        </Card>
      </>
    );
  }
}

export default AddGroup;
