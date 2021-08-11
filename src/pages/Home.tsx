import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskAlreadyExists = tasks.find(task => task.title === newTaskTitle);
    if (taskAlreadyExists) {
      return Alert.alert(
        'Task já cadastrada', 
        'Você não pode cadastrar uma task com o mesmo nome'
      );
    }
    
    const task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks(oldTasks => [...oldTasks, task]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        task.done = true;
      }

      return task;
    }));
  }

  function handleUpdateTask(id: number, newTitle: string) {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        task.title = newTitle;
      }

      return task;
    }));
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza de que deseja remover esse item?",
      [
        {
          text: "Não",
          onPress: () => {},
        },
        {
          text: "Sim",
          onPress: () => removeTask(id),
        }
      ]
    );
  }

  function removeTask(id: number) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        updateTask={handleUpdateTask}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})