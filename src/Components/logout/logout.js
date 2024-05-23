import { useNavigate } from "react-router-dom";
import { useEffect } from "react"
const Logout = () =>{
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    useEffect(() => {
        const logout = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Erro ao deslogar');
                }

                const data = await response.json();
                console.log(data); // Verifique a resposta do logout
                sessionStorage.removeItem('token');
                navigate('/');
            } catch (error) {
                console.error('Erro ao deslogar:', error);
            }
        };

        logout();
    }, [token, navigate]);
    return(<></>)
}

export default Logout;
