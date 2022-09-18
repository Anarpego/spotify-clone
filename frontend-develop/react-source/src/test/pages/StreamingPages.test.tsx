import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import { AccountPage, CardPage, HomePage, OnRepeatPage } from "../../pages/user";
import { AlbumsPage } from "../../pages/user/AlbumsPage";
import { LikedSongsPage } from "../../pages/user/LikedSongsPage";
import { StatsPage } from "../../pages/user/StatsPage";


describe('first', () => { 


    test('should render ', () => { 

        render(
            <AuthProvider>
                <Router>
                    <AlbumsPage />
                </Router>
                
            </AuthProvider>
        
        
        );

     });


     test('should first', () => { 

        render(
            <AuthProvider>
                <Router>
                    <LikedSongsPage />
                </Router>
                
            </AuthProvider>
        
        
        );

     });

     test('should first', () => { 

        render(
            <AuthProvider>
                <Router>
                    <OnRepeatPage />
                </Router>
                
            </AuthProvider>
        
        
        );

     });

     test('should first', () => { 

        render(
            <AuthProvider>
                <Router>
                    <CardPage />
                </Router>
                
            </AuthProvider>
        
        
        );

     });


     test('should first', () => { 

        render(
            <AuthProvider>
                <Router>
                    <HomePage />
                </Router>
                
            </AuthProvider>
        
        
        );

     });


     
     test('should first', () => { 

        render(
            <AuthProvider>
                <Router>
                    <AccountPage />
                </Router>
                
            </AuthProvider>
        
        
        );

     });

 });
