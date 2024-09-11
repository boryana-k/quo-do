import React, { useState } from 'react';
import { supabase } from './../createClient';
import { Button, Input } from '@nextui-org/react';

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

            <Button color="primary" variant="light" className="" onPress={handleSignUp}>
                sign up
            </Button>
        </form>
      </div>
    );
};

export default SignUp;