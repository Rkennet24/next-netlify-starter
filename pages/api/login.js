import jwt from 'jsonwebtoken';

// Simuleer een gebruikersdatabase zonder gehashte wachtwoorden
const users = [
  { id: 1, email: 'test@example.com', password: 'password123' }, // Geen gehashte wachtwoorden
  { id: 2, email: 'user2@example.com', password: 'password456' },
  { id: 3, email: 'user3@example.com', password: 'password789' },
];

export default async function handler(req, res) {
  console.log('Ontvangen verzoek bij /api/login');

  const { email, password } = req.body;

  // Log inputgegevens
  console.log('Ontvangen e-mail:', email);
  console.log('Ontvangen wachtwoord:', password);

  // Zoek gebruiker op basis van e-mail
  const user = users.find((user) => user.email === email);

  if (!user) {
    console.log('Gebruiker niet gevonden voor e-mail:', email);
    return res.status(401).json({ message: 'Ongeldige e-mail of wachtwoord' });
  }

  console.log('Gebruiker gevonden:', user.email);

  // Controleer wachtwoord in platte tekst
  if (password !== user.password) {
    console.log('Wachtwoord komt niet overeen voor e-mail:', email);
    return res.status(401).json({ message: 'Ongeldige e-mail of wachtwoord' });
  }

  // Genereer JWT-token als het wachtwoord klopt
  try {
    console.log('Genereert JWT voor gebruiker:', user.email);
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    console.log('JWT gegenereerd:', token);
    return res.status(200).json({ token });
  } catch (error) {
    console.error('Fout bij het genereren van JWT:', error);
    return res.status(500).json({ message: 'Kan token niet genereren...' });
  }
}
