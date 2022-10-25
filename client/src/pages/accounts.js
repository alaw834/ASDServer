import React from 'react'
import AccountManagement from "../components/accounts/view/accountManagement"

import "bootstrap/dist/css/bootstrap.css";
import Container from 'react-bootstrap/esm/Container';

export default function Accounts() {
    return (
        <div>
            <Container>
                <AccountManagement></AccountManagement>
            </Container>
        </div>
    );
};