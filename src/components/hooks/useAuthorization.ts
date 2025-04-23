import axios from "axios";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/slices/userSlice";

export default function () {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        axios
            .post(`https://api.hash-cash.io/v1/auth_user/`, {
                init_data:
                    "user=%7B%22id%22%3A628122813%2C%22first_name%22%3A%22web-assist%20%F0%9F%A7%80%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22somedayphd%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FrYWIDk8AuC-UPFGZvSi_2gzPYZN4WF0_ZLT4ElWFDtk.svg%22%7D&chat_instance=3002745344667273263&chat_type=supergroup&auth_date=1745186225&signature=kOUYkZpSjDfgXPEQUR-eYAc9gJhYFAm1V5CGRdBGeBrNrmozBWS5ZZ9tSjgfGpqPOhoTEnT--AL59GMPmQFHCA&hash=e70673077f2702cc41defc9b1d6874a36049ce1f3deca76ad65f31846b434991",
            })
            .then((res) => {
                dispatch(setUser(res.data));
                sessionStorage.setItem("authToken", res.data.token);
                setTimeout(() => setLoading(false), 1400);
            })
            .catch((error) => {
                console.error("Ошибка запроса авторизации", error);
            });
    }, []);

    return [loading];
}
