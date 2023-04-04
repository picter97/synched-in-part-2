import { useState, useEffect } from 'react'
import fakeFetch from './utils/fakeFetch'
import Filter from "./components/Filter";
import Header from './components/Header';
import Person from './components/Person';
import "./App.css";

function App() {

  const [ people, setPeople ] = useState([])
  const [filter, setFilter] = useState("");

  async function getPeople() {
    const JSON_Response = await fakeFetch(); //don't move to the next line,until this line is fully done running.  Gets Data from a fetch call
    const Javascript_Response = await JSON_Response.json(); //.json converts JSON object to JavaScript
    setPeople(await Javascript_Response); // set the people variable to equal the Javascript_Response
  }

  useEffect(()=> {
    
    getPeople()
  }, []);

  return (
    <div className="people-div">
      <Header />
      <Filter setFilter={setFilter} />
      <div className="d-flex flex-wrap justify-content-center">
        {people
          .filter((person) => !filter || person.devLevel === filter)
          .map((person) => (
            <Person key={person.id} person={person} />
          ))}
      </div>
    </div>
  );
}

export default App;