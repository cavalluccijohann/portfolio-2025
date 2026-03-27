---
title: Raftou - Mobile Game
description: Mobile game available on Android and iOS. Play with friends or as a couple anytime, anywhere.
url: https://www.raftou.com/
date: 2026-03-23
year: 2026
image: /assets/works/raftou/raftou-site.webp
minRead: 10
roles:
  - Full Stack
  - UI/UX Designer
technologies:
  - React Native
  - Typescript
  - Expo & EAS
  - MongoDB
  - Tailwind
teamName: Author
authors:
  - name: Johann Cavallucci
    to: https://x.com/JohannCVL
    target: _blank
    avatar:
      src: https://avatars.githubusercontent.com/u/72015679?v=4
      alt: Johann Cavallucci
---

## The Concept
This game comes from a simple idea: what if we could establish an "ongoing background game" during vacations, parties, or even in everyday couple life? The goal of Raftou is to launch a game that runs parallel to a real-life moment, to make it even more fun and unpredictable.

So I decided to take action, grab this idea, and see it through to the end. Raftou represents 5 months of intense work: from conception to publication on the app stores, including design, architecture, development, and marketing.

It's a game that allows you to play with your friends or as a couple, anywhere and anytime. You create a game, invite your friends, and then everyone chooses the challenges they want to include or creates custom ones. Then, you just have to send these challenges to your targets and complete them to earn points. This concept turns simple moments (like a museum visit or a subway ride) into a real adventure.

## Design & Features
The entire application design was done by me, mainly on Figma. I sought to find the perfect balance between a simple, clean interface and an immersive gaming experience. Every logo, color, and animation was thought out to strengthen Raftou's visual identity and make navigation smooth.

Today, Raftou offers many features:
- **Custom creation:** The ability to create your own cards and challenges.
- **A large library:** Over 400 cards spread across different categories (Party, Vacation, Couple, Friends...).
- **Customization:** Theme switching (Dark mode / Light mode) adapted to the player's environment.
- **Immersion:** Sound effects, background music, and haptic feedback (vibrations).
- **Massive multiplayer:** Games that can host up to 13 people simultaneously.
- **Strategy:** The ability to counter an attack using the special "Reverse" card.
- **Longevity:** "Ongoing" games that can last up to 1 year.

And new features are already under development...

![image](/assets/works/raftou/screenShoots.webp)

## Technical Stack & Architecture

| Technology | Role in the project |
|------------------------|-------------------------------------------------------|
| **React Native / Expo** | Cross-platform mobile application development |
| **TypeScript** | Strict typing and end-to-end code safety |
| **Hono & Zod** | Creation of the ultra-fast Backend API and data validation |
| **Tailwind CSS** | Design integration and component styling |
| **EAS (Expo)** | CI/CD, build management, and store deployment |
| **Nuxt 3** | Creation of the showcase Landing Page and SEO optimization |
| **Better Auth** | Secure player authentication management |
| **Socket.io** | Real-time management for multiplayer interactions |
| **Resend** | Management and sending of transactional emails |
| **Mongo & PostgreSQL** | Databases (SQL for relational data, NoSQL for game flexibility) |
| **Linear** | Agile project management, issue tracking, and roadmap |
| **GitHub** | Code versioning, repository hosting, and collaboration |
| **Figma** | UI/UX design, screen prototyping, and graphic asset creation |
| **VPS** | Hosting of the backend infrastructure (Hono API, Socket.io, Databases) |

---

## Challenges (Development & Deployment)
Building a project of this scale solo was a real technical and creative challenge:

- **UI/UX Design:** Not being a professional designer, finding a design consistent with the game's concept that could appeal to a wide audience required many iterations. I had to do dozens of tests to find the right balance between simplicity and immersion.
- **Global Architecture:** Connecting a real-time mobile app with a robust backend and two different types of databases was a real puzzle. I had to structure the project smartly to make it scalable.

## Conclusion and Next Steps
I am extremely proud of the final result. My initial goal was to create a complete product from A to Z and learn by doing. It's a total success: I have never learned as much as I did with Raftou.

This project forced me out of my developer comfort zone to touch on all the professions related to creating a technological product: UI/UX Design, system architecture, mobile and real-time backend development, DevOps (CI/CD), marketing, and store compliance. What I take away from this is not just the live application today, but the entire journey and the experience accumulated to get there.

Moving forward, I plan to improve the product by offering new special cards, new themes, and above all, focus my efforts on growing the Raftou player community!

---

<a href="https://apps.apple.com/us/app/raftou-jeu-de-soir%C3%A9e/id6760556703" target="_blank" class="flex items-center space-x-2">
<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" fill-rule="evenodd" d="M10.58 1.87a1.25 1.25 0 1 0-2.16 1.26l2.133 3.656l-4.354 7.464H2a1.25 1.25 0 1 0 0 2.5h11a1.25 1.25 0 1 0 0-2.5H9.093l3.973-6.811l.026-.044L15.58 3.13a1.25 1.25 0 1 0-2.16-1.26L12 4.305zm4.5 7.714l2.72 4.666H22a1.25 1.25 0 1 1 0 2.5h-2.74l1.82 3.12a1.25 1.25 0 1 1-2.16 1.26l-2.887-4.95a1 1 0 0 1-.06-.104l-3.053-5.232a1.25 1.25 0 1 1 2.16-1.26m-9 9.832a1.25 1.25 0 0 0-2.16-1.26l-1 1.714a1.25 1.25 0 0 0 2.16 1.26z" clip-rule="evenodd"/></svg>  <span>App Store</span>
</a>
<br />
<a href="https://www.raftou.com" target="_blank" class="flex items-center space-x-2">
 <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2m-5.15 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56M14.34 14H9.66c-.1-.66-.16-1.32-.16-2s.06-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2M12 19.96c-.83-1.2-1.5-2.53-1.91-3.96h3.82c-.41 1.43-1.08 2.76-1.91 3.96M8 8H5.08A7.92 7.92 0 0 1 9.4 4.44C8.8 5.55 8.35 6.75 8 8m-2.92 8H8c.35 1.25.8 2.45 1.4 3.56A8 8 0 0 1 5.08 16m-.82-2C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2M12 4.03c.83 1.2 1.5 2.54 1.91 3.97h-3.82c.41-1.43 1.08-2.77 1.91-3.97M18.92 8h-2.95a15.7 15.7 0 0 0-1.38-3.56c1.84.63 3.37 1.9 4.33 3.56M12 2C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"/></svg>
  <span>Landing Page</span>
</a>
<br />
<a href="https://www.instagram.com/raftou.app/" target="_blank" class="flex items-center space-x-2">
 <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"/></svg>
  <span>Instagram</span>
</a>