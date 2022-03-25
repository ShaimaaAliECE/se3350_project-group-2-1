import './App.css';
import Game from "./components/Game.jsx";
import postData from "./postData";

function App() {
    
    const { data: score, loading, error, refetch } = postData(
        "http://127.0.0.1:8080/postData"
      );

      if (loading) return <h1> LOADING...</h1>;

      if (error) console.log(error);


    return (
        <Game />
    );
}

export default App;
