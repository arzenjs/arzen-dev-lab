import Link from "next/link";
import UserComponent from "@src/app/(users)/user/[username]/userComponent";

const page = () => {
    async function submitAction(data) {
        "use server"
        let userData = {
            name: data.get('name'),
            email: data.get('email'),
            number: data.get('number')
        }
        ?Data not parsing
        return <UserComponent user={userData} />;
    }
    return (
        <div className="flex-1 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-slate-400">Sign in to continue to your account</p>
                </div>
                <div className="form-container">
                    <form className="space-y-6" action={submitAction}>
                        <div>
                            <label htmlFor='name' className="form-label">Name</label>
                            <input name='name' type='text' required placeholder='Enter Your Name' className="form-input" />
                        </div>
                        <div>
                            <label htmlFor='email' className="form-label">Email</label>
                            <input name='email' type='text' required placeholder='Enter Your Email' className="form-input" />
                        </div>
                        <div>
                            <label htmlFor='number' className="form-label">Phone Number</label>
                            <input name='number' type='number' required placeholder='Enter Your Number' className="form-input" />
                        </div>
                        <button type="submit" className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-lg transition duration-200"><a href="/user/[username]" className="text-white no-underline">Sign In</a></button>
                    </form>
                    <div className="mt-6 text-center">
                        <p className="text-slate-400 text-sm">Don't have an account?{' '}<Link href="/register" className="text-sky-400 hover:text-sky-300 font-medium transition">Sign up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
