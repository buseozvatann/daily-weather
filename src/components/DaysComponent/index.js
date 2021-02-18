import moment from 'moment';
import React from 'react';

export function DaysComponent({days, image, temp, nightTemp}) {
    const myDay = moment.unix(days).format('LLLL');
    const splitItems = myDay.split(',');
    const splitItemsDate = splitItems[1].split(' ');

    return (
        <div className='col'>
            <div className='card mb-4 text-center shadow-sm'>
                <div className='card-header'>
                    <h5 className='my-0 font-weight-normal'>
                        {splitItems[0]}
                    </h5>
                </div>
                <div className='card-body'>
                    <h6 className='card-subtitle mb-1 text-muted'>
                        {splitItemsDate[1] + ' ' + splitItemsDate[2] + ' ' + splitItemsDate[3]}
                    </h6>
                    <img className='img-fluid'
                         src={`http://openweathermap.org/img/wn/${image}@2x.png`}
                         alt='weathers'/>
                    <p className='card-title'>{temp.toFixed(0)}°C
                        <small className='text-muted'> / {nightTemp.toFixed(0)}°C</small>
                    </p>
                </div>
            </div>
        </div>
    );
}
