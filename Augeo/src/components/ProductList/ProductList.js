import React, { useEffect } from 'react';
import { Product } from '../Product/Product'
import './ProductList.css'

export const ProductList = props => {
    // Reset transform to inherit so product modal box can display corretly.
    // Currently affects all tracks but should affect only one.
    const setTransform = () => {
        const tracks = document.getElementsByClassName('track');
        for(let i = 0; i < tracks.length; i++){
            const track = tracks[i];
            track.style.transform = 'initial';
        }
    }
    
    useEffect(() => {
        const productCarousels = document.getElementsByClassName('product-carousel');
        const nextList = document.getElementsByClassName('next');
        const prevList = document.getElementsByClassName('prev');
        const tracks = document.getElementsByClassName('track');
        for(let i = 0; i < productCarousels.length; i++){
            const productCarouselWidth = productCarousels[i].offsetWidth;
            const next = nextList[i];
            const prev = prevList[i];
            const track = tracks[i];
            let index = 0;

            // Restart carousel for browse page
            track.style.transform = `translate(-${0 * productCarouselWidth}px)`;
            prev.classList.add('hide');
            if(track.offsetWidth - (0 * productCarouselWidth) >= productCarouselWidth){
                next.classList.add('show');
                next.classList.remove('hide');
            }
            else{
                next.classList.remove('show');
            }

            next.addEventListener('click', () => {
                index++;
                prev.classList.add('show');
                prev.classList.remove('hide');
                track.style.transform = `translate(-${index * productCarouselWidth}px)`;
                if(track.offsetWidth - (index * productCarouselWidth) < productCarouselWidth){
                    next.classList.add('hide');
                }
            })

            prev.addEventListener('click', () => {
                index--;
                next.classList.remove('hide');
                track.style.transform = `translate(-${index * productCarouselWidth}px)`;
                if(index === 0){
                    prev.classList.add('hide');
                }
            });
        }
        },
    [props.products]);

    return(
        <div className="product-carousel">
            <div className="carousel-inner">
                    <div className="track">
                        {props.products ? props.products.length ? props.products.map(product => {
                            return <Product id={product.id} name={product.category_name} 
                            imageSrc={product.imageSrc} currentAsk={product.current_ask} 
                            initialAsk={product.initial_price} buyNow={product.buy_now} 
                            duration={product.duration} handleClick={props.handleClick} 
                            authenticated={props.authenticated} disabled={props.disabled} setTransform={setTransform}
                            key={product.id}
                            />
                        }) : <div>No Products to display</div> : <div>Server is currently down</div>}
                    </div>
            </div>
            <div className='carousel-nav'>
                <button className="prev"><i className="fa fa-angle-left direction-icon"></i></button>
                <button className="next" ><i className="fa fa-angle-right direction-icon"></i></button>
            </div>
        </div>
    )
}