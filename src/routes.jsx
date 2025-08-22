/* eslint-disable no-unused-vars */
import React from 'react';

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import './component/styles.scss';

import LandingPage from './views/website/landingpage';

import AuthLayout from './views/authentications/hoc/authLayout';
import LoginPage from './views/authentications/login';

import NoRoute from './views/404';
import RegisterPage from './views/authentications/register';
import RegisterRecruiters from './views/authentications/register-recruiters';
import RegisterOptions from './views/authentications/registerOption';
import MainLayout from './views/website/hoc/mainlayout';
import PageLayout from './views/website/pages/pagelayout';

//WORKERS
import HomeWorkers from './views/website/pages/workers/home';
import EditProfileWorkers from './views/website/pages/workers/editprofileworkers';
import WorkersProfile from './views/website/pages/workers/workersprofile';

//RECRUITERS
import HomeRecruiters from './views/website/pages/recruiters/home';
import RecruitersProfile from './views/website/pages/recruiters/recruitersprofile';
import EditProfileRecruiters from './views/website/pages/recruiters/editprofilerecruiters';
import PrivateRoute from './configs/private';
import DetailWorkersProfile from './views/website/pages/detail profile/detailworker';
import HirePage from './views/website/pages/hire/hire';
import DetailWorkers from './views/website/pages/detail profile/detail';
import History from './views/website/pages/notification/notification';


const TheRoutes = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route exact path={`/`} element={<LandingPage />} />
                </Route>
                <Route element={<AuthLayout />}>
                    <Route exact path={`auth/login`} element={<LoginPage />} />
                    <Route exact path={`auth/register`} element={<RegisterPage />} />
                    <Route exact path={`auth/register-recruiters`} element={<RegisterRecruiters />} />
                    <Route exact path={`auth/register-options`} element={<RegisterOptions />} />
                </Route>
                <Route element={<PrivateRoute> <PageLayout/> </PrivateRoute>}>
                <Route exact path={`workers/home`} element={<HomeWorkers />} />
                <Route exact path={`workers/detail/:id`} element={<DetailWorkers />} />
                <Route exact path={`workers/editprofile`} element={<EditProfileWorkers />} />
                <Route exact path={`workers/profile`} element={<WorkersProfile />} />
                <Route exact path={`workers/hire/:id`} element={<HirePage />} />
                <Route exact path={`workers/history`} element={<History />} />
                </Route>
                <Route element={<PrivateRoute> <PageLayout/> </PrivateRoute>}>
                <Route exact path={`recruiters/detail/:id`} element={<DetailWorkersProfile />} />
                <Route exact path={`recruiters/home`} element={<HomeRecruiters />} />
                <Route exact path={`recruiters/detail`} element={<DetailWorkersProfile />} />
                <Route exact path={`recruiters/profile`} element={<RecruitersProfile />} />
                <Route exact path={`recruiters/editprofile`} element={<EditProfileRecruiters />} />
                <Route exact path={`recruiters/hire/:id`} element={<HirePage />} />
                <Route exact path={`recruiters/history`} element={<History />} />

                </Route>
                <Route
                    path={`404`}
                    element={<NoRoute />}
                />
                <Route
                    path="/*"
                    element={<Navigate replace to="/404" />}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default TheRoutes;