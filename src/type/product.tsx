import React from 'react'


export type ColorsOption = {
  name: string;
  code: string;
  image: string;
};

export type Product = {
  id?: number;            
  title: string;
  price: number;
  image: string;
  description?: string;
  colors?: ColorsOption[];
};
