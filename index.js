const bus = require('./bus')
const config = require('./config')
const radiator = require('./radiator')

const sensors = new Map()


const temperatureMean = (sensors) => {
  let sum = 0;
  sensors.forEach((value, sensor) => {
    sum+=value
  })
  return sum/sensors.size;
}


//This function is called every time there is an update about the temperature.
//Different temperatures are stored in the sensors Map, and this is what it needs to work with.
const temperatureUpdated = () => {
  const roomTemperature = temperatureMean(sensors)
  console.log("Room temperature", roomTemperature)
  bus.setValveOpenness(radiator.getValveOpenness(roomTemperature))
}


const dealWithSensor =({sensorID, type, value}) => {
  sensors.set(sensorID, value)
  temperatureUpdated();
}

bus.registerSensorListener(dealWithSensor)