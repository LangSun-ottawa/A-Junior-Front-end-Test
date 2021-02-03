import React,{ useState } from 'react';
import store from '../redux/store'
import {
    getChangeOneItemAction,
    getDelOneItemAction,
    getEditOneItemAction} 
from '../redux/actionCreators'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';



export default function Item(props){

    const { item } = props;
    const [id,setId] = useState(item.id);
    const [open, setOpen] = useState(false);
    const [name,setName] = useState(item.name);
    const [price,setPrice] = useState(item.price);
    const [category,setCategory] = useState(item.category);
    const [description,setDescription] = useState(item.description);
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const clean = ()=>{
        setName("");
        setPrice("");
        setCategory("");
        setDescription("");
        setOpen(false)
    }

    const submitEvent = ()=>{
        var newItem = {
            id,
            name,
            price,
            category,
            description,
            finished:false
        }
        if(newItem.name.trim() == '' || newItem.price == '' || newItem.description == '' || newItem.category == ''){
            alert('Form can not be blank');
            return;
          }
          if(!(/^\d{1,}$/.test(newItem.price))){
            alert('Invalid price format, please input a number!');
            return;
          }
        const action = getEditOneItemAction(newItem);
        store.dispatch(action);
        setOpen(false)
    }


     const _dealChange = function(itemId,flag){
        const action = getChangeOneItemAction(itemId,flag);
        store.dispatch(action);
    }

    const _dealRemove = function(itemId){
        const action = getDelOneItemAction(itemId);
        store.dispatch(action);
    }

    return (
        <tr>
            {/* <input type="checkbox" checked={item.finished} onChange={()=> _dealChange(item.id, !item.finished)}/> */}
            {/* <td>{item.id}</td> */}
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.category}</td>
            <td>{item.description}</td>
            <td>
                <button
                    className="btn btn-warning"
                    onClick={()=> _dealRemove(item.id)}
                    >
                    delete
                </button>   
            </td>
            <td>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Edit Book
                </Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Book Info</DialogTitle>
                    <DialogContent>
                    Book Name
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        type="text"
                        defaultValue={item.name}
                        fullWidth
                        onChange={(e) => {setName(e.target.value)}}
                    />
                    Price
                    <TextField
                        margin="dense"
                        id="price"
                        type="text"
                        defaultValue={item.price}
                        fullWidth
                        onChange={(e) => {setPrice(e.target.value)}}
                    />
                    Category
                    <TextField
                        margin="dense"
                        id="category"
                        type="text"
                        defaultValue={item.category}
                        fullWidth
                        onChange={(e) => {setCategory(e.target.value)}}
                    />
                    Description
                    <TextField
                        margin="dense"
                        id="description"
                        type="text"
                        defaultValue={item.description}
                        fullWidth
                        onChange={(e) => {setDescription(e.target.value)}}
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={clean} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={submitEvent} color="primary">
                        Save
                    </Button>
                    </DialogActions>
                </Dialog>
            </td>
            
        </tr>
    )

}