import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { Web3ContextProvider } from '@/context/web3Context';
import { StyledEngineProvider } from '@mui/material';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossOrigin="anonymous" />
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossOrigin="anonymous"></script>
    <StyledEngineProvider injectFirst>
      <Web3ContextProvider>
        <Component {...pageProps} />
      </Web3ContextProvider>
    </StyledEngineProvider>
    </>
  );
}

export default MyApp;
