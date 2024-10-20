/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Form, Input, Typography, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Zoom } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";

const formStyle = css`
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
`;
interface IData {
  email: string;
  parol: number;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IData[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://544287c7d245201c.mokky.dev/SingIn"
  //       );
  //       setData(response.data);
  //     } catch (error) {}
  //   };
  //   fetchData();
  // }, []);

  // const handeSubmit = async () => {
  //   if (!email || !password) {
  //     message.error(
  //       "Пожалуйста, введите свой адрес электронной почты и пароль!"
  //     );
  //     return;
  //   }

  //   // setLoading(true);

  //   try {
  //     const user = data.find(
  //       (item) => item.email === email && item.parol.toString() === password
  //     );

  //     if (user) {
  //       message.success("Вы успешно вошли в систему");
  //       navigate("/layoutPage/productPage");
  //     } else {
  //       message.error("Электронная почта или пароль неверны");
  //     }
  //   } catch (error) {
  //     message.error("Произошла ошибка при входе");
  //   } finally {
  //     // setLoading(false);
  //   }
  // };
  return (
    <div className="flex">
      <div className="flex-1">
        {/* <div className=" flex-1 h-screen flex justify-center items-center"> */}
        {/* <Zoom> */}
        <div>
          <img
            className="h-screen flex-1 object-cover"
            src="Premium Photo _ Falling ham burger with floating ingredients, 3d design realistic burger on abstract background_.jpeg"
            alt=""
          />
        </div>
        {/* </Zoom> */}
        {/* </div> */}
      </div>
      <div className="flex-1">
        <Zoom>
          <div className="bg-white flex-1 h-screen flex justify-center items-center">
            <div
              css={formStyle}
              className="h-[400px] w-[370px] rounded-[10px] p-4"
            >
              <div className="flex justify-center items-center">
                <Typography
                  style={{
                    color: "#ff5c00",
                    fontWeight: 600,
                    fontSize: "29px",
                    marginBottom: "30px",
                  }}
                >
                  Войти
                </Typography>
              </div>
              <Form
                layout="vertical"
                onFinish={() => navigate("/admin/category")}
              >
                <Form.Item>
                  <Typography
                    style={{ fontSize: "18px", marginBottom: "10px" }}
                  >
                    Электронная почта
                  </Typography>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ borderRadius: "10px", height: "40px" }}
                  />
                </Form.Item>
                <Form.Item>
                  <Typography
                    style={{ fontSize: "18px", marginBottom: "10px" }}
                  >
                    Пароль
                  </Typography>
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ borderRadius: "10px", height: "40px" }}
                  />
                </Form.Item>
                <Button
                  style={{
                    backgroundColor: "#FF7020",
                    width: "100%",
                    height: "40px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontSize: "16px",
                    borderRadius: "10px",
                    marginTop: "60px",
                    border: "0",
                  }}
                  htmlType="submit"
                >
                  Войти
                </Button>
              </Form>
            </div>
          </div>
        </Zoom>
      </div>
    </div>
  );
};

export default LoginPage;
