import React, { Component } from 'react';
import moment from 'moment';

class DailyWeather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: JSON.parse(localStorage.getItem('dailyWeather')),
            currentDailyWeather: JSON.parse(localStorage.getItem('currentDailyWeather')),
            city: JSON.parse(localStorage.getItem('location'))
        }
    }

    render() {
        const card = [];
        const { currentDailyWeather, city } = this.state;
        if (this.state.data.length) {
            const abcData = this.state.data.map((obj_value, i) => {
                let updatedDate = new Date(obj_value.dt_txt);
                const imgURL = `owf owf-${obj_value.weather[0].id} owf-5x`;
                card.push(
                    <div className="weather_card dailycard" key={`main_${i}`}>
                        <h3 key={`h3_${i}`}>{moment(updatedDate).format('dddd')}</h3>
                        <p key={`p_${i}`}>{moment(updatedDate).format('MMMM Do, h:mm a')}</p>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <i className={imgURL} key={`i_${i}`}></i>
                            <h2 key={`h2_${i}`} style={{ margin: 'auto 5px' }}>{Math.round(obj_value.main.temp)}<sup>°F</sup></h2>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <h2 key={`h4_${i}`} style={{ margin: 'auto 5px' }}>{Math.round(obj_value.main.temp_max)}<sup>°F</sup></h2>
                            <h2 key={`h5_${i}`} style={{ margin: 'auto 5px', color: 'rgb(92,92,92)' }}>{Math.round(obj_value.main.temp_min)}<sup>°F</sup></h2>
                        </div>
                        <div key={`card_${i}`}>
                            <p key={`pdesc_${i}`}>{obj_value.weather[0].description}</p>
                        </div>
                    </div>
                )
            });
        }
        let updatedDate = new Date(currentDailyWeather.dt_txt);
        const imgURL1 = `owf owf-${currentDailyWeather.weather[0].id} owf-5x`;
        return (
            <div className='spacing'>
                <h1 className='header-title1'>Weather Forecast App</h1>
                <div className='temp'>
                    <div style={{ display: 'flex' }}>
                        <i className={imgURL1}></i>
                        <h2 className='degreeHead'>{Math.round(currentDailyWeather.main.temp)}<sup className='supDegree'>°F</sup></h2>
                    </div>
                    <div className='speed'>
                        <div className='subHead'>Humidity: {currentDailyWeather.main.humidity}%</div>
                        <div className='subHead'>Wind: {currentDailyWeather.wind.speed} km/h</div>
                    </div>
                    <div className='detailsHead'>
                        <h2 className='removeMargin'>{city.name}, {city.country} </h2>
                        <h2 className='removeMargin'>{moment(updatedDate).format('dddd')} {moment(updatedDate).format('MMMM Do')}</h2>
                        <h2 className='removeMargin'>{currentDailyWeather.weather[0].description}</h2>
                    </div>
                </div>
                <div className='dailyWeatherContainer'>{card}</div>
            </div>
        )
    }
}

export default DailyWeather;