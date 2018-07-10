export const toDollarInterger = (item) => {

  let formattedItem = (item).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

  return formattedItem = formattedItem.substring(0,formattedItem.length-3);
}

export const toRatePercentage = (value) => {

}
