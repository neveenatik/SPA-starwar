import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Home from './components/pages/Home/Home';
import Film from './components/pages/Film/Film';
import './App.scss';

function App() {
    return (
        <Router >
        <div className="App">
            <Route exact path="/" component={Home} />
            <Route path="/film/:id" component={Film} />
        </div>
        </Router>
    );
}

export default App;
