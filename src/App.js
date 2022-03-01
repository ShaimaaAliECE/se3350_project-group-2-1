import './App.css';
import Game from "./components/Game.jsx";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// App function
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Game/>
        </Route>
      </Switch>
    </Router>
  );
}
export default App;

