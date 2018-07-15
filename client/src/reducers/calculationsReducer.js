
import { SET_ASSUMPTIONS, SET_GROWTH_ASSUMPTIONS, SET_CURRENT_STATUS, SET_PENSIONS, SET_RENTALS, RESULTS_ID, GET_CALCULATIONS } from "../actions/types";
import { calculateFinancials, calRetirementGoal, calcNeededInitialContribution } from '../utils'

export default function(state = {}, action) {
  let newState = {...state}
    switch (action.type) {
        case SET_ASSUMPTIONS:

          newState.assumptions = action.payload

          return newState

        case SET_GROWTH_ASSUMPTIONS:

          newState.growthAssumptions = action.payload

          return newState

        case SET_CURRENT_STATUS:

          newState.currentStatus = action.payload

          //store yearly contributions
          newState.currentStatus.yearlyContributions = action.payload.contributions*12

          return newState

        case SET_PENSIONS:

          newState.pensions = action.payload

          // store yearly income from each pension
          for (let i=1; i<newState.pensions.pensionEntries+1; i++) {
            newState.pensions['pension'+i].yearlyIncome = newState.pensions['pension'+i].monthlyIncome*12
          }

          return newState

        case SET_RENTALS:

          newState.rentals = action.payload
          for (let i=1; i<newState.rentals.pensionEntries+1; i++) {
            newState.rentals['rental'+i].yearlyIncome = newState.rentals['rental'+i].monthlyIncome*12
          }
          const contributions = state.currentStatus.contributions
          const calculations = calculateFinancials(newState, contributions)
          const retirementGoal = calRetirementGoal(calculations, state)
          const neededInitialContribution = calcNeededInitialContribution(retirementGoal, state)
          const recommendedPlan = calculateFinancials(newState, neededInitialContribution)

          newState.currentPlan = calculations

          newState.retirementGoal = retirementGoal

          newState.recommendedPlan = recommendedPlan

          console.log(localStorage.setItem(RESULTS_ID, JSON.stringify(newState)))

          console.log(window.performance.now(), 'local storage set')

          return newState

        case GET_CALCULATIONS:

          return action.payload.data

      default:
        return state;
    }
  }
