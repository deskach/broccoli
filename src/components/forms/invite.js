import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createSurvey } from "../../actions/index";


class Invite extends React.Component {
    static validate(values) {
        const errors = {}; // if empty -> the form is valid
        const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        // Validate the inputs from 'values'
        if (!values.fullName) {
            errors.fullName = "Enter your full name!";
        }
        if (!regexEmail.test(values.email)) {
            errors.email = "Enter a valid email!";
        }
        if (values.email !== values.confirmEmail) {
            errors.confirmEmail = "Please confirm you email!";
        }

        return errors;
    }

    static renderInput(field) {
        const { meta: { touched, error } } = field;
        const hasDanger = touched && error ? 'has-danger' : '';
        const className = `form-group ${hasDanger}`;

        return (
            <div className={className}>
                <input {...field.input}
                       placeholder={field.placeholder}
                       type={field.type || 'text'}
                       className={'form-control'}
                />
                <div className={'text-help'}>{touched && error}</div>
            </div>
        );
    }

    onSubmit(values) {
        console.log(values);
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <div>
                <h2 className={'text-center'}>Request an invite</h2>
                <form className={'form-group'}
                      onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field placeholder={'Full name'}
                           name={'fullName'}
                           component={Invite.renderInput}/>
                    <Field placeholder={'Email'}
                           type={'email'}
                           name={'email'}
                           component={Invite.renderInput}/>
                    <Field placeholder={'Confirm Email'}
                           type={'email'}
                           name={'confirmEmail'}
                           component={Invite.renderInput}/>

                    <button type={'submit'} className={'btn btn-default form-control'}>
                        Send
                    </button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    validate: Invite.validate,
    form: 'InviteForm',
})(
    connect(null, { createSurvey: createSurvey })(Invite)
);
