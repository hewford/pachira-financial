import _ from "lodash";

/*========== calcIncomeNeeds ==========*/
const calcIncomeNeeds = (state) => {

  const { currentAge, desiredEstate, desiredIncome, lifeExpectancy, retirementAge } = state.assumptions
  const inflation = 1 + (state.growthAssumptions.inflation/100)

  let incomeInflation = desiredIncome
  let incomeNeedsArray = []

  for (let age = currentAge; age < lifeExpectancy+1; age++) {

    let incomeNeeds = 0;
    if (age >= retirementAge) {
      incomeNeeds = incomeInflation
    }

    incomeNeedsArray.push({
      desiredEstate: desiredEstate,
      age: age,
      incomeInflation: incomeInflation,
      incomeNeeds: incomeNeeds,
      adjustedNeed: incomeNeeds
    })

    incomeInflation = incomeInflation * (inflation)
  }
  return incomeNeedsArray
}
/*========== calcContributions ==========*/
const calcContributions = (data, state) => {
  const { currentAge, lifeExpectancy } = state.assumptions
  const { contributionsStop, yearlyContributions } = state.currentStatus

  for (let age = currentAge; age <= lifeExpectancy; age++) {
    // find index in the state data object
    const index = data[age]

    if (age <= contributionsStop){
      // store contribution within that index
      index.yearlyContributions = yearlyContributions
    } else {
      index.yearlyContributions = 0
    }

  }

  return data
}


/*========== calcWorkingYears ==========*/
const calcWorkingYears = (data, state) => {

  const { currentAge, retirementAge } = state.assumptions
  const { savings } = state.currentStatus
  const { growthStep1, growthStep2 } = state.growthAssumptions
  let interest;
  let rate;
  // initate yearEnd outside of loop to define yearStart each loop
  let yearEnd = savings

  for (let age = currentAge; age < retirementAge; age++) {
    // define yearStart by the previous yearEnd
    let yearStart = yearEnd

    // find index in the state data object
    const index = data[age]

    //define contributions for that index
    const contributions = index.yearlyContributions/12

    // store year start within that index
    index.yearStart = yearStart

    // define rate of return based on how time horizon
    if ((retirementAge - age) > 10){
      interest = growthStep1
      rate = 1 + (growthStep1/100)/12
    } else {
      interest = growthStep2
      rate = 1 + (growthStep2/100)/12
    }
    //store interest
    index.interest = interest

    // calculate yearEnd from 12 intervals of monthly contributions
    for (let n=0; n<12; n++) {
      yearEnd = (yearStart+contributions)*rate
      yearStart = yearEnd
    }

    //store yearEnd
    index.yearEnd = yearEnd
    //store growth
    index.growth = yearEnd - index.yearStart - (index.yearlyContributions)
  }

  data[retirementAge].yearStart = data[retirementAge-1].yearEnd

  return data
}

/*========== calcNeedMinusPensionIncome ==========*/
const calcNeedMinusPensionIncome = (data, state) => {
  // find adjusted need using each pension income, income needed, pension cola, pension start age, lifeExpectancy, and retirementAge
  const { currentAge, lifeExpectancy } = state.assumptions

  const pensions = state.pensions

  // loop through each pension entered
  for (let p = 1; p < pensions.pensionEntries+1; p++) {
    const pensionName = 'pension'+p
    const pension = pensions[pensionName]

    const { cola, monthlyIncome, pensionStart } = pension
    let yearlyIncome = monthlyIncome * 12

    for (let age = currentAge; age < lifeExpectancy+1; age++) {

      // define data index that is being manipulated
      const index = data[age]

      if (age<pensionStart){
        index[pensionName] = 0
      } else {
        // record pension income from that year
        index[pensionName] = yearlyIncome
      }

      // define adjustedNeed
      let { adjustedNeed } = index

      // record newly adjusted income
      index.adjustedNeed = adjustedNeed - yearlyIncome

      // make sure income need cannot be below 0
      if(index.adjustedNeed<0) {
        index.adjustedNeed = 0
      }

      // calculate income for the following year
      yearlyIncome = yearlyIncome * (1 + (cola/100))

    }
  }
  return data
}

/*========== calcRentalIncomePerYear ==========*/
const calcRentalIncomePerYear = (data, state) => {
  const { currentAge, lifeExpectancy } = state.assumptions
  const { inflation } = state.growthAssumptions

  const rentals = state.rentals

  // loop through each rental entered
  for (let r = 1; r < rentals.rentalEntries+1; r++) {

    const rentalName = 'rental'+r
    const rental = rentals[rentalName]

    const { monthlyIncome, yearlyExpenses, value } = rental
    let homeValue = value
    let expenses = yearlyExpenses
    let yearlyIncome = monthlyIncome * 12

    for (let age = currentAge; age <= lifeExpectancy; age++) {

      // define data index that is being manipulated
      const index = data[age]

      // record rental income from that year
      index[rentalName] = yearlyIncome

      // record rental expenses from that year
      index[rentalName+'Expenses'] = expenses

      // record rental property value for this year
      index[rentalName+'Value'] = homeValue

      // calculate income for the following year
      yearlyIncome = yearlyIncome * (1 + (inflation/100))

      // calculate value for the following year
      homeValue = homeValue * (1 + (inflation/100))

      // calculate value for the following year
      expenses = expenses * (1 + (inflation/100))
    }
  }

  return data
}

/*========== calcNeedMinusRentalIncome ==========*/
const calcNeedMinusRentalIncome = (data, state) => {
  // find adjusted need using each pension income, income needed, pension cola, pension start age, lifeExpectancy, and retirementAge
  const { lifeExpectancy, retirementAge } = state.assumptions

  const rentals = state.rentals

  // loop through each rental entered
  for (let r = 1; r < rentals.rentalEntries+1; r++) {
    const rentalName = 'rental'+r

    for (let age = retirementAge; age < lifeExpectancy+1; age++) {

      // define data index that is being manipulated
      const index = data[age]

      // define adjustedNeed
      let { adjustedNeed } = index

      // record newly adjusted income
      index.adjustedNeed = adjustedNeed - index[rentalName]
      index.adjustedNeed = index.adjustedNeed + index[rentalName+'Expenses']

      // make sure income need cannot be below 0
      if(index.adjustedNeed<0) {
        index.adjustedNeed = 0
      }

    }
  }
  return data
}

/*========== calcRetirementYears ==========*/
const calcRetirementYears = (data, state) => {

  const { lifeExpectancy, retirementAge } = state.assumptions
  const { growthStep3 } = state.growthAssumptions

  for (let age = retirementAge; age <= lifeExpectancy; age++) {

    // find index in the state data object
    const index = data[age]

    //define yearStart
    index.yearStart = data[age-1].yearEnd

    // calculate year end
    index.yearEnd = index.yearStart - index.adjustedNeed

    // calculate and record growth
    index.growth = index.yearEnd * (growthStep3/100)

    // adjust for growth
    index.yearEnd = index.yearEnd +index.growth

    // record interest rate
    index.interest = growthStep3



    // yearEnd cannot go before 0
    if (index.yearEnd<0){
      index.yearEnd = 0
    }
  }

  return data
}

const formatDecimals = (data, state) => {
  const { currentAge, lifeExpectancy } = state.assumptions
  const pensions = state.pensions
  const rentals = state.rentals

  for (let age = currentAge; age <= lifeExpectancy; age++) {
    const index = data[age]

    index.adjustedNeed = Math.round(index.adjustedNeed)
    index.desiredEstate = Math.round(index.desiredEstate)
    index.growth = Math.round(index.growth)
    index.incomeInflation = Math.round(index.incomeInflation)
    index.incomeNeeds = Math.round(index.incomeNeeds)
    index.desiredEstate = Math.round(index.desiredEstate)
    index.yearEnd = Math.round(index.yearEnd)
    index.yearStart = Math.round(index.yearStart)
    index.yearlyContributions = Math.round(index.yearlyContributions)

    for (let p = 1; p <= pensions.pensionEntries; p++) {
      const pensionName = 'pension'+p
      index[pensionName] = Math.round(index[pensionName])
    }

    for (let r = 1; r <= rentals.rentalEntries; r++) {
      const rentalName = 'rental'+r
      index[rentalName] = Math.round(index[rentalName])
      index[rentalName+'Expenses'] = Math.round(index[rentalName+'Expenses'])
      index[rentalName+'Value'] = Math.round(index[rentalName+'Value'])
    }
  }
  return data
}

/*========== calculateFinancials ==========*/
export const calculateFinancials = (state) => {
  // build array where each element represents one year in user's lifetime
  let data = calcIncomeNeeds(state)

  // turn array into a data object whose keys are the user's age
  data = _.mapKeys(data, "age")

  // store contributions made each year
  data = calcContributions(data, state)

  // calculate year start, year end, interest rate, and growth during working years
  data = calcWorkingYears(data, state)

  // calculated newly adjusted income needs by subtracting pension income
  data = calcNeedMinusPensionIncome(data, state)

  data = calcRentalIncomePerYear(data, state)

  let data2 = calcNeedMinusRentalIncome(data, state)

  data = calcRetirementYears(data, state)

  data2 = calcRetirementYears(data2, state)

  data = formatDecimals(data, state)

  return { data: data, data2: data2 }
}
