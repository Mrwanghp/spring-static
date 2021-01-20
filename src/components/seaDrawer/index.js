import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';
function SeaDrawer(props) {
    const { open, Slot, callback, height } = props;
    const close = (event) => {
        event.stopPropagation();
        callback();
    }
    // return useMemo(()=>{
        return (
            <div onClick={close} className={styles.popup} style={{width:open ? '100%': '0%'}}>
                <div 
                    onClick={(event)=>{event.stopPropagation()}} 
                    className={styles.popupContent} 
                    style={{height:open ? height : '0%'}}
                >
                    <Slot/>
                </div>
            </div>
        );
    // },[open,Slot])
}

SeaDrawer.propTypes = {
    open: PropTypes.bool,
    callback: PropTypes.func,
    height: PropTypes.string,
    position: PropTypes.string,
};
SeaDrawer.defaultProps = {
    open: false,
    height: '40%',
    position: 'left'
}
export default SeaDrawer;
