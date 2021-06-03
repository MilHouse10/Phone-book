import React, {Component} from 'react';
import './PhoneInfo.css';

class PhoneInfo extends Component {
    static defaultProps = {
        info: {
            name: '이름',
            phone: '010-0000-2222',
            id: 0
        },
    }

    state = {
        //수정 버튼을 눌렀을 때 deiting 값을 true로 설정할 것
        //이 값이 true일 때는 기존의 텍스트 형태의 값들을 input 형태로 보여줄 것
        editing: false,
        //input의 값은 유동적 이므로 각 필드를 위한 값도 설정
        name: '',
        phone: '',
    }

    handleRemove = () => {
        // 삭제 버튼이 클릭되면 onRemove에 id를 넣어서 호출
        const {info, onRemove} = this.props;
        onRemove(info.id);
    }

    //editing 값을 반전시키는 함수
    handleToggleEdit = () => {
        const { editing } = this.state;
        this.setState({ editing: !editing });
    }

    //input에서 onChange 이벤트가 발생 될 때 호출되는 함수
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    componentDidUpdate(prevProps, prevState){
        //editing 값이 바뀔 때 처리 할 로직
        //수정을 눌렀을 땐, 기존의 값이 input에 나타나고,
        //수정을 적용할 땐, input의 값들을 부모한테 전달

        const { info, onUpdate} = this.props;
        if(!prevState.editing && this.state.editing){
            //editing 값이 false -> true 로 전환될 때
            //info의 값을 state에 넣어준다.
            this.setState({
                name: info.name,
                phone: info.phone
            })
        }

        if(prevState.editing && !this.state.editing){
            //editing 값이 true -> false로 전환될 때
            onUpdate(info.id, {
                name: this.state.name,
                phone: this.state.phone
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        //수정 상태가 아니고, info 값이 같다면 리렌더링 안함
        if(!this.state.editing && !nextState.editing
            && nextProps.info === this.props.info){
                return false;
        }
        //나머지 경우엔 리렌더링 함
        return true;
        
    }

    render() {
        console.log('render PhoneInfo' + this.props.info.id);

        const {editing} = this.state;

        if (editing) { //수정모드
            return (
                <div className="div">
                    <div>
                        <input
                            value={this.state.name}
                            name="name"
                            placeholder="이름"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <input
                            value={this.state.phone}
                            name="phone"
                            placeholder="전화번호"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="div2">
                        <button className="btn2" onClick={this.handleToggleEdit}>적용</button>
                        <button className="btn" onClick={this.handleRemove}>삭제</button>
                    </div>
                </div>
            );
        }

        const {
            name, phone
        } = this.props.info;
        
        return ( //일반모드
            <div className="div">
                <div><b>{name}</b></div>
                <div>{phone}</div>
                <div className="div2">
                    <button className="btn2" onClick={this.handleToggleEdit}>수정</button>
                    <button className="btn" onClick={this.handleRemove}>삭제</button>
                </div>
            </div>
        );
    }
}

export default PhoneInfo;