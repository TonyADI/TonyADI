import React, { useState, useEffect } from 'react';
import { createData } from '../../utilities/projectAPI';
import './Product.css'

import hp from '../../utilities/images/xps.jfif';
import iphone11 from '../../utilities/images/iphone11.png';
import watch from '../../utilities/images/gshock.jfif';
import imageError from '../../utilities/images/image-error.png';

export const Product = props => {
    const [days, setDays] = useState('');
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [seconds, setSeconds] = useState('');
    const [duration, setDuration] = useState(''); 
    const [timer, setTimer] = useState('');
    const [currentAsk, setCurrentAsk] = useState(props.currentAsk);
    const [validAsk, setValidAsk] = useState('');
    const [display, setDisplay] = useState('none');
    const [imageSrc, setImageSrc] = useState('');

    const data = {id: props.id, current_ask: validAsk, userid: props.userId};
    const countDownDate = new Date(props.duration).getTime();

    const handleChange = e => {
        setValidAsk(parseInt(e.target.value));
    }
    
    const handleImageChange = () => {
        switch(props.name){
            case 'HP Spectre x360':
                setImageSrc(hp);
                break;
            case 'iPhone 11':
                setImageSrc(iphone11);
                break;
            case 'G-Shock':
                setImageSrc(watch);
                break;
            default:
                setImageSrc(imageError);
        }
    }

    const canBid = e => {
        // More cases will be added to handle archiving products.
        switch(e.target.name){
            case 'Bid':
                if(props.account){
                    props.setTransform(); // Reset product list transform style
                    setDisplay('block');
                }
                else{
                    window.location.replace('/login');
                }
                break;
            default:
                console.log('There was a problem with the handle click function in product');
        }
    }

    const handleTimeout = () => {
        if(hours === 0 && minutes === 0 && seconds === 0){
            if(currentAsk){
                createData(`https://localhost:3000/products/${props.id}/?action=timeout`, data)
                .then(value => {
                    if(value){
                        console.log('Product time ran out. Someone won the product.');
                    }
                    else{
                        console.log('Something went wrong with handleTimeout function in product.')
                    }
                })
            }
            else{
                console.log('No bids');
            }
        }
    }

    const placeBid = e => {
        if(validAsk > currentAsk && validAsk < props.buyNow){
            createData(`https://localhost:3000/products/${props.id}/?action=bid`, data)
            .then(value => {
               if(value){
                    console.log('Bid was accepted');
                    setDisplay('none')
                    setCurrentAsk(validAsk);
                }
                else{
                    alert('Bid could not be placed. Please refresh.');
                }
            });
        }
        else if(validAsk === props.buyNow){
            createData(`https://localhost:3000/products/${props.id}/?action=sell`, data)
            .then(value => {
                if(value){
                    alert('Congratulations, you just won this item!');
                    setCurrentAsk(validAsk);
                    setDisplay('none');
                }
                else{
                    alert('Bid could not be placed. Please refresh.')
                }
            })
        }
        else{
            alert('Amount needs to be higher than the current ask' + 
            'and lower than or equal to the buy now price.')
        }
        e.preventDefault();
    }

    const isPlural = item => {
        return (item !== 1) ? 's' : '';
    }

    const displayDuration = () => {
        if(days > 0){
            setDuration(`${days} Day${isPlural(days)} ${hours} Hour${isPlural(hours)}`)
        }
        else if(hours > 0){
            setDuration(`${hours} Hour${isPlural(hours)} ${minutes} Minute${isPlural(minutes)}`)
        }
        else if(minutes > 0){
            setDuration(`${minutes} Minute${isPlural(minutes)} ${seconds} Second${isPlural(seconds)}`)
        }
        else if(seconds > 0){
            setDuration(`${seconds} Second${isPlural(seconds)}`)
        }
        else{
            setDuration('Expired');
            setTimer('');
        }
    }

    

    useEffect(()=> {
        const durationFunction = () => {
            const now = new Date().getTime();
            // Adds a second delay so timeout function is called at the right time
            const distance = countDownDate - now + 1000;
            // Checks if the duration is still valid or if it the product has been bought
            if(distance > 0 && (currentAsk !== props.buyNow)) {
               setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
               setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
               setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
               setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
            }
            else{
                setDays('');
                setHours('');
                setMinutes('');
                setSeconds('');
                clearInterval(durationInterval);
            }
          };
        durationFunction();
        var durationInterval = setInterval(durationFunction, 1000); 
        return () => clearInterval(durationInterval);
     }, [props.duration, currentAsk])


    useEffect(() => {
        displayDuration();
        handleTimeout();
    }, [seconds])

    useEffect(() => {
        if((minutes < 5) && (hours === 0) && (days === 0)){
            setTimer('timer');
        }
    }, [minutes])

    useEffect(() => {
        handleImageChange();
    }, [props.name])

    const handleDisplay = e => {
        const productModals = document.getElementsByClassName('bid-container');
        for(let i = 0; i < productModals.length; i++){
            const productModal = productModals[i];
            if(e.target === productModal){
                setDisplay('none');
            }
        }
    }
    
    useEffect(() => {
        document.addEventListener('mousedown', handleDisplay);
    }, [])

    return(
            <div className="product-container" style={{animationName: timer}}>
                <div className="card-container">
                    <div className="card">
                            <div className="image-container">
                                <img className="product-image" src={imageSrc} 
                                alt={`The ${props.name} being listed`}></img>
                            </div>
                            <div className="product-details">
                                <div className="product-detail"><span className="product-name">{props.name}</span></div>
                                <div className="product-detail"><span>${props.initialAsk}</span></div>
                                <div className="product-detail">{(currentAsk !== 0) && <span>${currentAsk}</span>}</div>
                            <div className="product-detail product-buynow"><span>${props.buyNow}</span></div>
                            <div className="product-detail"><span>{duration}</span></div>
                            </div>
                            {(duration !=='Expired' && !props.disabled)  && <div>
                                <button onClick={canBid} className="bid-button" 
                            name='Bid'>Bid</button></div>}
                    </div>
                </div>

                {/* Bid container */}

                <div className="bid-container" style={{display: display}}>
                        <div className="form-container">
                            <form onSubmit={placeBid}>
                                <div className="input-container">
                                    <h2>Place Bid</h2>
                                    <div><input className="input-field" type="number" name="Bid" 
                                    onChange={handleChange} placeholder={`Enter a value higher than $${(currentAsk === 0) 
                                        ? props.initialAsk : currentAsk}`} 
                                    /></div>
                                    <input type="submit" className="button" 
                                    value={validAsk === props.buyNow ? 'Buy Now' : 'Bid'}/>
                                </div>
                            </form>
                        </div>
                </div>
        </div>
    );
}