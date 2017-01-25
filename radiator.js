
const TEMPERATURE = 22
const LINEAR_SLOPE = -100/22 //a in ax+b
const LINEAR_INTERCEPT = 100 //b in ax+b

let currentRoomTemperature = 30 // We start to believe that the room temperature is way above our objective because we don't want our radiator activated for no reasons.

// Our goal is to say that the lower the temperature, the more open the valve needs to be.
// I do believe a real radiator heating curve doesn't have a linear warming curve, but something closer to an exponential or at least polynomial function.
// I still decided to implement a linear function, for the sake of simplicity at the beginning
// So the goal is from the room temperature, calculate a percentage of the valve openness.
// See README for more information
const getValveOpennessLinear = () => {
  return LINEAR_SLOPE * currentRoomTemperature + LINEAR_INTERCEPT;
}

const getValveOpenness = (roomTemperature) => {
  currentRoomTemperature = roomTemperature
  return getValveOpennessLinear()
}


module.exports = {
  getValveOpenness,
}