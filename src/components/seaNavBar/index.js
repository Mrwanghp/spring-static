import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { connect } from 'dva';
import PropTypes from 'prop-types'
function SeaNavBar(props) {
    const { title, icon, navbarClick, slot} = props;
    return (
        <div >
            <NavBar
                icon={icon && <Icon type={icon} />}
                onLeftClick={navbarClick}
                mode="light"
                rightContent={[slot && slot()]}
            >{title}</NavBar>
        </div>
    );
}

SeaNavBar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    navbarClick: PropTypes.func,
    slot: PropTypes.func,
}
export default connect()(SeaNavBar);
