import React, { useState, useRef } from 'react';
import { connect } from 'dva';
import NavBar from '@/components/seaNavBar'
import Tab from '@/components/seaTab'
import { SearchBar } from 'antd-mobile';
function Index() {
    const [tabs, setTabs] = useState([
        { title: '最新' },
        { title: '电影' },
        { title: '电视剧' },
        { title: '动漫' },
    ]);
    const onTabClick = (e) => {
        console.log(e)
    }
    return (
        <div >
            <NavBar title="首页" ></NavBar>
            <Tab tabs={tabs} onTabClick={onTabClick} />
            <SearchBar placeholder="Search" maxLength={8} />
        </div>
    );
}

Index.propTypes = {
};

export default connect()(Index);
