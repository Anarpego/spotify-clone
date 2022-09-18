
import { Button, Card, Col, Grid, Row, Text } from '@nextui-org/react';
import { TestPlaylist } from '../../interfaces';


interface Props {
	playlist: TestPlaylist;
	handleSelect: () => void;
}


export const PlaylistCard = ({ playlist }: Props) => {
	return (
		<>
			<Grid xs={12} sm={6} md={3} key={playlist.id}>

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
							src={(playlist.playlistCover === '') ? 'https://i.pinimg.com/originals/f8/65/d3/f865d3112022612c6875b4ab7ec54239.jpg' : playlist.playlistCover}
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
								<Text color='#000' size={12}>
									{playlist.name}
								</Text>
								<Text color='#000' size={12}>
									{/* {playlist.songs ? playlist.songs?.length : 'No songs'} */}
								</Text>
							</Col>
							<Col>
								<Row justify='flex-end'>
									<Button
										flat auto rounded
										color='success'
									// onPress={handleSelect}
									>
										<Text
											css={{ color: 'inherit' }}
											size={12}
											weight='bold'
											transform='uppercase'

										>
											Play
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
