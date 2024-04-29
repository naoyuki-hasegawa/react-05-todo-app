import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TodoItem from './TodoItem';

const TodoColumn = ({ column, columnId, onDetailClick, onDeleteClick }) => {
  return (
    <div className="todo-column-wrapper">
      <h3 className="font-bold mb-2 column-title">{column.name}</h3>
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`todo-column ${
              snapshot.isDraggingOver ? 'todo-column-dragging-over' : ''
            }`}
          >
            {column.items.map((item, index) => (
              <TodoItem
                key={item.id}
                item={item}
                index={index}
                onDetailClick={onDetailClick}
                onDeleteClick={onDeleteClick}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoColumn;