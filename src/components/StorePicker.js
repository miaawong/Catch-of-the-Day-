import React from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
    static propTypes = {
        history: PropTypes.object
    }
    // constructor() {
    //     // super will run the component^^ that is being extended first, because it needs to be created first
    //     super();
    //     this.goToStore = this.goToStore.bind(this);
    // }
    myInput = React.createRef();

    goToStore = (e) => {
        // stop form from submitting
        e.preventDefault();
        // get the text from that input 
        const storeName = (this.myInput.current.value);
        // change the page to /store/whatever-they-entered
        this.props.history.push(`/store/${storeName}`);
    }
    render() {
        return (
            <React.Fragment>
                <form className="store-selector" onSubmit={this.goToStore}>
                    <h2>Please Enter A Store</h2>
                    <input
                        type="text"
                        ref={this.myInput}
                        required placeholder="Store Name"
                        defaultValue={getFunName()}
                    />
                    <button type="submit">Visit Store -></button>
                </form>
            </React.Fragment>
        )
    }
}


export default StorePicker; 