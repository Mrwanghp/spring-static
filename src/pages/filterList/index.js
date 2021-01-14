import React, { useState, useEffect } from "react";
import SeaTab from "@/components/seaTab";
import { connect } from "dva";
import styles from "./index.less";
function FilterList() {
  return (
    <div>
        筛选页面
    </div>
  );
}

FilterList.propTypes = {};

export default connect()(FilterList);
