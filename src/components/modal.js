import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export class Modal extends React.Component {
    static propTypes = {
        targetStyle: PropTypes.any,
        wrapperStyle: PropTypes.any,
    };
    static defaultProps = {
        wrapperStyle: {
            width: "100%",
            position: "fixed",
            top: "40px",
            padding: "20px",
        },
        targetStyle: {
            border: "1px solid #ccc",
            background: "white",
            overflow: "auto",
            outline: "none",
            display: "block",
            "border-radius": "4px",
            "margin-left": "auto",
            "margin-right": "auto",
            position: "relative",
            width: "400px",
            "text-align": "center",
        }
    };

    componentDidMount() {
        const { targetStyle, wrapperStyle } = this.props;
        const style2str = obj => Object.keys(obj).map(k => `${k}: ${obj[k]}`).join(';');

        this._modalWrapper = document.createElement('div');
        this._modalWrapper.setAttribute("style", style2str(wrapperStyle));
        this._modalTarget = document.createElement('div');
        this._modalTarget.setAttribute("style", style2str(targetStyle));
        this._modalWrapper.appendChild(this._modalTarget);
        document.body.appendChild(this._modalWrapper);
        this._render();
    }

    componentWillUpdate() {
        this._render();
    }

    componentWillUnmount() {
        ReactDOM.unmountComponentAtNode(this._modalTarget);
        document.body.removeChild(this._modalTarget);
    }

    _render() {
        ReactDOM.render(<div>{this.props.children}</div>, this._modalTarget);
    }

    render() {
        return <noscript/>;
    }
}

