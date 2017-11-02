import React from 'react';
import { Modal } from './modal';
import { store } from "../index";
import InviteForm from './forms/invite';


class Survey extends React.Component {
    state = {
        isSurveyVisible: false
    };

    toggleSurvey() {
        // console.log('clicked')
        this.setState({ isSurveyVisible: !this.state.isSurveyVisible });
    }

    onSubmit(values) {
        console.log(values);
        this.toggleSurvey();
    }

    render() {
        return (
            <div className={'row'}>
                <div className={'text-xs-center'}>
                    <h1>A better way to enjoy every day.</h1>
                    <p>Be the first to know when we launch.</p>
                    <button className={'btn btn-primary'}
                            onClick={() => this.toggleSurvey()}
                    >
                        Request an invite
                    </button>
                    <Modal store={store} visible={this.state.isSurveyVisible}>
                        <InviteForm onSubmit={values => this.onSubmit(values)}/>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default Survey;
