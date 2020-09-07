import React, { FC } from 'react'
import { Label, Table } from 'semantic-ui-react'

import { useGameContext } from '../hooks/useGame'
import { getSocket } from '../socket'
import { processScores } from '../utils'

const socket = getSocket()

export const Scores: FC = () => {
	const { dark, scores } = useGameContext()

	return (
		<Table celled unstackable inverted={dark}>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Scores</Table.HeaderCell>
					<Table.HeaderCell />
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{processScores(scores).map((score) => (
					<Table.Row key={`scoreRow_${score.id}`}>
						<Table.Cell>
							<Label
								ribbon
								color={`${score.id === socket.id ? 'blue' : 'orange'}` as any}
							>
								{score.id === socket.id ? 'You' : 'Opponent'}
							</Label>
						</Table.Cell>
						<Table.Cell>{score.score.toLocaleString()}</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	)
}
