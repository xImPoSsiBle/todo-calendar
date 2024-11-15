import React from 'react'

const CustomToolbar = (props) => {
    const {label, onNavigate, setCategory} = props

    const navigate = (goTo) => {
        onNavigate(goTo)
    }


    return (
        <div className='customToolbar'>
            <div className='navigateBtns'>
                <button className='btn' onClick={() => navigate('PREV')}>Назад</button>
                <button className='btn' onClick={() => navigate('TODAY')}>Сегодня</button>
                <button className='btn' onClick={() => navigate('NEXT')}>Вперед</button>
            </div>
            {label}
            <div>
                <button className='btn' onClick={() => setCategory('all')}>Все</button>
                <button className='btn' onClick={() => setCategory('overdue')}>Просреченные</button>
                <button className='btn' onClick={() => setCategory('done')}>Выполненные</button>
                <button className='btn' onClick={() => setCategory('active')}>Активные</button>
            </div>
        </div>
    )
}

export default CustomToolbar