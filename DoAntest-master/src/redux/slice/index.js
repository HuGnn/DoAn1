import { combineReducers } from 'redux';
import itemReducer from './item';
import homeReducer from './home';
import { reducer as productReducer } from './product';
import { reducer as billReducer } from './bill';
import { reducer as cartReducer } from './cart';

const rootReducer = combineReducers({
	item: itemReducer,
	home: homeReducer,
	products: productReducer,
	bills: billReducer,
	carts: cartReducer,
});
export default rootReducer;
