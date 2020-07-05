import React from 'react';
import store from '../common/store';
import {Provider} from "react-redux";
import Popup from '../Popup/Popup';





const Home = () => {
    return (<Provider store={store}><Popup/></Provider>);
  };
  
  export default Home;