import React, { useEffect, useState } from 'react';
import './Task-module.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import dateFnsFormat from 'date-fns/format';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import addDays from 'date-fns/addDays';
import isToday from 'date-fns/isToday';


const FORMAT = 'MM/dd/yyyy';

const getLocalItem = () => {
    let list = localStorage.getItem('list');
    if (list) {
        return JSON.parse(localStorage.getItem('list'));
    }
    else {
        return [];
    }

};


const AddTask = (props) => {
    const [task, setTask] = useState("");
    const [date, setDate] = useState(null);

    return (
        <div className='add-task-data'>
            <input value={task} onChange={(event) => setTask(event.target.value)} />
            <div className='addTask-btn'>
                <div className='action-btn'>
                    <button className='add-btn' disabled={!task} onClick={() => { props.onAddTaskData(task, date); setTask(""); }}>
                        Add Taks
                    </button>
                    <button className='cancel-btn' onClick={() => props.onClick()}>Cancel</button>
                </div>
                <div>
                    <DayPickerInput onDayChange={(day) => setDate(day)} placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
                        dayPickerProps={{
                            modifiers: {
                                disabled: [{ before: new Date() }],
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

const Task_Header = {
    Inbox: "Inbox",
    Today: "Today",
    Next_7: "Next 7 days",
}

const TaskItems = ({ tabSelector, tasksData, setTaskData }) => {
    let tasksDataToRender = [...tasksData];
    const deleted = (ids) => {
        const filteredDate = tasksData.filter((data) => ids !== data.id);
        setTaskData(filteredDate);
    }
    if (tabSelector === "Next_7") {
        tasksDataToRender = tasksDataToRender.filter((task) => isAfter(task.date, new Date())
            && isBefore(task.date, addDays(new Date(), 7)))
    }

    if (tabSelector === "Today") {
        tasksDataToRender = tasksDataToRender.filter((task) => isToday(task.date))
    }
    if(tasksDataToRender.length>0){
    return ( tasksDataToRender.map((task) => <tr key={task.id}>
            <td>{task.text} </td>
            <td>{dateFnsFormat(new Date(task.date), FORMAT)}</td>
            <td><button onClick={() => deleted(task.id)}>Delete</button></td>
        </tr>))}
    else{
        return <h4>No task yet.</h4>;
    }     
}
const Task = ({ tabSelector }) => {
    const [showTask, setShowTask] = useState(false);
    const [taskData, setTaskData] = useState(getLocalItem());
    const onAddTask = (text, date) => {
        const newTaskItem = { text, date: date || new Date(), id: new Date().getTime().toString() }
        if (text !== "") setTaskData([...taskData, newTaskItem]);

    }
    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(taskData));
    }, [taskData])

    return (
        <div className="tasks">
            <h3>{Task_Header[tabSelector]}</h3>

            {tabSelector === "Inbox" ? <div className="addTask-text" onClick={() => setShowTask(!showTask)}>
                <span className='plus'>+</span>
                <span className='add-task'>Add Task</span>
            </div> : null}
            {showTask && <AddTask onAddTaskData={onAddTask} onClick={() => setShowTask(false)} />}

            <div>
                <table>
                    <thead>
                        <tr>
                            <td className="head">Task</td>
                            <td className="head">Date</td>
                            <td className="head">Action</td>
                        </tr>
                    </thead>
                    <tbody className='tbody'>
                        {taskData.length > 0 ? <TaskItems tasksData={taskData} tabSelector={tabSelector} setTaskData={setTaskData} /> : <h4>No task yet.</h4>}
                    </tbody>
                </table>
            </div>



        </div>
    )
}

export default Task;