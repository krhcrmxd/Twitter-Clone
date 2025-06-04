import { RegisterForm } from "@/components/auth/RegisterForm";

export default function Page() {
    return (
        <div className="flex flex-col gap-5 h-full w-full bg-darkest">
            <RegisterForm />
        </div>
    );
}
