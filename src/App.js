import './App.css';
import React, {useCallback, useEffect, useState} from 'react';
import {API_KEY, API_ROOT} from './utils/constants';
import {HeaderComponent} from './components/HeaderComponent';
import {DaysComponent} from './components/DaysComponent';
import moment from 'moment';
import 'moment/locale/tr';
import {cities} from './utils/cities';
import spinner from './images/spinner.gif';

function App() {
    moment.locale('tr');
    const [selectedCity, setSelectedCity] = useState('izmir');
    const [currentData, setCurrentData] = useState(null);

    const fetchData = useCallback(async (cityLat = '37.00167', cityLon = '35.32889') => {
        try {
            const result = await fetch(API_ROOT + '/onecall?lat=' + (cityLat) + '&lon=' + (cityLon) + '&exclude=minutely,hourly,alerts,current&units=metric&lang=tr&appid=' + API_KEY, {});
            const json = await result.json();
            if (json.cod >= 400) {
                return alert('OpenWeatherMap API Günlük Kullanım Hakkiniz Dolmuştur. Yarın Tekrar Deneyiniz...');
            }
            return json;
        } catch (e) {
            console.error(e);
        }
    }, []);

    const setData = useCallback((data) => {
        setCurrentData(data);
    }, []);

    useEffect(() => {
        fetchData().then((content) => {
            setData(content);
        });
    }, [fetchData, setData]);

    const handleCityChange = useCallback((e) => {
        setSelectedCity(e.target.value);
        const cityExists = cities.find(cityItem => cityItem.name === e.target.value);

        if (!cityExists) {
            return alert('Hatalı Şehi̇r Seçimi Yapıldı!');
        }

        fetchData(cityExists.latitude, cityExists.longitude).then((content) => setData(content));
    }, [fetchData, setData]);

    return (
        <div>
            <HeaderComponent/>
            <form>
                <div className='mb-4'>
                    <select className='form-select form-select-md w-auto mx-auto' value={selectedCity}
                            onChange={handleCityChange}>
                        {
                            cities.map((city) =>
                                <option key={city.plate} value={city.name}>
                                    {city.name.toUpperCase()}
                                </option>,
                            )
                        }
                    </select>
                </div>
            </form>
            <div className='container'>
                <div className='row'>
                    {
                        currentData ? currentData.daily.slice(0, 7).map((item) =>
                                <DaysComponent
                                    days={item.dt}
                                    image={item.weather[0].icon}
                                    temp={item.temp.day}
                                    nightTemp={item.temp.night}
                                    key={item.dt}
                                />,
                            )
                            :
                            (
                                <div className='text-center'>
                                    <img className='img-fluid' src={spinner} alt='spinner'/>
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    );
}

export default App;