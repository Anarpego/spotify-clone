import './styles.css';
import SoundPlayer from './SoundPlayer';
import { Song } from '../../interfaces';

interface BottomNavbarProps {
    playlist: Song[];
    playing: boolean;
    setExternalPlay: (flag:boolean) => void;
}

export const BottomNavbar = (props : BottomNavbarProps) => {

    return (
        <div className='bottom-navbar' style={{marginLeft: '-20px'}}>
            <SoundPlayer playlist={props.playlist} playing={props.playing} setExternalPlay={props.setExternalPlay}/>
        </div>
    );
};
