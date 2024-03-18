import React from 'react';
import './App.css';
import {UserView} from "./features/user/userView";
import {CakeView} from "./features/cake/cakeView";
import {IcecreamView} from "./features/icecream/icecreamView";
import {Provider} from "react-redux";
import store from "./app/store";

function App() {
  return (
      <Provider store={store}>
          <div className="App">
              <UserView />
              <CakeView />
              <IcecreamView />
          </div>
      </Provider>
  );
}

export default App;
