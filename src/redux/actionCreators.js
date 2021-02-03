//1.get all items
export const getAllItemsAction = (items)=>({
    type:'Get_All_Items',
    items
});

//2.select one
export const getChangeOneItemAction= (itemId, flag)=>({
    type:'Change_One_Item',
    itemId,
    flag
})

//3.delete one
export const getDelOneItemAction= (itemId)=>({
    type:'Del_One_Item',
    itemId
})

//4.add one
export const getAddOneItemAction= (item)=>({
    type:'Add_One_Item',
    item
})

//5.edit
export const getEditOneItemAction= (item)=>({
    type:'Edit_One',
    item
})