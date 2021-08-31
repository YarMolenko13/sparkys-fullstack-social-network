import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import PostsStore from "./store/PostsStore";
import {UserStore} from "./store/UserStore";

export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={{
        posts: new PostsStore(),
        user: new UserStore()
    }}>
        <App />
    </Context.Provider>,
  document.getElementById('root')
);

