export interface Catalog {
  id: number;
  name: string;
  pic_name: string;
  items: CatalogItemObject[]
}

export interface CatalogItemObject {
  id: number;
  name: string;
  pic_name: string;
  price: number;
  special?: boolean
}
