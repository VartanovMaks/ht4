import React, {useState} from 'react';
import './App.css';

const url='https://jsonplaceholder.typicode.com/'
const points= ['posts','comments','albums','photos','users','todos'];





function App() {

  const[endPoint, setEndPoint] = useState([])

    const fetchQuery = async (url)=>{
        //setIsLoading(true)
        const respose = await fetch(url)
        const data = await respose.json()
        console.log(data)
        setEndPoint(data)
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        // const {target :[{value:p}, {value:n}]} = e;
        const {target : {elements:{ pointnumber, endpoint}}} = e;
        const number = Number(pointnumber.value);
        const point = endpoint.value.toLowerCase();

//    console.log(pointnumber.name, '-', pointnumber.value,'. ', endpoint.name, '-',endpoint.value);
        if( points.find(p => p === point)) {
            console.log('Match - ', endpoint.value)
            if( number > 0 && number <= 10) {
                // console.log('Id inputed - ', pointnumber.value)
                fetchQuery(url+point+'/'+number);
            }else{
                fetchQuery(url+point);
            }
        } else{
            console.log('Wrong endpoint - ', endpoint.value)
            setEndPoint('')
        }
    }

  return (
    <div className="App">
      <h1> Неконтрольований інпут</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' name='endpoint' placeholder="input point" />
        <br />
        <br />
        <input type='number' name='pointnumber' placeholder="input point number" />
        <br />
        <br />
        <button type='submit'> Submit</button>
      </form>
    </div>
  );
}

export default App;
