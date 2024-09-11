import { useState } from 'react'
import { supabase } from './../createClient';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input } from '@nextui-org/react';

function Login({setToken}) {
    let navigate = useNavigate()

  const [formData,setFormData] = useState({
        email:'',password:''
  })


  function handleChange(event){
    setFormData((prevFormData)=>{
      return{
        ...prevFormData,
        [event.target.name]:event.target.value
      }

    })

  }

  async function handleSubmit(e){
    // e.preventDefault()

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
          })

      if (error) throw error
    //   console.log(data)
      setToken(data)
      navigate('/dashboard')


    //   alert('Check your email for verification link')

      
    } catch (error) {
      alert(error)
    }
  }


//   console.log(data)

  return (
    <div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 items-center mb-4'>
        <Input
          label='Email'
          name='email'
          isRequired
        //   color='primary'
          variant='underlined'
          onChange={handleChange}
          className='w-1/2'
        />

        <Input 
          label='Password'
          name='password'
          isRequired
          type="password"
        //   color='primary'
          variant='underlined'
          onChange={handleChange}
          className='w-1/2'
        />

        <Button color="primary" variant="light" className="w-1/2" onPress={handleSubmit}>
          Log in
        </Button>


      </form>
      
      <div className='flex flex-col gap-1 w-1/2 mx-auto items-center justify-center'>
        <p>Don't have an account? </p>
        <Link to='/signup' className='text-text-secondary'>
            Sign Up
        </Link> 
        </div>
    </div>
  )
}

export default Login;