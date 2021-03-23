import React, { useState, useEffect } from 'react';
import { CategoryList } from '../CategoryList/CategoryList';
import { ProductList } from '../ProductList/ProductList';
import { retrieveData } from '../../utilities/projectAPI';
import './Browse.css';

export const Browse = props => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [products, setProducts] = useState([]);
    
    const retrieveCategories = () => {
        retrieveData('https://localhost:3000/categories').then(data => {
            setCategories(data);
        })
    }

    const retrieveProducts = name => {
        retrieveData(`https://localhost:3000/categories/${encodeURI(name)}/products`).then(data => {
            setProducts(data)});
    }


    const handleClick = name => {
        setCategory(name);
        retrieveProducts(name);
    }

    useEffect(() => {
        retrieveCategories();
    }, [])

    return (
        <div>
            <div className="jumbo full-width">
                <div><h1 className="jumbo-header">Placeholder</h1></div>
            </div>
            <div>
                <div><h1>Categories</h1></div>
                <div><CategoryList categories={categories} handleClick={handleClick}/></div>
            </div>
            <div>
                <div><h2>{category}</h2></div>
                <div className="browse-products">
                    {category && <ProductList products={products} account={props.account}/>}</div>
            </div>
        </div>
    )
}