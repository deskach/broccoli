import React from 'react';


class Survey extends React.Component {
    render() {
        return (
            <div className={'row'}>
                <div className={'text-xs-center'}>
                    <h1>A better way to enjoy every day.</h1>
                    <p>Be the first to know when we launch.</p>
                    <button className={'btn btn-primary'}>Request an invite</button>
                </div>
            </div>
        );
    }
}

export default Survey;
