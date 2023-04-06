import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { postVerifyBookAppointment } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';

class VerifyEmail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            statusVerify: false,
            errCode: 0,
        }
    }


    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId')
            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId
            })

            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            } else {
                this.setState({
                    statusVerify: false,
                    errCode: 1
                })
            }
        }
    };


    componentDidUpdate(prevProps, prevState) {

    };

    render() {

        let { statusVerify, errCode } = this.state;
        return (
            <div>
                <HomeHeader isShowBanner={false} />
                {
                    statusVerify === false ?
                        <div>
                            Loading data...
                        </div>
                        :
                        <div>
                            {+errCode === 0 ?
                                <div>Cảm Ơn Bạn Đã Đặt Lịch Khám Bệnh Tại Booking Care</div>
                                :
                                <div>Lịch hẹn không tồn tại hoặc đã xác nhận!</div>
                            }
                        </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
