
import Search from './components/Search'
import MapItems from './components/MapItems';
import { useEffect, useState } from "react";


const App = () => {
  // console.log("APP");
  const title: string = "React programmer";
  type Person = {
    id: number,
    name: string,
    age: number,
  }
  const people: Person[] = [
    { id: 0, name: "react", age: 23 },
    { id: 1, name: "redux", age: 54 },
    { id: 2, name: "javascript", age: 65 },
    { id: 3, name: "typescript", age: 32 },
    { id: 4, name: "java", age: 54 },
    { id: 5, name: "python", age: 76 },
    { id: 6, name: "jest", age: 43 },
  ]

  const [searchItem, searchItemSet] = useState(localStorage.getItem('searchItem') || "");

  useEffect(() => {
    localStorage.setItem('searchItem', searchItem);
    console.log("useEffect is called");
  }, [searchItem]);


  const searchList = (event: any) => {
    console.log(event.target.value);
    searchItemSet(event.target.value);
  }

  const searchedPeople = people.filter(person => person.name.toLocaleLowerCase().includes(searchItem.toLocaleLowerCase()))

  return (
    <div>
      <h1> Hello {title.toUpperCase()}</h1>
      <Search onSearch={searchList} search={searchItem} />
      <MapItems people={searchedPeople} />
    </div>
  )
}


export default App
