import React from 'react';
import axios from 'axios';
import { Modal } from './modal';
import { store } from "../index";
import InviteForm from './forms/invite';


class Landing extends React.Component {
    state = {
        isInviteModalVisible: false,
        isSubmitting: false,
    };

    static submitInvite(data, done) {
        const URI = encodeURI('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth');
        axios.post(URI, data).then(() => done());
    }

    toggleInviteModal() {
        this.setState({ isInviteModalVisible: !this.state.isInviteModalVisible });
    }

    onSubmit(values) {
        const data = { name: values.fullName, email: values.email, };

        this.setState({ isSubmitting: true });
        Landing.submitInvite(data, _ => this.onSubmitted());
    }

    onSubmitted() {
        this.toggleInviteModal();
        this.setState({ isSubmitting: false });
    }

    render() {
        return (
            <div className={'row'}>
                <div className={'text-center'}>
                    <div className={'invite-wrapper'}>
                        <h1>A better way to enjoy every day.</h1>
                        <p>Be the first to know when we launch.</p>
                        <button className={'btn btn-primary'}
                                onClick={() => this.toggleInviteModal()}
                        >
                            Request an invite
                        </button>
                        <Modal store={store} visible={this.state.isInviteModalVisible}>
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

export default Landing;
