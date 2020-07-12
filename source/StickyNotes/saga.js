import {put, call, takeLatest } from 'redux-saga/effects';
import {REQUEST_CONTENT} from './constants';
import {copyContent} from './action';
import browser from 'webextension-polyfill';

const requestContentScript =() =>{
  
  };


function* getContentScript() {
try{
    yield requestContentScript();

}catch(error){
    console.log(error);
}
}

export function* watchContentScript() {
    yield takeLatest(REQUEST_CONTENT,getContentScript);
}
