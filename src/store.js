import thunk from "redux-thunk";

import { applyMiddleware, createStore } from "redux";
import QuizReducers from "./reducers/quizReducers";

// middlewares
const middleware = applyMiddleware(thunk);

// store
const store = createStore(QuizReducers, middleware);

export default store;
