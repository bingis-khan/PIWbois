import React from "react";
import GroupMember from "../Groups/GroupMember";
import AddStudent from "./AddStudent";
import Find from "../Find/Find";


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
      alert('No role selected.');
      return;
    }

    console.log(student);
    console.log(this.state.members);

    
    this.setState(st => ({ members: [...st.members, { role: st.role, student: student }], role: '' }));
  }

  render() {
    return (
      <>
        <form onSubmit={this.submitHandler}>
          <label htmlFor='group-name'>Name:</label>
          <input id='group-name' type='text' value={this.state.groupName} onChange={(event) => this.setState({ groupName: event.target.value })} required />

          <label htmlFor='group-description'>Description:</label>
          <textarea
            id='group-description'
            rows='5'
            value={this.state.description}
            onChange={(event) => this.setState({ description: event.target.value })}
            required
          />

          <label htmlFor='group-subject'>Subject:</label>
          <input id='group-subject' type='text' value={this.state.subject} onChange={(event) => this.setState({ subject: event.target.value })} required />

          <div>
            <h2>Current students</h2>
            {this.state.members.map((sr, i) => <GroupMember student={sr.student} role={sr.role} key={'member-' + i} />)}
          </div>        

          <button>Add the boi</button>
        </form>

        <div>
          <label htmlFor='radio_existing'>Choose existing</label>
          <input id='radio_existing' name='existingOrNew' type='radio' checked={this.state.addExisting} onChange={() => this.setState(st => ({ addExisting: true }))}  />

          <label htmlFor='radio_new'>Create new</label>
          <input id='radio_new' name='existingOrNew' type='radio' checked={!this.state.addExisting} onChange={() => this.setState(st => ({ addExisting: false }))} />

          <label htmlFor='member-role'>Role:</label>
          <input id='member-role' type='text' value={this.state.role} onChange={(event) => this.setState({ role: event.target.value })} required />
          {
            !this.state.addExisting
            ? <AddStudent onNewStudent={this.addMember} />
            : <form onSubmit={event => { event.preventDefault(); 
            this.addMember(this.props.students[+event.target.elements.selectedStudents.value]); }}>
                <Find name='selectedStudents' options={this.props.students.filter(s => !this.state.members.map(sr => sr.student).includes(s)).map(s => `${s.name}: ${s.subjects}`)} />
                <button>Add student</button>
              </form>
          }
        </div>
      </>
    );
  }
}

export default AddGroup;