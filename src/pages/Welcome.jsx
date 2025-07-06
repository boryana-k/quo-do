import {Form} from "@heroui/form";
import { Button, Input } from "@heroui/react";
import { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { signIn, signUp } from '../services/auth';

function Welcome() {
    const [nameError, setNameError] = useState(''); // Add error state
    const [showPassword, setShowPassword] = useState(false);
    const toggleVisibility = () => setShowPassword(!showPassword);

    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if(isLogin) {
                await signIn(email, password);
            } else {
                if(password !== confirmPassword) {
                    setError('Passwords do not match');
                    setLoading(false);
                    return;
                }
                await signUp(email,password)
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    function toggleMode() {
        setIsLogin(!isLogin);

        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError('');
    };

    return (
        <div className="w-full h-full">
            {/* <p className="font-light text-2xl">welcome</p> */}
            <h1 className="font-black text-7xl">quodo</h1>

            <div className="mt-20 flex flex-col">
                <p className="font-medium text-2xl">
                    {
                        isLogin ? 'Welcome back' : 'Create Account'
                    }
                </p>
                <p className="font-thin text-lg mb-2">
                    {
                        isLogin ? 'Sign in to your account' : 'Join us today'
                    }
                </p>
                <div className="w-1/3 mx-auto my-0">

                    <Form>
                        <Input
                            type="email"
                            value={email}
                            label="email"
                            placeholder="Enter your email"
                            color="secondary"
                            classNames={{
                                label: "text-black/50 dark:text-white/90",
                                input: [
                                    "text-black/50", 
                                    "dark:text-white/90"
                                ]
                            }}
                            isRequired
                            isInvalid={nameError !== ''}
                            errorMessage={nameError}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (nameError) setNameError('');
                            }}
                        />
                        <Input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            label="Password"
                            placeholder="Enter your password"
                            color="secondary"
                            classNames={{
                                label: "text-black/50 dark:text-white/90",
                                input: [
                                    "text-black/50", 
                                    "dark:text-white/90"
                                ]
                            }}
                            endContent={
                                <button
                                aria-label="toggle password visibility"
                                className="focus:outline-none"
                                type="button"
                                onClick={toggleVisibility}
                                >
                                {showPassword ? (
                                    <AiOutlineEye />
                                ) : (
                                    <AiOutlineEyeInvisible />
                                )}
                                </button>
                            }
                            isRequired
                            isInvalid={nameError !== ''}
                            errorMessage={nameError}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                if (nameError) setNameError('');
                            }}
                        />

                        {/* Confirm Password Field - Only show for register */}
                        <div 
                            className={`transition-all duration-300 ease-in-out overflow-hidden w-full ${
                                !isLogin ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                            >
                            <Input
                                type="password"
                                label="Confirm Password"
                                placeholder="Confirm your password"
                                color="secondary"
                                classNames={{
                                label: "text-black/50 dark:text-white/90",
                                    input: [
                                        "text-black/50", 
                                        "dark:text-white/90"
                                    ]
                                }}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required={!isLogin}
                            />
                        </div>

                         {/* Error Message */}
                        {error && (
                            <div className="text-danger-500 text-sm text-center bg-red-50 p-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            isLoading={loading}
                            className="w-full"
                            color="primary"
                            variant="solid"
                            size="lg"
                        >
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </Button>
                    </Form>


                    {/* Toggle Text */}
                    <div className="text-center mt-6">
                        <p className="text-gray-600">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            type="button"
                            onClick={toggleMode}
                            className="text-beige-900 hover:text-neutral-800 font-medium transition-colors"
                        >
                            {isLogin ? 'Sign up here' : 'Login'}
                        </button>
                        </p>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Welcome;