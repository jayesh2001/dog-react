import React,{useState, useEffect} from "react";
import axios from "axios";


function Dropdown(){
    const [breeds, setbreed ] = useState([]);
    const [breed, setb] =useState('');
    const [order, setorder] =useState('');
    const [limit, setlimit] =useState('');
    const [images, setimages ] = useState([]);
    useEffect(function (){
        
        axios
            .get("https://api.thedogapi.com/v1/breeds")
            .then((response) => setbreed(response.data))
            .then((error) => console.log(error));
           
    },[]);
    
    
    const fun1=(b,o,l)=>{
        console.log(breeds[breed]);
        console.log("https://api.thedogapi.com/v1/images/search?order="+o+"&limit="+l+"&breed_id="+b);
        axios({
            
            url: "https://api.thedogapi.com/v1/images/search?order="+o+"&limit="+l+"&breed_id="+b,
            method: 'get',
            headers: {
                'api_key':'03202bf7-6b44-44bb-b7eb-ddc9ac6f0f21',
                'Content-Type': 'application/json'
            }
         })
        .then((response) => setimages(response.data))
        .then((error) => console.log(error));

    };

    const change=(b)=>{
            setb(b);
            fun1(b,order,limit);
    };

    const change1=(o)=>{
        setorder(o);
        fun1(breed,o,limit);
    };

    const change2=(l)=>{
        setlimit(l);
        fun1(breed,order,l);
    };


    return (
    <div>
        <div><br/><br/>
            Select dog breed {' '}
        <select onChange={b=>change(b.target.value)}>
            
        <option  value="">
        Random
        </option>
            {breeds.map((breed) =>(
                <option key={breed.id} value={breed.id}>
                {breed.name}
                </option>
            ))
                }
            
        </select>
        <br/><br/>
        </div>
        <div>
                Select order {' '}
        <select onChange={c=>change1(c.target.value)}> 
                <option key='RANDOM' value='RANDOM' >RANDOM</option>
                <option key='ASC' value='ASC' >ASC</option>
                <option key='DESC' value='DESC' >DESC</option>

        </select>   
        </div>
        <br/>
        <div>
                Select Limit {' '}
        <select onChange={c=>change2(c.target.value)}> 
                <option key='1' value='1' >1</option>
                <option key='2' value='2' >2</option>
                <option key='3' value='3' >3</option>
                <option key='4' value='4' >4</option>
                <option key='5' value='5' >5</option>
                <option key='10' value='10' >10</option>
                <option key='15' value='15' >15</option>
                <option key='20' value='20' >20</option>
                <option key='50' value='50' >50</option>

        </select>   
        </div>
        
        <div>
            {breed >0 &&
                <div>
                <h1>{breeds[breed-1].name}</h1>
                <h3>{breeds[breed-1].temperament}</h3>
                <h3>{breeds[breed-1].origin}</h3>
                <h3>{breeds[breed-1].weight.metric}{' Kgs'}</h3>
                <h3>{breeds[breed-1].height.metric}{' cm at the withers'}</h3>
                <h3>{breeds[breed-1].life_span}{' years average life span'}</h3>

                </div>
            } 
                
        </div><br/>

        <div >
            {
                images.map((img)=>(
                   <img  style={{width:300, height:300,padding: 5}} src={img.url} />
                ))
            }
        </div>
    </div>
    );
}

export default Dropdown;