import { useState, useEffect } from "react";
import { Mail, MailCheck, BadgeCheck } from "lucide-react";
import axios from "axios";

function ChangeEmail({setLoading}) {
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const changeEmail = (e) => {
    e.preventDefault();
    console.log(newEmail, confirmEmail);
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_API_URL}/changeData`, { isemail: true, newEmail }, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setSuccess(true);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        setConfirmEmail("");
        setNewEmail("");
        setErrorMessage(err.response.data.message);
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      });
  };

  useEffect(() => {
    if (newEmail !== confirmEmail) {
      setError(true);
    } else {
      setError(false);
    }
  }, [newEmail, confirmEmail]);

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
              changeEmail(e);
            }}
          >
            <div className="space-y-5">
              <div className="flex space-x-4 group">
                <MailCheck className="w-6 h-6 opacity-45 group-hover:opacity-100 transition-opacity duration-300 " />
                <input
                  type="email"
                  required
                  value={newEmail}
                  className="border-b-2"
                  placeholder="Nueva Correo"
                  onChange={(e) => {
                    setNewEmail(e.target.value);
                  }}
                />
              </div>
              <div className="flex space-x-4 group">
                <MailCheck className="w-6 h-6 opacity-45 group-hover:opacity-100 transition-opacity duration-300 " />
                <input
                  type="email"
                  required
                  value={confirmEmail}
                  className="border-b-2"
                  placeholder="Confirmar Correo"
                  onChange={(e) => {
                    setConfirmEmail(e.target.value);
                  }}
                />
              </div>
              <p className="text-red-500">{errorMessage}</p>
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

export default ChangeEmail;
