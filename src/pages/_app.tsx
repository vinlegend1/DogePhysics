import '../styles/globals.css'
import '../styles/buttons.css'
import '../styles/slider.css'
import '../styles/toggle.css'
import '../styles/navbar.css'
import '../styles/layout.css'
import '../styles/controller.css'
import '../styles/content.css'
import StateProvider from 'src/context/stateContext'

function MyApp({ Component, pageProps }: any) {
  return (
    <StateProvider>
      <Component {...pageProps} />
    </StateProvider>
  )
}

export default MyApp