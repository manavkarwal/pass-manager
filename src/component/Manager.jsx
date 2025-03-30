import { React, useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaCopy } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaDeleteLeft } from "react-icons/fa6";
import uuid4 from "uuid4";


import { IoAddCircle } from "react-icons/io5";

const Manager = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [passwordArray, setpasswordArray] = useState([]);
  const [form, setform] = useState({ site: "", username: "", passwords: "", });

  const handleChange = (e) =>
    setform({ ...form, [e.target.name]: e.target.value });

  const savePassword = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.passwords.length > 3
    ) {
      setpasswordArray([...passwordArray, { ...form, id: uuid4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuid4() }])
      );



      setform({ site: "", username: "", passwords: "" });
    }
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);


  };

  const editPassword = (id) => {
    setform(passwordArray.filter((i) => i.id === id)[0]);
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const deletePassword = (id) => {
    let c = confirm("Do you really want to delete this password?");

    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );

    }
  };

  useEffect(() => {
    let password = localStorage.getItem("passwords");
    if (password) {
      setpasswordArray(JSON.parse(password));
    }
  }, []);

  const toggleVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>


      <div className=" flex flex-col mx-10 items-center ">
        <h1 className="font-extrabold text-2xl pt-10 text-[#F6F1DE] mt-3">
          <span className="text-black">&lt;</span>
          <span>Pass</span>
          <span className="text-black">Op</span>
          <span className="text-black">&gt;</span>
        </h1>

        <h2 className="text-[#F6F1DE] font-mono">Your Own Password Manager </h2>

        <input
          onChange={handleChange}
          value={form.site}
          type="text"
          name="site"
          placeholder="Enter Website URL"
          className="w-full my-10  py-2 outline-none px-3 bg-white text-sm  "
        />

        <div className="flex gap-2 md:gap-5 w-full items-center ">
          <input
            onChange={handleChange}
            value={form.username}
            type="text"
            placeholder="Enter UserName"
            name="username"
            id=""
            className="w-full   py-2 px-3 outline-none bg-white text-sm  "
          />

          <input
            onChange={handleChange}
            value={form.passwords}
            type={isPasswordVisible ? "password" : "text"}
            placeholder="Enter Password"
            name="passwords"
            id=""
            className="w-[60%]   py-2 px-3 outline-none bg-white text-sm  "
          />

          <button
            className="text-white cursor-pointer"
            onClick={toggleVisibility}
          >
            {isPasswordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        </div>

        <button
          onClick={savePassword}
          className="text-[#3E3F5B] my-5 bg-[#F6F1DE] px-4  flex items-center  gap-2 py-2 rounded-xl"
        >
          <IoAddCircle />
          Add Password
        </button>
      </div>

      <div className="max-w-[440px] md:max-w-[1290px] md:mx-10 my-10 ">
        <h2 className="text-white  text-2xl font-mono  my-5">
          Your password
        </h2>
        {passwordArray === 0 && <div>No Password Now</div>}
        {passwordArray !== 0 && (
          <table className="table-auto w-full overflow-hidden  ">
            <thead className="bg-white text-[#3E3F5B]">
              <tr>
                <th className="py-2 ">Site</th>
                <th className="py-2  ">Username</th>
                <th className="py-2   ">Password</th>
                <th className="py-2  ">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-[#F6F1DE]   text-gray-900">
              {passwordArray.map((item, index) => (
                <tr key={index}>
                  <td className="py-2  border border-black  text-sm ">

                    <div className="flex justify-between    gap-2 md:gap-5 items-center px-1  ">
                      <div className=" py-2 w-[89px] md:w-[350px] overflow-auto">
                        <a className="" href={item.site} target="_blank">
                          {item.site}
                        </a>
                      </div>

                      <button onClick={() => copyText(item.site)}>
                        <FaCopy />
                      </button>
                    </div>
                  </td>

                  <td className="py-2    border border-black   text-sm  ">
                    <div className="flex justify-between  gap-2 md:gap-5  items-center px-1  ">
                      <div className="py-2  w-[89px] md:w-[350px] overflow-auto">
                        {item.username}</div>
                      <button onClick={() => copyText(item.username)}>
                        <FaCopy />
                      </button>
                    </div>
                  </td>

                  <td className="py-2    border text-sm border-black   ">
                    <div className="flex justify-between  gap-2 md:gap-5  items-center px-1  ">
                      <div className=" py-2 w-[89px] md:w-[350px] overflow-auto">
                        {item.passwords}</div>
                      <button onClick={() => copyText(item.passwords)}>
                        <FaCopy />
                      </button>
                    </div>
                  </td>

                  <td className="py-2 px-3 border  md:w-32 border-black ">
                    <div className="flex justify-between gap-2 items-center ">
                      <button
                        onClick={() => {
                          editPassword(item.id);
                        }}
                      >
                        <MdEdit />
                      </button>
                      <button
                        onClick={() => {
                          deletePassword(item.id);
                        }}
                      >
                        <FaDeleteLeft />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Manager;
