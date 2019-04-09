import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };
    componentDidMount() {
        const { params } = this.props.match;
        // first reinstate our localStorage 
        const localStorageRef = localStorage.getItem(params.storeId);
        // sometimes we might visit a new store and there might not be anything in localStorage 
        if (localStorageRef) {
            // setting up order state from localStorage, but localStorageRef was stringified so we need to parse it 
            this.setState({ order: JSON.parse(localStorageRef) });
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }
    componentDidUpdate() {
        console.log(this.state.order);
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));

    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addFish = (fish) => {
        // 1. take a copy of the existing state 
        const fishes = { ...this.state.fishes };
        // 2. add our new fish to that fishes variable 
        fishes[`fish${Date.now()}`] = fish;
        // 3. set the new fishes object to state 
        this.setState({
            // pass the piece of state that you wish to update, and what u want to update it to 
            fishes
        });
    };

    loadSamples = () => {
        this.setState({ fishes: sampleFishes });
    };

    addToOrder = (key) => {
        // 1. take a copy of state 
        const order = { ...this.state.order };
        // 2. either add to the order or update the number in our order 
        order[key] = order[key] + 1 || 1;
        // 3. call setState to update our state object 
        this.setState({ order });
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className='menu'>
                    <Header tagline="Fresh seafood market" />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes)
                            .map(key =>
                                <Fish
                                    key={key}
                                    index={key}
                                    details={this.state.fishes[key]}
                                    addToOrder={this.addToOrder}
                                />
                            )}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} />
                <Inventory
                    addFish={this.addFish}
                    loadSamples={this.loadSamples} />
            </div>
        );


    }



}

export default App; 