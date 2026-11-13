// Static browser-safe limits only. Validation, authorization, normalization and storage remain in their existing owners.
export const AUDIO_TYPES = ["audio/mp4", "audio/x-m4a", "audio/m4a", "audio/mpeg", "audio/mp3", "audio/wav", "audio/x-wav", "audio/wave", "audio/aac", "audio/x-aac", "audio/ogg", "audio/webm", "audio/flac", "audio/x-flac"];
export const FILE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif", "application/pdf", "text/html", "text/markdown", "text/plain", "text/csv", ...AUDIO_TYPES];
export const MAX_FILE_BYTES = 10 * 1024 * 1024;
export const MAX_AUDIO_BYTES = 50 * 1024 * 1024;
export const maxBytes = (type: string) => (type.startsWith("audio/") ? MAX_AUDIO_BYTES : MAX_FILE_BYTES);
export const MESSAGE_TEXT_LIMIT = 4000;
export const MESSAGE_FILE_LIMIT = 10;
export const POLL_QUESTION_LIMIT = 300;
export const POLL_OPTION_LIMIT = 200;
export const POLL_MIN_OPTIONS = 2;
export const POLL_MAX_OPTIONS = 10;
