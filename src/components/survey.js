import React from 'react';
import { Modal } from './modal';
import { store } from "../index";
import InviteForm from './forms/invite';


class Survey extends React.Component {
    render() {
        return (
            <div className={'row'}>
                <div className={'text-xs-center'}>
                    <h1>A better way to enjoy every day.</h1>
                    <p>Be the first to know when we launch.</p>
                    <button className={'btn btn-primary'}>Request an invite</button>
                    <Modal store={store}>
                        <h1>This comes from modal dialog.</h1>
                        <p>Some more text</p>
                        <InviteForm/>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default Survey;
