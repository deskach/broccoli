import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';


export class Modal extends React.Component {
    static propTypes = {
        visible: PropTypes.bool,
        store: PropTypes.any,
        targetStyle: PropTypes.any,
        wrapperStyle: PropTypes.any,
    };
    static defaultProps = {
        visible: false,
        store: null,
        targetStyle: null,
        wrapperStyle: null,
    };

    // TODO: make appendChild() work with babel css-loader and remove styles from props
    static wrapperStyle = {
        width: "100%",
        position: "fixed",
        top: "40px",
        padding: "20px",
    };
    static targetStyle = {
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
        padding: "0 10px"
    };

    componentDidMount() {
        this._modalWrapper = document.createElement('div');
        this._modalTarget = document.createElement('div');
        this._modalWrapper.appendChild(this._modalTarget);

        document.body.appendChild(this._modalWrapper);
        this._render();
    }

    _updateStyles() {
        const display = this.props.visible ? "block" : "none";
        const wrapperStyle = {
            ...Modal.wrapperStyle,
            ...this.props.wrapperStyle,
            display: display,
        };
        const targetStyle = { ...Modal.targetStyle, ...this.props.targetStyle };
        const style2str = obj => Object.keys(obj).map(k => `${k}: ${obj[k]}`).join(';');

        this._modalWrapper.setAttribute("style", style2str(wrapperStyle));
        this._modalTarget.setAttribute("style", style2str(targetStyle));
    }

    componentDidUpdate() {
        this._render();
    }

    componentWillUnmount() {
        ReactDOM.unmountComponentAtNode(this._modalTarget);
        document.body.removeChild(this._modalTarget);
    }

    _render() {
        const { store } = this.props;

        this._updateStyles();
        if (store) {
            ReactDOM.render(
                <Provider store={store}>
                    <div>{this.props.children}</div>
                </Provider>,
                this._modalTarget
            );
        } else {
            ReactDOM.render(
                <div>{this.props.children}</div>,
                this._modalTarget
            );
        }
    }

    render() {
        return <noscript/>;
    }
}

