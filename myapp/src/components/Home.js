import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Home.css';
import circle from '../images/circle.png';
import ban from '../images/ban.png';

function Home() {
    const [list, setList] = useState([]);
    const [toggleList, setToggleList] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = () => {
        if (inputValue.trim() !== '') {
            const updatedListToggle = toggleList.filter(task => task !== inputValue);
            setToggleList(updatedListToggle);

            if (!list.includes(inputValue)) {
                setList([...list, inputValue]);
            }
            setInputValue('');
        }
    };

    const removeFromOriginal = (taskToRemove) => {
        setToggleList([...toggleList, taskToRemove]);
        setList(list.filter(task => task !== taskToRemove));
    };

    const removeFromToggle = (taskToRemove) => {
        setList([...list, taskToRemove]);
        setToggleList(toggleList.filter(task => task !== taskToRemove));
    };

    const removeList = (taskToRemove) => {
        setList(list.filter(task => task !== taskToRemove));
        setToggleList(toggleList.filter(task => task !== taskToRemove));
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className='mt-[50px]'>
            <div className='mb-[5%] flex justify-center Border w-[30%] m-[auto]' id='input-tag'>
                <div>
                    <input
                        type="text"
                        id="input-text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        className='mr-[5px] text-[25px]'
                        placeholder='Enter Task'
                    />
                </div>
                <button onClick={handleSubmit} className='Button-update'>Submit</button>
            </div>
            <div className='flex'>
                {list.length > 0 && (
                    <div className='w-[49%] Border ml-[auto] mr-[auto] top-[5px]'>
                        <p className='text-[30px] mt-[5px] mb-[3px]'>Current <span className='text-customRed'>Task </span><span className='text-customLightBlue'>List</span></p>
                        <p className='w-[100%] bg-customLightBlue h-[2px]'></p>
                        <AnimatePresence>
                            {list.map((task, index) => (
                                <motion.div
                                    key={task}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    transition={{ duration: 0.5 }}
                                    className='ListParent flex Border relative w-[70%] mr-[auto] ml-[auto] mb-[10px] bg-customLightBlue100'
                                >
                                    <img src={circle} alt='circle' className='w-[20px] h-[20px] absolute left-[1%] top-[12px] ListChildOne' onClick={() => removeFromOriginal(task)} />
                                    <p className='break-all w-[73%] relative left-[6%] BorderOfInput text-left ListChildTwo text-[20px] mt-[8px] pl-[10px] mb-[8px] bg-customLightBlue100'>{task}</p>
                                    <button onClick={() => removeList(task)} className='absolute right-[1%] top-[3.5px] ListChildThree'>Remove</button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
                {(toggleList.length > 0 && list.length > 0) && (
                         <>
                         <div className='h-[auto] w-[5px] Border ml-[10px] mr-[10px]' />
                     </>
                )}
                {toggleList.length > 0 && (
                    <div className='w-[48%] Border ml-[auto] mr-[auto]'>
                        <p className='text-[30px] mt-[5px] mb-[3px]'>Toggle <span className='text-customRed'>Task </span><span className='text-customLightBlue'>List</span></p>
                        <p className='w-[100%] bg-customLightBlue h-[2px]'></p>
                        <AnimatePresence>
                            {toggleList.map((task, index) => (
                                <motion.div
                                    key={task}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.5 }}
                                    className='ListParent flex Border relative w-[70%] mr-[auto] ml-[auto] mb-[10px]'
                                >
                                    <img src={ban} alt='ban' className='w-[20px] h-[20px] absolute left-[1%] top-[12px] ListChildOne' onClick={() => removeFromToggle(task)} />
                                    <p className='break-all w-[73%] relative left-[6%] BorderOfInput text-left ListChildTwo text-[20px] mt-[8px] pl-[10px] mb-[8px]'>{task}</p>
                                    <button onClick={() => removeList(task)} className='absolute right-[1%] top-[3.5px] ListChildThree'>Remove</button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
