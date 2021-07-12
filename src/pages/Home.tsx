import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const repeatedTask = tasks.find(taskItem => taskItem.title === newTaskTitle);

    if(repeatedTask) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome",
        [
          {text: 'OK', onPress: () => {}, style: 'cancel'}
        ]
      );
      return;
    }

    const task: Task = ({
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    });

    setTasks(oldState => [...oldState, task]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(taskItem => {
      if (taskItem.id === id) {
        taskItem.done = !taskItem.done;
      }
      return taskItem;
    });
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover este item?",
      [
        { 
          text: "Sim", 
          onPress: () => {setTasks(tasks.filter(task => task.id !== id));},
          style: 'default'
        },
        {
          text: "Não", 
          onPress: () => {},
          style: 'cancel'
        }
      ]
    );
    
  }

  function handleEditTask({id: number, title: string}: Task) {
    //TODO
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
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