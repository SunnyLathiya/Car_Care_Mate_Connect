"use client";
import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import SettingsIcon from "@material-ui/icons/Settings";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import WeekendIcon from "@material-ui/icons/Weekend";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    backgroundColor: "#fff",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  maincontainer: {
    marginTop: 80,
    marginBottom: -20,
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  heading: {
    textAlign: "center",
  },
}));

const Working: React.FC = () => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.maincontainer}>
        <h1 className={classes.heading}>How CarCareMateConnect Works?</h1>
        <Timeline align="alternate">
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined">
                <DriveEtaIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="h6" component="h1">
                  Select Your Car
                </Typography>

                <Typography>We Service most makes and models</Typography>
                <Typography>
                  Users that their car's make and model can likely be serviced
                  by the platform.
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary">
                <SettingsIcon />
              </TimelineDot>
              <TimelineConnector className={classes.secondaryTail} />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="h6" component="h1">
                  Select The Perfect Car Service
                </Typography>

                <Typography>
                  From CarCareMateConnect's broad portfolio of Services.
                </Typography>
                <Typography>
                  Users can select services from a diverse range offered by
                  CarCareMateConnect.
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined">
                <AttachMoneyIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="h6" component="h1">
                  Any Inquiry
                </Typography>

                <Typography>
                  Informs users about available support options: a chatbot,
                  email, or direct contact with the office for problem
                  resolution.
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary">
                <BookmarksIcon />
              </TimelineDot>
              <TimelineConnector className={classes.secondaryTail} />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="h6" component="h1">
                  Book An Appointment
                </Typography>
                <Typography>
                  Users can schedule an appointment for car service.
                </Typography>
                <Typography>
                  A service benefit, indicating that specific booked services
                  include free pickup and drop-off in reasonable price.
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined">
                <WeekendIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="h6" component="h1">
                  Relax
                </Typography>
                <Typography>
                  A simple directive to suggest that users can relax.
                </Typography>
                <Typography>
                  Encourages users to utilize saved time from the appointment
                  booking process for other important tasks or relaxation.
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </div>
    </div>
  );
};

export default Working;
