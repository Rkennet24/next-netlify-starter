import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

export default function Dashboard() {
  const [auth, setAuth] = useState(false);
  const [email, setEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      router.push('/login'); // Doorverwijzen naar login als er geen token is
    } else {
      try {
        // Decodeer de JWT-token om de e-mail op te halen
        const decoded = jwt.decode(token);
        setEmail(decoded.email); // Sla de e-mail op in de state
        setAuth(true);
      } catch (error) {
        console.error('Fout bij het decoderen van token:', error);
        router.push('/login');
      }
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Verwijder de token
    router.push('/login'); // Stuur de gebruiker naar de loginpagina
  };

  if (!auth) return <p>Bezig met laden...</p>;

  return (
    <div>
      <h1>Welkom op het Dashboard</h1>
      <p>Je bent ingelogd als: {email}</p> {/* Toon de e-mail van de ingelogde gebruiker */}
      <button onClick={handleLogout}>Uitloggen</button> {/* Uitlog knop */}
    </div>
  );
}
