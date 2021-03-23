import React, { useState, useEffect } from 'react';
import { ProductList } from '../ProductList/ProductList';
import { retrieveData } from '../../utilities/projectAPI';
import './Home.css'

export const Home = props => {
    const [featured, setFeatured] = useState([]);
    const [latest, setLatest] = useState([]);
    const [popular, setPopular] = useState([]);
    const [trending, setTrending] = useState([]);
    const [recentBids, setRecentBids] = useState([]);

    // Dummy products to show product functionality in case servers are down.
    const countDownDate = new Date("Feb 22, 2021 15:58:25").getTime();
    const countDownDate2 = new Date("Mar 30, 2021 10:49:25").getTime();
    const countDownDate3 = new Date("May 29, 2021 20:59:25").getTime();
    const product = {category_name: 'HP Spectre x360', initial_price: 1840, current_ask: 0, buy_now: 2500, duration: countDownDate}
    const product2 = {category_name: 'iPhone 11', initial_price: 670, current_ask:245, buy_now: 1600, duration: countDownDate2}
    const product3 = {category_name: 'G-Shock', initial_price: 70, current_ask:0, buy_now: 200, duration: countDownDate3}
    const dummy = [product, product2, product3,product, product2, product3,
        product, product, product2, product3,product, product2]

    const retrieveFeaturedProduct = () => {
        retrieveData(`https://localhost:3000/products?sortBy=featured`)
        .then(data => {
            setFeatured(data);
        })
    }

    const retrieveLatestCategory = () => {
        retrieveData(`https://localhost:3000/products?sortBy=latest`)
        .then(data => {
            setLatest(data);
        })
    }

    const retrievePopularProduct = () => {
        retrieveData(`https://localhost:3000/products?sortBy=popular`)
        .then(data => {
            setPopular(data);
        })
    }

    const retrieveTrendingProduct = () => {
        retrieveData(`https://localhost:3000/products?sortBy=trending`)
        .then(data => {
            setTrending(data);
        })
    }

    const retrieveRecentBids = () => {
        retrieveData(`https://localhost:3000/products?sortBy=recent`)
        .then(data => {
            setRecentBids(data);
        })
    }

    useEffect(()=> {
        retrieveFeaturedProduct();
        retrievePopularProduct();
        retrieveTrendingProduct();
        retrieveLatestCategory();
        retrieveRecentBids();
        },
    []);

    return(
        <div className="home-container">
            <div className="jumbo full-width">
                <div><h1 className="jumbo-header">Placeholder</h1></div>
            </div>
            <div>
                <div><h1>Dummy Products</h1></div>
                <div><ProductList products={dummy} account={props.account}/></div>
            </div>
            <div>
                <div><h1>Featured Product</h1></div>
                <div><ProductList products={featured} account={props.account}/></div>
            </div>
            <div>
                <div><h1>Most Popular</h1></div>
                <div><ProductList products={popular} account={props.account}/></div>
            </div>
            <div>
                <div><h1>Trending</h1></div>
                <div><ProductList products={trending} account={props.account}/></div>
            </div>    
            <div className="aside-container">
                <div className="collection-text">
                    Cannot find the category you are trying to list? Just add it</div>
                <div><button className="button">Add Category</button></div>
            </div>
            <div>
                <div><h1>Latest Category</h1></div>
                <div><ProductList products={latest} account={props.account}/></div>
            </div>
            <div>
                <div><h1>Recent Bids</h1></div>
                <div><ProductList products={recentBids} account={props.account}/></div>
            </div>
        </div>
    )
}