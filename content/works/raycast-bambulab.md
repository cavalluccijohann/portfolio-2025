---
title: Raycast x Bambulab
description: A powerful Raycast extension to monitor and control Bambu Lab 3D printers.
url: https://www.raycast.com/johancvl/bambu-lab
date: 2026-02-01
year: 2026
image: /assets/works/raycast/bambulab-control.webp
minRead: 5
roles:
  - Full Stack
technologies:
  - React
  - Typescript
  - Raycast API
  - MQTT & FTP
teamName: Author
authors:
  - name: Johann Cavallucci
    to: https://x.com/JohannCVL
    target: _blank
    avatar:
      src: https://avatars.githubusercontent.com/u/72015679?v=4
      alt: Johann Cavallucci
---

# Raycast Extension for Bambulab 3D Printers

## Overview
This is my first Raycast extension, designed to enhance the user experience for Bambulab 3D printer owners.
It facilitates access to essential information by combining the speed and convenience of Raycast with features specific to Bambulab printers.

I built this tool primarily to streamline my own daily usage. As a heavy Raycast user, I wanted to check temperatures, manage files, or emergency stop a print without leaving my keyboard. This extension bridges the gap between the printer's hardware and the developer's desktop environment.

---

## Features
- **Real-time Dashboard**: Instantly view nozzle/bed temperatures, print progress, and remaining time.
- **Smart File Management**: Browse the printer's SD card via FTP, prioritizing `.3mf` projects over raw G-code.
- **Direct Upload**: Send files from the Mac to the printer with a single keystroke.
- **Remote Control**: Pause, Resume, or Emergency Stop the printer. Toggle the chamber light.
- **AMS Integration**: Monitor filament slots, colors, and material types in the Automatic Material System.

![image](/assets/works/raycast/bambulab-print.webp)

## ️ Technologies Used

| Technology      | Role |
|-----------------|------|
| **React** | Built the UI components (Lists, Action Panels, Forms) and managed local state. |
| **TypeScript** | Ensured type safety for MQTT payloads and FTP file structures. |
| **Raycast API** | Leveraged native hooks for navigation, toasts, and OS integration. |
| **MQTT & FTP** | Handled real-time communication (IoT protocol) and file transfer with the hardware. |

---

## Challenges

- **Learning the Raycast API** – As this was my first Raycast extension, I had to familiarize myself with the API and its capabilities.
- **Reverse Engineering**: Understanding the Bambu Lab LAN protocol (MQTT) to interpret raw JSON payloads for status and AMS data.

---

## Conclusion
This project was a fantastic introduction to the Raycast ecosystem. It not only improved my personal 3D printing workflow but also taught me a lot about IoT communication within a desktop app context.

I'm already planning future updates and looking forward to building more extensions!

---

### More than 45 people have installed this extension.

---

<a href="https://www.raycast.com/johancvl/bambu-lab" target="_blank" class="flex items-center space-x-2">
  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M6.004 15.492v2.504L0 11.992l1.258-1.249Zm2.504 2.504H6.004L12.008 24l1.253-1.253zm14.24-4.747L24 11.997L12.003 0L10.75 1.251L15.491 6h-2.865L9.317 2.692L8.065 3.944l2.06 2.06H8.691v9.31H18v-1.432l2.06 2.06l1.252-1.252L18 11.37V8.506ZM6.63 5.372L5.38 6.625l1.342 1.343l1.251-1.253Zm10.655 10.655l-1.247 1.251l1.342 1.343l1.253-1.251zM3.944 8.059L2.692 9.31l3.312 3.314v-2.506zm9.936 9.937h-2.504l3.314 3.312l1.25-1.252z"/></svg>
  <span>Store Raycast</span>
</a>

<br />

<a href="https://github.com/raycast/extensions/tree/3ef12fe31effee1dda69c4019b29bd9816eee17d/extensions/bambu-lab/" target="_blank" class="flex items-center space-x-2">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/>
  </svg>
  <span>Bambulab extension on Github</span>
</a>