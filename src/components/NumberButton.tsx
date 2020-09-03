import React, { FC } from 'react'
import classnames from 'classnames'
import { countNumberOnBoard } from '../utils'
import { useGameContext } from '../hooks/useGame'

interface Props {
	number: number
	onClick?: () => void
}

export const NumberButton: FC<Props> = ({ number, onClick }) => {
	const { board } = useGameContext()
	const hide = countNumberOnBoard(board, number) === 9
	const classNames = classnames({
		hide: hide,
		['number-button']: true,
	})
	return (
		<>
			<style jsx>{`
				.number-button {
					font-weight: bolder;
					font-size: 24px;
					line-height: 3rem;
					text-align: center;
				}
				.number-button:hover {
					border-bottom: 2px solid;
				}
				.hide {
					visibility: hidden;
				}
			`}</style>
			<div className={classNames} onClick={onClick}>
				{number}
			</div>
		</>
	)
}
