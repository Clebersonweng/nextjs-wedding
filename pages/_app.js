import Layout from '../components/layout/Layout';
import '../styles/globals.css'
//import "tw-elements/dist/css/tw-elements.min.css";
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
   useEffect(() => {
      const use = async () => {
        (await import('tw-elements')).default;
      };
      use();
    }, []);
   return (
      <>
         <Layout>
            <Component {...pageProps} />
         </Layout>
      </>
   );

   return
}

export default MyApp;