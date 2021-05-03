/* eslint-disable no-console */
/* eslint-disable react/no-unused-prop-types */
/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
// import Geocode from 'react-geocode';
import Container from '@material-ui/core/Container';
import { Helmet } from 'react-helmet';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import StatsCard from '../../components/StatsCard';
// import ReposList from 'components/ReposList';
import PatientImg from '../../images/001-patient.png';
import RegistrationImg from '../../images/003-registration.png';
import VirusImg from '../../images/001-vaccine.png';
import VaccineImg from '../../images/002-vaccine-1.png';
import TestImg from '../../images/002-covid-test.png';
import CenteredSection from './CenteredSection';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import './index.css';
import reducer from './reducer';
import saga from './saga';

const key = 'home';

export function HomePage() {
  useEffect(() => {
    // Geocode.setApiKey('AIzaSyC7Ww61kvLqFiOoanBNUJ1UTcMJ-VT_hI4');
    console.log('in did mount');
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          console.log(position.coords.latitude);
          console.log(position.coords.longitude);
          // Geocode.fromLatLng(
          //   position.coords.latitude,
          //   position.coords.longitude,
          // ).then(
          //   response => {
          //     const address = response.results[0].formatted_address;
          //     console.log({ address });
          //   },
          //   error => {
          //     console.error(error);
          //   },
          // );
        },
        error => {
          console.log(error);
        },
      );
    } else {
      console.log('error');
    }
  }, []);
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="Covid India Vaccinaition slots" />
      </Helmet>
      <Container maxWidth="lg">
        <div id="map" />
        <div>
          <CenteredSection>
            <h2 className="title">All Covid Information at one place</h2>
            {/* <ReposList {...reposListProps} /> */}
          </CenteredSection>
          <Grid container spacing={5} alignItems="stretch">
            <Grid item xs={12} md={6} lg={4} xl={4}>
              <StatsCard
                imageUrl={VaccineImg}
                title="Total Vaccinations"
                count="17,05,89,474"
                countColor="#219653"
                subsections={[
                  {
                    title: 'First Dose',
                    count: '12,212,212',
                  },
                  {
                    title: 'Second Dose',
                    count: '12,212,212',
                  },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={4}>
              <StatsCard
                imageUrl={RegistrationImg}
                title="Total Registratations"
                count="17,05,89,474"
                countColor="#219653"
                subsections={[
                  {
                    title: 'Todays Registration: ',
                    count: '12,212,212',
                  },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={4}>
              <StatsCard
                imageUrl={VaccineImg}
                title="Todays Vaccinations"
                count="7,05,89,474"
                countColor="#219653"
                subsections={[
                  {
                    title: 'First Dose',
                    count: '2,12,212',
                  },
                  {
                    title: 'Second Dose',
                    count: '2,212',
                  },
                ]}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={5}
            alignItems="stretch"
            style={{ marginTop: '40px' }}
          >
            <Grid item xs={12} md={6} lg={4} xl={4}>
              <StatsCard
                imageUrl={VirusImg}
                title="Total Confirmed Cases"
                count="17,05,89,474"
                countColor="#FF073A"
                subsections={[
                  {
                    title: 'Today: ',
                    count: '12,212,212',
                  },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={4}>
              <StatsCard
                imageUrl={PatientImg}
                title="Total Recovered Cases"
                count="17,05,89,474"
                countColor="#219653"
                subsections={[
                  {
                    title: 'Today: ',
                    count: '12,212,212',
                  },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={4}>
              <StatsCard
                imageUrl={TestImg}
                title="Today Tested"
                count="7,05,89,474"
                countColor="#007BFF"
                subsections={[
                  {
                    title: 'Today: ',
                    count: '2,12,212',
                  },
                ]}
              />
            </Grid>
          </Grid>
          <CenteredSection>
            <h2 className="title">
              Check Vaccine Slot Availibility in you Locality
            </h2>
            <div>
              <TextField
                id="standard-basic"
                label="Pin Code"
                type="number"
                fullWidth
                style={{ maxWidth: '300px', marginRight: '20px' }}
              />
              <Button className="check-button">Check Vaccine Slot</Button>
            </div>
          </CenteredSection>
        </div>
      </Container>
    </article>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
