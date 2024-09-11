import React, { useState } from 'react';
import { supabase } from './../createClient';
import { Button, Input } from '@nextui-org/react';
import { Link } from 'react-router-dom';

function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [ password, setPassword ] = useState('')

    async function handleSignUp() {
        // console.log('kk')
        try {
            const { data, error } = await supabase.auth.signUp(
                {
                email: email,
                password: password,
                options: {
                    data: {
                    first_name: name,
                    }
                }
                }
            )
    
    
        if (error) throw error
            alert('Check your email for verification link')
    
        } catch (error) {
            alert(error)
        }
    }


    return (
      <div>
        <h2>Sign Up</h2>

        <form className='flex flex-col gap-4 items-center w-1/2 mx-auto'>
            <Input 
                label="Name"
                type="text"
                isRequired
                value={name}
                variant='underlined'
                className="py-2 px-4 rounded-xl"
                onChange={(e) => setName(e.target.value)}/>
                
            <Input 
                label="Email"
                type="email"
                value={email}
                variant='underlined'
                className="py-2 px-4 rounded-xl"
                onChange={(e) => setEmail(e.target.value)}/>

            <Input 
                label="Password"
                type="password"
                value={password}
                variant='underlined'
                className="py-2 px-4 rounded-xl"
                onChange={(e) => setPassword(e.target.value)}/>

            <Button color="primary" variant="light" className="w-full" onPress={handleSignUp}>
                sign up
            </Button>

            <div className='flex flex-col gap-1 w-1/2 mx-auto items-center justify-center'>
                <p>Already have an account? </p>
                <Link to='/login' className='text-text-secondary'>
                    login
                </Link> 
            </div>
        </form>
      </div>
    );
};

export default SignUp;