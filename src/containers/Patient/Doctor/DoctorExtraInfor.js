import React, { Component } from 'react';
//import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './DoctorExtraInfor.scss';
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { getScheduleDoctorByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
import { getExtraInforDoctorById } from '../../../services/userService';

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //save to markdown table
            isShowDetailInfor: false,
            ExtraInforDoctor: {},
        }
    }


    async componentDidMount() {
        this.props.fetchExtraInforDoctorById();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }


        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent)
            if (res && res.infor && res.infor.errCode === 0) {
                this.setState({
                    ExtraInforDoctor: res.infor.data
                })
            }
        }
    }

    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    render() {
        const { isShowDetailInfor, ExtraInforDoctor } = this.state;
        let { language } = this.props;
        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'><FormattedMessage id="patient.extra-infor-doctor.text-address" /> </div>
                    <div className='name-clinic'>{ExtraInforDoctor && ExtraInforDoctor.nameClinic ? ExtraInforDoctor.nameClinic : ''}</div>
                    <div className='detail-address'>{ExtraInforDoctor && ExtraInforDoctor.addressClinic ? ExtraInforDoctor.addressClinic : ''}</div>
                </div>
                <div className='content-down'>
                    {isShowDetailInfor === false &&
                        <div className='short-infor'>
                            <div><FormattedMessage id="patient.extra-infor-doctor.price" />
                                {language === LANGUAGES.VI ?
                                    ExtraInforDoctor && ExtraInforDoctor.priceTypeData ?
                                        <NumberFormat
                                            value={ExtraInforDoctor.priceTypeData.valueVi}
                                            className="curentcy"
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={' VND'} /> : ''
                                    :
                                    ExtraInforDoctor && ExtraInforDoctor.priceTypeData ?
                                        <NumberFormat
                                            value={ExtraInforDoctor.priceTypeData.valueEn}
                                            className="curentcy"
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={' $'} /> : ''
                                }
                            </div>


                            <span className='detail' onClick={() => this.showHideDetailInfor(true)}>
                                <FormattedMessage id="patient.extra-infor-doctor.detail" />
                            </span>
                        </div>
                    }

                    {
                        isShowDetailInfor === true &&
                        <>
                            <div className='title-price'>
                                <FormattedMessage id="patient.extra-infor-doctor.price" />
                                {language === LANGUAGES.VI ?
                                    ExtraInforDoctor && ExtraInforDoctor.priceTypeData ?
                                        <NumberFormat
                                            className="curentcy"
                                            value={ExtraInforDoctor.priceTypeData.valueVi}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={' VND'} /> : ''
                                    :
                                    ExtraInforDoctor && ExtraInforDoctor.priceTypeData ?
                                        <NumberFormat
                                            value={ExtraInforDoctor.priceTypeData.valueEn}
                                            displayType={'text'}
                                            className="curentcy"
                                            thousandSeparator={true}
                                            suffix={' $'} /> : ''
                                }
                            </div>
                            <div className='detail-infor'>
                                <div className='price'>
                                    <div className='left'> <FormattedMessage id="patient.extra-infor-doctor.price" /> </div>
                                    <div className='right'>
                                        {language === LANGUAGES.VI ?
                                            ExtraInforDoctor && ExtraInforDoctor.priceTypeData ?
                                                <NumberFormat
                                                    value={ExtraInforDoctor.priceTypeData.valueVi}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    className="curentcy"
                                                    suffix={' VND'} /> : ''
                                            :
                                            ExtraInforDoctor && ExtraInforDoctor.priceTypeData ?
                                                <NumberFormat
                                                    value={ExtraInforDoctor.priceTypeData.valueEn}
                                                    displayType={'text'}
                                                    className="curentcy"
                                                    thousandSeparator={true}
                                                    suffix={' $'} /> : ''
                                        }
                                    </div>
                                </div>
                                <div className='note'>
                                    {ExtraInforDoctor && ExtraInforDoctor.note ? ExtraInforDoctor.note : ''}
                                </div>
                            </div>
                            <div className='payment'>
                                <span className='text-payment'><FormattedMessage id="patient.extra-infor-doctor.payment" /></span>
                                {language === LANGUAGES.VI ?
                                    ExtraInforDoctor && ExtraInforDoctor.paymentTypeData ?
                                        ExtraInforDoctor.paymentTypeData.valueVi : ''
                                    :
                                    ExtraInforDoctor && ExtraInforDoctor.paymentTypeData ?
                                        ExtraInforDoctor.paymentTypeData.valueEn : ''
                                }
                            </div>
                            <div className='hide-price'>
                                <span onClick={() => this.showHideDetailInfor(false)}>
                                    <FormattedMessage id="patient.extra-infor-doctor.hide-price" />
                                </span>
                            </div>
                        </>
                    }
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        extraDoctorInforById: state.admin.extraDoctorInforById,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchExtraInforDoctorById: (doctorId) => dispatch(actions.fetchExtraInforDoctorById(doctorId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
