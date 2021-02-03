const defaultState = {
    items:[{id:0,name:'text1',finished:false,description:'text1',price:1,category:'technical'
    }],
    finishedCount:0,
    visible:true,
    totalCount:1
};

export default (state = defaultState, action)=>{
    // console.log(state, action);
    switch(action.type){
        case 'Get_All_Items':
            const newState = JSON.parse(JSON.stringify(state));
            newState.items = action.items;
            return newState;

        case 'Change_One_Item':
            const changeState = JSON.parse(JSON.stringify(state));

            let temCount = 0;
            changeState.items.forEach((item,index)=>{
                if(action.itemId === item.id){
                    item.finished = action.flag;
                }
                if(item.finished){
                    temCount += 1;
                }
            });

            changeState.finishedCount = temCount;
            return changeState;

        case 'Del_One_Item':
            const delState = JSON.parse(JSON.stringify(state));
            let tempCount = 0;
            delState.items.forEach((item,index)=>{
                if(action.itemId === item.id){
                    console.log(item.id)
                    delState.items.splice(index, 1);
                }
            })

            delState.items.forEach((item,inxed)=>{
                if(item.finished){
                    tempCount += 1;
                }
            })
            // delState.totalCount--;
            delState.finishedCount = tempCount;
            return delState;

        case 'Add_One_Item':
            const addState = JSON.parse(JSON.stringify(state));
            addState.items.push(action.item);
            addState.totalCount++;
            return addState;
        case 'Edit_One':
            const editState = JSON.parse(JSON.stringify(state));
            editState.items.forEach((item,index)=>{
                if(action.item.id === item.id){
                    editState.items[index] = action.item;
                }
            })
            return editState;
        default:
            return state;
    }

}