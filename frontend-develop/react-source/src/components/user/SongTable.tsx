import { Button, Table } from '@nextui-org/react';
import { useSongs } from '../../hooks/useSongs';
import { Song, SongDB } from '../../interfaces';

interface Props {
	songs: SongDB[];
	handleSwitch: () => void;
	isAlbum: boolean;
	albumName?: string;
	setExternalPlay: (playlist: Song[]) => void;
}

export const SongTable = ({ songs, handleSwitch, isAlbum = true, albumName = '', setExternalPlay }: Props) => {

	const { likeSong } = useSongs();


	const handleLikeSong = (song: SongDB) => {
		//console.log(song);
		likeSong(song.id);

	};

	return (
		<div className='animate__animated animate__fadeIn'>
			{
				isAlbum && (
					<>
						<h1 style={{ margin: '20px' }}>{albumName}</h1>
						<Button
							color='default'
							onPress={handleSwitch}
							style={{ margin: '20px' }}> Go back </Button>
						<hr style={{ margin: '20px' }} />
					</>
				)
			}

			{
				// * SONGS TABLE
			}
			<Table
				aria-label='Example static collection table'
				css={{
					height: 'auto',
					minWidth: '100%',
				}}
				selectionMode='single'
			>
				<Table.Header>
					<Table.Column>Song</Table.Column>
					<Table.Column>Title</Table.Column>
					<Table.Column> </Table.Column>
					<Table.Column> </Table.Column>
					<Table.Column> </Table.Column>
				</Table.Header>
				<Table.Body>
					{
						songs.map((song, i) => (
							<Table.Row key={i + 1}>
								<Table.Cell css={{ width: '10%' }}>
									{i + 1}
								</Table.Cell>
								<Table.Cell css={{ width: '80%' }}>
									{song.name}
								</Table.Cell>

								{song.count? 
									<Table.Cell>
										{`Count: ${song.count}`} 
									</Table.Cell>
								: 
									<Table.Cell>
										
									</Table.Cell>}

								<Table.Cell>
									
									{/** 
									 * TODO: SET SONG INFO
									 * 
									 */}

									<Button color="success" size="xs" onPress={() => {
										setExternalPlay([{
											streamUrl: song.file,
											trackTitle: song.name,
											coverImage: song.cover_image
										}]);
									}}>
										Play
									</Button>

								</Table.Cell>
								<Table.Cell>
									<Button
										color="primary"
										onPress={() => handleLikeSong(song)}
										test-id="btn-like"
										className={`likeSong-${i+1}`}
										auto light >
										💚
									</Button>
								</Table.Cell>
							</Table.Row>
						))
					}
				</Table.Body>
			</Table>

		</div>
	);
};
