"use client";
import { AuthService } from "@/services/auth.service";
import formStyles from "@/styles/form.module.scss";
import { ILogin } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { Button } from "../ui/button";
import { InputWithLabel } from "../ui/inputWithLabel";

const toasterDuration = 3000;

export const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILogin>();

    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async (data: ILogin) => AuthService.login(data),
        onSuccess() {
            router.replace("i");
        },
    });

    const onSubmit: SubmitHandler<ILogin> = (data) => {
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
                <h1 className="text-5xl text-lightest font-bold text-center">Log in</h1>
                <div className="w-full flex flex-col items-center justify-center">
                    <InputWithLabel
                        id="email"
                        label="Email"
                        placeholder="your email"
                        type="email"
                        {...register("email", {
                            required: { value: true, message: "This field is required" },
                            minLength: { value: 4, message: "Email is too short" },
                            /*pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "This is not email",
                            },*/
                        })}
                        labelClass="text-lightest"
                    />
                    {errors.email && (
                        <p
                            className="text-red-600"
                            role="alert"
                        >
                            {errors.email.message}
                        </p>
                    )}
                    {mutation.isError && (
                        <p
                            className="text-red-600"
                            role="alert"
                        >
                            {mutation.error instanceof AxiosError
                                ? mutation.error.response?.data?.message
                                : null}
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
                <Button
                    type="submit"
                    variant={"outline"}
                    className="bg-light hover:bg-lightest border-light"
                >
                    Submit
                </Button>
                <span className="text-light">
                    {"Have no account? "}
                    <Link
                        href="/auth/register"
                        className="underline text-lightest"
                    >
                        Register
                    </Link>
                </span>
            </form>
        </div>
    );
};
