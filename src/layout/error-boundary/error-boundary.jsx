import React from 'react'
// import { ErrorImageOverlay, ErrorImageContainer, ErrorImageText } from './error-boundary.style-component.jsx';
import Fallback from '../fallback/fallback.jsx';




class ErrorBoundary extends React.Component {
    constructor(){
        super()
        this.state = {hasError: false}
    }

    static getDerivedStateFromError(error){
        return {hasError: true};
    }

    componentDidCatch(error, info){
        alert(error, info)
    }

    render(){
        if (this.state.hasError){
            <Fallback url="http://i.imgur.com/yW2W9SC.png" type="img" text="Something went wrong..."/>
            // return <ErrorImageOverlay>
            //     <ErrorImageContainer imageUrl='http://i.imgur.com/yW2W9SC.png' />
            //     <ErrorImageText>Sorry this ish aint working</ErrorImageText>
            // </ErrorImageOverlay>
        }
        return this.props.children
    }

}
export default ErrorBoundary;