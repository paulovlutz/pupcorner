import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import QuizPage from './pages/QuizPage/QuizPage';
import DogsFound from './pages/DogsFound/DogsFound';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/quiz" component={QuizPage} />
        <Route path="/dogsfound" component={DogsFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;