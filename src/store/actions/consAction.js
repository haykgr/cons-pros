export const consAction = (text, id) => {
    return (dispatch, getState) => {
        const existingConText = getState().cons.list[id].text;
        if(!existingConText) {
            dispatch({ type: 'ADD_CONS', text, id })
        }
        else {
            if(text) {
                dispatch({ type: 'EDIT_CONS', id, text });

            } else {
                dispatch({ type: 'REMOVE_CONS', id });
            }
        }
    }
}

export const dragStartAction = (currentId) => {
    return (dispatch) => {
        dispatch({ type: 'REMOVE_CONS',  id: currentId})
    }
}

export const dropAction = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: 'REPLACE_CON', data})

    }
} 