import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/register", { email, senha });
      setMessage(response.data.message);
      setTimeout(() => navigate("/"), 2000);
    }
    catch (erro) {
      setMessage(erro.response.data.message || "Erro ao registar usuário");
    }
  };

  return (
    // Fundo mais escuro e vibrante
    <div className="min-h-screen flex items-center justify-center bg-pink-600">
      
      {/* Card do Formulário: Fundo claro contrastando com o fundo escuro */}
      <div className="w-full max-w-md bg-stone-950 p-10 rounded-3xl shadow-white space-y-8 transform hover:scale-[1.01] transition duration-300 ease-in-out">
        
        {/* Título */}
        <h2 className="text-4xl font-extrabold text-rose-200 text-center tracking-tight">
          Crie sua conta <span className="text-pink-600">!</span>
        </h2>
        
        {/* Formulário */}
        <form onSubmit={handleRegister} className="space-y-6">
          
          {/* Campo Email */}
          <div>
            <label htmlFor="email" className="block text-sm  text-rose-200 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              // Estilo de input mais elegante
              className="appearance-none block w-full px-4 py-3 border border-violet-600 rounded-xl shadow-inner placeholder-pink-400 focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-600 sm:text-base transition duration-150 ease-in-out text-white"
              placeholder="Digite seu melhor email"
            />
          </div>

          {/* Campo Senha */}
          <div>
            <label htmlFor="senha" className="block text-sm font-semibold text-rose-200 mb-2">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              // Estilo de input mais elegante
              className="appearance-none block w-full px-4 py-3 border border-violet-600 rounded-xl shadow-inner placeholder-pink-400 focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-600 sm:text-base transition duration-150 ease-in-out text-white"
              placeholder="Crie uma senha forte"
            />
          </div>
          
          {/* Botão de Cadastro: Gradiente e Sombra Vibrante */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white 
                       bg-gradient-to-r from-pink-600 to-pink-500 
                       hover:from-pink-400 hover:to-violet-600 
                       focus:outline-none focus:ring-4 focus:ring-violet-900 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
          >
            Cadastrar
          </button>
        </form>

        {/* Mensagem de Status (Sucesso/Erro) */}
        {message && (
          <div className={`p-4 rounded-xl text-center font-medium ${message.includes("sucesso") || message.includes("registar") ? 'bg-green-500 text-white shadow-md' : 'bg-red-500 text-white shadow-md'}`}>
            {message}
          </div>
        )}
        
        {/* Link para Login */}
        <p className="mt-6 text-center text-md text-sky-100">
          Já tem uma conta?
          <a
            href="/"
            className="font-bold text-fuchsia-500 hover:text-indigo-800 ml-1 transition duration-150 ease-in-out"
          >
            Faça Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;