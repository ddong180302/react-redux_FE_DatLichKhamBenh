import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// Import css files
class HomeFooter extends Component {
    render() {
        return (
            <div className='home-footer'>
                <p>&copy; 2023 Trần Đăng Đông. More information, please visit my facebook.
                    <a target="_blank" href='https://www.facebook.com/profile.php?id=100037633460727'>&#8594;
                        Click here &#8592;
                    </a>
                </p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);

