const initialState = {
    cart: {},   //it is a reducer(json) 
    user: {}
};

export default function RootReducer(state = initialState, action) //action Contain type and payload 
{
    switch (action.type) {
        case 'ADD_CART':
            {
                console.log('RootReducer: Before ADD_CART state:', state);
                const productId = action.payload[0];
                const productData = action.payload[1];
                const newState = {
                    ...state,
                    cart: {
                        ...state.cart,
                        [productId]: productData
                    }
                };
                console.log('RootReducer: After ADD_CART state:', newState);
                return newState;
            }
        case 'DELETE_CART':
            {
                const productIdToDelete = action.payload[0];
                const newCart = { ...state.cart };
                delete newCart[productIdToDelete];
                return { ...state, cart: newCart };
            }
        case 'EMPTY_CART':
            return { ...state, cart: {} };

        case 'ADD_USER':
            {
                const userEmail = action.payload[0];
                const userData = action.payload[1];
                return {
                    ...state,
                    user: {
                        [userEmail]: userData
                    }
                };
            }
        case 'DELETE_USER':
            return { ...state, user: {} };

        default:
            return state;
    }

}
