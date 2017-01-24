# Project description
This project is a solution to the problemed posed by [Wattx](https://github.com/WATTx/code-challenges/blob/master/swe-challenge.md). We have two things : sensors and actuators.
The sensors are temperature sensors, that tells us about the temperature in a specific position inside a room.

The actuators are radiators positioned in a room that have an impact on the room temperature. You can open a valve of the radiator from 0 to 100.

My goal is to work with the temperature and keep the temperature below 22°C, using the radiator.

To ease the development, we define that there is only one radiator (even though I try to keep in mind while coding that there would be multiple radiators).

I decided to work with Javascript, because this is the language I'm currently the more confortable with. I try to work with Javascript using a lot of the functional parts of the language, because it is something that I actually learned to like about Javascript (I'd be glad to talk with you and see what you'd think about functionnal vs object oriented languages!). This is why you'll see a lot of functions, and that I don't use the object's prototype or the *this* keyword.

g