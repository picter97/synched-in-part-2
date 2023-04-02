import { useState, useEffect } from 'react'
import fakeFetch from './utils/fakeFetch'

import Header from './components/Header';
import Person from './components/Person';

function App() {

  const [ people, setPeople ] = useState([])

  useEffect(()=> {
    const getPeople = async () => {
      const res = await fakeFetch() // get data from "fetch"
      setPeople(await res.json()) // store the result of .json() in state
    }
    getPeople()
  },[])

  return (
    <div className="app">
      <Header />
      <div className="people-div d-flex flex-wrap justify-content-center">
          { people.map(person => <Person key={person.id} person={person} />) }
      </div>
    </div>
  );
}

export default App;
