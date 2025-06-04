import { LoginForm } from "@/components/auth/LoginForm";

export default function Page() {
    return (
        <div className="flex flex-col gap-5 h-full w-full bg-darkest">
            <LoginForm />
        </div>
    );
}
