import React, {Component} from 'react';
import './App.css';
import SideNav from './SideNav';

class Today extends Component {

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
               var cloud2 = document.getElementById('cloud2');
               cloud2.setAttribute('style', 'opacity: 0');
               var rain = document.getElementById('rain');
               rain.setAttribute('style', 'display: none');
               var snow = document.getElementById('snow');
               snow.setAttribute('style', 'display: none');
          } else if ( this.state.description === "Partly cloudy" ) {
               var root = document.getElementById('root');
               root.setAttribute('style', 'background: linear-gradient(0deg, rgb(249, 245, 148) 50%, #fff 50%)');
               var sun = document.getElementById('sun');
               sun.setAttribute('style', 'opacity: 1');
               var cloud1 = document.getElementById('cloud1');
               cloud1.setAttribute('style', 'opacity: 1');
               var cloud2 = document.getElementById('cloud2');
               cloud2.setAttribute('style', 'opacity: 0');
               var rain = document.getElementById('rain');
               rain.setAttribute('style', 'display: none');
               var snow = document.getElementById('snow');
               snow.setAttribute('style', 'display: none');
          } else if ( this.state.description === "Cloudy" || this.state.description === "Overcast" ) {
               var root = document.getElementById('root');
               root.setAttribute('style', 'background: linear-gradient(0deg, #ebebeb 50%, #fff 50%)');
               var sun = document.getElementById('sun');
               sun.setAttribute('style', 'opacity: 0');
               var cloud1 = document.getElementById('cloud1');
               cloud1.setAttribute('style', 'opacity: 1');
               var cloud2 = document.getElementById('cloud2');
               cloud2.setAttribute('style', 'opacity: 1');
               var rain = document.getElementById('rain');
               rain.setAttribute('style', 'display: none');
               var snow = document.getElementById('snow');
               snow.setAttribute('style', 'display: none');
          } else if ( this.state.description === "Patchy rain possible" || this.state.description === "Patchy light drizzle"
          || this.state.description === "Light drizzle" || this.state.description === "Patchy light rain"
          || this.state.description === "Light rain" || this.state.description === "Patchy light drizzle"
          || this.state.description === "Moderate rain at times" || this.state.description === "Moderate rain"
          || this.state.description === "Heavy rain at times" || this.state.description === "Heavy rain"
          || this.state.description === "Torrential rain shower" || this.state.description === "Patchy light rain with thunder"
          || this.state.description === "Moderate or heavy rain with thunder" ) {
               var root = document.getElementById('root');
               root.setAttribute('style', 'background: linear-gradient(0deg, lightblue 50%, #fff 50%)');
               var sun = document.getElementById('sun');
               sun.setAttribute('style', 'opacity: 0');
               var cloud1 = document.getElementById('cloud1');
               cloud1.setAttribute('style', 'opacity: 1');
               var cloud2 = document.getElementById('cloud2');
               cloud2.setAttribute('style', 'opacity: 1');
               var snow = document.getElementById('snow');
               snow.setAttribute('style', 'display: none');
               document.documentElement.style.setProperty('--precipitation', 'lightblue');
               var rain = document.getElementById('rain');
               rain.setAttribute('style', 'opacity: 1');
          } else if ( this.state.description === "Patchy snow possible" || this.state.description === "Blowing snow"
          || this.state.description === "Blizzard" || this.state.description === "Patchy light snow"
          || this.state.description === "Light snow" || this.state.description === "Patchy moderate snow"
          || this.state.description === "Moderate snow" || this.state.description === "Patchy heavy snow"
          || this.state.description === "Heavy snow" || this.state.description === "Light snow showers"
          || this.state.description === "Moderate or heavy snow showers" || this.state.description === "atchy light snow with thunder"
          || this.state.description === "Moderate or heavy snow with thunder" ) {
               var root = document.getElementById('root');
               root.setAttribute('style', 'background: linear-gradient(0deg, 	#E8E8E8 50%, #fff 50%)');
               var sun = document.getElementById('sun');
               sun.setAttribute('style', 'opacity: 0');
               var cloud1 = document.getElementById('cloud1');
               cloud1.setAttribute('style', 'opacity: 1');
               var cloud2 = document.getElementById('cloud2');
               cloud2.setAttribute('style', 'opacity: 1');
               var rain = document.getElementById('rain');
               rain.setAttribute('style', 'display: none');
               var snow = document.getElementById('snow');
               snow.setAttribute('style', 'opacity: 1');
               document.documentElement.style.setProperty('--precipitation', '	#DCDCDC');
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
                    <div id="rain">
                         <span class ="raindrop" id="raindrop1"></span>
                         <span class ="raindrop" id="raindrop2"></span>
                         <span class ="raindrop" id="raindrop3"></span>
                         <span class ="raindrop" id="raindrop4"></span>
                         <span class ="raindrop" id="raindrop5"></span>
                         <span class ="raindrop" id="raindrop6"></span>
                         <span class ="raindrop" id="raindrop7"></span>
                         <span class ="raindrop" id="raindrop8"></span>
                         <span class ="raindrop" id="raindrop9"></span>
                         <span class ="raindrop" id="raindrop10"></span>
                         <span class ="raindrop" id="raindrop11"></span>
                         <span class ="raindrop" id="raindrop12"></span>
                         <span class ="raindrop" id="raindrop13"></span>
                         <span class ="raindrop" id="raindrop14"></span>
                         <span class ="raindrop" id="raindrop15"></span>
                         <span class ="raindrop" id="raindrop16"></span>
                         <span class ="raindrop" id="raindrop17"></span>
                         <span class ="raindrop" id="raindrop18"></span>
                         <span class ="raindrop" id="raindrop19"></span>
                         <span class ="raindrop" id="raindrop20"></span>
                         <span class ="raindrop" id="raindrop21"></span>
                         <span class ="raindrop" id="raindrop22"></span>
                         <span class ="raindrop" id="raindrop23"></span>
                         <span class ="raindrop" id="raindrop24"></span>
                         <span class ="raindrop" id="raindrop25"></span>
                         <span class ="raindrop" id="raindrop26"></span>
                         <span class ="raindrop" id="raindrop27"></span>
                         <span class ="raindrop" id="raindrop28"></span>
                    </div>
                    <div id="snow">
                         <span id="snowfall1"></span>
                         <span id="snowfall2"></span>
                         <span id="snowfall3"></span>
                         <span id="snowfall4"></span>
                         <span id="snowfall5"></span>
                         <span id="snowfall6"></span>
                         <span id="snowfall7"></span>
                         <span id="snowfall8"></span>
                         <span id="snowfall9"></span>
                         <span id="snowfall10"></span>
                         <span id="snowfall11"></span>
                         <span id="snowfall12"></span>
                         <span id="snowfall13"></span>
                         <span id="snowfall14"></span>
                         <span id="snowfall15"></span>
                         <span id="snowfall16"></span>
                         <span id="snowfall17"></span>
                         <span id="snowfall18"></span>
                         <span id="snowfall19"></span>
                         <span id="snowfall20"></span>
                         <span id="snowfall21"></span>
                         <span id="snowfall22"></span>
                         <span id="snowfall23"></span>
                         <span id="snowfall24"></span>
                         <span id="snowfall25"></span>
                         <span id="snowfall26"></span>
                         <span id="snowfall27"></span>
                         <span id="snowfall28"></span>
                    </div>
                    <SideNav />
               </div>
          );

     }
}

export default Today;
