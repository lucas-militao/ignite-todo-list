import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit/edit.png';
import cancelIcon from '../assets/icons/x/x.png';
import { Task } from "./TasksList";

interface TaskItemProps {
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (task: Task) => void;
  index: number;
  task: Task;
}

export function TaskItem({ toggleTaskDone, removeTask, editTask, index, task }: TaskItemProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (editing) {
      textInputRef.current?.focus();
    } else {
      textInputRef.current?.blur();
    }
  }, [editing])

  function handleStartEditing() {
    setEditing(true);
  }

  function handleCancelEditing() {
    setTitle(task.title);
    setEditing(false);
  }

  function handleSubmitEditing() {
    const editedTask = {
      id: task.id,
      title: title,
      done: task.done
    }

    editTask(editedTask);
    setEditing(false);
  }

  return(
    <>
      <View style={styles.inputTextContainer}>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View 
            testID={`marker-${index}`}
            style={(task.done) ? styles.taskMarkerDone : styles.taskMarker}
          >
            { task.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput 
            style={[(task.done) ? styles.taskTextDone : styles.taskText, styles.inputText]}
            value={title}
            editable={editing}
            onSubmitEditing={handleSubmitEditing}
            onChangeText={setTitle}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonsContainer}>
        {
          editing
          ? <TouchableOpacity
              testID={`cancel-${index}`}
              style={{ paddingHorizontal: 24 }}
              onPress={handleCancelEditing}
            >
              <Image source={cancelIcon} style={{height: 13, width: 17}}/>
            </TouchableOpacity> 

          : <>
              <TouchableOpacity
                testID={`edit-${index}`}
                style={{ paddingHorizontal: 18 }}
                onPress={handleStartEditing}
              >
                <Image source={editIcon} style={styles.icon}/>
              </TouchableOpacity>

              <View style={styles.divisor}/>

              <TouchableOpacity
                testID={`trash-${index}`}
                style={{ paddingHorizontal: 18 }}
                onPress={() => removeTask(task.id)}
              >
                <Image source={trashIcon} style={styles.icon}/>
              </TouchableOpacity>
            </>
        }
      </View>
    </>
    
  )
}

const styles = StyleSheet.create({
  inputTextContainer: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputText: {
    height: 48,
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  divisor: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)'
  },
  icon: {
    height: 24,
    width: 24,
  }
})