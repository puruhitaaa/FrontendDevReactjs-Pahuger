/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly RAPIDAPI_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}