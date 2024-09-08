import { Button } from "@nextui-org/react";
import { useState } from "react";
import { supabase } from "../createClient";

function Signup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [user, setUser] = useState('');
      

      
    async function signup() {
        const { data } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        setUser(data);
    }

    console.log(user)

    return (

        <div className="flex flex-col items-start gap-12">
            <h3 className="text-2xl">Signup</h3>

            <form className="flex flex-col gap-2">
                <label>
                    First name
                </label>
                <input
                    type="text"
                    placeholder="first name"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />

                <label></label>
                <label>
                    Email:
                </label>
                <input
                    type="email"
                    placeholder="your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />

                <label>
                    password
                </label>
                <input
                    type="password"
                    placeholder="your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />

                <Button color="primary" onPress={signup}>
                    submit
                </Button>
            </form>
        </div>
    );
};

export default Signup;