---
title: Combat Robot
description: My first venture into competitive robotics. A mix of engineering challenges and competitive strategy.
url: https://github.com/cavalluccijohann/arduino-robot-david
date: 2025-04-00
year: 2025
image: /assets/works/robot.webp
minRead: 5
roles:
  - Full Stack
technologies:
  - 3D-Printing
  - Fusion 360
  - Arduino
teamName: Author
authors:
  - name: Johann Cavallucci
    to: https://x.com/JohannCVL
    target: _blank
    avatar:
      src: https://avatars.githubusercontent.com/u/72015679?v=4
      alt: Johann Cavallucci
---
# Flamethrower Robot – Arduino Combat Bot

## Quick Overview

This project started as a simple challenge between two friends:

**Build a combat robot in 2 weeks, with less than €50. Each on our own!**

After a lot of brainstorming, I decided to go with a flamethrower.  
First, because well… it’s cool  
And also because fire can slip into every little gap in the opponent’s defenses.

But attack alone isn’t enough — I also had to think about **defense**.  
I designed a **conical shape** to reduce grip points and deflect attacks, since I had no idea what my opponent was going to build.

> Here’s a first glimpse of the BEAST…

---

## Design & Components

Having the idea is one thing… but how do you actually build it?

The first step was **a lot of research** to identify the most effective components while staying within the tight budget.

### Hardware Used

| Component                 | Description                                   |
|---------------------------|-----------------------------------------------|
| **Arduino Uno**           | Main microcontroller                          |
| **HC-05**                 | Bluetooth module for remote control           |
| **L298N H-Bridge**        | Controls propulsion and motors                |
| **DC Motors + Wheels**    | Robot movement                                |
| **3D-Printed Tank**       | Fuel storage (isopropanol)                    |
| **Electric Arc Igniter**  | Ignition system for the flame                 |
| **18650 Batteries**       | Power supply                                  |

---

## Why These Choices?

- **Arduino Uno**: inexpensive, easy to program, perfect for prototyping.
- **Bluetooth (HC-05)**: simple integration, direct smartphone control.
- **L298N**: allows independent control of both motors (forward/backward/left/right).
- **3D Printing**: crucial for custom fuel tank and structural parts.
- **Arc Igniter**: reliable even in movement, remotely activated, stable ignition.

---

## 3D Printing

For this project, I modeled and printed most of the parts: from the robot’s base to the pump that sprays fluid.  
I used **Fusion 360** for modeling, **Bambu Studio slicer**, and the **Bambu Lab P1P Mini** printer (amazing machine btw).

Here are some of the printed parts:  
*(insert images here)*
---

## Challenges Faced

- **Time**: 2 weeks working only in the evenings — really short, especially with a flamethrower system.
- **Power**: managing multiple components with a limited battery.
- **Budget**: everything had to be built from scratch (DIY pump, printed frame, etc.).
- **Electronics**: learning to handle power, safety, and proper integration.
- **The Pump**: designing a system able to propel fluid several meters.  
  I modeled it **from scratch**, and even though first tests were with water, it worked — a small victory!

---

## What I Learned

- How to integrate multiple Arduino modules
- Using Bluetooth in embedded projects
- Electronics basics: voltage, current, components, safety
- Managing a technical project under **real-world constraints**
- Fusion 360 modeling & improving my **3D printing skills**

---

## Electronics Schematic

Here’s a schematic of the electronic setup:  
*(Add a visual here: Fritzing, Lucidchart, or even a hand-drawn diagram)*

---

## Final Result

The robot is **fully functional**:

- Moves in all directions
- Controlled remotely via smartphone
- Flamethrower system works and is **safe**
- Respected the challenge: **< €50**, **< 2 weeks**

But… I still **lost** 😅

> 💡 Tip: if you ever set up this kind of challenge, agree on a **size and weight limit** to avoid unfair advantages!

---

## Gallery

*(Add photos here: finished robot, inner parts, flame, 3D prints, tests, etc.)*

---

<a href="https://github.com/cavalluccijohann/arduino-robot-david" target="_blank" class="flex items-center space-x-2">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/>
  </svg>
  <span>Robot on GitHub</span>
</a>
