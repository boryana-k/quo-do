import React, { useState } from 'react';
import { supabase } from './../createClient';
import { Button } from '@nextui-org/react';

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

        <form className='flex flex-col gap-4 items-center'>
            <label>
                Name:
            </label>
            <input 
                type="text"
                value={name}
                placeholder="name"
                className="py-2 px-4 rounded-xl w-1/2"
                onChange={(e) => setName(e.target.value)}/>
            <label>
                Email:
            </label>
            <input 
                type="email"
                value={email}
                placeholder="email"
                className="py-2 px-4 rounded-xl w-1/2"
                onChange={(e) => setEmail(e.target.value)}/>

            <label>
                pass:
            </label>
            <input 
                type="email"
                value={password}
                placeholder="password"
                className="py-2 px-4 rounded-xl w-1/2"
                onChange={(e) => setPassword(e.target.value)}/>

            <Button color="primary" variant="light" onPress={handleSignUp}>
                sign up
            </Button>
        </form>
      </div>
    );
};

export default SignUp;