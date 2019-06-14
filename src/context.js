import React from 'react';
//import items from './data';
import Client from './Contentful';



const RoomContext = React.createContext();


class RoomProvider extends React.Component {
    state = {
        rooms:[],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    };

    //getData
    getData = async () => {
        try{
            let response = await Client.getEntries(
                {
                    content_type: "beacResortRoom",
                    //order: "sys.createdAt"
                    order: 'fields.price'
                });
            let rooms = this.formatData(response.items);
            let featuredRooms = rooms.filter(room => {
                return room.featured === true;
            });
            let maxPrice = Math.max(...rooms.map(item => item.price));
            let maxSize = Math.max(...rooms.map(item => item.size));
            this.setState({
                rooms,
                featuredRooms,
                sortedRooms: rooms,
                loading: false,
                price: maxPrice,
                maxPrice,
                maxSize
            });
        }catch (error){
            console.log(error);
        }
    }
    componentDidMount(){
        this.getData();
    }

    formatData(items){
        let tempItems = items.map(item => {
            let id = item.sys.id;
            let images = item.fields.images.map(image => {
                return image.fields.file.url;
            });
            let room = {...item.fields, images, id};
            return room;
        });
        return tempItems;
    }


    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find(room => {
                return room.slug === slug;
            
        });
        return room;
    }

    handleChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        //const type = event.target.type;
        const name = event.target.name;
        
        this.setState({
            [name]:value
        }, this.filterRooms);
    }

    filterRooms = () => {
        let {rooms, type, capacity, price, minSize, maxSize, minPrice, maxPrice, breakfast, pets} = this.state;
        
        let tempRooms = [...rooms];
        capacity = parseInt(capacity);
        price = parseInt(price);
        if(type !== 'all'){
            tempRooms = tempRooms.filter(tempRoom => {
                return tempRoom.type === type;
            })
        }

        if(capacity !== 1){
            tempRooms = tempRooms.filter(room => {
                return room.capacity === capacity;
            })
        }

        
        tempRooms = tempRooms.filter(room => {
            return room.price <= price;
        })
        
        tempRooms = tempRooms.filter(room => {
            return room.size >= minSize && room.size <= maxSize;
        })

        if(breakfast){
            tempRooms = tempRooms.filter(room => {
                return room.breakfast === true;
            })
        }

        if(pets){
            tempRooms = tempRooms.filter(room => {
                return room.pets === true;
            })
        }

        this.setState({
            sortedRooms: tempRooms
        });

    }

    render(){
        return (
            <RoomContext.Provider value={{...this.state, getRoom: this.getRoom, handleChange: this.handleChange}}>
                {this.props.children}
            </RoomContext.Provider>

        )
    }

}

const RoomConsumer = RoomContext.Consumer;

export {RoomProvider, RoomConsumer, RoomContext};