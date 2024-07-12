/// <reference types="astro/client" />
interface ImportMetaEnv {
    readonly PUBLIC_API_ENDPOINT: string;
    readonly PUBLIC_STORAGE_URL:string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }