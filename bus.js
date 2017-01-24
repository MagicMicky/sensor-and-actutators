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

const parseMsg = (msg) => {
  try {
    return JSON.parse(msg.toString())
  } catch(err) {
    console.log("Msg is not a valid json")
  }
  return null;
}

mqttClient.on('message', (topic, msg) => {
  const msgObject = parseMsg(msg)
  if(topic === SENSOR_TOPIC && msgObject) {
    console.log("[+] Received info from "+ msgObject.sensorID +":"+ msgObject.value +"("+ msgObject.type +")")
    if(sensorListener) {
      sensorListener(msgObject)
    }
  } else {
    console.log("[+] Received info on "+ topic +":"+ JSON.stringify(msgObject))
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
  mqttClient.publish(topic, JSON.stringify({
    level
  }))
}


module.exports = {
  registerSensorListener,
  setTemperature,
}

