

import { LazyExoticComponent } from 'react';
import { AccountPage, CardPage, HistoryPage, HomePage, OnRepeatPage, RadioPage } from '../pages/user';
import { LikedSongsPage } from '../pages/user/LikedSongsPage';
import { StatsPage } from '../pages/user/StatsPage';

type JSXComponent = () => JSX.Element

export interface Route {
    path: string;
    component: LazyExoticComponent<JSXComponent> | JSXComponent; //() => JSX.Element;
    name: string;
    icon?: string;
    children?: Route[];
}

export const routes: Route[] = [
    { name: 'Home', path: '/home', component: HomePage },
    { name: 'Radio', path: '/radios', component: RadioPage },
    { name: 'Played', path: '/played-songs', component: HistoryPage },
    { name: 'Liked', path: '/liked-songs', component: LikedSongsPage },
    { name: 'On repeat', path: '/on-repeat', component: OnRepeatPage },
    { name: 'Stats', path: '/stats', component: StatsPage },
    { name: 'Account', path: '/account', component: AccountPage },
    { name: 'Card', path: '/card', component: CardPage },
];