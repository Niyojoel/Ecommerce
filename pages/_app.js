import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Layout } from '../components';
import '../styles/globals.css';
import { ProductProvider } from '@/context/productContext';

function MyApp({ Component, pageProps }) {
  return (
    <ProductProvider>
      <Layout>
        <Toaster/>
        <Component {...pageProps} />
      </Layout>
    </ProductProvider>
  )
    }

export default MyApp