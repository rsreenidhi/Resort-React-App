import React from 'react';
import {useContext} from 'react';
import {RoomContext} from '../context';
import Title from '../components/Title';

//get all unique values
const getUniqueValues = (items, value) => {
    return [...new Set(items.map(item => item[value]))];
};

export default function RoomsFilter({rooms}){

    const context = useContext(RoomContext);
    const {
        handleChange,type, capacity, price, minPrice, maxPrice, minSize, maxSize, breakfast, pets
    } = context;

    let types = getUniqueValues(rooms, 'type');
    //add all to types
    
    types = ['all',...types];
    
    types = types.map((item, index) => {
        return <option value={item} key={index}>{item}</option>;
    });

    let people = getUniqueValues(rooms, 'capacity');
    people = people.map((item, index) => {
        return <option value={item} key={index}>{item}</option>
    });


    return(
        <section className="filter-container">
            <Title title="search rooms" />
            <form className="filter-form">
    {/* select type */}
                <div className="form-group">
                    <label htmlFor="type">room type</label>
                    <select name="type" id="type" value={type} className="form-control" onChange={handleChange}>
                        {types}
                    </select>
                </div>

                {/* Guests */}
                <div className="form-group">
                    <label htmlFor="capacity">guests</label>
                    <select name="capacity" id="capacity" value={capacity} className="form-control" onChange={handleChange}>
                        {people}
                    </select>
                </div>
                {/* Price*/}
                <div className="form-group">
                    <label htmlFor="price">room price ${price}</label>
                    <input type="range" name="price" min={minPrice}
                    max={maxPrice} id="price" value={price} onChange={handleChange} className="form-control"></input>
                </div>
                {/** Size */}
                <div className="form-group">
                    <label htmlFor="size">room size </label>
                    <div className="size-inputs">
                        <input type="number" name="minSize" 
                            id="minSize" value={minSize} onChange={handleChange} className="size-input"/>
                        <input type="number" name="maxSize" 
                            id="minSize" value={maxSize} onChange={handleChange} className="size-input"/>
                    </div>
                </div>
                {/**Extras */}
                <div className="form-group">
                    <div className="single-extra">
                        <input type="checkbox" name="breakfast" id="breakfast" checked={breakfast} onChange={handleChange}/>
                        <label htmlFor="breakfast">breakfast</label>
                    </div>
                    <div className="single-extra">
                        <input type="checkbox" name="pets" id="pets" checked={pets} onChange={handleChange}/>
                        <label htmlFor="pets">pets</label>
                    </div>
                </div>
            </form>
        </section>
    )
} 