export interface Cards {
    status: boolean;
    cards: Card[];
}

export interface Card {
    id:          number;
    number:        string;
    last_number:   string;
    cvv: string;
    exp_date: string;
    balance: number;

}
