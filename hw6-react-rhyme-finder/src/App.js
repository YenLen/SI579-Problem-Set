import './App.css';
import { useEffect, useState } from "react";
import SearchForm from "./components/SearchForm";



function App() {
  // const [savedWords, setSavedWords] = useState([]);
  const [wordInput, setwordInput] = useState("");
  // const [type, setType] = useState('');
  const [output, setOutput] = useState([]);

  return (
    <main>
      <SearchForm/>
    </main>
  );
}

export default App;
