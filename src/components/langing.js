import React from 'react';
import axios from 'axios';
import { Modal } from './modal';
import { store } from "../index";
import InviteForm from './forms/invite';
import Done from "./done";


class Landing extends React.Component {
    state = {
        isInviteModalVisible: false,
        isDoneModalVisible: false,
        isSubmitting: false,
        error: "",
    };

    static submitInvite(data, done, failed) {
        const URI = encodeURI('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth');

        axios.post(URI, data).then(res => done(res), err => failed(err));
    }

    toggleInviteModal() {
        this.setState({ isInviteModalVisible: !this.state.isInviteModalVisible });
    }

    toggleDoneModal() {
        this.setState({ isDoneModalVisible: !this.state.isDoneModalVisible });
    }

    onSubmit(values) {
        const data = { name: values.fullName, email: values.email };

        this.setState({ isSubmitting: true });
        Landing.submitInvite(data, res => this.onSubmitted(res), e => this.setError(e));
    }

    setError(error) {
        this.setState({ error: error.message, isSubmitting: false });
    }

    onSubmitted() {
        this.setState({ isSubmitting: false });
        this.toggleInviteModal();
        this.toggleDoneModal();
        this.setError("");
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
                                        errorText={this.state.error}
                                        disabled={this.state.isSubmitting}
                            />
                        </Modal>
                        <Modal visible={this.state.isDoneModalVisible}>
                            <Done onOk={_ => this.toggleDoneModal()}/>
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;
