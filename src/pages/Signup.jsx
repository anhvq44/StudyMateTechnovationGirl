import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import  AuthLayout  from '../components/AuthLayout';
import  InputField  from '../components/InputField';
import AuthButton  from '../components/AuthButton';
import { createClient} from '@supabase/supabase-js'
import { supabase } from '../supabase_config';


export function SignUp() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword:'',
  })

  const [error, setError] = useState('');

  const handleChange = (e) =>{
    const {id, value} = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    if (error) setError('');
  }

  async function signUpNewUser(){
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: '',
      },
    })
    navigate('/complete-profile')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    signUpNewUser()
  };

  return (
    <AuthLayout image="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop&q=80">
      <h1 className="auth-title">Create your Account</h1>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Email"
          type="email"
          id="email"
          placeholder="Enter your email"
          onChange = {handleChange}
          value = {formData.email}
          required
        />
        <InputField
          label="Password"
          type="password"
          id="password"
          placeholder="Enter your password"
          minLength={8}
          onChange = {handleChange}
          value = {formData.password}
          required
        />
        <InputField
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <AuthButton type="submit">Continue</AuthButton>
      </form>
      <p className="auth-divider">- OR -</p>
      <p className="text-xs text-center">
        Already have an account?{' '}
        <Link to="/login" className="auth-link">
          Sign In
        </Link>
      </p>
    </AuthLayout>
  );
}