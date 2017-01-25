# Project description
This project is a solution to the problemed posed by [Wattx](https://github.com/WATTx/code-challenges/blob/master/swe-challenge.md). We have two things : sensors and actuators.
The sensors are temperature sensors, that tells us about the temperature in a specific position inside a room.

The actuators are radiators positioned in a room that have an impact on the room temperature. You can open a valve of the radiator from 0 to 100.

My goal is to work with the temperature and keep the temperature below 22°C, using the radiator.

To ease the development, we define that there is only one radiator (even though I try to keep in mind while coding that there would be multiple radiators).

I decided to work with Javascript, because this is the language I'm currently the more confortable with. I try to work with Javascript using a lot of the functional parts of the language, because it is something that I actually learned to like about Javascript (I'd be glad to talk with you and see what you'd think about functionnal vs object oriented languages!). This is why you'll see a lot of functions, and that I don't use the object's prototype or the *this* keyword.

# Project explanation
The index.js is my main file on this project. It's the one that acts on my sensors and actuators, without even knowing that there is a bus between them.
The bus.js file is the one that connects, subscribes and publish to the mqtt bus. It holds all of the bus information.

At the beginning, my goal was to find a way to store the information about the impact of the valve openness on the different sensors. This would be really usefull because it would help me to define for how long I have to set the valve open (and at what %), so that the room gain x °C. To do so the best and more reliable way would be to use a database (see Database Usage next), but it would be really time consuming. Then I thought about having a NodeJS Object store information about a sensor, but in the same way, defining how to calculate the impact of the valve on a particular sensor based on its history is probably out of the scope of this exercise. I decided to use a simple Map that holds current values of the sensor, and calculate a medium temperature of the room.

## Steps to work
First of all I worked with the bus connection and developed a simple index.js that would simply log the information, and let me try if everything is working well (including edge cases)

Next, I worked on the sensors. I wanted to have a way to calculate the room temperature based on the sensors information, and chosed to go with a simple mean value of all the sensors information.


