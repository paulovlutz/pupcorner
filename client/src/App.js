import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import QuizPage from './pages/QuizPage/QuizPage';
import DogsFound from './pages/DogsFound/DogsFound';
import DogDetails from './pages/DogDetails/DogDetails';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/quiz" component={QuizPage} />
        <Route path="/dogsfound" component={DogsFound} />
        <Route path="/dogdetails/:id" component={DogDetails} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;