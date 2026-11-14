// Native SVG data, kept independent of the legacy markup renderer and application state.
export const iconPaths = {
  pencil: ["m16 3 5 5-12 12-6 1 1-6L16 3Z", "m14 5 5 5"],
  undo: ["M3 9h10a6 6 0 0 1 0 12h-3", "m3 9 5-5M3 9l5 5"],
  trash: ["M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7"],
  sidebar: ["M3 3h18v18H3Z", "M9 3v18"],
  board: ["M3 3h18v18H3Z", "M9 3v18M15 3v18"],
  mic: [
    "M9 3a3 3 0 0 1 6 0v8a3 3 0 0 1-6 0V3Z",
    "M5 10v2a7 7 0 0 0 14 0v-2M12 19v4m-4 0h8",
  ],
  bell: ["M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9", "M10 21h4"],
  bellOff: [
    "m3 3 18 18",
    "M6 6a6 6 0 0 0 0 2c0 7-3 7-3 9h14",
    "M18 8a6 6 0 0 0-8-5",
    "M10 21h4",
  ],
  smile: [
    "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0",
    "M8 9h.01M16 9h.01M7 14a5 5 0 0 0 10 0",
  ],
  expand: ["M8 3H3v5M16 3h5v5M21 16v5h-5M3 16v5h5"],
  external: [
    "M15 3h6v6M10 14 21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5",
  ],
  arrowRight: ["M5 12h14m-6-6 6 6-6 6"],
  chart: ["M4 3v18h17M8 17v-5m5 5V7m5 10V4"],
  trophy: [
    "M8 3h8v6a4 4 0 0 1-8 0V3ZM8 5H4v2a4 4 0 0 0 4 4m8-6h4v2a4 4 0 0 1-4 4M12 13v7m-4 1h8",
  ],
  copy: ["M9 9h12v12H9z", "M5 15H3V3h12v2"],
  link: ["m10 13 4-4", "M8 16H6a4 4 0 0 1 0-8h4M14 8h4a4 4 0 0 1 0 8h-4"],
  reply: ["m9 10-5 5 5 5", "M4 15h10a6 6 0 0 0 0-12"],
  folder: [
    "M3 7V5a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z",
  ],
  file: [
    "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z",
    "M14 2v6h6",
  ],
  pin: ["m16 3 5 5-4 1-3 5-4-4 5-3Z", "m10 14-7 7"],
  close: ["M18 6 6 18M6 6l12 12"],
  check: ["m20 6-11 11-5-5"],
  chevronDown: ["m6 9 6 6 6-6"],
  chevronRight: ["m9 6 6 6-6 6"],
  search: ["M21 21l-4.35-4.35", "M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0"],
  plus: ["M12 5v14M5 12h14"],
  grip: ["M9 5h.01M9 12h.01M9 19h.01M15 5h.01M15 12h.01M15 19h.01"],
  calendar: [
    "M8 2v4M16 2v4M3 10h18",
    "M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2",
  ],
  inbox: [
    "M22 12h-6l-2 3h-4l-2-3H2",
    "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11",
  ],
  warning: [
    "m10.3 3.9-8.5 14.2A2 2 0 0 0 3.5 21h17a2 2 0 0 0 1.7-2.9L13.7 3.9a2 2 0 0 0-3.4 0",
    "M12 9v4M12 17h.01",
  ],
  sun: [
    "M12 3V1M12 23v-2M3 12H1M23 12h-2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4",
    "M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0",
  ],
  moon: ["M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13"],
} as const;
export type IconName = keyof typeof iconPaths;
