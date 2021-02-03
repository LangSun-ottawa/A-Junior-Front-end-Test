import React, { useState , useEffect } from 'react';
import store from '../redux/store'
import {
    getAddOneItemAction,
} 
from '../redux/actionCreators'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


function NewBook(){
    const [open, setOpen] = useState(false);
    // console.log("*******");
    // console.log(store.getState());
    const {totalCount,visible}  =  store.getState();
    const [id,setId] = useState(0);
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [category,setCategory] = useState("");
    const [description,setDescription] = useState("");

    const item = {
      id,
      name,
      price,
      category,
      description,
      finished:false
  }
    const clean = ()=>{
        setName("");
        setPrice("");
        setCategory("");
        setDescription("");
        setOpen(false)
    }
    
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };


    const submitAction = ()=>{
      const action = getAddOneItemAction(item);
      store.dispatch(action);
      setOpen(false)
    }

    const submitEvent = ()=>{
      // console.log(item.name.trim().length)
      if(item.name.trim().length ===0 || item.price == '' || item.description.trim() == '' || item.category.trim() == ''){
        alert('Form can not be blank');
        return;
      }
      if(!(/^\d{1,}$/.test(item.price))){
        alert('Invalid price format, please input a number!');
        return;
      }
      setId(totalCount);
    }

    useEffect(() => {
      id !== 0 && submitAction()
      setId(0)
    },[id])

    return (
        <div style={{margin:'0 auto', width:'7rem', marginBottom:'1rem'}}>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Add Book
          </Button>
          {/* <hr></hr> */}
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New Book</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Book Name"
                type="text"
                fullWidth
                onChange={(e) => {setName(e.target.value)}}
              />
               <TextField
                margin="dense"
                id="price"
                label="Price"
                type="text"
                fullWidth
                onChange={(e) => {setPrice(e.target.value)}}
              />
               <TextField
                margin="dense"
                id="category"
                label="Category"
                type="text"
                fullWidth
                onChange={(e) => {setCategory(e.target.value)}}
              />
               <TextField
                margin="dense"
                id="description"
                label="Description"
                type="text"
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
        </div>
      );

    }

export default NewBook;
