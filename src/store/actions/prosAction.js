export const prosAction = (text, id) => {
    return (dispatch, getState) => {
        const existingProText = getState().pros.list[id].text;
        if(!existingProText) {
            dispatch({ type: 'ADD_PROS', text, id })
        }
        else {
            if(text) {
                dispatch({ type: 'EDIT_PROS', id, text });

            } else {
                dispatch({ type: 'REMOVE_PROS', id });
            }
        }
    }
}


export const dragStartAction = (currentId) => {
    return (dispatch) => {
        dispatch({ type: 'REMOVE_PROS',  id: currentId})
    }
}

export const dropAction = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: 'REPLACE_PRO', data})

    }
} 