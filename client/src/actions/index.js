
import axios from 'axios';
import { SET_ASSUMPTIONS, SET_CURRENT_STATUS, SET_PENSIONS, SET_GROWTH_ASSUMPTIONS, SET_RENTALS, FETCH_RESULTS, RESULTS_ID, FETCH_USER } from './types';

export const fetchUser = () => {
  const res = axios.get('/api/current_user');

  return { type: FETCH_USER, payload: res };
};

export const setAssumptions = (data) => {

  return {type: SET_ASSUMPTIONS, payload: data}
}

export const setGrowthAssumptions = (data) => {

  return {type: SET_GROWTH_ASSUMPTIONS, payload: data}
}

export const setCurrentStatus = (data) => {

  return {type: SET_CURRENT_STATUS, payload: data}
}

export const setPensions = (data) => {

  return {type: SET_PENSIONS, payload: data}
}

export const setRentals = (data) => {

  return {type: SET_RENTALS, payload: data}
}

export const fetchResults = () => {
  let data = JSON.parse(localStorage.getItem(RESULTS_ID) || null)
  console.log(window.performance.now(), 'local storage pulled')

  return {type: FETCH_RESULTS, payload: data}
}
