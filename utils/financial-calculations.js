const _ = require('lodash')

const calcIncomeNeeds = (state) => {
    console.log('tick2')
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
const calcContributions = (dataArg, state, contributions) =>{
    const { currentAge, lifeExpectancy, retirementAge } = state.assumptions
    const { increaseContributions } = state.currentStatus
  
    let yearlyContributions = contributions * 12
  
    for (let age = currentAge; age <= lifeExpectancy; age++) {
      // find index in the state data object
      const index = dataArg[age]
  
      if (age < retirementAge){
        // store contribution within that index
        index.yearlyContributions = yearlyContributions
  
        yearlyContributions = yearlyContributions * (1+(increaseContributions/100))
      } else {
        index.yearlyContributions = 0
      }
  
    }
  
    return dataArg
  }

/*========== calcWorkingYears ==========*/
const calcWorkingYears = (data, state, calculatingContributions) => {
      
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
  
      // NOTICE: divide index.yearlyContributions by 12 to switch back to monthly intervals
      //define contributions for that index
      let contributions = index.yearlyContributions
  
      if (calculatingContributions) {
        contributions = calculatingContributions
      }
  
      // store year start within that index
      index.yearStart = yearStart
  
      // NOTICE: divide the rate by 12 to switch back to monthly intervals
      // define rate of return based on how time horizon
      if ((retirementAge - age) > 10){
        interest = growthStep1
        rate = 1 + (growthStep1/100)
      } else {
        interest = growthStep2
        rate = 1 + (growthStep2/100)
      }
      //store interest
      index.interest = interest
  
      /* NOTICE: below code is commented out because I am compounding at annual intervals instead of monthly now. Might switch back eventually
  
      calculate yearEnd from 12 intervals of monthly contributions
      for (let n=0; n<12; n++) {
        yearEnd = (yearStart+contributions)*rate
        yearStart = yearEnd
      }*/
  
      yearEnd = (yearStart+contributions)*rate
      yearStart = yearEnd
  
      //store yearEnd
      index.yearEnd = yearEnd
      // NOTICE: multiply contributions by 12 to switch back to monthly intervals
      //store growth
      index.growth = yearEnd - index.yearStart - (contributions)
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
    }
    return data
  }

module.exports = {

      /*==========-------------------==========*/
      /*========== calRetirementGoal ==========*/
      /*==========-------------------==========*/
    calRetirementGoal: (data, state) => {
      
        const { lifeExpectancy, retirementAge } = state.assumptions
      
        //initialize need outside of loop scope
        let neededYearStart = 0
      
        // work backwards to find needed balance at 65
        for (let age = lifeExpectancy; age >= retirementAge; age--) {
      
          // find index in the state data object
          const index = data[age]
      
          // initialize needed variables for calculation
          const { adjustedNeed, yearlyContributions } = index
      
          // work backwords to find needed yearStart each year
          neededYearStart = neededYearStart / (1+(index.interest/100))
          neededYearStart += adjustedNeed
          neededYearStart -= yearlyContributions
        }
      
        neededYearStart = Math.round(neededYearStart)
      
        return neededYearStart
      },
      
    calcNeededInitialContribution: (retirementGoal, state) => {
      
        const { currentAge, retirementAge } = state.assumptions
      
        const r = state.currentStatus.increaseContributions/100
        const g1 = state.growthAssumptions.growthStep1/100
        const g2 = state.growthAssumptions.growthStep2/100
        const savings = state.currentStatus.savings
        const n = retirementAge - currentAge
      
        // variables in formulas below may not directly related to the above constants
        //
        // formula 1:          _                    _
        //                   |       (r - g2)       |
        //        PMT =  FV *|  –––––––––––––––––   |
        //                   |_ (1+r)^n - (1*g2)^n  _|
        //
        // FV is the retirementGoal. Had to solve it in multiple parts since the growth rate of the investment changes dependning on how close to retirement the user is.
        //
        // formula 2:
        //        FV = PV(1+r)^n  || FV = PV(1+g1)^n || FV = PV(1+g2)^n
        //
        // defined variables below so I wouldn't have to write the same formula over and over again.
      
        const b = ((r-g2)/(Math.pow((1+r), 10) - Math.pow((1+g2), 10)))
        const c = ((r-g1)/(Math.pow((1+r), n-10) - Math.pow((1+g1), n-10)))
        const d = Math.pow((1+r), (n-10))
        const e = Math.pow((1+g2), 10)
        const f = Math.pow((1+g1), n-10)
      
        const savings10 = savings * f
        const savingsFinal = savings10 * e
      
        const a = retirementGoal - savingsFinal
      
      
        const PMT = ((a * b * c)/( (c* d) + (b * e)))/12
      
        // formula used assumes contributions at the end of the year. So it asks for more money than actually needed. I just lower the amount by 10%. It's still a little more than needed, but I guess it's better than under-contributing.
        // I can solve this by adding the first PMT to initial savings, but that would require me to build the formula again, which I can do later.
        return ( PMT * .95 )
      
      },
      
      /*========== calculateFinancials ==========*/
    calculateFinancials: (state, contributions) => {
        console.log('test')
        // build array where each element represents one year in user's lifetime
        let data = calcIncomeNeeds(state)
      
        // turn array into a data object whose keys are the user's age
        data = _.mapKeys(data, "age")
      
        // store contributions made each year
        data = calcContributions(data, state, contributions)
      
        // calculate year start, year end, interest rate, and growth during working years
        data = calcWorkingYears(data, state)
      
        // calculated newly adjusted income needs by subtracting pension income
        data = calcNeedMinusPensionIncome(data, state)
      
        data = calcRetirementYears(data, state)
      
        data = formatDecimals(data, state)
      
        return data
      }
  };
  

/*========== calcIncomeNeeds ==========*/

