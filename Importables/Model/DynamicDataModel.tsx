export interface dynamicDataModel {
    id: number
    digitalId: number
    title: string
    issueNumber: number
    variantDescription: string
    description: any
    modified: string
    isbn: string
    upc: string
    diamondCode: string
    ean: string
    issn: string
    format: string
    pageCount: number
    textObjects: any[]
    resourceURI: string
    urls: UrlObjs[]
    series: Series
    variants: Variant[]
    collections: any[]
    collectedIssues: any[]
    dates: DateObjs[]
    prices: Price[]
    thumbnail: Thumbnail
    images: Image[]
    creators: Creators
    characters: Characters
    stories: Stories
    events: Events
  }
  
  export interface UrlObjs {
    type: string
    url: string
  }
  
  export interface Series {
    resourceURI: string
    name: string
  }
  
  export interface Variant {
    resourceURI: string
    name: string
  }
  
  export interface DateObjs {
    type: string
    date: string
  }
  
  export interface Price {
    type: string
    price: number
  }
  
  export interface Thumbnail {
    path: string
    extension: string
  }
  
  export interface Image {
    path: string
    extension: string
  }
  
  export interface Creators {
    available: number
    collectionURI: string
    items: Item[]
    returned: number
  }
  
  export interface Item {
    resourceURI: string
    name: string
    role: string
  }
  
  export interface Characters {
    available: number
    collectionURI: string
    items: any[]
    returned: number
  }
  
  export interface Stories {
    available: number
    collectionURI: string
    items: Item2[]
    returned: number
  }
  
  export interface Item2 {
    resourceURI: string
    name: string
    type: string
  }
  
  export interface Events {
    available: number
    collectionURI: string
    items: any[]
    returned: number
  }
  