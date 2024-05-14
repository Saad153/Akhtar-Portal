import MainLayout from '@/Components/Shared/MainLayout';
import Router, { useRouter } from 'next/router';
import { Provider } from "react-redux"
import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import "aos/dist/aos.css";
import store, { persistor } from '@/redux/store';
import { PersistGate } from "redux-persist/integration/react";

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {

  const router = useRouter();

  return (
    <div className={`${inter.className}`}>
      {
        (router.pathname == "/login" || router.pathname == "/") && <Component {...pageProps} />
      }
      {
        router.pathname !== "/login" &&
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </PersistGate>
        </Provider>
      }
    </div>
  )
}
