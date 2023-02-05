const LandingPage = ({ color }) => {
  console.log('Iam in the component', color);
  return <h1>Landing Page</h1>
}

LandingPage.getInitialProps = () => {
  return { color: 'red' };
}

export default LandingPage;