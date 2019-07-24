const initState = {
    list: [
        {
            id: 0,
            text: ''
        }
    ]
}

const consReducer = (state = initState, action) => {
    switch(action.type) {
        case 'ADD_CONS':
            state.list.pop()
            return {
                list: [
                    ...state.list,
                    {
                        id: action.id,
                        text: action.text
                    },
                    {
                        id: action.id + 1,
                        text: ''
                    }

                ]
            };
        case 'EDIT_CONS':
            const newState = {
                list: [
                    ...state.list
                ]
            }
            newState.list[action.id].text = action.text;
           return newState;

        case 'REMOVE_CONS': 
        {
            const newList = state.list.filter(item => item.id !== action.id)
            newList.map((item, index) => {
                item.id = index;
            })  
            return {
                list: newList
            }
        }
        case 'REPLACE_CON':
            {
                const newList = action.data.filter(item => item.text !== '');
                console.log('data: ', {
                    list: [...newList, {
                        id: newList.length,
                        text: ''
                    }]
                });
                return {
                    list: [...newList, {
                        id: newList.length,
                        text: ''
                    }]
                };

                // const newList = [
                //     ...state.list,
                // ];

                // for(let i = 0; i < newList.length; i++) {
                //     newList[i] = {
                //         id: newList[i].id + 1,
                //         text: newList[i].text
                //     }
                // }
                // // newList[action.id] = {
                // //     id: action.id, 
                // //     text: action.currentText
                // // }
                // // newList.push({
                // //     id: newList.length,
                // //     text: ''
                // // })
                // console.log({newList});
                
                // return {
                //     // list: newList,
                // };
            }
        default:
            return state;
    }
}

export default consReducer;