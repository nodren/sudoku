import Head from 'next/head'
import React, { FC } from 'react'
import { Header } from 'semantic-ui-react'

import { useGameContext } from '../hooks/useGame'
import { Grid } from './Grid'
import { Menu } from './Menu'
import Link from 'next/link'

export const Theme: FC = ({ children }) => {
	const { dark } = useGameContext()

	return (
		<>
			<style jsx>{`
				.container {
					display: grid;
					margin: auto;
					padding-top: 2rem;
					width: 95%;
				}
				.page {
					margin-top: 1rem;
					display: grid;
				}
			`}</style>
			<Head>
				<title>Duelduko</title>
			</Head>

			<div className={`wrapper ${dark ? 'dark' : ''}`}>
				<div className="container">
					<Grid columns="1fr auto">
						<Link href="/">
							<Header as="h3" inverted={dark}>
								Duelduko
							</Header>
						</Link>
						<Menu />
					</Grid>
					<div className="page">{children}</div>
				</div>
			</div>
		</>
	)
}
