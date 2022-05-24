import { io } from 'socket.io-client';
import { actionUpdateTickers } from '../store/actions';
import { store } from '../store/store';
export const socket = io('http://localhost:4000');
socket.emit('start');
socket.on('ticker', payload => {
    store.dispatch(actionUpdateTickers({ payload }));
});
