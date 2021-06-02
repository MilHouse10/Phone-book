import React, {Component} from 'react';
import './PhoneInfo.css';

class PhoneInfo extends Component {
    static defaultProps = {
        info: {
            name: '이름',
            phone: '010-0000-2222',
            id: 0
        }
    }

    render() {
        const {
            name, phone, id
        } = this.props.info;
        
        return (
            <div className="div">
                <div><b>{name}</b></div>
                <div>{phone}</div>
            </div>
        );
    }
}

export default PhoneInfo;