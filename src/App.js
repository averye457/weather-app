import React, {Component} from 'react';
import './App.css';

class App extends Component {

     state = {
          searchedLocation: null,
          temp: null,
          name: null,
          region: null,
          country: null
     }


     didTheyClickEnter = e => {
          if ( e.keyCode === 13 ) {
               this.getWeather(e);
               let search = document.querySelector( '#search' );
               search.value = "";
          }
     }

     inputValue = e => {
          this.setState({
               searchedLocation: e.target.value
          })
     }

     getWeather = (e) => {

          e.preventDefault()
          fetch( `http://api.apixu.com/v1/current.json?key=7c69d285fd3240afadb02824192202&q=${this.state.searchedLocation}`)
               .then(response => response.json())
               .then( response => this.setState({
                    temp: response.current.temp_f,
                    name: response.location.name,
                    region: response.location.region,
                    country: response.location.country
               }));
     }


     render() {

          return (
               <div className="App">
                    <input
                         id="search"
                         type="text"
                         onChange={ e => this.inputValue(e) }
                         onKeyDown={ e => this.didTheyClickEnter(e)}
                         placeholder="Search" />
                    <input t
                         ype="submit"
                         onClick={ e => this.getWeather(e) }
                         value="Go" />
                    <h5>{ this.state.name }, {this.state.region}, {this.state.country}</h5>
                    <h3>{ this.state.temp }</h3>
               </div>
          );

     }
}

export default App;
