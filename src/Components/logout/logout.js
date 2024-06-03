import { useNavigate } from "react-router-dom";
import { useEffect } from "react"
const Logout = () =>{
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    useEffect(() => {
        const logout = async () => {
            try {
                const response = await fetch('https://cheapgames-i2xd74yl7a-uc.a.run.app/api/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if(response.status === 500){
                    sessionStorage.clear();
                    navigate('/login');
                    throw new Error('Erro de autorização', response.status);
                }
                if (!response.ok) {
                    throw new Error('Erro ao deslogar');
                }

                const data = await response.json();
                console.log(data); // Verifique a resposta do logout
                sessionStorage.clear();
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
