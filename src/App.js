import React, {Component} from 'react';
import './App.css';
import SideNav from './SideNav';

class App extends Component {

     state = {
          searchedLocation: null,
          temp: null,
          name: null,
          region: null,
          country: null,
          hightemp: null,
          lowtemp: null,
          description: null,
          windDirection: null,
          windSpeed: null,
          humidity: null,
          cloudCover: null,
          feelsLike: null
     }

     componentDidMount(){

          var url = `http://api.apixu.com/v1/forecast.json?key=7c69d285fd3240afadb02824192202&q=Paris&days=1`;

          fetch( url )
               .then(response => response.json())
               .then( response => this.setState({
                    temp: response.current.temp_f,
                    name: response.location.name,
                    region: response.location.region,
                    country: response.location.country,
                    hightemp: response.forecast.forecastday[0].day.maxtemp_f,
                    lowtemp: response.forecast.forecastday[0].day.mintemp_f,
                    description: response.current.condition.text,
                    windDirection: response.current.wind_dir,
                    windSpeed: response.current.wind_mph,
                    humidity: response.current.humidity,
                    cloudCover: response.current.cloud,
                    feelsLike: response.current.feelslike_f
               }))

     }

     componentDidUpdate () {
          this.checkWeatherText();
}

     checkWeatherText() {

          if ( this.state.description === "Sunny" || this.state.description === "Clear" ) {
               var root = document.getElementById('root');
               root.setAttribute('style', 'background: linear-gradient(0deg, rgb(249, 245, 148) 50%, #fff 50%)');
               var sun = document.getElementById('sun');
               sun.setAttribute('style', 'opacity: 1');
               var cloud1 = document.getElementById('cloud1');
               cloud1.setAttribute('style', 'opacity: 0');
               var cloud2 = document.getElementById('cloud2');
               cloud2.setAttribute('style', 'opacity: 0');
          } else if ( this.state.description === "Partly cloudy" ) {
               var root = document.getElementById('root');
               root.setAttribute('style', 'background: linear-gradient(0deg, rgb(249, 245, 148) 50%, #fff 50%)');
               var sun = document.getElementById('sun');
               sun.setAttribute('style', 'opacity: 1');
               var cloud1 = document.getElementById('cloud1');
               cloud1.setAttribute('style', 'opacity: 1');
               var cloud2 = document.getElementById('cloud2');
               cloud2.setAttribute('style', 'opacity: 0');
          } else if ( this.state.description === "Cloudy" || this.state.description === "Overcast" ) {
               var root = document.getElementById('root');
               root.setAttribute('style', 'background: linear-gradient(0deg, #ebebeb 50%, #fff 50%)');
               var sun = document.getElementById('sun');
               sun.setAttribute('style', 'opacity: 0');
               var cloud1 = document.getElementById('cloud1');
               cloud1.setAttribute('style', 'opacity: 1');
               var cloud2 = document.getElementById('cloud2');
               cloud2.setAttribute('style', 'opacity: 1');
          } else if ( this.state.description === "Cloudy" || this.state.description === "Overcast" ) {
               var root = document.getElementById('root');
               root.setAttribute('style', 'background: linear-gradient(0deg, #ebebeb 50%, #fff 50%)');
               var sun = document.getElementById('sun');
               sun.setAttribute('style', 'opacity: 0');
               var cloud1 = document.getElementById('cloud1');
               cloud1.setAttribute('style', 'opacity: 1');
               var cloud2 = document.getElementById('cloud2');
               cloud2.setAttribute('style', 'opacity: 1');
          }
     }

     checkCountry = ( country ) => {
          if (country === "United States of America") {
               return "USA";
          } else {
               return country;
          }
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

          var url = `http://api.apixu.com/v1/forecast.json?key=7c69d285fd3240afadb02824192202&q=${this.state.searchedLocation}&days=1`;

          fetch( url )
               .then(response => response.json())
               .then( response => this.setState({
                    temp: response.current.temp_f,
                    name: response.location.name,
                    region: response.location.region,
                    country: response.location.country,
                    hightemp: response.forecast.forecastday[0].day.maxtemp_f,
                    lowtemp: response.forecast.forecastday[0].day.mintemp_f,
                    description: response.current.condition.text,
                    windDirection: response.current.wind_dir,
                    windSpeed: response.current.wind_mph,
                    humidity: response.current.humidity,
                    cloudCover: response.current.cloud,
                    feelsLike: response.current.feelslike_f
               }, () => {
                    this.checkWeatherText()
               }))

     }


     render() {

          return (
               <div className="App">
                    <div className="search-stuff">
                         <input
                              id="search"
                              type="text"
                              onChange={ e => this.inputValue(e) }
                              onKeyDown={ e => this.didTheyClickEnter(e)}
                              placeholder="City Search " />
                         {/* <input
                              id="submit"
                              type="submit"
                              onClick={ e => this.getWeather(e) }
                              value="submit" /> */}
                    </div>
                    <div className="weather-info">
                         <h5>{ this.state.name }, {this.state.region}, { this.checkCountry(this.state.country) }</h5>
                         <h3>{ Math.round(this.state.temp) }&#176;</h3>
                         <h6>H: { Math.round(this.state.hightemp) }&#176;  / L: { Math.round(this.state.lowtemp) }&#176;</h6>
                         <h4>{this.state.description}</h4>
                         <p>Winds { this.state.windDirection } at { Math.round(this.state.windSpeed) } mph.
                              Humidity of { this.state.humidity }% with cloud cover of { this.state.cloudCover }%.
                              Currently feels like { Math.round( this.state.feelsLike ) }&#176;.</p>
                    </div>
                    <div id="sun"></div>
                    <div id="cloud1">
                         <div id="cloud111"></div>
                         <div id="cloud222"></div>
                    </div>
                    <div id="cloud2">
                         <div id="cloud333"></div>
                         <div id="cloud444"></div>
                    </div>
                    <div class="rain">
                         <span id="raindrop1"></span>
                         <span id="raindrop2"></span>
                         <span id="raindrop3"></span>
                         <span id="raindrop4"></span>
                         <span id="raindrop5"></span>
                         <span id="raindrop6"></span>
                         <span id="raindrop7"></span>
                         <span id="raindrop8"></span>
                         <span id="raindrop9"></span>
                         <span id="raindrop10"></span>
                         <span id="raindrop11"></span>
                         <span id="raindrop12"></span>
                         <span id="raindrop13"></span>
                         <span id="raindrop14"></span>
                         <span id="raindrop15"></span>
                         <span id="raindrop16"></span>
                         <span id="raindrop17"></span>
                         <span id="raindrop18"></span>
                         <span id="raindrop19"></span>
                         <span id="raindrop20"></span>
                    </div>
                    <SideNav />
               </div>
          );

     }
}

export default App;
