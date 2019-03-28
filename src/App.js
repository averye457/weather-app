import React, {Component} from 'react';
import './App.css';
import Today from './Today';
import ThreeDay from './ThreeDay';
import TenDay from './TenDay';
import SideNav from './SideNav';
import {HashRouter, Route} from 'react-router-dom';

class App extends Component {


     render() {

          return (
               <HashRouter>
                    <div className="App">
                         <Route exact path="/" component={ Today } />
                         <Route path="/threeday" component={ ThreeDay } />
                         <Route path="/tenday" component={ TenDay } />
                         <SideNav />
                    </div>
               </HashRouter>
          );

     }
}

export default App;
