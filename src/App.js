import "./App.css";
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from "react-redux";
import NewsList from './components/NewsList';
import NewsView from './components/NewsView';
import Page404 from './components/Page404';
import Welcome from './components/Welcome';

function App() {
  const { token } = useSelector((state) => state.loginForm);
  return (
    <Router>
      <div className="page">
        {token && (
          <Switch>
            <Route exact path="/">
              <Redirect to="/news" />
            </Route>
            <Route exact path="/news" component={NewsList} />
            <Route exact path="/news/:id" component={NewsView} />
            <Route component={Page404} />
          </Switch>
        )}
        {!token && (
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        )}
      </div>
    </Router>
  );
}

export default App;
