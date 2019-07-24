const initState = {
    list: [
        {
            id: 0,
            text: ''
        }
    ]
}

const prosReducer = (state = initState, action) => {
    switch(action.type) {
        case 'ADD_PROS':
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
        case 'EDIT_PROS':
            const newState = {
                list: [
                    ...state.list
                ]
            }
            newState.list[action.id].text = action.text;
           return newState;

        case 'REMOVE_PROS':
            const newList = state.list.filter(item => item.id !== action.id)
            newList.map((item, index) => {
                item.id = index;
            })
            return {
                list: newList
            }
            case 'REPLACE_PRO':
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
                }
        default:
            return state;
    }
}

export default prosReducer;