import React, { useState } from 'react';
import { useAppContext } from '../useContext/AppContext';
import Section from './Section';

const SectionManager = () => {
  const { sections, addSection, removeSection, darkMode } = useAppContext();
  const [title, setTitle] = useState('');

  const handleCreateSection = () => {
    if (title.trim()) {
      addSection(title);
      setTitle('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 justify-center">
        <input
          type="text"
          className={`
            border border-gray-300
            p-2 rounded w-[60%]
            bg-white text-gray-900
            focus:outline-none focus:ring-2 focus:ring-blue-400
            hover:border-gray-400
            transition-all duration-300
          `}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New Section Title"
        />
        <button
          onClick={handleCreateSection}
          className={`
            bg-blue-500 text-white 
            px-4 py-2 rounded 
            hover:bg-blue-600 active:scale-95 
            transition-all duration-300 shadow
            ${
              darkMode
                ? 'dark:hover:shadow-[0_0_15px_rgba(59,130,246,0.7)]'
                : 'hover:shadow-lg'
            }
          `}
        >
          ➕ Add Section
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => (
          <Section
            key={section.id}
            section={section}
            onRemove={() => removeSection(section.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionManager;
