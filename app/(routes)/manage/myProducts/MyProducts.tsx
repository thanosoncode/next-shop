'use client';

import { Product } from '@prisma/client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AdminState } from '../store/adminStore';
import { setIsDeleting } from '../store/adminSlice';

const MyProducts: React.FC = () => {
  const dispatch = useDispatch();
  const { isDeleting, newProduct } = useSelector(
    (state: AdminState) => state.admin
  );
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = (await response.json()) as Product[];
      setProducts(data);
    } catch (error) {
      throw new Error('error fetching products');
    }
  };
  useEffect(() => {
    getProducts();
  }, [newProduct]);

  const handleProductDelete = async (id: string) => {
    dispatch(setIsDeleting(true));
    try {
      const response = await fetch(`/api/manage/${id}`, {
        method: 'DELETE',
      });
      const data = (await response.json()) as { product: Product };
      if (data.product.id) {
        setProducts(
          products.filter((product) => product.id !== data.product.id)
        );
      }
      dispatch(setIsDeleting(false));
    } catch (error) {
      dispatch(setIsDeleting(false));
      throw new Error('error deleting product');
    }
  };
  return (
    <div className='xl:max-w-[1140px] mx-auto w-full md:px-8 px-2 mt-8 mb-20'>
      <table className='w-full border'>
        <thead className='uppercase'>
          <tr className='border-b'>
            <th className='text-center'></th>
            <th className='text-center'>Name</th>
            <th className='text-center'>Category</th>
            <th className='text-center'>Description</th>
            <th className='text-center'>Price</th>
            <th className='text-center'>Delete</th>
          </tr>
        </thead>
        <tbody className=''>
          {products.length > 0
            ? products.map((product) => (
                <tr key={product.id} className='border-b border-neutral-300'>
                  <td className=' p-2 '>
                    <div className='flex justify-center items-center p-2 w-12 h-12 relative'>
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className='object-contain'
                      />
                    </div>
                  </td>
                  <td className='p-2 text-center'>{product.name}</td>
                  <td className='p-2 text-center'>{product.category}</td>
                  <td className='p-2 text-center'>{product.description}</td>
                  <td className='p-2 text-center'>{product.price}</td>
                  <td className='p-2 text-center'>
                    <button
                      className='rounded bg-red-400 py-1 px-3 text-white hover:bg-red-200'
                      onClick={() => handleProductDelete(product.id)}
                      disabled={isDeleting}
                    >
                      delete product
                    </button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};
export default MyProducts;
