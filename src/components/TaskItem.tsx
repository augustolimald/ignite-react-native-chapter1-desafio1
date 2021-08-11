import React, {useState, useRef} from 'react';
import { Image, TextInput, TouchableOpacity, View, Alert, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Task } from './TasksList';

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'
import cancelIcon from '../assets/icons/cancel/cancel.png'

interface TaskItemProps {
	index: number;
	task: Task;
	toggleTaskDone: (id: number) => void;
  updateTask: (id: number, newTitle: string) => void;
	removeTask: (id: number) => void;
}; 

export function TaskItem({index, task, toggleTaskDone, updateTask, removeTask}: TaskItemProps) {
	const [title, setTitle] = useState(task.title);
  const [isEditing, setIsEditing] = useState(false);

	const textInputRef = useRef<TextInput>(null);

	function handleEditButton() {
		if (task.done) {
			return Alert.alert(
				'Editar task',
				'Você não pode editar uma task concluída'
			);
		}

		setIsEditing(true);
		textInputRef.current && textInputRef.current.focus();
	}

	function handleCancelEditButton() {
		setTitle(task.title);
		setIsEditing(false);
	}

  function handleEditTask() {
		updateTask(task.id, title);
		setIsEditing(false);
  }

	return (
		<View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap'}}>
			<View style={styles.titleContainer}>
				<TouchableOpacity
					testID={`button-${index}`}
					activeOpacity={0.7}
					style={styles.taskButton}
					onPress= {() => {
						handleCancelEditButton();
						toggleTaskDone(task.id);
					}}
				>
					<View 
						testID={`marker-${index}`}
						style={ task.done ? styles.taskMarkerDone : styles.taskMarker }
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
						nativeID=""
						style={task.done ? styles.taskTextDone : styles.taskText }
						editable={isEditing}
						value={title}
						onChangeText={setTitle}
        		onSubmitEditing={handleEditTask}
						ref={textInputRef}
					/>
				</TouchableOpacity>
			</View>

			<View style={styles.buttonsContainer}>
				{
					isEditing
					?
						<TouchableOpacity
							testID={`cancel-${index}`}
							onPress={handleCancelEditButton}
						>
							<Image source={cancelIcon} />
						</TouchableOpacity>

					:
						<>
							<TouchableOpacity
								testID={`edit-${index}`}
								onPress={handleEditButton}
							>
								<Image source={editIcon} />
							</TouchableOpacity>

							<View style={styles.splitButtons}>
							</View>

							<TouchableOpacity
								testID={`trash-${index}`}
								onPress={ () => removeTask(task.id) }
							>
								<Image source={trashIcon} />
							</TouchableOpacity>
						</>
				}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
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
	splitButtons: {
		width: 1,
		maxWidth: 1,
		height: 24,
		maxHeight: 24,
		marginHorizontal: 5,
		backgroundColor: 'rgba(196, 196, 196, 0.24)',
	},
	titleContainer: { 
		width: '70%', 
		alignSelf: 'flex-start' 
	},
	buttonsContainer: { 
		width: '30%', 
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'center',
	},
})