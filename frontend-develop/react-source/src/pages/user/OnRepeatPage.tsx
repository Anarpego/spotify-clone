import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Button, Loading, Spacer, Text } from '@nextui-org/react';
import { AuthContext } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { useSongs } from '../../hooks/useSongs';
import { Song } from '../../interfaces';
import { SongTable } from '../../components/user/SongTable';
import { BottomNavbar } from '../../components/ui/BottomNavbar';

const playlist: Song[] = [

];

export const OnRepeatPage = () => {

	const { auth } = useContext(AuthContext);
	const { onRepeatSongs, isLoadingOnRepeatSongs } = useSongs();
	const [externalPlay, setExternalPlay] = useState(false);
	const [isAlbumSelected, setIsAlbumSelected] = useState(false);

	const handleSelect = () => {
		//console.log('funcion');
		setIsAlbumSelected(!isAlbumSelected);
		//setIsAlbumSelected(album);

	};

	useEffect(() => {

		if (!isLoadingOnRepeatSongs) {
			console.log(onRepeatSongs);

			onRepeatSongs.map((song) => {
				playlist.push({
					dbId: song.id,
					trackTitle: song.name,
					coverImage: song.cover_image,
					streamUrl: song.file,
				});
			});
		}

	}, [isLoadingOnRepeatSongs]);


	return (
		<div className='animate__animated animate__fadeIn float-container' style={{ width: '100%', padding: '50px' }}>
			<h1>OnRepeat</h1>
			<hr />
			{/** Valid if the user has a subscription */}
			{
				auth.isSubscribed ?
					(
						<>
							{
								isLoadingOnRepeatSongs ?
									(
										<>
											<h3>Loading </h3><Loading type='points' />
										</>

									)
									:
									(
										<>
											<SongTable songs={onRepeatSongs} handleSwitch={handleSelect} isAlbum={false} setExternalPlay={function (): void { return; }} />
											<BottomNavbar
												playlist={playlist}
												playing={externalPlay}
												setExternalPlay={setExternalPlay} />
										</>

									)
							}
						</>
					)
					:
					(


						<div style={{
							textAlign: 'center'
						}}>
							<Spacer y={5} />
							<Text h3>You need to have a subscription to access this page. 🥺 </Text>
							<Spacer y={4} />
							<Button className='center' color="primary">
								<NavLink to="/account" style={{ color: 'white' }}>Get an account</NavLink>
							</Button>

						</div>

					)
			}
		</div>
	);
};
