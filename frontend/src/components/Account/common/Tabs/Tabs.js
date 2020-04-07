import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import Tab from "../Tab/Tab";
import "./Tabs.scss";

export const Tabs = ({ tabs, defaultTab }) => {
  const history = useHistory();
  const location = useLocation();
  // selected tab by default will be the first tab
  const [selectedTab, setSelectedTab] = useState(defaultTab);
  useEffect(() => {
    const openedTab = tabs.find(
      tab => location.pathname.indexOf(tab.url) !== -1
    );
    if (openedTab) {
      setSelectedTab(openedTab.id);
    }
    const url = openedTab
      ? location.pathname + location.search
      : `${tabs[selectedTab].url}`;
    history.push(url);
  }, []);
  const handleTabClick = tab => {
    setSelectedTab(tab.id);
    history.push(tab.url);
    if (tab.clickHandler && typeof tab.clickHandler === "function") {
      tab.clickHandler();
    }
  };
  return (
    <>
      <div className="tabs">
        {tabs.map(tab => (
          <Tab
            key={tab.id}
            title={tab.title}
            clickHandler={() => handleTabClick(tab)}
            isActive={selectedTab === tab.id}
          />
        ))}
      </div>
      {tabs[selectedTab].content}
    </>
  );
};

Tabs.defaultProps = {
  defaultTab: 0
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      clickHandler: PropTypes.func,
      content: PropTypes.node.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  defaultTab: PropTypes.number
};

export default Tabs;
