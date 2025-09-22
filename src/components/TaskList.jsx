// src/components/TaskList.js
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'firebase/auth';
import { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const TaskList = () => {
  const [authUser] = useAuthState(auth);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (authUser) {
      const unsubscribe = onSnapshot(
        collection(db, 'tasks', authUser.uid),
        (snapshot) => {
          setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        }
      );
      return () => unsubscribe();
    }
  }, [authUser]);

  // Add task
  const addTask = async (task) => {
    await addDoc(collection(db, 'tasks', authUser.uid), { task });
  };

  // Delete task
  const deleteTask = async (id) => {
    await deleteDoc(doc(db, 'tasks', authUser.uid, id));
  };

  // Mark/unmark task as done
  const updateTaskDone = async (id, isDone) => {
    await updateDoc(doc(db, 'tasks', authUser.uid, id), { done: isDone });
  };

  return (
    <div>
      {/* Task list UI */}
      {/* Add, delete, and update tasks logic */}
    </div>
  );
};

export default TaskList;