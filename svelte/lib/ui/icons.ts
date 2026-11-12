// Native SVG data, kept independent of the legacy markup renderer and application state.
export const iconPaths = {
  close: ["M18 6 6 18M6 6l12 12"],
  check: ["m20 6-11 11-5-5"],
  chevronDown: ["m6 9 6 6 6-6"],
  chevronRight: ["m9 6 6 6-6 6"],
  search: ["M21 21l-4.35-4.35", "M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0"],
  plus: ["M12 5v14M5 12h14"],
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
