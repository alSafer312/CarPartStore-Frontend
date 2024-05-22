import React, {useState} from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {useNavigate} from "react-router-dom";
import AuthService from "./authService"

const createValidationSchema = () => {
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
    });

    validationSchema.fields.email = Yup.string()
        .required('Email is required')
        .email('Email is invalid');

    return validationSchema;
}

export default function Login(){
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();


    const validationSchema = createValidationSchema();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const handleLogin = ({email, password}) => {
        setLoading(true);

        emailLogin(email, password)
            .then(() => {
                navigate("/dashboard");
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const emailLogin = (email, password) => {
        return AuthService.login(email, password)
    }
    return(
        <>
            <form className="authorizationForm" onSubmit={handleSubmit(handleLogin)}>
                <div className="emailLogin">
                    <input type="text" placeholder="Email" {...register("email")}/>
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
                <div className="passwordLogin">
                    <input type="password" placeholder="Password" {...register("password")} />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                </div>

                <input type="submit" value="ВОЙТИ" />
            </form>

        </>
    )
}