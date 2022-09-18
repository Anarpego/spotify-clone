import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {
  Spacer,
  Text,
  Button,
  Collapse,
  Table,
  Loading,
} from '@nextui-org/react';
import { NavLink } from 'react-router-dom';
import { useSongs } from '../../hooks/useSongs';
import { useArtists } from '../../hooks/useArtists';
import { useAlbums } from '../../hooks/useAlbums';
import { Artist, SongDetail } from '../../interfaces';

export const StatsPage = () => {
  const { auth } = useContext(AuthContext);

  // * Songs reports
  const { mostReproducedSongs, isLoadingMostReproduced } = useSongs();

  // * Artists reports 
  const { mostReproducedArtists, isLoadingArtists } = useArtists();


  // * Albums Reports
  const { loadingMostReproducedAlbums, mostReproducedAlbums } = useAlbums();

  // * Reproduction time
  const [reproductionTime, setReproductionTime] = useState(0);

  // * Artist with most reproduction time
  const [mostReproducedArtist, setMostReproducedArtist] = useState<Artist>({
    artist: '',
    total: 0
  });

  // * Favorite song 
  const [favoriteSong, setFavoriteSong] = useState<SongDetail>({
    name: '',
    total: 0
  });

  useEffect(() => {
    

    // * Get Reproduction time and Get artist with most reproduction time
    if(!isLoadingArtists) {
      let sum = 0;
      mostReproducedArtists.map((item) => {
        sum += item.total;
      });

      setReproductionTime(sum);
      // ==

      setMostReproducedArtist(mostReproducedArtists[0]);

    }


  }, [isLoadingArtists]);
  

  useEffect(() => {
  
    if(!isLoadingMostReproduced) {

      setFavoriteSong(mostReproducedSongs[0]);

    }
  
  }, [isLoadingMostReproduced]);
  


  return (
    <div
      className='animate__animated animate__fadeIn float-container'
      style={{ width: '100%', padding: '50px' }}
    >
      <h1>Stats</h1>
      <hr />

      {/** Valid if the user has a subscription */}
      {auth.isSubscribed ? (
        <>
          {/** ================= Write code here ================= */}
          {/* <p>Coming soon!</p> */}
          <Collapse.Group>
            <Collapse title='Most reproduced songs'>
              {isLoadingMostReproduced ? (
                <Loading />
              ) : (
                <>
                  <Table
                    aria-label='Example table with static content'
                    css={{
                      height: 'auto',
                      minWidth: '100%',
                    }}
                  >
                    <Table.Header>
                      <Table.Column>Song</Table.Column>
                      <Table.Column>Times Played</Table.Column>
                    </Table.Header>

                    <Table.Body>
                      {mostReproducedSongs.map((item, i) => (
                        <Table.Row key={i + 1}>
                          <Table.Cell>{item.name}</Table.Cell>
                          <Table.Cell>{item.total} times</Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </>
              )}
            </Collapse>
            <Collapse title='Most reproduced artists'>
            {isLoadingArtists ? (
                <Loading />
              ) : (
                <>
                  <Table
                    aria-label='Example table with static content'
                    css={{
                      height: 'auto',
                      minWidth: '100%',
                    }}
                  >
                    <Table.Header>
                      <Table.Column>Artist</Table.Column>
                      <Table.Column>Time Played</Table.Column>
                    </Table.Header>

                    <Table.Body>
                      {mostReproducedArtists.map((item, i) => (
                        <Table.Row key={i + 1}>
                          <Table.Cell>{item.artist}</Table.Cell>
                          <Table.Cell>{item.total.toFixed(2)} seconds</Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </>
              )}
            </Collapse>
            <Collapse title='Most reproduced albums'>
            {loadingMostReproducedAlbums ? (
                <Loading />
              ) : (
                <>
                  <Table
                    aria-label='Example table with static content'
                    css={{
                      height: 'auto',
                      minWidth: '100%',
                    }}
                  >
                    <Table.Header>
                      <Table.Column>Album</Table.Column>
                      <Table.Column>Times Played</Table.Column>
                    </Table.Header>

                    <Table.Body>
                      {mostReproducedAlbums.map((item, i) => (
                        <Table.Row key={i + 1}>
                          <Table.Cell>{item.name}</Table.Cell>
                          <Table.Cell>{item.total} times</Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </>
              )}
            </Collapse>
            <Collapse title='Reproduction time'>
            {isLoadingArtists ? (
                <Loading />
              ) : (
                <>
                  <Text>{reproductionTime.toFixed(2)} seconds</Text>
                </>
              )}
            </Collapse>
            <Collapse title='Artist with most reproduction time'>
            {isLoadingArtists ? (
                <Loading />
              ) : (
                <Table
                aria-label='Example table with static content'
                css={{
                  height: 'auto',
                  minWidth: '100%',
                }}
              >
                <Table.Header>
                  <Table.Column>Artist</Table.Column>
                  <Table.Column>Time Played</Table.Column>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                      <Table.Cell>{mostReproducedArtist.artist}</Table.Cell>
                      <Table.Cell>{mostReproducedArtist.total.toFixed(2)} seconds</Table.Cell>
                    </Table.Row>

                </Table.Body>
              </Table>
              )}
            </Collapse>
            <Collapse title='Favorite Song'>
            {isLoadingMostReproduced ? (
                <Loading />
              ) : (
                <>
                  <Table
                    aria-label='Example table with static content'
                    css={{
                      height: 'auto',
                      minWidth: '100%',
                    }}
                  >
                    <Table.Header>
                      <Table.Column>Song</Table.Column>
                      <Table.Column>Times Played</Table.Column>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row >
                          <Table.Cell>{favoriteSong.name}</Table.Cell>
                          <Table.Cell>{favoriteSong.total} times</Table.Cell>
                        </Table.Row>
  
                    </Table.Body>
                  </Table>
                </>
              )}
            </Collapse>
          </Collapse.Group>
        </>
      ) : (
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <Spacer y={5} />
          <Text h3>
            You need to have a subscription to access this page. 🥺{' '}
          </Text>
          <Spacer y={4} />
          <Button className='center' color='primary'>
            <NavLink to='/account' style={{ color: 'white' }}>
              Get an account
            </NavLink>
          </Button>
        </div>
      )}
    </div>
  );
};
