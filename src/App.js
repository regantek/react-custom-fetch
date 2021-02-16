import "./App.css";
import useFetch from "./useFetch";

function App() {
  const fetchData = useFetch("https://jsonplaceholder.typicode.com/users");
  console.log(fetchData);

  return (
    <div className="App">
      <h1>useFetch Custom Hook</h1>

      {fetchData.data.map((el) => (
        <div className="App-list" key={el.id}>
          <p>{el.name}</p>
          <p>{el.email}</p>
          <p>{el.phone}</p>
          <p>{el.website}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
