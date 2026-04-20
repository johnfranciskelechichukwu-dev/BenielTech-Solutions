import React from 'react';

// Base properties for all sellable items
interface BaseItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  imageGallery: string[];
  description: string;
  category: string;
  brand?: string;
  tags?: string[];
}

export interface ProductItem extends BaseItem {
  type: 'product';
  specs: { [key: string]: string };
  inStock: boolean;
}

export interface ServicePackage {
  name: string;
  price: number;
  duration: string;
  features: string[];
}

export interface ServiceItem extends BaseItem {
  type: 'service';
  basePrice: number; // Renaming price to basePrice for clarity
  packages: ServicePackage[];
  scope: string[];
  addOns?: { name: string; price: number }[];
}

export type Item = ProductItem | ServiceItem;

// Keeping old Product type for compatibility with ComparisonContext
export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  imageUrl: string;
  specs: {
    [key: string]: string;
  };
}

export interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  quote: string;
  avatarUrl: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  link:string;
}
