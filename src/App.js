import React, {Component} from 'react';
import './App.css';
import Today from './Today';
import ThreeDay from './ThreeDay';
import TenDay from './TenDay';
import SideNav from './SideNav';
import {BrowserRouter, Route} from 'react-router-dom';

class App extends Component {


     render() {

          return (
               <BrowserRouter>
                    <div className="App">
                         <Route exact path="/" component={ Today } />
                         <Route path="/threeday" component={ ThreeDay } />
                         <Route path="/tenday" component={ TenDay } />
                         <SideNav />
                    </div>
               </BrowserRouter>
          );

     }
}

export default App;
