import Topbar from "../components/topbar/Topbar";
// import {makeStyles} from "@material-ui/styles";
// import {useStyles} from '@material-ui/core'
import {Box, Paper, Tab, Tabs, Typography} from "@material-ui/core";
import React, {ChangeEvent, useState} from "react";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const ProfilePage = () => {
    // const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (_event: ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        // <div className={classes.root}  style={{ height: "100%", textAlign: "center"}}>
        <div style={{ height: "100%", textAlign: "center"}}>
            <div>
                <Topbar />
                Profile
                <Paper>
                    <Tabs
                        value={value}
                        style={{margin: "20px"}}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Profil et visibilité" />
                        <Tab label="Paramètres" />
                        <Tab label="Paypal" />
                    </Tabs>
                </Paper>
                <Paper>
                    <TabPanel value={value} index={0}>
                        the value is {value}
                        {/*<ProfileComponent>*/}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        the value is {value}
                        {/*<Settings>*/}
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        {/*<Paypal>*/}
                    </TabPanel>
                </Paper>
            </div>
        </div>
    );
}

export default ProfilePage;
