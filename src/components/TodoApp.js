import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import TodoInput from './TodoInput';
import TodoColumn from './TodoColumn';

const saveToLocalStorage = (columns) => {
  localStorage.setItem('todoColumns', JSON.stringify(columns));
};

const TodoApp = () => {
  const navigate = useNavigate();

  const [columns, setColumns] = useState(() => {
    const savedColumns = localStorage.getItem('todoColumns');
    return savedColumns ? JSON.parse(savedColumns) : {
      waiting: { name: 'Waiting', items: [] },
      doing: { name: 'Doing', items: [] },
      done: { name: 'Done', items: [] }
    };
  });

  const onDeleteClick = (id) => {
    const newColumns = Object.entries(columns).reduce((acc, [columnId, column]) => {
      const items = column.items.filter(item => item.id !== id);
      acc[columnId] = { ...column, items };
      return acc;
    }, {});
    updateColumns(newColumns);
  };

  const [inputValue, setInputValue] = useState('');

  const updateColumns = (newColumns) => {
    setColumns(newColumns);
    saveToLocalStorage(newColumns);
  };

  const createTodoItem = content => ({
    id: window.crypto.randomUUID(),
    content
  });

  const addTodo = () => {
    if (!inputValue) return;
    const newTodoItem = createTodoItem(inputValue);
    const newWaitingColumn = {
      ...columns.waiting,
      items: [...columns.waiting.items, newTodoItem]
    };
    updateColumns({ ...columns, waiting: newWaitingColumn });
    setInputValue('');
  };
  const onDragEnd = result => {
    const { source, destination } = result;
    if (!destination) return;
    console.log(`Source Index: ${source.index}, Destination Index: ${destination.index}`);
  
    const startColumn = columns[source.droppableId];
    const finishColumn = columns[destination.droppableId];
  
    if (source.droppableId !== destination.droppableId) {
      const newStartItems = Array.from(startColumn.items);
      const newFinishItems = Array.from(finishColumn.items);
      const [removed] = newStartItems.splice(source.index, 1);
      newFinishItems.splice(destination.index, 0, removed);
      const newColumns = {
        ...columns,
        [source.droppableId]: {
          ...startColumn,
          items: newStartItems
        },
        [destination.droppableId]: {
          ...finishColumn,
          items: newFinishItems
        }
      };
      updateColumns(newColumns);
    } else {
      const newItems = Array.from(startColumn.items);
      const [removed] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, removed);
      const newColumns = {
        ...columns,
        [source.droppableId]: {
          ...startColumn,
          items: newItems
        }
      };
      updateColumns(newColumns);
    }
  };
  
  const onUpdateTodo = (updatedTodo) => {
    const newColumns = Object.entries(columns).reduce((acc, [columnId, column]) => {
      if (columnId === updatedTodo.status) {
        acc[columnId] = {
          ...column,
          items: [...column.items, updatedTodo],
        };
      } else {
        acc[columnId] = {
          ...column,
          items: column.items.filter((item) => item.id !== updatedTodo.id),
        };
      }
      return acc;
    }, {});
    updateColumns(newColumns);
  };

  const onDetailClick = (todo) => {
    navigate(`/todos/${todo.id}`, { state: { todo } });
  };

  return (
    <div className="app-container">
      <TodoInput inputValue={inputValue} setInputValue={setInputValue} addTodo={addTodo} />
      <div className="todo-container">
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.entries(columns).map(([columnId, column]) => (
            <div className={`todo-column-container ${columnId === 'waiting' ? '' : ''}`} key={columnId}>
              <TodoColumn
                column={column}
                columnId={columnId}
                onDetailClick={onDetailClick}
                onDeleteClick={onDeleteClick}
                onUpdateTodo={onUpdateTodo}
              />
            </div>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};

export default TodoApp;