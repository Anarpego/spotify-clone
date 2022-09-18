
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Artist } from '../interfaces';

export const useArtists = () => {
  
    
    // * Most reproduced artists 
    const [mostReproducedArtists, setMostReproducedArtists] = useState<Artist[]>([]);
    const [isLoadingArtists, setIsLoadingArtists] = useState(true);


    // * Get most Reproduced artists
    const getMostReproducedArtists = async () => {


		await axios.get(`${process.env.REACT_APP_STREAMING_SERVICE}/song/reporteartistas`)
			.then((response) => {


				if(response.data.status) {
                    //console.log(response.data.reporte[0]);
                    setMostReproducedArtists(response.data.reporte[0]);
                    setIsLoadingArtists(false);
				}
				
			})
			.catch((err) => {
				console.log(err);
				setIsLoadingArtists(true);
			});
        
    };


    // // * reporteArtistasConMasMinutosDeReproduccion
    // const getMostArtistMostMinutedPlayed  = async () => {



    // } 


    useEffect(() => {
      
        getMostReproducedArtists();
    
    }, [isLoadingArtists]);


    return {
        isLoadingArtists,
        mostReproducedArtists
    };
};
