import { useState } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Box, Grid } from "@mui/material";
import Task from "./Task";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const SmallScreenTasksView = ({ tasks }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid item xs={6} md={12} xl={12}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        centered
        variant="fullWidth"
      >
        <Tab label="Pending" {...a11yProps(0)} />
        <Tab label="In progress" {...a11yProps(1)} />
        <Tab label="Finished" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        {tasks.map((task) =>
          task.status === "0" ? <Task task={task} key={task.taskID} /> : null
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {tasks.map((task) =>
          task.status === "1" ? <Task task={task} key={task.taskID} /> : null
        )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {tasks.map((task) =>
          task.status === "2" ? <Task task={task} key={task.taskID} /> : null
        )}
      </TabPanel>
    </Grid>
  );
};

export default SmallScreenTasksView;
