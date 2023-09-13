declare module 'strapi-preview-link/types' {
  export interface IContentType {
    api: string;
    preview?: {
      url: string;
      params: Record<string, string>;
    }
    live?: {
      url: string;
      params: Record<string, string>;
    }
  }
  
  export interface IPreviewLinkConfig {
    token: string;
    contentTypes: Array<IContentType>
  }



}