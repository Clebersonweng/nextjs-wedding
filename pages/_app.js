import Layout from '../components/layout/Layout';
import '../styles/globals.css'
import "tw-elements/dist/css/tw-elements.min.css";

function MyApp({ Component, pageProps }) {
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