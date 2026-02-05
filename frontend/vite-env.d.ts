interface ImportMetaEnv {
  readonly VITE_BACK_API: string; // not a string literal
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
