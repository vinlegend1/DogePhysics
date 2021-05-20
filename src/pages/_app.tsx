import '../styles/globals.css'
import '../styles/buttons.css'
import '../styles/slider.css'
import '../styles/toggle.css'
import '../styles/navbar.css'
import '../styles/layout.css'
import '../styles/controller.css'
import '../styles/content.css'
import '../styles/simulation.css'
import StateProvider from 'src/context/stateContext'
import MissionProvider from 'src/context/missionContext'

function MyApp({ Component, pageProps }: any) {
  return (
    <StateProvider>
      <MissionProvider>
        <Component {...pageProps} />
      </MissionProvider>
    </StateProvider>
  )
}

export default MyApp