import '../styles/dark.css'
import 'semantic-ui-css/semantic.min.css'

import { Theme } from '../components/Theme'
import { GameProvider } from '../hooks/useGame'

function MyApp({ Component, pageProps }) {
	return (
		<GameProvider>
			<Theme>
				<Component {...pageProps} />
			</Theme>
		</GameProvider>
	)
}

export default MyApp
