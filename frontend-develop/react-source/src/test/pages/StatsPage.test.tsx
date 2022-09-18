import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import { StatsPage } from "../../pages/user/StatsPage";


describe('first', () => { 


    test('should first', () => { 

        render(
            <AuthProvider>
                <Router>
                    <StatsPage />
                </Router>
                
            </AuthProvider>
        
        
        );

     });

 });
