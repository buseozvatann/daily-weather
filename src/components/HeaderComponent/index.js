export function HeaderComponent() {
    return (
        <div className='text-center mx-auto'>
            <img className='img-fluid'
                 src='https://openweathermap.org/img/wn/10d@2x.png'
                 alt='weather1'/>
            <img className='img-fluid'
                 src='https://openweathermap.org/img/wn/11d@2x.png'
                 alt='weather3'/>
            <img className='img-fluid'
                 src='https://openweathermap.org/img/wn/02d@2x.png'
                 alt='weather2'/>
            <h1 className='display-4'>
                HAFTALIK HAVA DURUMU TAHMİNLERİ
            </h1>
            <hr className='my-4'/>
        </div>
    );
}
