import React from 'react'
import { useRouteError} from "react-router-dom";
import styled from 'styled-components';

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <ErrorPageStyled>
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
            <i>{error.statusText || error.message}</i>
            </p>
        </div>
        </ErrorPageStyled>
       
    )
}

const ErrorPageStyled = styled.div`
    div {
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }

    h1, p, i {
        margin-bottom: 2rem;
    }

`