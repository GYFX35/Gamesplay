/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_URL: string
  readonly VITE_API_URL: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}
