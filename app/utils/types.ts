export type Category = 'Dolls' | 'Tapestry' | 'Bracelets' | 'Straps';

export type SortBy = 'asc' | 'desc';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  gift: boolean;
  sold: boolean;
  stripePriceId: string;
  stripeProductId: string;
};

export interface CartItem extends Product {
  amount: number;
}

export type UploadedImageData = {
  asset_id: string;
  created_at: string;
  secure_url: string;
};

export interface UploadStatus {
  isUploading: boolean;
  isSaving: boolean;
}

export interface OrderDetails {
  fullName: string;
  email: string;
  street: string;
  postalCode: string;
  city: string;
}

export type SearchParams = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export interface Session {
  user: {
    name: string;
    email: string;
    image: string;
  };
}
