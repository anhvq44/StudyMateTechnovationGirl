import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import  AuthLayout  from '../components/AuthLayout';
import  InputField from '../components/InputField';
import  AuthButton  from '../components/AuthButton';
import { supabase } from '../supabase_config';
import { useNavigate } from 'react-router-dom';


function ExtraInfo() {
  const navigate = useNavigate()

  const [extraInfoForm, setExtraInfoForm] = useState({
    first_name: '',
    last_name: '',
    dob: '',
    gender: '',
  })

  const [error, setError] = useState('');


  const handleChange = (e) =>{
    const {id, value} = e.target
    setExtraInfoForm(prev => ({
      ...prev,
      [id]: value
    }));
    if (error) setError('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data: { user }, errorGetUser } = await supabase.auth.getUser();
    if(errorGetUser){
      console.error("Error fetching user:", errorGetUser.message);
    }

    const submitExtraInfoForm = {
      ...extraInfoForm,
      email: user?.email,
      user_id: user?.id,
      coins: 100
    }

    setExtraInfoForm(submitExtraInfoForm)

    const {data, error} = await supabase
      .from('users')
      .insert([submitExtraInfoForm])
      .select()
      if(error){
        console.log(error.message, error.code);
      }

    navigate('/daily-checkin')
    
  };

  return (
    <AuthLayout image="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop&q=80">
      <h1 className="auth-title">Complete your Profile</h1>
      <form onSubmit={handleSubmit}>
        <InputField
          label="First Name"
          type="text"
          id="first_name"
          placeholder="Enter your first name"
          onChange = {handleChange}
          value = {extraInfoForm.first_name}
          required
        />
        <InputField
          label="Last Name"
          type="text"
          id="last_name"
          placeholder="Enter your last name"
          onChange = {handleChange}
          value = {extraInfoForm.last_name}
          required
        />
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex-1">
            <InputField
              label="Date of Birth"
              type="date"
              id="dob"
              onChange = {handleChange}
              value = {extraInfoForm.dob}
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="gender" className="block text-sm font-normal mb-1" >
              Gender
            </label>
            <select
              id="gender"
              className="auth-select"
              onChange = {handleChange}
              value = {extraInfoForm.gender}
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
              <option value="N/A">N/A</option>
            </select>
          </div>
        </div>
        <AuthButton type="submit">Create Account</AuthButton>
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

export default(ExtraInfo)