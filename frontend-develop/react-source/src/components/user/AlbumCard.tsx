import React from 'react';
import { Button, Card, Col, Grid, Row, Text } from '@nextui-org/react';
import { Album, TestAlbum } from '../../interfaces';

interface Props {
	album: Album;
	handleSwitch: (album: Album) => void
}

export const AlbumCard = ({ album, handleSwitch }: Props) => {


	return (
		<>
			<Grid xs={12} sm={6} md={3} key={album.id}>

				<Card>
					<Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
						<Col>
							<Text size={12} weight='bold' transform='uppercase' color='#ffffffAA'>

							</Text>
							<Text h3 color='white'>

								{/* {album.title} */}
							</Text>
						</Col>
					</Card.Header>
					<Card.Body>
						<Card.Image
							src={album.cover_image}
							height={400}
							width='100%'
							alt='Card example background'
						/>
					</Card.Body>
					<Card.Footer
						
						css={{
							position: 'absolute',
							bgBlur: '#ffffff',
							borderTop: '$borderWeights$light solid rgba(255, 255, 255, 0.2)',
							bottom: 0,
							zIndex: 1,
						}}
					>
						<Row>
							<Col>
								<Text color='#000' weight='bold' size={12}>
									{album.artist_id}
								</Text>
								<Text color='#000' size={12}>
									{album.name}
								</Text>
							</Col>
							<Col>
								<Row justify='flex-end'>
									<Button
										flat auto rounded
										color='success'
										onPress={() => handleSwitch(album)}
									>
										<Text
											css={{ color: 'inherit' }}
											size={12}
											weight='bold'
											transform='uppercase'

										>
											Go to album
										</Text>
									</Button>
								</Row>
							</Col>
						</Row>
					</Card.Footer>
				</Card>
			</Grid>

		</>
	);
};
