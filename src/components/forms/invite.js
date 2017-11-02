import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';


class Invite extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        disabled: PropTypes.bool,
        errorText: PropTypes.string,
    };
    static defaultProps = {
        disabled: false,
    };

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
                       disabled={field.disabled}
                       type={field.type || 'text'}
                       className={'form-control'}
                />
                <div className={'text-help'}>{touched && error}</div>
            </div>
        );
    }

    render() {
        const { handleSubmit, disabled, errorText } = this.props;
        const wrapperStyle = {
            "cursor": disabled ? "wait" : "inherit",
        };

        return (
            <div style={wrapperStyle}>
                <h2 className={'text-center'}>Request an invite</h2>
                <form className={'form-group'}
                      onSubmit={handleSubmit(this.props.onSubmit)}>
                    <Field placeholder={'Full name'}
                           disabled={disabled}
                           name={'fullName'}
                           component={Invite.renderInput}/>
                    <Field placeholder={'Email'}
                           type={'email'}
                           disabled={disabled}
                           name={'email'}
                           component={Invite.renderInput}/>
                    <Field placeholder={'Confirm Email'}
                           type={'email'}
                           disabled={disabled}
                           name={'confirmEmail'}
                           component={Invite.renderInput}/>

                    <button type={'submit'}
                            disabled={disabled}
                            className={'btn btn-default form-control'}
                    >
                        Send
                    </button>
                </form>
                <p>{errorText}</p>
            </div>
        );
    }
}

export default reduxForm({
    validate: Invite.validate,
    form: 'InviteForm',
})(Invite);
