import { useState, useEffect } from 'react';
import axios from 'axios';
import { SongDB } from '../interfaces';
import { Card } from '../interfaces';



export const useCard = () => {

    // * All songs

    const [card, setCard] = useState<Card>({

        id: 0,
        number: 'hola ',
        last_number: '',
        cvv: '',
        exp_date: '',
        balance: 0
    });

    const [isLoadingCard, setIsLoadingCard] = useState(true);
    //const [isLoadingRadioSongs, setIsLoadingRadioSongs] = useState(true);

 
    const getCard = async () => {
        //await axios.get('http://localhost:3030/account/card',
        await axios.get(`${process.env.REACT_APP_ACCOUNT_SERVICE}/account/card/`, 
        {
                headers: {
                    'x-auth-token': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then((response) => {
                console.log(response);
                setCard(response.data);
                setIsLoadingCard(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };



    useEffect(() => {

		getCard();

	}, [isLoadingCard]);
    




    return {
        card,
        isLoadingCard
    };

};
