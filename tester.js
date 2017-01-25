const mqtt = require('mqtt')
const {mqtt: mqttConfig} = require('./config')

const MQTT_ADDR = 'mqtt://'+ mqttConfig.host + ':' + mqttConfig.port
const SENSOR_TOPIC = '/readings/temperature'

const mqttClient = mqtt.connect(MQTT_ADDR)

const setSensorTemp = (sensor, value) => {
  const sensorInfo = {
  "sensorID": sensor,
  "type": "temperature",
  "value": value
}
  mqttClient.publish(SENSOR_TOPIC, JSON.stringify(sensorInfo))
}

mqttClient.on('connect', () => {
  setTimeout(() => {
    setSensorTemp("sensor-1", 10)
  }, 1000)
})
mqttClient.on('connect', () => {
  setTimeout(() => {
    setSensorTemp("sensor-1", 15)
  }, 2000)
})

mqttClient.on('connect', () => {
  setTimeout(() => {
    setSensorTemp("sensor-2", 25)
  }, 2000)
})

