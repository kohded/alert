import React from 'react';
import { Route, Routes as RoutesRRD } from 'react-router-dom';
import { lazyComponent } from '../../common/utils';

const Home = lazyComponent('Home', import('../../pages/Home/Home'));
const Preview = lazyComponent('Preview', import('../../pages/Preview/Preview'));
const PageNotFound = lazyComponent('PageNotFound', import('../../pages/PageNotFound/PageNotFound'));

export const Routes = (): JSX.Element => (
  <RoutesRRD>
    <Route element={<Home />} path="/" />
    <Route element={<Preview />} path="/preview" />
    <Route element={<PageNotFound />} path="*" />
  </RoutesRRD>
);
