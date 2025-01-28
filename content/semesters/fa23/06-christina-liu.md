---
id: christina-liu
author: Christina Liu
title: Mood Poster Generator
videoSrc: /semesters/fa23/videos/christina-liu.mp4
posterSrc: /semesters/fa23/posters/christina-liu.jpg
links:
  - text: View Sketch
    url: https://editor.p5js.org/yfchristina/full/akib1tSB0
---

The Mood Poster Generator is a poster creation tool built on p5.js, designed to detect the user’s mood and generate corresponding posters. The user’s mood data is acquired through a temperature sensor. The visual elements of the poster are adjusted to reflect the user’s mood dynamically. For higher temperatures, the poster adopts warmer colors and more rounded shapes to convey a sense of happiness and warmth. Conversely, lower temperatures result in the use of cooler colors and more rectangular shapes to evoke a cool feeling.

The temperature sensor incorporates Adafruit’s sensor in conjunction with Arduino and utilizes p5.js’s serial port for data transmission to p5.js. Subsequently, p5.js maps the temperature data to a specific range, generating shape probabilities based on the mapped values.