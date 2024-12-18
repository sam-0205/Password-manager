import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = (params) => {
    const ref = useRef()
    const passref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "", })
    const [parray, setparray] = useState([])

    const getpasswords = async (params) => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json();
        console.log(passwords)
        setparray(passwords)
    }

    useEffect(() => {
        getpasswords();
    }, [])

    const copytext = (text) => {
        toast("copied to clipboard");

        navigator.clipboard.writeText(text)
    }

    const savepassword = async () => {

        if (form.site.length > 1 && form.username.length > 1 && form.password.length > 1) {

            // await fetch("http://localhost:3000/", {
            //     method: "DELETE", headers: { "Content-type": "application/json" },
            //     body: JSON.stringify({ id: form.id })
            // })
            setparray([...parray, { ...form, id: uuidv4() }])
            // localStorage.setItem("passwords", JSON.stringify(updatedArray));
            let res = await fetch("http://localhost:3000/", {
                method: "POST", headers: { "Content-type": "application/json" },
                body: JSON.stringify({ ...form, id: uuidv4() })
            })
            console.log(form)
            toast("password saved");
            setform({ site: "", username: "", password: "" })
        }
        else {
            toast("invalid password ")
        }
    }
    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const showpassword = () => {
        passref.current.type = "text"
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png";
            passref.current.type = "password"
        }
        else {
            ref.current.src = "icons/eyecross.png";
            passref.current.type = "text"
        }
    }

    const deletetext = async (id) => {

        let c = confirm("Are you sure")
        if (c) {
            setparray(parray.filter(item => item.id !== id))
            // localStorage.setItem("passwords", JSON.stringify(parray.filter(item => item.id !== id)))
            let res = await fetch("http://localhost:3000/", {
                method: "DELETE", headers: { "Content-type": "application/json" },
                body: JSON.stringify({ id })
            })
        }
        toast("password deleted successfully")

        

    }
    const edittext = async (id) => {
        setform({ ...parray.filter(i => i.id === id)[0]})
        setparray(parray.filter(item => item.id !== id))
        let res = await fetch("http://localhost:3000/", {
            method: "DELETE", headers: { "Content-type": "application/json" },
            body: JSON.stringify({ id })
        })
        console.log("editing")

    }

    return (
        <>
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white 
      bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] 
      bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>
            <div className="md:mycontainer py-16">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-700'>&lt;</span>

                    <span>Pass</span><span className='text-green-500'>OP/&gt;</span>
                </h1>
                <p className='text-green-950 text-lg text-center'>Your own password manager</p>
                <div className='flex flex-col p-4 text-black gap-8 items-center'>
                    <input value={form.site} onChange={handlechange} placeholder='Enter website URL' className='rounded-full border border-green-400 
                        w-full p-4 py-1' type="text" name="site" id="site" />
                    <div className="flex md:flex-row flex-col w-full justify-between gap-8">
                        <input value={form.username} onChange={handlechange} placeholder='Enter Username' className='rounded-full border border-green-400 
                            w-full p-4 py-1' type="text" name="username" id="username" />

                        <div className="relative">

                            <input ref={passref} value={form.password} onChange={handlechange} placeholder='Enter password' className='rounded-full border border-green-400 
                            w-full p-4 py-1' type="password" name="password" id="password" />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showpassword}>
                                <img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>

                    </div>
                    <button onClick={savepassword} className='flex justify-center items-center bg-green-600 hover:bg-green-400 rounded-full 
                        px-8 py-2 w-fit border border-green-900'>

                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Add Password</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-xl py-4'>Your Passwords</h2>
                    {parray.length === 0 && <div>No passwords to show</div>}
                    {parray.length !== 0 && <table className="table-auto w-full rounded-xl overflow-hidden">
                        <thead className=' bg-green-700 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className=''>Action</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {parray.map((items, index) => {
                                return <tr key={index}>
                                    <td className='text-center w-32 py-2 border border-white'>
                                        <a href={items.site} target='_blank'>{items.site}</a>
                                        <button onClick={() => copytext(items.site)} className='mx-10 bg-green-700 text-white p-1'>copy</button>
                                    </td>
                                    <td className='text-center w-32 py-2 border border-white'>{items.username}
                                        <button onClick={() => copytext(items.username)} className='mx-10 bg-green-700 text-white p-1'>copy</button>
                                    </td>
                                    <td className='text-center w-32 py-2 border border-white'>{"*".repeat(items.password.length)}
                                        <button onClick={() => copytext(items.password)} className='mx-10 bg-green-700 text-white p-1'>copy</button>
                                    </td>
                                    <td className='text-center w-32 py-2 border border-white'>
                                        <button onClick={() => edittext(items.id)} className='px-4 bg-green-700 py-2 border border-black mx-1'>edit </button>
                                        <button onClick={() => deletetext(items.id)} className='px-2 bg-green-700 py-2 border border-black mx-1'>delete</button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>

    )
}

export default Manager
