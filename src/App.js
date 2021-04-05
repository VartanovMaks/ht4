import React, {useState, useRef} from 'react';
import './App.css';

const url='https://jsonplaceholder.typicode.com/'
const points= ['posts','comments','albums','photos','users','todos'];


const LIComponent = ({objData}) =>{
  const propArr = [];
  // Масив стічок, які складаються з проперті та її 
  // На жаль я не знайшов свій шаблон рекурсивної функції, тому роблю вже "щоб було"
  for (let prop in objData) {
    if (typeof objData[prop] !== 'object') {
        propArr.push(`${prop} : ${objData[prop]}`);
    } else {
      let value = JSON.stringify( objData[prop]);
      propArr.push(`${prop} : ${value}`);
    }
  }  
    return (
      <>
          {/* Кожна пропертя у своєму діві */}
          {propArr.map( (prop) => <div>{prop}</div> )}
          {<hr/>}
      </>
   )
}


function App() {
  const[endPoint, setEndPoint] = useState([])
  const[isOneNumber, setIsOneNumber] = useState(false);
  const form = useRef();
  

    const fetchQuery = async (url)=>{
        //setIsLoading(true)
        const respose = await fetch(url)
        const data = await respose.json()
        //console.log(data)
        setEndPoint(data);
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
                //console.log('Id inputed - ', pointnumber.value)
                setIsOneNumber(true);
                fetchQuery(url+point+'/'+number);
            }else{
                fetchQuery(url+point);
            }
        } else{
            console.log('Wrong endpoint - ', endpoint.value)
            setEndPoint('')
        }
        form.current.reset()
    }
   
    const LIComponent = ({objData}) =>{
      const propArr = [];
      // Масив стічок, які складаються з проперті та її 
      // На жаль я не знайшов свій шаблон рекурсивної функції, тому роблю вже "щоб було"
     
      for (let prop in objData) {
        if (typeof objData[prop] !== 'object') {
            propArr.push(`${prop} : ${objData[prop]}`);
        } else {
          let value = JSON.stringify( objData[prop]);
          propArr.push(`${prop} : ${value}`);
        }
      }  
        return (
          <>
              {/* Кожна пропертя у своєму діві */}
              {propArr.map( (prop) => <div>{prop}</div> )}
              {<hr/>}
          </>
       )
    }  
    
  return (
    <div className="App">
      <h1> Неконтрольований інпут</h1>
      <form ref={form} onSubmit={handleSubmit}>
        <input type='text' name='endpoint' placeholder="input point" />
        <br />
        <br />
        <input type='number' name='pointnumber' placeholder="input point number" />
        <br />
        <br />
        <button type='submit'> Submit</button>
      </form>
      <hr />
        { (!isOneNumber && endPoint.length>0)   && endPoint.map(item => <LIComponent objData = {item} /> )}
        { isOneNumber  && <LIComponent objData = {endPoint} />}
    </div>
  );
}

export default App;
