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
    
    
    const fun1=(a,b)=>{
        console.log("https://api.thedogapi.com/v1/images/search?order="+b+"&limit=10&breed_id="+a);
        axios({
            
            url: "https://api.thedogapi.com/v1/images/search?order="+b+"&limit=10&breed_id="+a,
            method: 'get',
            headers: {
                'api_key':'03202bf7-6b44-44bb-b7eb-ddc9ac6f0f21',
                'Content-Type': 'application/json'
            }
         })
        .then((response) => setimages(response.data))
        .then((error) => console.log(error));

    };

    const onddlchange=(a)=>{
            setb(a);
            fun1(a,order);
    };

    const onddlchange1=(a)=>{
        setorder(a);
        fun1(breed,a);
};


    return (
    <div>
        <div><br/><br/>
            select dog breed {' '}
        <select onChange={b=>onddlchange(b.target.value)}>
            
        <option  value="0">
        --Choose option--
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
                select order {' '}
        <select onChange={c=>onddlchange1(c.target.value)}> 
                <option key='RANDOM' value='RANDOM' >RANDOM</option>
                <option key='ASC' value='ASC' >ASC</option>
                <option key='DESC' value='DESC' >DESC</option>

        </select>   
        </div>
        <br/>
        <div>
            {
                images.map((img)=>(
                    <img style={{width:300, height:300}} src={img.url} />
                ))
            }
        </div>
    </div>
    );
}

export default Dropdown;