import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Greeter from './greeter';
import './main.css';

//Router元素下只能有一个子元素
render(
    <Router>
        <div>
            <ul>
                <li><Link to="/" >Home</Link></li>
                <li><Link to="/detail/1" >Detail</Link></li>
            </ul>
            <Route exact path="/" component={Greeter}></Route>
            <Route path="/detail/:id" component={Greeter}></Route>
        </div>
    </Router>,
    document.getElementById('root')
);



