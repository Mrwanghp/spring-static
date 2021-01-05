import React, { useState } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import styles from './index.less';
function SeaDrawer(props) {
    const { open, slot, change, height, position } = props;
    console.log(open)
    return (
        <div>44151515</div>
    );
}

SeaDrawer.propTypes = {
    open: PropTypes.bool,
    change: PropTypes.func,
    height: PropTypes.string,
    position: PropTypes.string,
};
SeaDrawer.defaultProps = {
    open: false,
    height: '85vh',
    position: 'left'
}
export default connect()(SeaDrawer);
