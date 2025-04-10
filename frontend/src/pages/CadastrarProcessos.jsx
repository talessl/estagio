import { useEffect, useState } from "react";
import { createProcesso } from "../services/processoServices";
import { useNavigate } from "react-router-dom";

function CadastrarProcessos() {
    const [form, setForm] = useState({
        numero: '',
        orgaoResponsavel: '',
        assunto: '',
        statusProcesso: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            await createProcesso(form);
            navigate('/processos');
        } catch (err) {
            console.error("Erro ao cadastrar processo:", err);
        }
    };

    return (
        <div>
            <h1>Cadastrar Processo</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="numero"
                        id="numero"
                        value={form.numero}
                        onChange={handleChange}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none peer"
                        placeholder=" "
                        required
                    />
                    <label htmlFor="numero" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Número do Processo
                    </label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="orgaoResponsavel"
                        id="orgaoResponsavel"
                        value={form.orgaoResponsavel}
                        onChange={handleChange}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none peer"
                        placeholder=" "
                        required
                    />
                    <label htmlFor="orgaoResponsavel" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Órgão Responsável
                    </label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="assunto"
                        id="assunto"
                        value={form.assunto}
                        onChange={handleChange}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none peer"
                        placeholder=" "
                        required
                    />
                    <label htmlFor="assunto" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Assunto
                    </label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="statusProcesso"
                        id="statusProcesso"
                        value={form.statusProcesso}
                        onChange={handleChange}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none peer"
                        placeholder=" "
                        required
                    />
                    <label htmlFor="statusProcesso" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Status do Processo
                    </label>
                </div>

                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                    Cadastrar
                </button>
            </form>
        </div>
    );
}

export default CadastrarProcessos;
