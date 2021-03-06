
import axios from 'axios';
import { SET_ASSUMPTIONS, SET_CURRENT_STATUS, SET_PENSIONS, SET_GROWTH_ASSUMPTIONS, SET_RENTALS, FETCH_RESULTS, RESULTS_ID, FETCH_USER, GET_CALCULATIONS } from './types';

/*--- fetch current user from api  ---*/
export const fetchUser = () => {
  const res = axios.get('/api/current_user');

  return { type: FETCH_USER, payload: res };
};

/*--- post assumptions state to api  ---*/
export const setAssumptions = (data) => {

  const res = axios.post('/api/post-assumptions', data)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  console.log(res)

  return {type: SET_ASSUMPTIONS, payload: data}
}

/*--- post growth assumptions state to api  ---*/
export const setGrowthAssumptions = (data) => {

  const res = axios.post('/api/post-growthAssumptions', data)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  console.log(res)

  return {type: SET_GROWTH_ASSUMPTIONS, payload: data}
}

/*--- post current status state to api  ---*/
export const setCurrentStatus = (data) => {

  const res = axios.post('/api/post-currentStatus', data)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  console.log(res)

  return {type: SET_CURRENT_STATUS, payload: data}
}

/*--- post pensions state to api  ---*/
export const setPensions = (data) => {

  const res = axios.post('/api/post-pensions', data)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  console.log(res)

  return {type: SET_PENSIONS, payload: data}
}

/*--- post rentals state to api  ---*/
export const setRentals = (data) => {

  return {type: SET_RENTALS, payload: data}
}

/*--- get calculations from api data posted to user's plan  ---*/
export const getCalculations = () => {
  console.log(window.performance.now(), 'fetch for plan calculations from server')
  const res = axios.get('/api/calculate');

  return {type: FETCH_RESULTS, payload: res}
}

// above calculation can be hooked up to run the application in local storage instead of with a back-end server
export const fetchResults = () => {
  let data = JSON.parse(localStorage.getItem(RESULTS_ID) || null)
  console.log(window.performance.now(), 'local storage pulled')

  return {type: FETCH_RESULTS, payload: data}
}
