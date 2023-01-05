import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ComicContext from '../Importables/ComicContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ComicContext>
      <Component {...pageProps} />
    </ComicContext>
  )
}
