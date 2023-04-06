import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ProfileDoctor.scss';
import { getProfileDoctorById } from '../../../services/userService';
import { result } from 'lodash';
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId)
        this.setState({
            dataProfile: data,
        })
    }

    getInforDoctor = async (id) => {
        let result = {}

        if (id) {
            let res = await getProfileDoctorById(id)
            if (res && res.infor && res.infor.errCode === 0) {
                result = res.infor.data;
            }
        }

        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }

        if (prevProps.doctorId !== this.props.doctorId) {
            // this.getInforDoctor(this.props.doctorId)
        }
    }

    renderTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let hour = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY") :
                moment.unix(+dataTime.date / 1000).locale('en').format("ddd - DD/MM/YYYY")
            return (
                <>
                    <div>{hour} - {date}</div>
                    <div><FormattedMessage id="patient.booking-modal.priceBooking" /></div>
                </>
            )
        }
    }

    render() {
        let { dataProfile } = this.state
        let { language, isShowDescriptonDoctor, dataTime } = this.props
        let nameVi = '', nameEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        return (
            <div className='profile-doctor-container'>
                <div className='intro-doctor'>
                    <div className='content-left'
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}>

                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className='down'>
                            {isShowDescriptonDoctor === true ?
                                <div className='name-clinic'>
                                    {dataProfile && dataProfile.Doctor_Infor && dataProfile.Doctor_Infor.nameClinic
                                        && <span>
                                            {dataProfile.Doctor_Infor.nameClinic}
                                        </span>
                                    }
                                </div>
                                :
                                <>
                                    {this.renderTimeBooking(dataTime)}
                                </>
                            }
                            <div className='address-clinic'>
                                {dataProfile && dataProfile.Doctor_Infor && dataProfile.Doctor_Infor.addressClinic
                                    && <span>
                                        {dataProfile.Doctor_Infor.addressClinic}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='price'>
                    <FormattedMessage id="patient.booking-modal.price" />
                    {language === LANGUAGES.VI ?
                        dataProfile && dataProfile.Doctor_Infor && dataProfile.Doctor_Infor.priceTypeData ?
                            <NumberFormat
                                value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                                className="curentcy"
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={' VND'} /> : ''
                        :
                        dataProfile && dataProfile.Doctor_Infor && dataProfile.Doctor_Infor.priceTypeData ?
                            <NumberFormat
                                value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                                className="curentcy"
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={' $'} /> : ''
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
