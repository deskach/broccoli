import React from 'react';
import PropTypes from 'prop-types';

export default class Done extends React.Component {
    static propTypes = {
        onOk: PropTypes.func.isRequired
    };

    render() {
        return (
            <div className={'done-wrapper'}>
                <div className={'form-group'}>
                    <h1>All done!</h1>
                    <hr/>
                    <p>
                        You will be among the first people<br/>
                        Broccoli &amp; Co. will comunicate after we launch.
                    </p>
                    <button type={'button'}
                            onClick={this.props.onOk}
                            className={'btn btn-default form-control'}
                    >
                        OK
                    </button>
                </div>
            </div>
        );
    }
};
