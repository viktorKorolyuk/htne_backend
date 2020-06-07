namespace EchoAR{
  export interface IMAGE_TARGET {
    url_image?:string,
    file_image?:string
  }

  export interface GEOLOCATION_TARGET {
    text_geolocation?:string,
    longitude?:string,
    latitude?:string
  }

  export interface BRICK_TARGET {

  }
  
  export interface VIDEO_HOLOGRAM {
    url_video?:string,
    file_video?:string
  }

  export interface MODEL_HOLOGRAM {
    type?:string
  }
}
