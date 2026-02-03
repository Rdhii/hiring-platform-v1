import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    email: yup.string().email('Email tidak valid').required('Email wajib disini'),
    password: yup.string().min(8, 'Kata sandi salah').required('Kata sandi wajib disini'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Kata sandi tidak cocok').required('Konfirmasi kata sandi wajib disini')
})

export default function Register() {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    })

    const onSubmit = (data) => {
        console.log(data);
    }

  return (
    <div className='my-51 flex justify-center'>
        <div className='border border-gray-100 w-125'>
            <img src="logo-rakamin.png" className='w-35' />
            <div className='p-10 space-y-4 shadow-lg'>
                <h1 className='text-xl font-semibold'>Daftar ke Rakamin</h1>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm text-[#404040]'>Alamat Email</label>
                    <input 
                    {...register('email')}
                    placeholder='Masukan email' className='px-4 py-2 rounded-lg border border-gray-300' />
                    {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm text-[#404040]'>Kata Sandi</label>
                    <input
                    {...register('password')}
                    placeholder='Masukan kata sandi' className='px-4 py-2 rounded-lg border border-gray-300' />
                    {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm text-[#404040]'>Konfirmasi Kata Sandi</label>
                    <input
                    {...register('confirmPassword')}
                    placeholder='Konfirmasi kata sandi' className='px-4 py-2 rounded-lg border border-gray-300' />
                    {errors.confirmPassword && <p className='text-red-500 text-sm'>{errors.confirmPassword.message}</p>}
                </div>
                <button onClick={handleSubmit(onSubmit)} className='bg-[#FBC037] text-[#404040] font-semibold w-full py-1.5 rounded-lg hover:cursor-pointer'>Masuk</button>
            </div>

        </div>
    </div>
  )
}
