import React from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd-mobile';
import PropTypes from 'prop-types';
import { StickyContainer, Sticky } from 'react-sticky';
function renderTabBar(props) {
    return (<Sticky >
      {({ style }) => <div style={{ ...style, zIndex: 1}}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>);
  }
function SeaTab(props) {
    // , height='', backgroundColor, page
    const { tabs, onTabClick } = props;
    return (
        <div >
            <StickyContainer>
                <Tabs
                    tabBarUnderlineStyle={{display: 'none'}}
                    onTabClick={onTabClick}
                    tabs={tabs}
                    initialPage={'t2'}
                    renderTabBar={renderTabBar}
                >
                </Tabs>
            </StickyContainer>
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
