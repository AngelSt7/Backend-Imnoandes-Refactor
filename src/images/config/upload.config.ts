export const configByType = {
  main: {
    maxCount: 1,
    maxSizeMB: 5,
    minWidth: 1200,
    minHeight: 600,
    maxWidth: 1600,
    maxHeight: 800,
  },
  gallery: {
    maxCount: 10,
    maxSizeMB: 3,
    minWidth: 800,
    minHeight: 600,
    maxWidth: 1600,
    maxHeight: 1200,
  },
} as const;

export type UploadType = keyof typeof configByType; 