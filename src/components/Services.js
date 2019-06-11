import React from 'react';
import Title from './Title';
import {FaCocktail, FaHiking, FaShuttleVan, FaBeer} from 'react-icons/fa';

export default class Services extends React.Component {
    state={
        services:[
         {
             icon: <FaCocktail />,
             title: "free cocktails",
             info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse luctus, mauris in elementum dignissim, est.'
         },
         {
            icon: <FaHiking />,
            title: "Endless Hiking",
            info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse luctus, mauris in elementum dignissim, est.'
        },
        {
            icon: <FaShuttleVan />,
            title: "Free Shuttle",
            info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse luctus, mauris in elementum dignissim, est.'
        },
        {
            icon: <FaBeer />,
            title: "Home Brewed Beer",
            info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse luctus, mauris in elementum dignissim, est.'
        }

        ]
    };
    
    render(){
        return (
            <section className="services">
               <Title title="services" />
                <div className="services-center">
                    {this.state.services.map( (item, index) => {
                        return <article key={index} className="service">
                            <span>{item.icon}</span>
                            <h6>{item.title}</h6>
                            <p>{item.info}</p>
                            
                        </article>
                    })}
                </div>
            </section>
        )
    }
}