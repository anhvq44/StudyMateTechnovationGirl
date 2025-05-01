import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import InputField from '../components/InputField';
import AuthButton from '../components/AuthButton';
import { supabase } from "../supabase_config";


function Login() {
  const [user, setUser] = useState("")

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    })
    if(!error) {
      setUser(data.user);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    signInWithEmail()

    const today = new Date().toISOString().split("T")[0]; 

    const { data, error } = await supabase
      .from('daily_checkin')
      .select('*')
      .eq('recorded_date', today)
      .maybeSingle(); 

    if (!data) {
      navigate("/daily-checkin")
    } else {
      navigate("/user-dashboard")
    }
  };

  return (
    <AuthLayout image="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&auto=format&fit=crop&q=80" imagePosition="left">
      <h1 className="auth-title">Login to your Account</h1>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Email"
          type="email"
          id="email"
          placeholder="Enter your email"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <InputField
          label="Password"
          type="password"
          id="password"
          placeholder="Enter your password"
          minLength={8}
          onChange={handleChange}
          value={formData.password}
          required
        />
        <AuthButton type="submit">Login</AuthButton>
      </form>
      <p className="auth-divider">- OR -</p>
      <p className="text-xs text-center">
        Don't have an account?{' '}
        <Link to="/signup" className="auth-link">
          Sign Up
        </Link>
      </p>
    </AuthLayout>
  )
}

export default Login