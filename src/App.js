import React, {useEffect, useState, useMemo} from 'react';
import './App.css';
import { ModalJob } from './ModalJob';
import { Button, Form } from 'semantic-ui-react'


function App() {
  const [open, setOpen] = useState(false)
  const [result, setResult] = useState([])
  const [isCreate, setIsCreate] = useState(false)

  useEffect(() => {
    //Делаем запрос на чтение
    fetch('http://localhost:3000/') // Получение текущих данных
      .then(response => console.log(response))
      .then(result => setResult([
        {id: 1, name: 'test1'}, 
        {id: 2, name: 'test2'},
      ]))
      .catch(e => console.log('ERROR: ', e.message))
  }, [])

  useMemo(() => {
    fetch('http://localhost:3000/') // Получение добавленных данных(Тот же запрос по api что и выше))
      .then(response =>  setResult([
        ...result,
        {id: `${result.length + 1}`, name: `test${result.length + 1}`}
      ]))
      .catch(e => console.log('ERROR: ', e.message))
    console.log('CREATE')
  }, [isCreate])

  return (
    <div>
      {open ? (
        <ModalJob 
          onCancel={() => setOpen(false)} 
          open
          isUpdate={() => setIsCreate(!isCreate)}
          result
        />
      ) : (
        <Button onClick={() => setOpen(true)}>Добавить JOB</Button>
      )}
      <Form.Field 
        style={{
          margin: '0 auto', 
          textAlign: 'center', 
          verticalAlign: 'middle', 
          border: '1px solid'}}>
        {
          result.map(item => (
            <div key={item.id}>{item.name}</div>
          ))
        }
      </Form.Field>
    </div>
  );
}

export default App;
