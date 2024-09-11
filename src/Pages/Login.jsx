import { useState } from 'react'
import { supabase } from './../createClient';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';

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
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 items-center'>
        

        <input 
          placeholder='Email'
          name='email'
          onChange={handleChange}
          className='w-1/2'
        />

        <input 
          placeholder='Password'
          name='password'
          type="password"
          onChange={handleChange}
          className='w-1/2'
        />

        <Button color="primary" variant="light" onPress={handleSubmit}>
          Log in
        </Button>


      </form>
      Don't have an account? <Link to='/signup'>Sign Up</Link> 
    </div>
  )
}

export default Login;