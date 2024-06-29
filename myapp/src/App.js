import './App.css';
import './components/Home.css';
import Home from "./components/Home"

function App() {
  return (
    <div className="App bg-black Main">
      <header className='text-[60px] relative top-[10px]'><span className='text-customRed'>Task </span> < span className='text-customLightBlue'>List</span>  </header>
      <Home/>
    </div>
  );
}

export default App;
