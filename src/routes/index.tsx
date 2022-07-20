import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AboutUs from '../containers/AboutUs';
import ChangePassword from '../containers/ChangePassword';
import CreateAccount from '../pages/CreateAccount';
import Dashboard from '../containers/Dashboard';
import Events from '../containers/Dashboard/Events';
import Profile from '../containers/Dashboard/Profile';
import Event from '../containers/Event';
import JoinMentor from '../containers/JoinMentor';
import Landing from '../containers/Landing';
import Login from '../pages/Login';
import FailedPayment from '../containers/Message/FailedPayment';
import SuccessfulPayment from '../containers/Message/SuccessfulPayment';
import RegistrationForm from '../containers/RegistrationForm';
import Status from '../containers/Status';
import TeamSelection from '../containers/TeamSelection';
import Workshop from '../containers/Workshop';
import PrivateRoute from './PrivateRoute';

const Root = () => {
  return (
    <Routes>
      <Route path="/loading/"></Route>

      <Route path="/about_us" element={<AboutUs />} />

      <Route path="/reset_password" element={<ChangePassword />} />
      <Route path="/create_account" element={<CreateAccount />} />
      <Route path="/login/" element={<Login />} />
      <Route path="/" element={<Landing />} />

      <Route path="/" element={<PrivateRoute />}>
        <Route
          path="/message/payment/success/:paymentId?"
          element={<SuccessfulPayment />}
        />
        <Route
          path="/message/payment/failure/:paymentId?"
          element={<FailedPayment />}
        />

        <Route path="/dashboard/" element={<Dashboard />} />
        <Route path="/profile/:section/" element={<Profile />} />
        <Route path="/events/" element={<Events />} />

        <Route path="/event/:eventId/workshop/:fsmId/" element={<Workshop />} />
        <Route path="/watch/:playerId/" element={<Workshop />} />
        <Route path="/join/:playerId/:token/" element={<JoinMentor />} />

        <Route path="/event/:eventId/profile/:section/" element={<Profile />} />
        <Route
          path="/event/:eventId/registration_form/"
          element={<RegistrationForm />}
        />
        <Route path="/event/:eventId/status/" element={<Status />} />
        <Route
          path="/event/:eventId/team_selection/"
          element={<TeamSelection />}
        />
        <Route path="/event/:eventId/" element={<Event />} />
      </Route>

      <Route path="*" element={<Landing />} />
    </Routes>
  );
};
export default Root;
