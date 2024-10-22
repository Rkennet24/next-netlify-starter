// pages/index.js
export async function getServerSideProps(context) {
  // Check if the user is authenticated (e.g., check a token or session)
  const token = context.req.cookies.token; // Assuming you're using cookies for JWT or session

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  // If the user is authenticated, continue to render the home page
  return {
    props: {}, // Pass any props you want to the page
  };
}

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>If you see this, you are authenticated.</p>
    </div>
  );
}
