import React, { Component, useContext } from 'react';
import { Song } from '../../interfaces';
import { Timer } from 'react-soundplayer/components';
import { Button, Avatar, Text } from '@nextui-org/react';
import { withCustomAudio } from 'react-soundplayer/addons';
import { saveSongToHistory } from '../../util/localSongs';
import { AuthContext } from '../../context/AuthContext';
import { addSongToHistory } from '../../helpers/saveSongs';

interface PlayerProps {
    playlist: Song[];
    playing: boolean;
    setExternalPlay: (flag: boolean) => void
}

type PlayerState = {
    index: number
}

const Player = withCustomAudio((props: any) => {


    const { trackTitle, soundCloudAudio, nextSong, previousSong, duration, currentTime, coverImage, playing2, setExternalPlay } = props;
    const { playing } = props;

    if (playing2) {
        soundCloudAudio.play();
    }

    const play = () => {
        if (playing2) {
            setExternalPlay(false);
        }

        if (playing) {
            soundCloudAudio.pause();
        } else {
            soundCloudAudio.play();
        }
        return;
    };



    return (
        <>
            <div style={{ padding: '15px' }}>
                <div style={{ float: 'left' }}>
                    <Avatar
                        squared
                        src={coverImage}
                        data-testid="album-cover"
                        css={{ size: '120px' }}
                    />
                </div>
                <div style={{ float: 'left', padding: '10px' }}>
                    <Text
                        h2
                        size={20}
                        weight='bold'
                        css={{ paddingLeft: '7px' }}
                    >
                        {trackTitle}
                    </Text>

                    <div style={{ paddingLeft: '8px' }}>
                        <Timer duration={duration} currentTime={currentTime} />
                    </div>
                    <Button.Group color='success' bordered size='md'>
                        <Button id="prevbtn" className='btn-prev' data-testid='test-prev'  onPress={() => previousSong()}
                            icon={<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAwUlEQVRIS2NkoDFgpLH5DKMWEAzhYR5E4idT/oPC4KX5HAyfCpxPEGD7xTz/lfncQHzhhDeIcFkgcjrFgfnv//kMjIwK2CxHtpBkC8ROpjQANdXDDKGaBQLHExTYmFjWAw03QHYhVSz4x/gvkfE/Yz8jA6MAenhT0QKmCUDX89PEApArIUHEvAHoC32qBxFyMNAskpFdDU2mC4DJVJ4qcYAzo/1kWfDKYk4A2RmNYElGhIJhXtgREQIElYwGEcEgAgAuBFYZfOT4ZAAAAABJRU5ErkJggg==" />}
                        >

                        </Button>
                        <Button id="playbtn" className='btn-play' data-testid='test-play'  onPress={() => play()}
                            icon={playing ? <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAS0lEQVRIS2NkoDFgpLH5DKMWEAzhERBE4idT/sPC4aX5HLCPsYnhCiuCQTRqwWgQMcBS1mgqAocATTIawdKMgAKCyXTUgtEgIpgGAO7ZUBkC+FoiAAAAAElFTkSuQmCC" /> :
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAkUlEQVRIS2NkoDFgpLH5DKMWEAzhgQ0i8ZMpm/8zMxW8Mpl1l6BTcSjA6wOgBf+B+n7++/+/+7UwVwuD6uSfpFpEjAVgM4E23f3HwFjwxnz2FlIsIdoCJEO3kBJs5FgAsovoYCPXAqKDbdBaQNMgok0k0zKZEh0c2PIHoUimbVFBSo7FpXZgS9NRH4BCgOZxAAAP7WIZ+qn+5QAAAABJRU5ErkJggg==" />
                            }
                        >
                        </Button>
                        <Button id="nextbtn" className='btn-next' data-testid='test-next' onPress={() => nextSong()}
                            icon={<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAu0lEQVRIS2NkoDFgpLH5DKMWEAzhYR5E4ieSl//jZU99rT3tC3pYiJ9M+Q8Se2k+B28o4JUEG/L//8M/TEyhb81mn0a2hHoWAE39////XwZGxuZXZh9bGBhX/wVZRFULkFx++ifr/9APRnMf0soCoG8YvjAwMcQz/mdYS504wEjp/78ChQoYGBhn08IC2gQRNJJbgJHcTP1IpmUyFTuRvPY/L3s8zTIawZKMCAXDvLAjIgQIKhkNIoJBBADqsHQZxYj6bwAAAABJRU5ErkJggg==" />}
                        >
                        </Button>
                    </Button.Group>
                </div>
            </div>
        </>
    );
});

class SoundPlayer extends Component<PlayerProps, PlayerState>{

   static contextType = AuthContext;
   
    state: PlayerState = {
        index: 0,
    };

    nextSong = () => {
        const { playlist } = this.props;
        const { index } = this.state;

        const userContext: any = this.context;

        // console.log(userContext.auth.uid);


        // console.log('add');
        // * Add song to history
        //console.log(playlist[index]);
        if(playlist[index] !== null) {
            //console.log(playlist[index]);

            // SAVE SONG TO HISTORY DB
            //console.log(userContext.auth.uid, playlist[index].dbId!);
            addSongToHistory(userContext.auth.uid, playlist[index].dbId!);

            // SAVE SONG TO LOCALSTORAGE
            saveSongToHistory(playlist[index]);
        }

        
        if (index >= playlist.length - 1) {
            this.setState({ index: 0 });
        } else {
            this.setState({ index: index + 1 });
        }
    };

    previousSong = () => {

        const { playlist } = this.props;
        const { index } = this.state;

        if (index <= 0) {
            this.setState({ index: playlist.length - 1 });
        } else {
            this.setState({ index: index - 1 });
        }
    };

    render() {
        const { streamUrl, trackTitle, coverImage } = this.props.playlist[this.state.index] ? this.props.playlist[this.state.index] : { streamUrl: '', trackTitle: '-', coverImage: '' };
        const { playing, setExternalPlay } = this.props;

        return (
            <div>
                <Player streamUrl={streamUrl} trackTitle={trackTitle} coverImage={coverImage} preloadType="metadata" nextSong={this.nextSong} previousSong={this.previousSong} playing2={playing} setExternalPlay={setExternalPlay} />
            </div>
        );
    }
}

export default SoundPlayer;