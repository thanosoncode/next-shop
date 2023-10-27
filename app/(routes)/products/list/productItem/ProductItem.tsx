import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { Product } from '@/app/utils/types';
import AddToCartButton from '../addToCartButton/AddToCartButton';

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div>
      <Link
        href={`/products/${product.id}`}
        className='w-full  h-56 sm:h-64 relative block'
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className='object-cover rounded-xl '
        />
      </Link>
      <div>
        <div className='px-1 mb-1'>
          <div className='flex items-center justify-between gap-2'>
            <p className='overflow-hidden whitespace-nowrap text-ellipsis'>
              {product.name}
            </p>
            <p className='whitespace-nowrap'>€ {product.price}</p>
          </div>
        </div>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
};

export default ProductItem;