import React, {useState} from 'react'
import { Button, Modal, Form, Input, Label} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

export function ModalJob (props) {
	const [firstField, setFirstField] = useState('')
	const [secondField, setSecondField] = useState('')
	const {open, onCancel, isUpdate} = props
 
	//Получаем введенные данные с полей и отправляем их методом post
	const handleFetched = async () => {
		console.log(firstField, secondField)
		await fetch('api/create') // тут делаем запрос на создание (передаем заполненные поля)
		isUpdate()
		onCancel(true)
	}
  return (
			<Modal
				size={'mini'}
				onClose={() => props.onCancel(false)}
				open={open}
			>
			<Modal.Header>JOB</Modal.Header>
			<Modal.Content image>
				<Form>
					<Form.Field>
						<Label>Первое поле</Label>
						<Input 
							value={firstField} 
							onChange={(e, {value}) => setFirstField(value)}
						/>
					</Form.Field>
					<Form.Field>
						<Label>Второе поле</Label>
						<Input 
							value={secondField} 
							onChange={(e, {value}) => setSecondField(value)}
						/>
					</Form.Field>
				</Form>
			</Modal.Content>
			<Modal.Actions>
				<Button color='black' onClick={() => onCancel(false)}>
					отмена
				</Button>
				<Button
					content="Сохранить"
					labelPosition='right'
					icon='checkmark'
					onClick={() => handleFetched()}
					positive
				/>
			</Modal.Actions>
		</Modal>
	)
}