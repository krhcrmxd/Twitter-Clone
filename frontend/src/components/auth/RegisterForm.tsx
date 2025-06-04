"use client";
import { AuthService } from "@/services/auth.service";
import formStyles from "@/styles/form.module.scss";
import { type IRegister } from "@/types/auth.types";
import { Themes } from "@/types/user.types";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "../ui/button";
import { DynamicSwitch } from "../ui/dynamicSwitch";
import { InputWithLabel } from "../ui/inputWithLabel";

const toasterDuration = 3000;

export const RegisterForm = () => {
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async (data: IRegister) => AuthService.register(data),
        onSuccess() {
            toast("Account created. Login now. U will be redirected in 3 sec");
            setTimeout(() => {
                router.push("/auth/login");
            }, toasterDuration);
        },
        onError(error) {
            toast(error.message);
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IRegister>();
    const onSubmit: SubmitHandler<IRegister> = (data) => {
        data.theme = isDarkTheme ? Themes.dark : Themes.light;
        if (data.surname === "") data.surname = undefined;
        mutation.mutateAsync(data);
    };
    return (
        <div className={formStyles.container}>
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: toasterDuration,
                }}
            />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={formStyles.form}
            >
                <h1 className="text-5xl text-lightest font-bold text-center">Sign in</h1>
                <div className="w-full flex flex-col items-center justify-center">
                    <InputWithLabel
                        id="name"
                        label="Name"
                        placeholder="your name"
                        type="text"
                        {...register("name", {
                            required: { value: true, message: "This field is required" },
                            minLength: { value: 2, message: "Field must contains more than 1 sym" },
                            pattern: {
                                value: /^[A-Z][a-zA-Z]*$/,
                                message: "Field contains not only letters",
                            },
                        })}
                        aria-invalid={errors.name ? "true" : "false"}
                        labelClass="text-lightest"
                    />
                    {errors.name && (
                        <p
                            className="text-red-600"
                            role="alert"
                        >
                            {errors.name.message}
                        </p>
                    )}
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                    <InputWithLabel
                        id="surname"
                        label="Surname(not required)"
                        placeholder="your surname(not required)"
                        type="surname"
                        {...register("surname", {
                            required: false,
                            minLength: { value: 2, message: "Field must contains more than 1 sym" },
                            pattern: {
                                value: /^[a-zA-Z][a-zA-Z]*$/,
                                message: "Field contains not only letters",
                            },
                        })}
                        aria-invalid={errors.name ? "true" : "false"}
                        labelClass="text-lightest"
                    />
                    {errors.surname && (
                        <p
                            className="text-red-600"
                            role="alert"
                        >
                            {errors.surname.message}
                        </p>
                    )}
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                    <InputWithLabel
                        id="email"
                        label="Email"
                        placeholder="your email"
                        type="email"
                        {...register("email", {
                            required: { value: true, message: "This field is required" },
                            minLength: { value: 4, message: "Email is too short" },
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "This is not email",
                            },
                        })}
                        labelClass="text-lightest"
                        aria-invalid={errors.email ? "true" : "false"}
                    />
                    {errors.email && (
                        <p
                            className="text-red-600"
                            role="alert"
                        >
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                    <InputWithLabel
                        id="password"
                        label="Password"
                        placeholder="your password"
                        type="password"
                        {...register("password", {
                            required: { value: true, message: "This field is required" },
                            minLength: { value: 6, message: "Field must contains more than 6 sym" },
                        })}
                        labelClass="text-lightest"
                        aria-invalid={errors.password ? "true" : "false"}
                    />
                    {errors.password && (
                        <p
                            className="text-red-600"
                            role="alert"
                        >
                            {errors.password.message}
                        </p>
                    )}
                </div>
                <DynamicSwitch
                    id="theme-switch"
                    label={isDarkTheme ? "dark theme" : "light theme"}
                    isDarkTheme={isDarkTheme}
                    setIsDarkTheme={setIsDarkTheme}
                    labelClass="text-lightest"
                />
                <Button
                    type="submit"
                    variant={"outline"}
                    className="bg-light hover:bg-lightest border-light"
                >
                    Submit
                </Button>
                <span className="text-light">
                    {"Have an account? "}
                    <Link
                        href="/auth/login"
                        className="underline text-lightest"
                    >
                        Log in
                    </Link>
                </span>
            </form>
        </div>
    );
};
