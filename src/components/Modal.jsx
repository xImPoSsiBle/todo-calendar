import React from 'react'

const Modal = ({ selectedTodo, setModal, completeTodo, deleteTodo }) => {
    const { id, title, start, end } = selectedTodo

    return (
        <div className="modalBg">
            <div className="modal">
                <div className="modalTitle">
                    <h3>
                        {title}
                        <span onClick={() => setModal(false)}>&times;</span>
                    </h3>
                </div>
                <div className='modalInfo'>
                    <p>Начало: {start}</p>
                    <p>Конец: {end}</p>
                </div>
                <div className='modalBtns'>
                    <button className="btn" onClick={() => completeTodo(id)}>Выполнено</button>
                    <button className="btn" onClick={() => deleteTodo(id)}>Удалить</button>
                </div>
            </div>
        </div>
    )
}

export default Modal