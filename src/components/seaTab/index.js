import React from 'react';
import { connect } from 'dva';
import { Tabs, WhiteSpace } from 'antd-mobile';
import PropTypes from 'prop-types';
import { StickyContainer, Sticky } from 'react-sticky';
function renderTabBar(props) {
    return (<Sticky >
      {({ style }) => <div style={{ ...style, zIndex: 1}}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>);
  }
function SeaTab(props) {
    const { tabs, onTabClick, height, backgroundColor, page } = props;
    return (
        <div >
            <StickyContainer>
                <Tabs
                    onTabClick={onTabClick}
                    tabs={tabs}
                    initialPage={'t2'}
                    renderTabBar={renderTabBar}
                >
                </Tabs>
            </StickyContainer>
            <WhiteSpace />
        </div>
    );
}

SeaTab.propTypes = {
    tabs: PropTypes.array.isRequired,
    height: PropTypes.string,
    backgroundColor: PropTypes.string,
    page: PropTypes.number,
    onTabClick: PropTypes.func
};
SeaTab.defaultProps = {
    height: '150px',
    backgroundColor: '#fff',
    page: 4
}
export default connect()(SeaTab);
