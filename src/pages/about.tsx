import React from 'react';
import Link from 'next/link';
import { NextPage } from 'next';
import Layout from '../components/Layout';

const AboutPage = (() => (
  <Layout title="about">
    <h1>About</h1>
    <p>This is the about page</p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
)) as NextPage;

AboutPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default AboutPage;
