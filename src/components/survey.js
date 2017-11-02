import React from 'react';
import axios from 'axios';
import { Modal } from './modal';
import { store } from "../index";
import InviteForm from './forms/invite';


class Survey extends React.Component {
    state = {
        isSurveyModalVisible: false,
        isSubmitting: false,
    };

    static submitSurvey(data, done) {
        const URI = encodeURI('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth');
        axios.post(URI, data).then(() => done());
    }

    toggleSurveyModal() {
        this.setState({ isSurveyModalVisible: !this.state.isSurveyModalVisible });
    }

    onSubmit(values) {
        const data = { name: values.fullName, email: values.email, };

        this.setState({ isSubmitting: true });
        Survey.submitSurvey(data, _ => this.onSubmitted());
    }

    onSubmitted() {
        this.toggleSurveyModal();
        this.setState({ isSubmitting: false });
    }

    render() {
        return (
            <div className={'row'}>
                <div className={'text-center'}>
                    <div className={'survey-wrapper'}>
                        <h1>A better way to enjoy every day.</h1>
                        <p>Be the first to know when we launch.</p>
                        <button className={'btn btn-primary'}
                                onClick={() => this.toggleSurveyModal()}
                        >
                            Request an invite
                        </button>
                        <Modal store={store} visible={this.state.isSurveyModalVisible}>
                            <InviteForm onSubmit={values => this.onSubmit(values)}
                                        disabled={this.state.isSubmitting}
                            />
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }
}

export default Survey;
