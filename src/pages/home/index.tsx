/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { Bounce, Zoom } from "react-awesome-reveal";
import {
  Button,
  Col,
  Input,
  Modal,
  Radio,
  Row,
  Typography,
  Skeleton,
  Alert,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { ICategory, Product } from "@src/types";
import { Footer } from "antd/es/layout/layout";

import { FaTelegramPlane } from "react-icons/fa";
import { FaVk } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import ".//home.css";
import { RootState } from "@src/store";
import { api } from "./api";
import {
  setIsErrorProduct,
  setIsLoadingProduct,
  setProduct,
} from "@src/store/slices/productSlice";
import {
  setCategory,
  setIsErrorCategory,
  setIsLoadingCategory,
} from "@src/store/slices/categorySlice";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const buttonStyle = css`
  &:hover {
    background-color: #ffab08 !important;
    color: black !important;
    // transition: none !important;
  }
`;
// const customStyleModal1 = css`
//   padding: 0px !important;
// `;
export const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  //@ts-ignore
  const [quantity, setQuantity] = useState<number>(1);
  const [quantityModal, setQuantityModal] = useState<number>(1);
  const [basketProduct, setBasketProduct] = useState<
    { product: Product; quantity: number }[]
  >([]);
  const dispatch = useDispatch();
  const { product, isLoadingProduct, isErrorProducts } = useSelector(
    (state: RootState) => state.data
  );
  const { category, isLoadingCategory, isErrorCategory } = useSelector(
    (state: RootState) => state.dataCategory
  );
  const [deliveryType, setDeliveryType] = useState("Самовывоз");
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setIsLoadingProduct(true));
    dispatch(setIsErrorProduct(false));

    dispatch(setIsLoadingCategory(true));
    dispatch(setIsErrorCategory(false));
    Promise.all([
      api.get<Product[]>("product"),
      api.get<ICategory[]>("category"),
    ])
      .then(([resProd, resCateg]) => {
        dispatch(setProduct(resProd.data));
        console.log("category", resCateg.data);
        dispatch(setCategory(resCateg.data));
        console.log("Category before rendering:", category);
      })
      .catch((e: Error) => {
        console.log("Error fetching data:", e);
        dispatch(setIsErrorProduct(true));
        dispatch(setIsErrorCategory(true));
      })
      .finally(() => {
        dispatch(setIsLoadingProduct(false));
        dispatch(setIsLoadingCategory(false));
      });
  }, [dispatch]);

  const [modalType, setModalType] = useState<"order" | "product" | null>(null);
  const [nameOrder, setNameOrder] = useState<string>("");
  const [phoneOrder, setPhoneOrder] = useState<string>("");
  const [kvOrder, OrderKvOrder] = useState<string>("");
  const [etajOrder, setEtajOrder] = useState<string>("");
  const [dfOrder, setDfOrder] = useState<string>("");

  const openOrderModal = () => {
    setModalType("order");
    setIsModalOpen(true);
  };
  const handleOrder = () => {
    setIsModalOpen(false);
    message.success("Ваш заказ принят");
    setDeliveryType("");
    setNameOrder("");
    setPhoneOrder("");
    OrderKvOrder("");
    setEtajOrder("");
    setDfOrder("");
  };
  const openProductModal = (product: Product) => {
    setModalType("product");
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setQuantityModal(1);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setQuantity(1);
    setQuantityModal(1);
  };

  // const items: MenuProps["items"] = useMemo(
  //   () => [
  //     {
  //       label: "Аккаунт",
  //       key: "0",
  //     },
  //     {
  //       label: "Настройки",
  //       key: "1",
  //     },
  //     {
  //       label: "Админ",
  //       key: "2",
  //       onClick: () => navigate("/login"),
  //     },
  //   ],
  //   [navigate]
  // );

  const filteredProducts = product.filter(
    (p) => p.categoryId === selectedCategory
  );
  const handleDecreaseQuatity = (id: number) => {
    setBasketProduct((prev) =>
      prev
        .map((p) =>
          p.product.id === id
            ? {
                ...p,
                quantity: p.quantity - 1,
                prodPrice: p.product.price * (p.quantity - 1),
              }
            : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  const handleIncreaseQuatity = (id: number) => {
    setBasketProduct((prev) =>
      prev.map((p) =>
        p.product.id === id
          ? {
              ...p,
              quantity: p.quantity + 1,
              prodPrice: p.product.price * (p.quantity - 1),
            }
          : p
      )
    );
    setQuantity((prev) => prev + 1);
  };
  const handleIncreaseModal = () => {
    setQuantityModal(quantityModal + 1);
  };
  const handleDecreaseModal = () => {
    if (quantityModal > 1) {
      setQuantityModal(quantityModal - 1);
    }
  };
  const handleAddProductBasket = (product: Product) => {
    setBasketProduct((prev) => {
      const existingProduct = prev.find(
        (item) => item.product.id === product.id
      );
      if (existingProduct) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantityModal }
            : item
        );
      }
      return [...prev, { product, quantity: quantityModal }];
    });
    handleOk();
  };

  const countProductBasket = basketProduct.map((b) => b.product.id);

  const totalPrice = basketProduct.reduce((total, item) => {
    const totalP = total + item.product.price * item.quantity;
    return totalP;
  }, 0);

  const PriceComponent = ({ price }: { price: string }) => {
    const formatPrice = (price: string) => {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    return <div>{formatPrice(price)} ₽</div>;
  };
  console.log(basketProduct);

  const categoryName =
    category.find((item) => item.id === selectedCategory)?.name || "-";

  return (
    <div className="bg-[#F9F9F9]">
      <div
        style={{
          background: "url('/ellipse.svg')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundColor: "#F9F9F9",
        }}
        className="flex flex-col items-center py-7"
      >
        <header className="container flex justify-between px-8">
          <img src={"/logo.svg"} alt="" />
          <div>
            {/* <Dropdown menu={{ items }} trigger={["click"]}> */}
            <Button onClick={() => navigate("/login")} type="text">
              <CgProfile />
            </Button>
            {/* </Dropdown> */}
          </div>
        </header>

        <div className="flex items-center my-10">
          <Bounce triggerOnce>
            <img className="imgContainer1" src="/pic.png" alt="" />
          </Bounce>
          <Bounce triggerOnce>
            <div>
              <Typography.Title level={1} className="">
                Только самые <br></br>
                <span className="text-secondary">сочные бургеры!</span>
              </Typography.Title>
              <Typography className="text-white mt-12">
                Бесплатная доставка от 599₽
              </Typography>
            </div>
          </Bounce>
        </div>
      </div>
      <div className="">
        <div className="flex gap-7 items-center categoryContainer px-12 mx-auto  h-[130px]">
          {isLoadingCategory ? (
            <Skeleton.Button
              style={{ borderRadius: "100px", height: "40px" }}
            />
          ) : isErrorCategory ? (
            <Alert
              message="Категорияni olib kelishda xatolik yuz berdi"
              type="error"
              closable
            />
          ) : (
            category.map((item) => (
              <Zoom delay={100} triggerOnce>
                <div>
                  <Button
                    css={buttonStyle}
                    className={`rounded-[100px] border-[0] py-[8px] flex justify-center items-center h-[40px] content-center align-middle ${
                      selectedCategory === item.id
                        ? "bg-[#FFAB08] customStyle"
                        : ""
                    }`}
                    key={item.id}
                    onClick={() => setSelectedCategory(item.id)}
                  >
                    <div>
                      <img
                        className="min-h-[22px] min-w-[22px] max-h-[25px] max-w-[25px]"
                        src={item.image}
                        alt=""
                      />
                    </div>
                    {item.name}
                  </Button>
                </div>
              </Zoom>
            ))
          )}
        </div>
        <div className="container my-10 mx-auto px-14 ">
          <Row
            gutter={[20, 20]}
            style={{ display: "flex", justifyContent: "center" }}
            className="container"
          >
            <Col sm={24} lg={6} style={{ marginTop: "65px", width: "100%" }}>
              <div
                className={` bg-white p-6 flex justify-between flex-col rounded-[10px] ${
                  basketProduct.length > 0 ? "" : ""
                }`}
              >
                <div className="flex justify-between">
                  <Title
                    style={{
                      color: "black",
                      fontSize: "24px",
                      fontWeight: 600,
                    }}
                  >
                    Корзина
                  </Title>
                  <div className="w-[41px] h-[20px] rounded-[6px] flex justify-center items-center bg-[#F2F2F3]">
                    <Typography>{countProductBasket.length}</Typography>
                  </div>
                </div>
                {basketProduct.length > 0 ? (
                  <>
                    <div
                      className="h-[255px] overflow-y-scroll"
                      style={{
                        height: "255px",
                        overflowY: "scroll",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                      }}
                    >
                      {basketProduct.map((item) => (
                        <div className="flex min-h-[84px]  borde-[#F2F2F3] border-b-2 items-center gap-2">
                          <div>
                            <img
                              className="!w-[64px] !h-[52px] rounded-[8px] object-cover"
                              src={item.product.image}
                              alt=""
                            />
                          </div>
                          <div className="flex justify-between w-[100%]">
                            <div>
                              <Typography style={{ fontSize: "16px" }}>
                                {item.product.title}
                              </Typography>
                              <Typography
                                style={{
                                  fontSize: "16px",
                                  color: "#B1B1B1",
                                  fontWeight: 600,
                                }}
                              >
                                {item.product.weight}г
                              </Typography>
                              <Typography>
                                {item.product.price * item.quantity}₽
                              </Typography>
                            </div>
                            <div className="flex justify-center items-center bg-[#F2F2F3] rounded-[12px] w-[84px] h-[40px] p-3">
                              <Button
                                onClick={() =>
                                  handleDecreaseQuatity(item.product.id)
                                }
                                style={{
                                  border: "none",
                                  background: "transparent",
                                }}
                              >
                                -
                              </Button>
                              <p>{item.quantity}</p>
                              <Button
                                onClick={() =>
                                  handleIncreaseQuatity(item.product.id)
                                }
                                style={{
                                  border: "none",
                                  background: "transparent",
                                }}
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <Typography style={{ fontSize: "16px" }}>
                          Итого:
                        </Typography>
                      </div>
                      <div>
                        <p style={{ fontSize: "16px" }}>
                          <PriceComponent price={String(totalPrice)} />
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={openOrderModal}
                      style={{
                        backgroundColor: "#FF7020",
                        width: "100%",
                        height: "40px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                        fontSize: "16px",
                        borderRadius: "16px",
                        border: "0",
                        marginBlock: "10px",
                      }}
                    >
                      Оформить заказ
                    </Button>
                    <div className="flex items-center mt-3 ">
                      <img src="/Доставка.png" alt="" />
                      <Typography
                        style={{ fontSize: "12px", marginInlineStart: "5px" }}
                      >
                        Бесплатная доставка
                      </Typography>
                    </div>
                  </>
                ) : (
                  <p>Тут пока пусто :( </p>
                )}
              </div>
            </Col>
            <Col xs={24} sm={24} md={18} lg={18} className="container">
              <div className="ml-9">
                <Title style={{}}>{categoryName}</Title>
              </div>
              <Row
                style={{ display: "flex", gap: 30 }}
                className="flex container px-10"
              >
                {isLoadingProduct ? (
                  <div>
                    <Skeleton.Image
                      style={{ width: "270px", borderRadius: "4px" }}
                    />
                    <Skeleton
                      style={{ width: "270px" }}
                      active={isLoadingProduct}
                    />
                  </div>
                ) : isErrorProducts ? (
                  <Alert
                    message="Productlarni olib kelishda xatolik yuz berdi"
                    type="error"
                    closable
                  />
                ) : (
                  filteredProducts?.map((item) => (
                    <Zoom triggerOnce style={{ display: "flex" }}>
                      <Col
                        style={{
                          width: "100%",
                          display: "flex",
                          borderRadius: 10,
                        }}
                        xs={11}
                        sm={11}
                        md={8}
                        lg={8}
                        xl={8}
                      >
                        <div>
                          <img
                            src={item.image}
                            alt=""
                            className="w-full rounded-2xl h-[215px] object-cover"
                            // w-[270px]
                          />
                          <div className="w-[270px] bg-white p-3 pt-0 rounded-b-2xl h-[176px] flex flex-col justify-between">
                            <div className="flex flex-col">
                              <Text
                                style={{
                                  fontSize: "24px",
                                  color: "black",
                                  fontWeight: 600,
                                  paddingTop: "5px",
                                }}
                              >
                                {item.price}₽
                              </Text>
                              <Text
                                style={{
                                  fontSize: "16px",
                                  color: "black",
                                }}
                              >
                                {item.title}
                              </Text>
                            </div>
                            <div className="flex flex-col gap-2">
                              <Text
                                style={{
                                  fontSize: "16px",
                                  color: "#B1B1B1",
                                  fontWeight: 600,
                                }}
                              >
                                {item.calories}г
                              </Text>
                              <Button
                                onClick={() => openProductModal(item)}
                                style={{
                                  backgroundColor: "#F2F2F3",
                                  border: "none",
                                  fontSize: "16px",

                                  borderRadius: "16px",
                                  height: "40px",
                                }}
                                // className="bg-gray-200 text-base font-semibold rounded-lg py-2 h-10 sm:text-sm sm:h-8 sm:py-1"
                              >
                                Добавить
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Zoom>
                  ))
                )}
              </Row>
            </Col>
          </Row>
        </div>
      </div>
      <Modal
        footer={null}
        width="100%"
        open={isModalOpen}
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ borderRadius: "24px", width: "684px" }}
        className="customStyleModalI  sm:w-full mx-4 sm:max-h-[100vh] md:w-[684px] lg:w-[684px] lg:h-auto xl:!w-[684px] overflow-hidden"
      >
        {modalType === "product" && selectedProduct && (
          <div className="flex flex-col p-6 py-10">
            <div>
              <Title>{selectedProduct.title}</Title>
            </div>
            <div className="flex flex-col gap-10">
              <div className="flex gap-3">
                <div className="w-[276px] h-[220px]">
                  <img
                    className="min-w-[276px] h-[220px] object-cover"
                    src={selectedProduct.image}
                    alt=""
                  />
                </div>
                <div>
                  <Typography style={{ fontSize: "16px" }}>
                    {selectedProduct.desc}
                  </Typography>
                  <Typography>
                    Составь: <br />
                    {selectedProduct.compound.map((i) => (
                      <Typography>{i}</Typography>
                    ))}{" "}
                    <br />
                  </Typography>
                  <Typography style={{ color: "#B1B1B1" }}>
                    {selectedProduct.weight}г, ккал {selectedProduct.calories}
                  </Typography>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <Button
                    onClick={() => handleAddProductBasket(selectedProduct!)}
                    style={{
                      backgroundColor: "#FF7020",
                      border: "none",
                      fontSize: "16px",
                      color: "white",
                      width: "276px",
                      borderRadius: "12px",
                      height: "40px",
                    }}
                  >
                    Добавить
                  </Button>
                  <div className="flex justify-center items-center bg-[#F2F2F3] rounded-[12px] w-[84px] h-[40px] p-3">
                    <Button
                      onClick={() => handleDecreaseModal()}
                      style={{ border: "none", background: "transparent" }}
                    >
                      -
                    </Button>
                    <p>{quantityModal}</p>
                    <Button
                      onClick={() => handleIncreaseModal()}
                      style={{ border: "none", background: "transparent" }}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <Typography
                  style={{
                    fontSize: "24px",
                    color: "black",
                    fontWeight: 600,
                  }}
                >
                  {selectedProduct.price * quantityModal}₽
                </Typography>
              </div>
            </div>
          </div>
        )}
        {modalType === "order" && (
          <div className="flex">
            <div className="bg-[#FFAB08] min-w-[342px]  h-[432px] flex items-center justify-center">
              <img src="./modal2.svg" alt="" />
            </div>
            <div className="p-5 flex flex-col items-center w-[100%] bg-[#F9F9F9]">
              <Title>Доставка</Title>
              <div className="flex gap-3 justify-between w-[100%] h-[100%] flex-col">
                <div className="flex w-[100%] flex-col gap-4">
                  <Input
                    value={nameOrder}
                    onChange={(e) => setNameOrder(e.target.value)}
                    style={{
                      height: "40px",
                      border: "1px solid #F2F2F3",
                      borderRadius: "12px",
                      width: "100%",
                    }}
                    placeholder="Ваше имя"
                  />
                  <Input
                    value={phoneOrder}
                    onChange={(e) => setPhoneOrder(e.target.value)}
                    style={{
                      height: "40px",
                      border: "1px solid #F2F2F3",
                      borderRadius: "12px",
                    }}
                    placeholder="Телефон"
                  />

                  <Radio.Group
                    onChange={(e) => setDeliveryType(e.target.value)}
                    value={deliveryType}
                  >
                    <Radio value="Самовывоз">Самовывоз</Radio>
                    <Radio value="Доставка">Доставка</Radio>
                  </Radio.Group>

                  {deliveryType === "Доставка" && (
                    <>
                      <Input
                        value={kvOrder}
                        onChange={(e) => OrderKvOrder(e.target.value)}
                        style={{
                          height: "40px",
                          border: "1px solid #F2F2F3",
                          borderRadius: "12px",
                        }}
                        placeholder="Улица, дом, квартира"
                      />
                      <div className="flex gap-3">
                        <Input
                          value={etajOrder}
                          onChange={(e) => setEtajOrder(e.target.value)}
                          style={{
                            height: "40px",
                            border: "1px solid #F2F2F3",
                            borderRadius: "12px",
                          }}
                          placeholder="Этаж"
                        />
                        <Input
                          value={dfOrder}
                          onChange={(e) => setDfOrder(e.target.value)}
                          style={{
                            height: "40px",
                            border: "1px solid #F2F2F3",
                            borderRadius: "12px",
                          }}
                          placeholder="Домофон"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="w-[100%]">
                <Button
                  onClick={handleOrder}
                  style={{
                    backgroundColor: "#FF7020",
                    width: "100%",
                    height: "40px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontSize: "16px",
                    borderRadius: "16px",
                    marginTop: "20px",
                    border: "0",
                  }}
                >
                  Оформить
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
      <Footer
        style={{
          height: "244px",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <Row>
          <Col sm={24} md={6} lg={8}>
            <img src="/logoFooter.svg" alt="" />
          </Col>
          <Col
            sm={24}
            md={6}
            lg={8}
            style={{ display: "flex", flexDirection: "column", gap: 18 }}
          >
            <Typography style={{ fontSize: "24px" }}>
              Номер для заказа
            </Typography>
            <div className="flex items-center gap-3">
              <Typography>
                {" "}
                <FaPhoneAlt style={{}} />
              </Typography>

              <Typography style={{ fontSize: "16px", display: "flex" }}>
                +7(930)833-38-11
              </Typography>
            </div>
          </Col>
          <Col
            sm={24}
            md={12}
            lg={8}
            style={{ display: "flex", flexDirection: "column", gap: 18 }}
          >
            <Typography style={{ fontSize: "24px" }}>Мы в соцсетях</Typography>
            <div className="flex gap-3">
              <div className="h-[36px] w-[36px] rounded-full bg-[#FF7020] flex justify-center items-center">
                <FaVk style={{ color: "white", fontSize: "20px" }} />
              </div>
              <div className="h-[36px] w-[36px] rounded-full bg-[#FF7020] flex justify-center items-center">
                <FaTelegramPlane
                  style={{
                    color: "white",
                    fontSize: "20px",
                  }}
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Typography>© YouMeal, 2022</Typography>
            <Typography style={{ fontSize: "12px" }}>
              Design: Anastasia Ilina
            </Typography>
          </Col>
        </Row>
      </Footer>
    </div>
  );
};
