import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const TodoItem = ({ item, index, onDetailClick, onDeleteClick }) => (
  <Draggable draggableId={item.id} index={index}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        className={`todo-item ${snapshot.isDragging ? 'todo-item-dragging' : ''}`}
      >
        <div className="content" {...provided.dragHandleProps}>
          {item.content}
        </div>
        <div className="todo-item-buttons">
          <button
            type="button"
            onClick={() => onDetailClick(item)}
            className="todo-item-buttons-color"
          >
            詳細
          </button>
          <button
            type="button"
            onClick={() => onDeleteClick(item.id)}
            className="todo-item-buttons-color"
          >
            削除
          </button>
        </div>
      </div>
    )}
  </Draggable>
);

export default TodoItem;