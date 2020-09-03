import React, { FC } from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'

import { useGameContext } from '../hooks/useGame'

export const Menu: FC = () => {
	const { showSettings, setShowSettings, dark, setDark } = useGameContext()

	return (
		<Modal
			className={dark ? 'dark' : ''}
			closeIcon
			open={showSettings}
			onOpen={() => setShowSettings(true)}
			onClose={() => setShowSettings(false)}
			trigger={<Button icon="settings" size="tiny" />}
		>
			<Modal.Header>Settings</Modal.Header>
			<Modal.Content>
				<Form>
					<Form.Field>
						<Form.Checkbox
							className={dark ? 'dark' : ''}
							label="Dark Mode"
							toggle
							checked={dark}
							onChange={() => setDark(!dark)}
						/>
					</Form.Field>
				</Form>
			</Modal.Content>
		</Modal>
	)
}
