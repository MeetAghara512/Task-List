import React, { useState, useMemo } from 'react';
import { useAppContext } from '../useContext/AppContext';
import { CheckCircle, Circle, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Section = ({ section, onRemove }) => {
  const { addTask, removeTask, toggleTask, darkMode } = useAppContext();  // <- get darkMode here
  console.log(darkMode);
  const [taskText, setTaskText] = useState('');

  const handleAddTask = () => {
    if (taskText.trim()) {
      addTask(section.id, taskText);
      setTaskText('');
    }
  };

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const sortedTasks = useMemo(() => {
    return [...section.tasks].sort((a, b) => a.done - b.done);
  }, [section.tasks]);

  return (
    <div
      className={`
        bg-white dark:bg-gray-800 
        rounded-lg 
        p-4 space-y-4 relative flex flex-col 
        transition-shadow duration-300
        min-h-600
        ${!darkMode ? 'shadow-lg shadow-black/40 hover:shadow-xl hover:shadow-black/60' : 'shadow-md shadow-white/30 hover:shadow-lg hover:shadow-white/50'}
      `}
    >
      <button
        onClick={onRemove}
        className="
          absolute top-2 right-2 
          text-red-500 hover:text-white 
          hover:bg-red-500 p-1 rounded-full 
          transition-all duration-300
        "
        aria-label="Remove Section"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      <h2 className="text-xl font-semibold">{section.title}</h2>

      <div className="flex gap-2">
        <input
          type="text"
          className="
            border border-gray-300 dark:border-gray-600 
            p-2 rounded flex-grow 
            dark:bg-gray-700 dark:text-white 
            focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-600 
            transition-all duration-300
          "
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="New Task"
        />
        <button
          onClick={handleAddTask}
          className="
            bg-green-500 text-white 
            px-4 py-2 rounded 
            hover:bg-green-600 active:scale-95 
            transition-all duration-300 shadow 
            hover:shadow-lg dark:hover:shadow-green-700
          "
        >
          ➕ Add
        </button>
      </div>

      <motion.ul
        layout
        className="space-y-2"
        style={{
          overflowY: 'auto',
          flexGrow: 1,
          maxHeight: '300px',
        }}
      >
        <AnimatePresence>
          {sortedTasks.map((task) => (
            <motion.li
              key={task.id}
              layout
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3 }}
              className={`
                flex justify-between items-center p-2 rounded cursor-pointer
                transition-all duration-300
                ${
                  task.done
                    ? 'bg-green-200 dark:bg-green-700 text-green-900 dark:text-green-100 line-through'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }
              `}
            >
              <span
                onClick={() => toggleTask(section.id, task.id)}
                className="flex items-center gap-2 flex-grow"
              >
                {task.done ? (
                  <CheckCircle className="text-green-600 w-5 h-5" />
                ) : (
                  <Circle className="text-gray-400 w-5 h-5" />
                )}
                {task.text}
              </span>
              <button
                onClick={() => removeTask(section.id, task.id)}
                className="text-red-500 hover:text-red-700"
                aria-label="Remove Task"
              >
                <Trash2 />
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
};

export default Section;
