import axios from "axios";
import { LockKeyhole, LockKeyholeOpen, BadgeCheck } from "lucide-react";
import { useState, useEffect } from "react";
function ChangePassword({setLoading}) {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const changePassword = (e) => {
    e.preventDefault();
    setLoading(true);

    //console.log(password, newPassword, confirmPassword);

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/changeData`, { password, newPassword }, { withCredentials: true })
      .then((res) => {
        setLoading(false);
        //console.log(res.data);
        setSuccess(true);
      })
      .catch((err) => {
        setLoading(false);

        console.error(err);
        setConfirmPassword("");
        setPassword("");
        setNewPassword("");
        setErrorMessage(err.response.data.message);

            setTimeout(() => {
                setErrorMessage("");
                }, 3000);
      });
  };

  useEffect(() => {
    if (newPassword !== confirmPassword) {
      setError(true);
    } else {
      setError(false);
    }
  }, [newPassword, confirmPassword]);

  return (

    <div className="flex flex-col size-full items-center justify-center ">
      {success ? (
        <>
          <h1 className="mb-4">Cambiado exitosamente</h1>
          <BadgeCheck className="w-20 h-20 text-green-500" />
        </>
      ) : (
        <>
          <h1 className="mb-4  text-xl border-b-2 border-y-red-500 text-center w-full">Cambiar contraseña</h1>
          <form
            className="space-y-7"
            onSubmit={(e) => {
              changePassword(e);
            }}
          >
            <div className="space-y-5">
              <div className="flex space-x-4 hover:opacity-100 group">
                <LockKeyhole className="w-6 h-6 opacity-45 group-hover:opacity-100 transition-opacity duration-300" />
                <input
                  type="password"
                  required
                  value={password}
                  className="border-b-2"
                  placeholder="Contraseña actual"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="flex space-x-4 group">
                <LockKeyholeOpen className="w-6 h-6 opacity-45 group-hover:opacity-100 transition-opacity duration-300 " />
                <input
                  type="password"
                  required
                  value={newPassword}
                  className="border-b-2"
                  placeholder="Nueva contraseña"
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
              </div>
              <div className="flex space-x-4 group">
                <LockKeyholeOpen className="w-6 h-6 opacity-45 group-hover:opacity-100 transition-opacity duration-300 " />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  className="border-b-2"
                  placeholder="Confirmar contraseña"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <button disabled={error} className={`rounded-lg px-5 py-2 w-full ${error && "opacity-20"} bg-[#ff3e01] text-white`}>
              Cambiar
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default ChangePassword;
