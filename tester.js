const mqtt = require('mqtt')
const {mqtt: mqttConfig} = require('./config')

const MQTT_ADDR = 'mqtt://'+ mqttConfig.host + ':' + mqttConfig.port
const SENSOR_TOPIC = '/readings/temperature'
const RADIATOR_TOPIC = '/actuators/room-1'

const mqttClient = mqtt.connect(MQTT_ADDR)

const setSensorTemp = (sensor, value) => {
  const sensorInfo = {
    "sensorID": sensor,
    "type": "temperature",
    "value": value
  }
  mqttClient.publish(SENSOR_TOPIC, JSON.stringify(sensorInfo))
  mqttClient.subscribe(RADIATOR_TOPIC)
}

mqttClient.on('message', (topic, msg) => {
  if(topic === RADIATOR_TOPIC) {
    console.log('[+] Valve openness to '+ JSON.parse(msg).level)
  }
})

mqttClient.on('connect', () => {
  setTimeout(() => {
    setSensorTemp("sensor-1", 10)
  }, 1000)

  setTimeout(() => {
    setSensorTemp("sensor-1", 15)
  }, 2000)

  setTimeout(() => {
    setSensorTemp("sensor-2", 25)
  }, 2000)
})

