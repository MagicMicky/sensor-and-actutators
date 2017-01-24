const mqtt = require('mqtt')
const {mqtt: mqttConfig} = require('./config')

const MQTT_ADDR = 'mqtt://'+ mqttConfig.host + ':' + mqttConfig.port
const SENSOR_TOPIC = '/readings/temperature'
const HEATING_TOPIC = '/actuators/'

const mqttClient = mqtt.connect(MQTT_ADDR)

//If we wanted to do something right, we would have an array of listeners, and be able to remove or add whenever necessary.
var sensorListener = null

mqttClient.on('connect', () => {
  console.log('Connected to '+ MQTT_ADDR)
  mqttClient.subscribe(SENSOR_TOPIC)
  //quick testing purpose:
  //mqttClient.subscribe(HEATING_TOPIC+"room-1")

})

mqttClient.on('message', (topic, msg) => {
  if(topic === SENSOR_TOPIC) {
    console.log("[+] Received info from "+ msg.sensorID +":"+ msg.value +"("+ msg.type +")")
    if(sensorListener) {
      sensorListener(msg)
    }
  } else {
    console.log("[+] Received info on "+ topic +":"+ JSON.stringify(msg))
  }
})

const registerSensorListener = (fn) => {
  sensorListener = fn
  return () => {
    //Return a method to remove the listener
    sensorListener = null
  }
}

const setTemperature = (level, room='room-1') => {
  const topic = HEATING_TOPIC + room
  console.log('Setting temperature of '+ room +' to '+ level + '['+ topic +']')
  mqttClient.publish(topic, {
    level
  }.toString())
}


module.exports = {
  registerSensorListener,
  setTemperature,
}

