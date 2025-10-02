import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5001";

const Login = () => {
  //HOOK - useState - manipula o estado da variável
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Novo estado para o loading do botão

  //HOOK - useNavigate - redirecionamento entre os componentes
  const navigate = useNavigate();

  // FUNÇÃO HANDLELOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    setMensagem("");
    setIsLoading(true); // Inicia o estado de loading

    try {
      const response = await axios.post(`${API_URL}/login`, { email, senha });
      const token = response.data.token;

      if (token) {
        // pega o token do localstorage para valida o login
        localStorage.setItem("token", token);
        // caso o token esteja correto apresenta mensagem
        setMensagem("Login realizado com sucesso!");
        //depois de 1 segundo chama a página dashboard
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setMensagem("Erro ao autenticar token.");
      }
    } catch (erro) {
      console.error("Erro ao logar", erro);
      setMensagem(erro.response?.data?.message || "Credenciais inválidas. Tente novamente.");
    } finally {
      setIsLoading(false); // Finaliza o estado de loading
    }
  };

  return (
    // Fundo escuro e centralização
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      
      {/* Card de Login: Fundo branco flutuante */}
      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] space-y-8 transform hover:scale-[1.01] transition duration-300 ease-in-out">
        
        {/* Título */}
        <h2 className="text-4xl font-extrabold text-gray-900 text-center tracking-tight">
          Acesse sua <span className="text-indigo-600">Conta</span>
        </h2>
        
        {/* Formulário */}
        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* Campo Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-inner placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-600 sm:text-base transition duration-150 ease-in-out"
            />
          </div>

          {/* Campo Senha (Corrigi o type de "passwrod" para "password") */}
          <div>
            <label htmlFor="senha" className="block text-sm font-semibold text-gray-700 mb-2">
              Senha
            </label>
            <input
              id="senha"
              type="password" // CORRIGIDO
              placeholder="digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-inner placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-600 sm:text-base transition duration-150 ease-in-out"
            />
          </div>
          
          {/* Botão de Entrar: Gradiente e Loading State */}
          <button
            type="submit"
            disabled={isLoading} // Desabilita o botão durante o loading
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white 
                       bg-gradient-to-r from-indigo-600 to-blue-500 
                       hover:from-indigo-700 hover:to-blue-600 
                       focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-0.5
                       ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}` // Estilo para estado de loading
            }
          >
            {isLoading ? (
              // Simples animação de loading
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              "Entrar"
            )}
          </button>
        </form>

        {/* Mensagem de Status (Sucesso/Erro) */}
        {mensagem && (
          <div className={`p-4 rounded-xl text-center font-medium ${mensagem.includes("sucesso") ? 'bg-green-500 text-white shadow-md' : 'bg-red-500 text-white shadow-md'}`}>
            {mensagem}
          </div>
        )}
        
        {/* Link para Cadastro */}
        <p className="mt-6 text-center text-md text-gray-600">
          Não tem conta?
          <a
            href="/register"
            className="font-bold text-indigo-600 hover:text-indigo-800 ml-1 transition duration-150 ease-in-out"
          >
            Criar Conta
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;