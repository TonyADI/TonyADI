import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './Landing.css';

import sampleListing from '../../utilities/images/product.png';
import sampleSellForm from '../../utilities/images/sell-form.png';
import sampleBid from '../../utilities/images/bid.png';

import speed from '../../utilities/images/running.svg'

export const Landing = props => {
    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);
    const [eraser, setEraser] = useState(false);
    
    const texts = ['iPhone 12', 'G-Shock', 'HP Spectre x360', 'Dell XPS 13'];

    useEffect(() => {
        var i = 0;
        if(text.length === 0){
            var typer = setInterval(() => {
                setText(texts[index].slice(0, i));
                if(i === texts[index].length){
                    setTimeout(() => {clearInterval(typer);
                    setEraser(!eraser); // find better way
                    }, 4000);
                }
                i++;
                }, 150);
        }
        return () => clearInterval(typer);
    }, [index]);

    useEffect(() => {
        var i = texts[index].length;
        if(text.length === texts[index].length){
            var eraser = setInterval(() => {
                    i--;
                    setText(texts[index].slice(0, i));
                    if(i === 0){
                        clearInterval(eraser);
                        if (index !== texts.length - 1){
                            setIndex(index+1);
                        }
                        else{
                            setIndex(0);
                        }
                    }
                }, 75);
        }
        return () => clearInterval(eraser);
    }, [eraser]);

    return(
        <div id="landing-container">
            <div className="large-text aside-margin">Whether you are 
            trying to sell the <span className="text-background">{text}
            <span className="cursor-blinker"></span></span><br/> for
             a profit or buy one for the lowest price possible, we have got you covered!
            </div>
            <div className="aside-margin relative flex">
                <div className="aside-left box">
                    <div><span>Flexible Prices</span></div>
                    <h1>Built with you in mind</h1>
                    <p>Listed products offer a wide range of prices but you have to be
                        quick or someone else would outbid you.
                    </p>
                    <div><Link to="/register"><button className="button landing-button">Start Bidding</button></Link></div>
                </div>
                <div className="aside-right box">
                    <div><span>Free Market</span></div>
                    <h1>Decide how much profit you make</h1>
                    <p>Products can be listed with any initial ask value and buy now value,
                        allowing you to price your product at whatever value you want.
                    </p>
                    <div><Link to="/register"><button className="button landing-button">Start Selling</button></Link></div>
                </div>
            </div>
            <div className="full-width info">
            </div>
            <div className="aside-margin">
                <h1 className="large-text">How it works</h1>
                <div className="width-100 aside-margin">
                    <div className="width-two-third show-div">
                        <p>The first value you see is the initial ask, the middle value is the current ask and the
                            third value is the buy now. If there are only two values then the product currently has no bids.
                            If the listings duration runs out or someone equals the buy now price then the listing becomes 'Expired'.
                            </p>
                    </div>
                    <div className="width-one-third show-div">
                        <img className="sample-listing" src={sampleListing} alt="sample listing"/>
                    </div>
                </div>
                
                <div className="width-100 aside-margin">
                    <div className="width-one-third show-div">
                        <img src={sampleBid} alt="sample bid" className="sample-listing"/>
                    </div>
                    <div className="width-two-third show-div">
                        <p>When placing a bid, your bid must be higher than the current ask. 
                            If there are no bids, then it must be higher than the initial ask.
                            Once you place a bid it cannot be canceled.
                            Your funds are locked and will only be returned if someone outbids you.
                            If your bid is the winning bid you win the product and the funds are forfeitted
                            and transferred to the seller.
                        </p>
                    </div>
                    
                </div>
                <div className="width-100 aside-margin">
                    <div className="width-two-third show-div">
                        <p>To list a product you have to list it under a category. If you cannot find
                                the category you need, you can make an add category request and after review the 
                                category will be added. The final ask must be higher than the initial ask and
                                the duration must be at least an hour.
                            </p>
                    </div>
                    <div className="width-one-third show-div">
                        <img className="sample-sell-form" src={sampleSellForm}
                            alt="sample sell form"/>
                    </div>
                </div>
                <div className="width-100 aside-margin">
                    <div className="width-one-third"> 
                       <i className="fa fa-check"></i>
                        <div><span>100% New</span></div>
                        <p>All products listed on our website are subjectted to a review, if
                            the product passes the necessary conditions then it is placed on the market.
                        </p>
                    </div>
                    <div className="width-one-third">
                        <img src={speed} alt="speedometer"/>
                       <div><span>Seamless Bidding</span></div>
                       <p>Funds used to bid are in-house currency which allows for fast and 
                           efficient bid placements. </p>
                    </div>
                    <div className="width-one-third">
                       <i className='fas fa-shield-alt'></i>
                       <div><span>Safe and Secure</span></div>
                       <p>Money is only transferred out of the sellers account when they verify with us 
                           they have mailed the product by providing us with the tracking code, which we will
                           then share with you.
                       </p>
                    </div>
                </div>
            </div>
        </div>
    );
}