import {all} from 'redux-saga/effects'
import {watchContentScript} from '../StickyNotes/saga'


export default function* rootSaga() {
    yield all([
        watchContentScript()
    ])
}

