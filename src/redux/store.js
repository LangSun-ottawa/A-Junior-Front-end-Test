import {createStore} from 'redux'
import reducer from './reducer'
const store=createStore(reducer)
export default store
//console.log('store:',store.getState())