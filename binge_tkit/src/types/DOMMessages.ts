export enum ListenerMessage {
  GetIframeUrl
}

export type IFrameUrlResponse = {
  urls: string[]
}