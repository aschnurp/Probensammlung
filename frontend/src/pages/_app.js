import '../styles/globals.css'; // Import global styles including custom fonts
import RootLayout from '../components/RootLayout';

function MyApp({ Component, pageProps }) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default MyApp;