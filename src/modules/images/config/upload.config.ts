export const configByType = {
  main: {
    maxCount: 1,
    maxSizeMB: 5,
    minWidth: 1280,
    minHeight: 960,
    maxWidth: 2000,
    maxHeight: 1800,
  },
  gallery: {
    maxCount: 10,
    maxSizeMB: 3,
    minWidth: 800,
    minHeight: 600,
    maxWidth: 2000,
    maxHeight: 1500,
  },
} as const;

export type UploadType = keyof typeof configByType; 