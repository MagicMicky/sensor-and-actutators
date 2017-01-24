const bus = require('./bus')
const config = require('./config')

const TEMPERATURE = 22



const dealWithSensor =({sensorId, type, value}) => {
  console.log("Received info",sensorId, type, value)
}

bus.registerSensorListener(dealWithSensor)



setTimeout(() => {
  bus.setTemperature(100)
}, 1000)

setTimeout(() => {
  bus.setTemperature(0)
}, 2000)