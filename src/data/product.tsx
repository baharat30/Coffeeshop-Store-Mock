
export interface Product {
  category: any;
  id: number;
  title: string;
  description?: string;
  price: number;
  image: string;
  colors?: ColorsOption[];
  colorKey?: string;
  selectedImage?: string;
  quantity?: number; 
  product_name?: string;
}

export type ColorsOption = {
  name: string;
  code: string;
  image: string;
};

