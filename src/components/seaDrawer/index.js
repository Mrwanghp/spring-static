import React, { useState } from 'react';
import { connect } from 'dva';
import { Drawer } from 'antd-mobile';
import PropTypes from 'prop-types';
import styles from './index.less';
function SeaDrawer(props) {
    const [open, setOpen] = useState(true)
    // , height='', backgroundColor, page
    const { tabs, onTabClick } = props;
    const sidebar = () => {
        return (
            <div>5115155151</div>
        )
    }
    return (<div>
        <div>
            44511515
        </div>
        <Drawer
            className={styles.drawer}
            style={{ minHeight: document.documentElement.clientHeight }}
            enableDragHandle
            contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
            sidebar={sidebar}
            open={open}
            onOpenChange={setOpen(!open)}
        >
            Click upper-left corner
        </Drawer>
    </div>);
}

SeaDrawer.propTypes = {
};
SeaDrawer.defaultProps = {
}
export default connect()(SeaDrawer);
