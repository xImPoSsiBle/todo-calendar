import moment from "moment";
import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './main.css'

import CustomToolbar from "./components/CustomToolbar";
import { nanoid } from "nanoid";
import Modal from "./components/Modal";

function App() {
  const [newTodo, setNewTodo] = useState({ title: '', start: '', end: '' })
  const [allTodos, setAllTodos] = useState([])
  const [filteredTodos, setFilteredTodos] = useState([])
  const [selectedTodo, setSelectedTodo] = useState('')
  const [modal, setModal] = useState(false)
  const [category, setCategory] = useState('all')

  const localizer = momentLocalizer(moment)

  const addTodo = () => {
    const todoObj = {
      id: nanoid(),
      title: newTodo.title,
      start: newTodo.start,
      end: newTodo.end,
      done: false,
      active: true,
      overdue: false,
      color: '#3174ad',
    }

    setAllTodos(todo => [...todo, todoObj])
  }

  const completeTodo = (id) => {
    const index = allTodos.findIndex(i => i.id === id)

    const newDoneValue = !allTodos[index].done;

    const obj = {
      ...allTodos[index],
      done: newDoneValue,
      color: newDoneValue ? 'lightgreen' : '#3174ad',
      active: false,
      overdue: false,
    }

    setAllTodos([
      ...allTodos.slice(0, index),
      obj,
      ...allTodos.slice(index + 1)
    ])

    setModal(false)
  }

  const deleteTodo = (id) => {
    const filteredTodos = allTodos.filter(i => i.id !== id)

    setAllTodos(filteredTodos)
    setModal(false)
  }

  const handleTodo = (e) => {
    console.log(e)
    setSelectedTodo(e)
    setModal(true)
  }

  const eventStyle = (event) => {
    const style = {
      backgroundColor: event.color || '#3174ad'
    }

    return { style }
  }

  const filterByCategory = (cat) => {
    if (cat === 'all') return setFilteredTodos(allTodos)
    const filtered = allTodos.filter(i => i[cat] === true)
    setFilteredTodos(filtered)
  }

  useEffect(() => {
    filterByCategory(category)
  }, [category])

  return (
    <div className="App">
      <div className="inputDiv">
        <input type="text" placeholder="Напишите задачу" onChange={e => setNewTodo({ ...newTodo, title: e.target.value })} />
        <input type="date" placeholder="Напишите задачу" onChange={e => setNewTodo({ ...newTodo, start: e.target.value })} />
        <input type="date" placeholder="Напишите задачу" onChange={e => setNewTodo({ ...newTodo, end: e.target.value })} />
        <button onClick={addTodo}>Добавить</button>
      </div>
      <div className="calendarDiv">
        <Calendar
          localizer={localizer}
          events={filteredTodos}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleTodo}
          components={{ toolbar: (toolbarProps) => (<CustomToolbar {...toolbarProps} setCategory={setCategory}/>) }}
          eventPropGetter={eventStyle}
        />
      </div>
      {modal
        ? <Modal
          selectedTodo={selectedTodo}
          setModal={setModal}
          completeTodo={completeTodo}
          deleteTodo={deleteTodo}
        />
        : null}
    </div>
  );
}

export default App;
