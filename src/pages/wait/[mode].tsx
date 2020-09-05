import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Header, Loader, Popup } from 'semantic-ui-react'
import copy from 'copy-to-clipboard'
import { useRouter } from 'next/router'

import { useGameContext } from '../../hooks/useGame'
import useSocket from '../../hooks/useSocket'

export default function Home() {
	const { dark, setUuid, uuid } = useGameContext()
	const [loading, setLoading] = useState(true)
	const [showPopup, setShowPopup] = useState(false)

	const router = useRouter()

	const socket = useSocket('joined', (data) => {
		router.push(`/play/${router.query.mode}/${uuid}`)
	})

	useEffect(() => {
		;(async () => {
			if (uuid) {
				return
			}
			const id = await axios.get(`/api/uuid`)
			setUuid(id.data.id)
			setLoading(false)
			console.log('START', id.data.id)
			socket.emit('start', id.data.id)
		})()
	}, [uuid])

	const onCopy = () => {
		copy(`${document.location.protocol}//${document.location.host}/join/${uuid}`)
		setShowPopup(true)
		setTimeout(() => {
			setShowPopup(false)
		}, 2500)
	}

	if (loading) {
		return <Loader />
	}

	return (
		<>
			<style jsx>{`
				.start {
					text-align: center;
				}
			`}</style>
			<div className="start">
				<Header as="h2" inverted={dark}>
					Waiting room
				</Header>
				<p>Waiting for opponent, click button to copy URL and share with your opponent</p>
				<Popup
					trigger={
						<Button
							onClick={onCopy}
						>{`${document.location.protocol}//${document.location.host}/join/${uuid}`}</Button>
					}
					content="Copied!"
					on="click"
					onOpen={onCopy}
					open={showPopup}
					position="bottom center"
				/>
			</div>
		</>
	)
}
