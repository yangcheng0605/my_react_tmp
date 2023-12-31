import { all, fork, AllEffect, ForkEffect } from 'redux-saga/effects';
import counterSagas from '../pages/Counter/saga';

export default function* rootSaga(): Generator<
  AllEffect<ForkEffect<void>>,
  void,
  unknown
> {
  yield all([fork(counterSagas)]);
}
