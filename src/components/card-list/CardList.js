import React, { useState, useEffect } from 'react';
import './CardList.css';
import Card from '../card/Card';
import SearchBox from '../searchBox/SearchBox';

function CardList(props) {

    // used state hook 
    const [monster, setMonster] = useState([]);
    // define search field 
    const [searchField, setSearchField] = useState('');
    // used state search hook 
    const [monsterSearch, setMonsterSearch] = useState([]);
    // to get the data from api 
    useEffect(() => {

        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(
                users => {
                setMonsterSearch(users)
                setMonster(users)
            })

    }, [])


    //  pass the array to moster 
    useEffect(() => {
        //   for search filter 
        setMonsterSearch(monster.filter(monsters => monsters.name.toLowerCase().includes(searchField.toLowerCase())))

    },
        [searchField] // it will trigger when this field value update 
    )




    return (
        <>
            {/* <input type='search' placeholder='search monsters' onChange={e => {
                // setSearchField(e.target.value);
            }} /> */}
            <h1>Monsters Rolodex</h1>
            <SearchBox 
                placeholder='moster names'
                handleChange={ e => {
                    setSearchField(e.target.value);
                    }
                }
             />

            <div className='card-list' >
                {
                    monsterSearch.map((monsters) => {
                        return <Card key={monsters.id} monster={monsters} />
                    })
                }

            </div>
        </>
    )
}

export default CardList;