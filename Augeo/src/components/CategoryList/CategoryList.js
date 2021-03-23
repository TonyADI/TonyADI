import React from 'react';
import { Category } from '../Category/Category';


export const CategoryList = props => {
    return (
        <div className="inline-display">
            {props.categories ? props.categories.length ? props.categories.map(category => 
            <Category handleClick={props.handleClick} name={category.name} key={props.categories.indexOf(category)}
            src={category.image_src}/>) : <div>No categories to display</div> : 
            <div>Server is currently down</div>}
        </div>
    );
}