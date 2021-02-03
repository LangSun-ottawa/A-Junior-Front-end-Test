import React, {Component} from 'react'
import Item from "./Item"
import store from '../redux/store'
import Modal from './Modal'
import '../css/page.css'


export default class List extends Component {
    constructor(props){
        super(props);

        this.state = store.getState();
    }

    componentDidMount() {
        store.subscribe(this._handleStoreChange);
    }

    _handleStoreChange = ()=>{
       this.setState(store.getState());
    };


    render() {
        const {items} = this.state;

        return (
            <div>
                <h1 >Book Store</h1>
                <Modal></Modal>
                <div className="dataTable">
                <table className="table table-striped table-hover">
                    <thead className="table-primary" key={-1}>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Category</th>
                            <th scope="col">Description</th>
                            <th scope="col">Delete</th>
                            <th scope='col'>Edit</th>
                        </tr>
                    </thead>
                    <tbody >
                        {items.map((item, index)=>(
                            <Item item={item} key={index} />
                        ))}
                    </tbody>
                </table>
                </div>               
 
            </div>

        )
    }
}