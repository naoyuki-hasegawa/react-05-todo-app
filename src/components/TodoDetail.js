import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TodoDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { todo } = location.state;

  const [title, setTitle] = useState(todo.content);
  const [status, setStatus] = useState(todo.status);

  if (!todo) {
    return <div>Todoが見つかりません</div>;
  }

  const handleUpdate = () => {
    const updatedTodo = {
      ...todo,
      content: title,
      status: status,
    };

    const columns = JSON.parse(localStorage.getItem('todoColumns'));
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

    localStorage.setItem('todoColumns', JSON.stringify(newColumns));
    navigate('/');
  };

  const handleDelete = () => {
    const columns = JSON.parse(localStorage.getItem('todoColumns'));
    const newColumns = Object.entries(columns).reduce((acc, [columnId, column]) => {
      const items = column.items.filter(item => item.id !== todo.id);
      acc[columnId] = { ...column, items };
      return acc;
    }, {});

    localStorage.setItem('todoColumns', JSON.stringify(newColumns));
    navigate('/');
  };

  return (
<div className="todo-detail">
  <h2>Todo詳細</h2>
  <div>
    <label htmlFor="title">タイトル：</label>
    <input
      type="text"
      id="title"
      className="todo-detail-title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  </div>
  <div>
    <select
      id="status"
      className="todo-detail-status"
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    >
      <option value="waiting">Waiting</option>
      <option value="doing">Doing</option>
      <option value="done">Done</option>
    </select>
  </div>
  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
    <button onClick={handleUpdate} style={{ marginRight: '1rem' }}>更新</button>
    <button onClick={handleDelete} style={{ marginRight: '1rem' }}>削除</button>
    <button onClick={() => navigate('/')}>キャンセル</button>
  </div>
</div>
);
};

export default TodoDetail;