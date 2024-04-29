import React from 'react';

const TodoInput = ({ inputValue, setInputValue, addTodo }) => (
  <div className="w-full p-4 mx-auto max-w-xl">
    <h2 className="input-title font-semibold mb-2">Todoを追加</h2>
    <div className="flex items-center space-x-2">
    <input
  type="text"
  value={inputValue}
  onChange={e => setInputValue(e.target.value)}
  placeholder="Todoを入力してください"
  className="todo-input-border flex-1 p-2 rounded focus:outline-none"
/>

<button
  onClick={addTodo}
  className="todo-input-button px-4 py-2 text-white rounded"
>
  追加
</button>

    </div>
  </div>
);

export default TodoInput;