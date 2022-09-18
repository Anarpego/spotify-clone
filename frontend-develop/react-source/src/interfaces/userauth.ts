export interface UserAuth {
    id: number;
    name: string;
    email: string;
    password?: string;
    card_id: number;
    subscription: 0 | 1 | true | false;
    gravatar: string;
}
