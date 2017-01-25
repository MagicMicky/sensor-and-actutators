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

Once we have the calculation of the room temperature correct, I aimed to work on the valve openness and how to react to temperature changes. My goal was to tell that when we have a room temperature of -12°C the valve openness wasn't to be the same as when we have 21°C. I needed to calculate an indicator based on the difference of temperature between what we wanted to achieve and the temperature in the room. We need to note that I did a lot of approximation because I didn't know the real impact of the valve openness to the room temperature (see Defining the valve openness in improvements)

## The valve openness approximation
** Note that the title of this section looks a lot like a The Big Bang Theory episode title **
So the valve openness needs to be set based on the difference between our actual room temperature and the objective temperature. To do so, we need to approximate the heating curve of the radiator, which for the sake of simplicity, has been set to a linear curve. In the same way, all of the radiators doesn't have the same heating curve, which is why we should have a Database and do some machine learning tricky stuff to detect and define the modelisation of the valve openness impact on the room temperature, see Database Usage and Defining the valve openness in the Improvement section.

To approximate and modelize the heating curve of the radiator, I had to define a Minimal achievable temperature, when the radiator is at 100%, and the maximum temperature (where  the radiator is at 0). The maximum temperature is set to be the goal temperature, because I assume that we don't need to have the radiator set to stay at this temperature. The minimum is zero for sake of simplicity.
If we had time, it would be nice to use machine learning to adapt, based on the time the valve was opened, at which value, and the number of degrees you gain or loose.

From these values, I calculated a simple linear function that represent the valve openness against the current temperature in the room. That way, my linear function is set to be *(-100/22)x + 100*, with x being the current room temperature.

### Calculation of the linear function
To determine the linear function I had to calculate a few things (truth be told, had to use a little bit google to remember stuff about functions).
A linear function (ax+b) is made of 2 things : the slope (a), and the intercept (b, maybe easier to call it offset). to determine the offset, we need to think of it as being the value you want when your x=0, so here 100. To determine the slope, you need to take two points `(x1;y1)` and `(x2;y2)` and do the following: `a =  (y2-y1) / (x2-x1)` Our two points were : (100;0) => valve open at 100% when temperature is zero, and (0,22) => valve open at zero when we hit the goal temperature. So a=-100/22

## Steps to work
First of all I worked with the bus connection and developed a simple index.js that would simply log the information, and let me try if everything is working well (including some edge cases).

Then, because I did not have time to write real unit tests, I decided to create a simple "tester.js" file that would let me try some scenarios and verify by hand that the results are correct.

Next, I worked on the sensors. I wanted to have a way to calculate the room temperature based on the sensors information, and chose to go with a simple mean value of all the sensors information.

Once I calculated what I estimated to be the room temperature, I decided to work on the valve openness and how to react to room temperature changes.



# Improvements
## Databases
## Calculating the room temperature
## Defining the valve openness
## Unit testing


# Running the project
To run the project, nothing easier. You either need to have node installed or run it in a docker.

```
npm install # Install dependencies
vi config.json # Set your own config.json (see below)
npm start # Run the program
node tester.js # Run the tester file
```

## Config.json
An example of a config.json file would be the following:

```
{
  "mqtt": {
    "host": "localhost",
    "port": 1883
  }
}
```
## Running nodejs inside a docker container
```
docker run -ti -v `pwd`:/app -w /app node npm install && npm start # Run the application
docker run -ti -v `pwd`:/app -w /app node npm install && node tester.js # Run the small tester module
```
