import React, { useState } from 'react';

import './App.css';

import StudentSearch from './components/Students/StudentSearch';
import GroupSearch from './components/Groups/GroupSearch';
import Navigation from './components/Navigation/Navigation';
import Add from './components/Add/Add';
import SendMessage from './components/SendMessage/SendMessage';

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';


/* 
  Note to self: embed IDs in the data in the future. 
  It makes things much easier, like *selecting* data and key generation (esp. in nested data like `group`). 
*/
const defaultStudents = [
  {
    name: 'bobby el dorade',
    email: 'hotstud-ent@hotmail.ru',
    description: 'some shitty description',
    tags: ['retard'],
    subjects: ['dupa'],
  },
  {
    name: 'pissmeister',
    email: 'grindset@binky.biz',
    description: 'another one',
    tags: ['dddd'],
    subjects: ['asd'],
  },
];

const defaultGroups = [
  {
    name: 'gruppe sechs',

    // Note: I assume these are not the same students as the ones searching for a group.
    // So, these two lists should be completely disjointed **by definition**.
    members: [{ student: defaultStudents[0], role: 'smoothster' }, { student: defaultStudents[1], role: 'serial killer' }],
    description: 'suicide fun-cult, fun suicide cult',
    subject: 'alchemy'
  }
];


// Helps me store (((persistent))) data.
const useLocalItems = (storageName, defaults) => {
  const [item, setItems] = useState(JSON.parse(localStorage.getItem(storageName)) ?? defaults);
  const addItem = (item) => setItems(items => {
    const newItems = [...items, item];

    localStorage.setItem(storageName, JSON.stringify(newItems));
    return newItems;
  });

  return [item, addItem];
};

function App() {
  const navigate = useNavigate();
  const [students, addStudent] = useLocalItems('students', defaultStudents);
  const [groups, addGroup] = useLocalItems('groups', defaultGroups);

  const thenRedirect = (f, to) => (arg) => {
    f(arg);
    navigate(to);
  } 

  return (
    <div className='App'>
      <Navigation />

      <Routes>
        <Route path='/students' element={<StudentSearch elems={students} />} />
        <Route path='/groups' element={<GroupSearch elems={groups} />} />
        <Route path='/add' element={<Add onNewStudent={thenRedirect(addStudent, '/students')} onNewGroup={thenRedirect(addGroup, '/groups')} students={students} />} />
        <Route path='/:type/:id/send' element={<SendMessage students={students} groups={groups} />} />

        {/* Default "site" is the student search. */}
        <Route exact path='/' element={<Navigate replace to='/students' />} />
      </Routes>
    </div>
  );
}

export default App;
