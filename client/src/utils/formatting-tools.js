// format number to have commas after every 3 digits.
export const toDollarInterger = (item) => {

  let formattedItem = (item).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

  return formattedItem = formattedItem.substring(0,formattedItem.length-3);
}

// format numbers to have a maximum or 3 digits before the the period and a maximum of 3 digits after the period.
export const toRatePercentage = (value) => {
  let formattedValue = value.replace(/[^0-9.]/g, '')
  if (formattedValue.indexOf('.')>=0) {
    let splitByDecimalValue = formattedValue.split('.')
    splitByDecimalValue[0] = splitByDecimalValue[0].slice(0,3)
    splitByDecimalValue[1] = splitByDecimalValue[1].slice(0,3)

    return splitByDecimalValue.join('.')

  } else {
    return formattedValue
  }

}
