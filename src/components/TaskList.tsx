import { useState, useEffect } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [att, setAtt] = useState(false);

  function handleCreateNewTask() {
    const data = {
      id: Math.floor(Math.random()*10000),
      title:newTaskTitle,
      isComplete:false
    }
    if(data.title!=''){
      const taskList = tasks
      taskList.push(data)
      setTasks(taskList)
      setNewTaskTitle('')
    }else{
      console.log('error')
    }
  }

  function handleToggleTaskCompletion(id: number) {
    tasks.filter(task=>{
      if(task.id===id){
        task.isComplete=!task.isComplete
      }
      setAtt(!att)
    })
  }

  function handleRemoveTask(id: number) {
    const newTasks = tasks.filter(task => task.id !== id)
    setTasks(newTasks)
    setAtt(!att)
    }
  

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>
        <input type="hidden" value={att}></input>
        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}