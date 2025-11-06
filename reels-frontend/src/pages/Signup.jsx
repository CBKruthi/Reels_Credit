import React, { useState } from 'react';
import API, { setAuthToken } from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Signup(){
  const [username,setUsername]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [isCreator,setIsCreator] = useState(false);
  const nav = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try {
      const body = { username, email, password };
      if (isCreator) body.role = 'creator';
      const res = await API.post('/auth/register', body);
      localStorage.setItem('token', res.data.token);
      setAuthToken(res.data.token);
      nav('/');
    } catch (err) {
      alert(err.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Signup</h2>
      <div><input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} required /></div>
      <div><input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required /></div>
      <div><input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required /></div>
      <div>
        <label>
          <input type="checkbox" checked={isCreator} onChange={e=>setIsCreator(e.target.checked)} />
          Register as Creator (Studio)
        </label>
      </div>
      <button type="submit">Signup</button>
    </form>
  );
}
