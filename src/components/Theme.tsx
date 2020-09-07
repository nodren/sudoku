import Head from 'next/head'
import React, { FC, useEffect, useLayoutEffect } from 'react'
import { Header, Button } from 'semantic-ui-react'

import { useGameContext } from '../hooks/useGame'
import { Grid } from './Grid'
import { Menu } from './Menu'
import Link from 'next/link'

export const Theme: FC = ({ children }) => {
	const { dark, checkDarkMode } = useGameContext()
	useEffect(() => {
		checkDarkMode()
	}, [])

	const fullScreen = () => {
		// full screen attempt
		const nextElem = document.getElementById('__next')
		if (!document.fullscreenElement) {
			nextElem.requestFullscreen().catch((err) => {
				console.log('FAILED!', err)
			})
		} else {
			document.exitFullscreen()
		}
	}

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
					<Grid columns="1fr auto auto">
						<Link href="/">
							<a>
								<Header as="h3" inverted={dark}>
									Duelduko
								</Header>
							</a>
						</Link>
						<Menu />
						<Button icon="expand" onClick={fullScreen} size="tiny" />
					</Grid>
					<div className="page">{children}</div>
				</div>
			</div>
		</>
	)
}
