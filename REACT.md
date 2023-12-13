### Rest operator
```
const sum = (...numbers: number[]) =>  numbers.reduce((prev, curr) => prev + curr, 0)

sum(2,3,6,8,0,6,4,8,5,3,2,6,87,56) => 196
sum(2,4,5) => 11
```

---


### Speard operator

```
const nums = [1,2,3,4,5];

const nums2 = [...nums];
```

---

# Setup react app using vite not create-react-app
- vite is a build tool that provides a faster development exprience for modern web projects. and it is a bundler that build your app using `Rollup` and optimizes static assets for production.

1- for installing latest version of vite in a project, run `npm create vite@latest` in your project directory. 

2- then enters the name of project and choose React for framework and js or ts for lang. 

---


# Start coding with react
- components name should be pascal case
- react returns a composition of html and js that is jsx(javascript XML)
- in function components, whenever that component is called or updated, all variables gets called and initialized. So if a parameter or variable does not need any parameter of function, define that variable outside the function. 
- `htmlFor` in react is equals to `for` in html 

---

# Props
- it is used for passing data from parent to its child.
- it is read-only in child components and is not changable
- Pay attention to the below example: 
  
```
const App = () => {
  type Person = {
    id: number,
    name: string,
    age: number,
  }
  const people: Person[] = [
    { id: 0, name: "Ali", age: 23 },
    { id: 1, name: "Hesam", age: 54 },
    { id: 2, name: "MMD", age: 65 },
    { id: 3, name: "Reza", age: 32 },
  ]
  return (
    <div>
      <Map people={people} />
    </div>
  )
}


const Map = (props: any): JSX.Element => {
  return (
    <ul>
      {
        // javascript code
        props.people.map((item: any) => {
          return (
            <Item item={item} key={item.id} />
          )

        })
      }
    </ul>
  )
}

const Item = (props: any) => {
  return (
    <li key={props.item.id}>
      <span id="id">{props.item.id + 1}</span>-
      <span id="name">{props.item.name}</span>-
      <span id="age">{props.item.age}</span>
    </li>
  )
}
```

---

# States
- is a changable data structure that is defined in component scope. it can be passed using props across components and despite of props, it can be changed
- changing the state means re-rendering the component
- states generally used for changing the data state in React

- Please pay attention to below example: 
we want to change the value of searchResult based on onChange event we defined in input. but whenever we update the input value, although React knows the change of searchResult, the display is not updated and shows the first state ( searchState: string = '-' ). React needs to re-render the component to show the updated value for searchState. 
```
const Search = (): JSX.Element => {
    let searchState: string = '-';
    const handleChange = (event: any) => {
        searchState = event.target.value;
        console.log(event.target.value);
    }
    return (
        <>
            <label htmlFor="search">Search</label>
            <input onChange={handleChange} type="text" id="search" />
            <p> SearchState is: {searchState} </p>
        </>
    )
}
```

- So we have to use `state` in React for changing the data of a component 

```
import { useState } from "react";

const Search = (): JSX.Element => {
    <!-- 
        whenever searchState updates through setSearchState function, Search component and its childs components will be re-rendered
     -->
    <!-- const [Variable, UpdaterFunctionForVariable] = useState(initialValue) -->
    
    const [searchState, setSearchState] = useState('-')
    const handleChange = (event: any) => {
        setSearchState(event.target.value);
        console.log(event.target.value);
    }
    return (
        <>
            <label htmlFor="search">Search</label>
            <input onChange={handleChange} type="text" id="search" />
            <p> SearchState is: {searchState} </p>
        </>
    )
}
```

---

# What is Strict mode in react ? 
- in development + strict mode, when a component is called, it is being called 2 times and thats because of strict mode. But this event is not happening in production mode. 
- restrict mode helps developer edits and debugs the application better. 

```
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---

# Build project

1- `npm run build` for building and optimizing the files for production.
2- `npm run preview` for seeing the application in real world. 
3- in production, you can see that each component is being called inly 1 time.
4- the project has been built is created at `dist` folder.

---

# passing data from child to its parent using callback handler
- we learnt how to pass data from parent to child using props. now we want to pass data from child to parent.
- we declare a function called `getDataFromChild` in parent component that gets data as its argument. then we return child component and pass `getData prop` and `getDataFromChild` as callback handler. in child component, we get the prop, and call the `getData` and pass `event.target.value` as its argument.  

```
import Child from './Child'
const Parent = () => {
    const getDataFromChild = (data) => {
        console.log(data);
    }
    return (
        <Child getData={getDataFromChild} />
    )
}
const Child = (props) => {
    const inputChanged = (event) => {
        <!-- The data that we sent is event.target.value -->
        props.getData(event.target.value)
    }
    return (
        <input onChange={inputChanged} />
    )
}
```

---

# state lifting
- it means to lift useState from child to its parent. 
### child component: 
```
const child = (props: any) => {


    const handleChange = (event: any) => {
        props.onSearch(event.target.value);
    }
    return (
        <div>
            <input onChange={handleChange} />
        </div>
    )
}
```

### parent component:
```
import Child from './components/Search';
import { useState } from 'react';
const App = () => {
  const people = [
    { id: 0, name: "react", age: 23 },
    { id: 1, name: "redux", age: 54 },
    { id: 2, name: "javascript", age: 65 },
    { id: 3, name: "typescript", age: 32 },
    { id: 4, name: "java", age: 54 },
    { id: 5, name: "python", age: 76 },
    { id: 6, name: "jest", age: 43 },
  ];

  const [searchItem, setSearchItem] = useState("");

  const filterList = (value: string) => {
    setSearchItem(value);
  }

  const filteredItems = people.filter(person => person.name.toLowerCase().includes(searchItem.toLowerCase()))

  return (
    <div>
      <Child onSearch={filterList} />
      <ul>
        {filteredItems.map(person => <li key={person.id}>{person.name}</li>)}
      </ul>
    </div>
  )
}
```

---

# controlled component
- refers to a component that depends totally on react states and gets data from react states. 

---

# props handling
- below techniques are used in passing props between components or any operations on objects in js or ts.

### 1- props destructuring: props is a js object and can be destructued. 
```
const user = {fname: 'ali', lname: 'ahmadi', education: {degree: 'masters'}};
{firstname, lastname, education: {degree}} = user;

```

### 2- spread operator: extracts all key-values of an objects and pass it to new variable
- spread operator is used on the right side but rest operator is used on the left side 

```
const attrs = {
  FName: "Ali",
  LName: "Mirzaie",
  height: "165cm",
  weight: "90kg",
};

const skills = {
  programming: "javascript",
  technologies: "ASP.Net",
  language: "English",
};

const user = {
  ...attrs,
  ...skills,
  Gender: "Male",
  Age: 45,
};

/*
user => {
  FName: 'Ali',
  LName: 'Mirzaie',
  height: '165cm',
  weight: '90kg',
  programming: 'javascript',
  technologies: 'ASP.Net',  
  language: 'English',      
  Gender: 'Male',
  Age: 45
}
*/
```
 
### 3- Rest operator : extract specific parts of an object
- rest operator is used on the left side but spread operator is used on the right side 
```
const user = { id: 1, fname: 'ali', lname: 'ahmadi' };
const {id, ...userWithoutID} = user;

<!-- id: 1 -->
<!-- userWithoutID: {fname: 'ali', lname: 'ahmadi'} -->

```

---

# Side effects and useEffect hook
- There are 2 major functions in js. pure and impure functions. pure functions, are the ones that for the same inputs they returns the same results like Add(num1, num2) function. but impure functions have side effects that means work with sth out of their scope or change sth that is impacts the out of function.
### What is side effect in REACT ?  
  - everything(event) that happens out of React universe or react scope is a side effect. like change a global variable, call an API, make a https request, change DOM using js and localStorage are the events that are irrelated to Reactjs. 
  - handling side effects are done in useEffect hook in REACT. 


---

# Add the type of a new library in react.ts
- If typescript complains about the type of a library in react.ts project, you should install the types of that library 
  using the commnd below: 
  `npm i -D @types/<name_of_library>`


